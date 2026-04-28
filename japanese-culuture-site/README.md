# Japanese Culture Site (JSA Website)

React + Vite + Firebase で構築した、JSA（Japanese Student Association）向けの紹介サイト兼イベント管理アプリです。  
学習目的で作成しつつ、実運用を意識して「公開ページ」と「管理画面（認証付き）」を同居させています。

---

## 📸 Screenshots

> スクリーンショットは `docs/screenshots/` に配置してください（推奨）。

- Home: `docs/screenshots/home.png`
- Events: `docs/screenshots/events.png`
- Admin Dashboard: `docs/screenshots/admin-dashboard.png`
- Admin Event Editor: `docs/screenshots/admin-event-editor.png`

（現時点ではプレースホルダー。画像を追加後、README内に直接埋め込み可能です。）

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
- **Backend(BaaS)**: Firebase
  - Authentication
  - Firestore
  - Cloud Storage
- **Lint**: ESLint

---

## 📁 ディレクトリ構成（抜粋）

```txt
src/
  api/                # Firestore / Storage との通信
  components/         # UIコンポーネント（layout, sections, admin, ui, auth）
  constants/          # イベントカテゴリなどの定義
  data/               # 静的データ
  firebase/           # Firebase初期化
  hooks/              # カスタムフック
  pages/              # ページ単位のUI
  utils/              # 汎用ユーティリティ
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

### 3. 開発サーバ起動

```bash
npm run dev
```

### 4. ビルド

```bash
npm run build
```

### 5. Lint

```bash
npm run lint
```

---

## 🔐 環境変数（推奨）

現在は `src/firebase/firebase.js` に Firebase 設定を直接記載しています。  
実運用では以下のように `.env` へ移動することを推奨します。

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

> ※ Firebase のクライアント設定値自体は公開される前提ですが、Firestore/Storage の **Security Rules** を厳格に設定してください。

---

## 🗃 Firestore / Storage 構成

### Firestore collections

#### `events`
- `title` (string)
- `category` (string)
- `startAt` (string or timestamp-like date string)
- `venueName` (string)
- `imageUrl` (string)
- `summary` (string)
- `status` (string: `published` / `draft`)
- `createdAt` (serverTimestamp)
- `updatedAt` (serverTimestamp)

#### `teamMembers`
- `name` (string)
- `role` (string)
- `message` (string)
- `imageUrl` (string)
- `order` (number)
- `createdAt` (serverTimestamp)

### Storage paths
- `events/<timestamp>-<filename>`
- `teamMembers/<timestamp>-<filename>`

---

## 🔒 認証とルーティング

- 管理ページは `ProtectedRoute` で保護しています。
- 未ログイン状態で管理ページへアクセスすると `/admin-login` へリダイレクトします。
- ログイン成功後はアクセス元の管理ページへ復帰します。

---

## 🧪 今後の改善候補

- `React.lazy` による管理画面のコード分割
- エラー/ローディングの共通ハンドリング強化
- E2E テスト導入（Playwright など）
- CI で `lint + build` 自動化

---

## License

学習・ポートフォリオ用途。
