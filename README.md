# Japanese Culture Site (JSA Website)

**English** | [日本語](#日本語)

An introduction and event-management web app for a JSA (Japanese Student Association), built with React + Vite + Firebase. Created for learning purposes while keeping production concerns in mind, it combines a **public site** with an **authenticated admin dashboard**.

## 🔗 Live Demo

> Deployed on Vercel. Replace the placeholder below with your production URL after deploying.

- **Live site**: `https://<your-project>.vercel.app`

---

## ✨ Features

### Public site
- Section layout: Hero / About / Culture / Events / Team / Contact
- Event listing
- Category filter with URL query sync (`?category=`)
- Event detail view

### Admin dashboard
- Login via Firebase Authentication
- Auth guard for `/admin`, `/admin/events`, `/admin/team`
- Event CRUD (create / update / delete)
- Team member CRUD
- Image upload to Firebase Storage

---

## 🧱 Tech Stack

- **Frontend**: React 19, React Router 7, Vite 7
- **UI**: Tailwind CSS, Headless UI, Heroicons, React Icons
- **Backend (BaaS)**: Firebase — Authentication, Firestore, Cloud Storage
- **Testing**: Vitest, Testing Library, jsdom
- **Lint**: ESLint

---

## 📁 Project Structure (excerpt)

```txt
src/
  api/          # Communication with Firestore / Storage
  components/   # UI components (layout, sections, admin, ui, auth)
  constants/    # Definitions such as event categories
  data/         # Static data
  firebase/     # Firebase initialization
  hooks/        # Custom hooks
  pages/        # Page-level UI
  utils/        # General utilities
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+ (recommended)
- npm

### 2. Install
```bash
npm install
```

### 3. Environment variables
Copy `.env.example` to `.env` and fill in your Firebase config:
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
> Firebase client config values are public by design, but make sure your Firestore/Storage **Security Rules** are strict.

### 4. Develop / Build / Lint / Test
```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # ESLint
npm run test     # run tests (Vitest)
```

---

## ☁️ Deploy (Vercel)

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project** and import the repo. The framework is auto-detected as Vite (build: `vite build`, output: `dist`).
3. Under **Settings → Environment Variables**, add the six `VITE_FIREBASE_*` values above.
4. Deploy. `vercel.json` rewrites all routes to `index.html` so client-side routing works on refresh.

---

## 🗃 Firestore / Storage Schema

### Firestore collections

**`events`**: `title`, `category`, `startAt`, `venueName`, `imageUrl`, `summary`, `status` (`published` / `draft`), `createdAt`, `updatedAt`

**`teamMembers`**: `name`, `role`, `message`, `imageUrl`, `order`, `createdAt`

### Storage paths
- `events/<timestamp>-<filename>`
- `teamMembers/<timestamp>-<filename>`

---

## 🔒 Auth & Routing

- Admin pages are protected by `ProtectedRoute`.
- Accessing an admin page while logged out redirects to `/admin-login`.
- After a successful login, the user returns to the originally requested admin page.

---

## License

For learning / portfolio use.

---
---

# 日本語

[English](#japanese-culture-site-jsa-website) | **日本語**

React + Vite + Firebase で構築した、JSA（Japanese Student Association）向けの紹介サイト兼イベント管理アプリです。学習目的で作成しつつ、実運用を意識して「公開ページ」と「管理画面（認証付き）」を同居させています。

## 🔗 ライブデモ

> Vercel にデプロイしています。デプロイ後、下記プレースホルダーを本番 URL に置き換えてください。

- **公開サイト**: `https://<your-project>.vercel.app`

---

## ✨ 主な機能

### 公開サイト
- ヒーロー / About / Culture / Events / Team / Contact のセクション表示
- イベント一覧表示
- カテゴリフィルタ + URLクエリ連携（`?category=`）
- イベント詳細表示

### 管理画面
- Firebase Authentication によるログイン
- 認証ガード（`/admin`, `/admin/events`, `/admin/team`）
- イベント CRUD（作成・更新・削除）
- チームメンバー CRUD
- Firebase Storage への画像アップロード

---

## 🧱 技術スタック

- **Frontend**: React 19, React Router 7, Vite 7
- **UI**: Tailwind CSS, Headless UI, Heroicons, React Icons
- **Backend (BaaS)**: Firebase — Authentication, Firestore, Cloud Storage
- **テスト**: Vitest, Testing Library, jsdom
- **Lint**: ESLint

---

## 📁 ディレクトリ構成（抜粋）

```txt
src/
  api/          # Firestore / Storage との通信
  components/   # UIコンポーネント（layout, sections, admin, ui, auth）
  constants/    # イベントカテゴリなどの定義
  data/         # 静的データ
  firebase/     # Firebase初期化
  hooks/        # カスタムフック
  pages/        # ページ単位のUI
  utils/        # 汎用ユーティリティ
```

---

## 🚀 セットアップ

### 1. 前提
- Node.js 20 以上（推奨）
- npm

### 2. インストール
```bash
npm install
```

### 3. 環境変数
`.env.example` を `.env` にコピーし、Firebase の設定値を記入します。
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
> Firebase のクライアント設定値自体は公開される前提ですが、Firestore/Storage の **Security Rules** を厳格に設定してください。

### 4. 開発 / ビルド / Lint / テスト
```bash
npm run dev      # 開発サーバ起動
npm run build    # 本番ビルド
npm run lint     # ESLint
npm run test     # テスト実行（Vitest）
```

---

## ☁️ デプロイ（Vercel）

1. このリポジトリを GitHub に push します。
2. Vercel で **Add New → Project** からリポジトリをインポートします。フレームワークは Vite として自動検出されます（build: `vite build`、output: `dist`）。
3. **Settings → Environment Variables** で、上記 6 つの `VITE_FIREBASE_*` を登録します。
4. デプロイします。`vercel.json` で全ルートを `index.html` にリライトするため、リロード時もクライアントサイドルーティングが機能します。

---

## 🗃 Firestore / Storage 構成

### Firestore collections

**`events`**: `title`, `category`, `startAt`, `venueName`, `imageUrl`, `summary`, `status`（`published` / `draft`）, `createdAt`, `updatedAt`

**`teamMembers`**: `name`, `role`, `message`, `imageUrl`, `order`, `createdAt`

### Storage paths
- `events/<timestamp>-<filename>`
- `teamMembers/<timestamp>-<filename>`

---

## 🔒 認証とルーティング

- 管理ページは `ProtectedRoute` で保護しています。
- 未ログイン状態で管理ページへアクセスすると `/admin-login` へリダイレクトします。
- ログイン成功後はアクセス元の管理ページへ復帰します。

---

## License

学習・ポートフォリオ用途。
