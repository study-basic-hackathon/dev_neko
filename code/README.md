This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 学習内容

## 環境変数について

調べてみると以下のようなバリエーションがある。

```
1: (環境変数直書き)
2: .env.development.local または .env.production.local
3: .env.local
4: .env.development または .env.production
5: .env
```

同じキーが複数の場所で設定されている場合の優先順位は数字の通り。つまり、 `API_URL` が `.env` にも `.env.local` にも記載されている場合は `.env.local` の方が優先される。

developmentとproductionの違いは `NODE_ENV` という環境変数を設定するかどうかで、 `NODE_ENV` の値が設定されていない場合は `undefined` らしい。つまり設定しない限り参照されない？

### 使い分け

||local無し|local有り (Git管理から外す)|
|---|---|---|
|.env|共有していい設定<br>（とにかく全設定を突っ込む、開発環境用）|共有してはいけない設定|
|.env.development|共有していい設定<br>（テスト環境のために.envを上書きしたい）|共有してはいけない設定（テスト環境専用）|
|.env.production|共有していい設定<br>（本番環境のために.envを上書きしたい）|共有してはいけない設定（本番環境専用）|

`NODE_ENV` のおかげで、 `.env`、`.env.development`、`.env.production`が共存してたとしても、例えばテスト環境では`.env`と`.env.development`のみが読み込まれ、`.env.production`は無視される。

恐らく開発規模が小さい段階だと`.env`と`.env.local`だけで大丈夫だけど、規模がデカくなってくると分けておいた方が楽みたいなことがあるかもしれない。
