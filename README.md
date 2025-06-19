# 一番最初

docker compose build

docker compose up -d

docker compose exec node npm install

# いつもする立ち上げコマンド

仮想環境立ち上げ

docker compose up -d

npm run dev するために中に入る

docker compose exec node bash

npm run dev する

npm run dev

→ 開発サーバーが立ち上がる

# 終わる時

開発サーバーが動いているので、Ctrl + c (cmd + c)で開発サーバーを終了する

仮想環境から抜ける
exit

仮想環境を終了する
docker compose down

# DB のダンプファイルをインポートするとき

docker compose exec db bash

DB コンテナの中に入ってから

cd mysql_init_data
mysql -u root -p dev_neko < dump.sql
(パスワードを聞かれるから secret と入力)
