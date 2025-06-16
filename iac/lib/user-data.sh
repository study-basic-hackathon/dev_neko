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
echo "<html><body><h1>Hello from AWS CDK</h1><p>Node.js version: $(sudo -u ec2-user /home/ec2-user/.volta/bin/node --version)</p><p>MySQL version: $(mariadbd --version)</p></body></html>" > /var/www/html/index.html