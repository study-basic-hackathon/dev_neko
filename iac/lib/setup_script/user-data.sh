#!/bin/bash

# System update
yum update -y

# Voltaのインストール（ec2-userとして実行）
sudo -u ec2-user bash -c "curl https://get.volta.sh | bash"

# ec2-userの.bashrcにVoltaのPATHを追加
sudo -u ec2-user bash -c "echo 'export PATH=\"\$HOME/.volta/bin:\$PATH\"' >> /home/ec2-user/.bashrc"

# Node.js v22をVolta経由でインストール（直接パス指定）
sudo -u ec2-user /home/ec2-user/.volta/bin/volta install node@22

# AWS Secrets ManagerからGoogle GenAI API Keyを取得
export GOOGLE_GENAI_API_KEY=$(aws secretsmanager get-secret-value --secret-id "dev-neko/google-genai-api-key" --region ap-northeast-1 --query SecretString --output text)

# MariaDB 10.11のインストール
yum install -y mariadb1011-server
systemctl start mariadb
systemctl enable mariadb

# MariaDBでユーザーを作成（環境変数から取得）
mysql -e "CREATE USER '${MYSQL_USER:-noder}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD:-secret}';"
mysql -e "GRANT ALL PRIVILEGES ON *.* TO '${MYSQL_USER:-noder}'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# データベースを作成（環境変数から取得）
mysql -e "CREATE DATABASE ${MYSQL_DB:-dev_neko};"
sed -i 's/utf8mb4_0900_ai_ci/utf8mb4_general_ci/g' /tmp/setup_script/table_definitions.sql
sed -i 's/utf8mb4_0900_ai_ci/utf8mb4_general_ci/g' /tmp/setup_script/seeding.sql
mysql "${MYSQL_DB:-dev_neko}" < /tmp/setup_script/table_definitions.sql
mysql "${MYSQL_DB:-dev_neko}" < /tmp/setup_script/seeding.sql

# Apacheのインストール
yum install -y httpd mod_ssl
systemctl start httpd
systemctl enable httpd

# Certbotのインストール（Let's Encrypt用）
yum install -y python3 python-devel augeas-devel gcc
python3 -m venv /opt/certbot/
/opt/certbot/bin/pip install --upgrade pip
/opt/certbot/bin/pip install certbot certbot-apache
ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# Apache設定ファイルの準備
DOMAIN_NAME="${SUBDOMAIN:-dev-neko}.arctic-street.net"
cat > /etc/httpd/conf.d/dev-neko.conf << EOF
<VirtualHost *:80>
    ServerName ${DOMAIN_NAME}
    DocumentRoot /var/www/html
    ErrorLog /var/log/httpd/dev-neko_error.log
    CustomLog /var/log/httpd/dev-neko_access.log combined
</VirtualHost>
EOF

# Apacheの設定を再読み込み
systemctl reload httpd

# 初期HTMLファイルの作成
echo "<html><body><h1>Hello from AWS CDK</h1><p>Node.js version: $(sudo -u ec2-user /home/ec2-user/.volta/bin/node --version)</p><p>MySQL version: $(mariadbd --version)</p></body></html>" > /var/www/html/index.html

# SSL証明書の取得（Let's Encrypt）
# ドメインが完全に解決されるまで少し待機
sleep 60

# SSL証明書を取得
certbot --apache -d ${DOMAIN_NAME} --non-interactive --agree-tos --email admin@arctic-street.net

# 証明書の自動更新設定
# echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

# server.jsをコピーして環境変数を設定
sudo -u ec2-user cp /tmp/setup_script/server.js /home/ec2-user
sudo -u ec2-user /home/ec2-user/.volta/bin/npm install -g npm@11.4.2
sudo -u ec2-user /home/ec2-user/.volta/bin/npm install -g pm2

# ec2-userの環境変数にGOOGLE_GENAI_API_KEYを設定
sudo -u ec2-user bash -c "echo 'export GOOGLE_GENAI_API_KEY=\"$GOOGLE_GENAI_API_KEY\"' >> /home/ec2-user/.bashrc"

yum install -y git
sudo -u ec2-user git clone https://github.com/study-basic-hackathon/dev_neko.git /home/ec2-user/dev_neko

# /home/ec2-user/dev_neko/code内でnpm ci --omit=devを実行
sudo -u ec2-user bash -c "cd /home/ec2-user/dev_neko/code && /home/ec2-user/.volta/bin/npm install && /home/ec2-user/.volta/bin/npm run build"

# PM2でサーバーを起動（環境変数を引き継ぐ）
sudo -u ec2-user bash -c "cd /home/ec2-user && GOOGLE_GENAI_API_KEY='$GOOGLE_GENAI_API_KEY' /home/ec2-user/.volta/bin/pm2 start --name test-server server.js"

rm -f /etc/httpd/conf.d/dev-neko-le-ssl.conf /etc/httpd/conf.d/dev-neko.conf
# プレースホルダーを実際のドメイン名に置換してコピー
sed "s/DOMAIN_NAME_PLACEHOLDER/${DOMAIN_NAME}/g" /tmp/setup_script/dev-neko-virtual.conf > /etc/httpd/conf.d/dev-neko-virtual.conf
systemctl reload httpd
