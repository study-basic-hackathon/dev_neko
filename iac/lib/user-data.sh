#!/bin/bash

# System update
yum update -y

# Voltaのインストール（ec2-userとして実行）
sudo -u ec2-user bash -c "curl https://get.volta.sh | bash"

# ec2-userの.bashrcにVoltaのPATHを追加
sudo -u ec2-user bash -c "echo 'export PATH=\"\$HOME/.volta/bin:\$PATH\"' >> /home/ec2-user/.bashrc"

# Node.js v22をVolta経由でインストール（直接パス指定）
sudo -u ec2-user /home/ec2-user/.volta/bin/volta install node@22

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

# Apacheのインストール
yum install -y httpd
systemctl start httpd
systemctl enable httpd

# Certbotのインストール（Let's Encrypt用）
yum install -y python3 python-devel augeas-devel gcc
python3 -m venv /opt/certbot/
/opt/certbot/bin/pip install --upgrade pip
/opt/certbot/bin/pip install certbot certbot-apache
ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# Apache設定ファイルの準備
cat > /etc/httpd/conf.d/dev-neko.conf << 'EOF'
<VirtualHost *:80>
    ServerName dev-neko.arctic-street.net
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
certbot --apache -d dev-neko.arctic-street.net --non-interactive --agree-tos --email admin@arctic-street.net

# 証明書の自動更新設定
# echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -