# 🐦 Flappy Bird Game - 斬新なフラッピーバード風Webゲーム

React、TypeScript、TailwindCSSで作られた斬新なフラッピーバード風のゲームです。

## 🎮 ゲームの特徴

### 通常のフラッピーバードとは異なる斬新な要素

- **🌈 カラフルな背景とグラデーション**: 美しい空のグラデーションと動的な雲
- **✨ パーティクル効果**: ジャンプ時や衝突時の美しいパーティクル
- **🎁 パワーアップアイテム**: 
  - ⚡ スピードアップ
  - 🛡️ 無敵状態
  - 💎 スコアボーナス
- **🎯 動的な難易度調整**: プレイヤーのスコアに応じてゲームスピードが変化
- **🏆 ハイスコア機能**: ローカルストレージに保存
- **📱 レスポンシブデザイン**: PC・スマートフォン対応

## 🎯 遊び方

1. **スペースキー** または **クリック** でバードをジャンプさせる
2. パイプにぶつからないように避け続ける
3. パワーアップアイテムを取得してスコアを伸ばす
4. 最高スコアを目指そう！

## 🚀 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **TailwindCSS** - スタイリング
- **Vite** - ビルドツール
- **GitHub Actions** - 自動デプロイ
- **GitHub Pages** - ホスティング

## 🛠️ 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# プレビュー
npm run preview
```

## 📦 デプロイ

このプロジェクトはGitHub Pagesで自動デプロイされます。

1. GitHubリポジトリの **Settings** → **Pages** に移動
2. **Source** を **GitHub Actions** に設定
3. `main` ブランチにpushすると自動的にデプロイされます

## 🎨 カスタマイズ

### ゲーム設定の変更

`src/constants/gameConfig.ts` でゲームの設定を調整できます：

```typescript
export const GAME_CONFIG = {
  BIRD_JUMP_FORCE: -12,    // ジャンプ力
  GRAVITY: 0.6,            // 重力
  PIPE_WIDTH: 60,          // パイプの幅
  PIPE_GAP: 180,           // パイプ間の隙間
  PIPE_SPEED: 3,           // パイプの速度
  // ...
};
```

### 見た目のカスタマイズ

TailwindCSSを使用しているため、コンポーネントのクラス名を変更するだけで見た目を簡単にカスタマイズできます。

## 📁 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── Bird.tsx        # バード
│   ├── Pipe.tsx        # パイプ
│   ├── Cloud.tsx       # 雲
│   ├── Particle.tsx    # パーティクル
│   ├── PowerUp.tsx     # パワーアップ
│   ├── GameStats.tsx   # ゲーム統計
│   └── GameMenu.tsx    # ゲームメニュー
├── hooks/              # カスタムフック
│   ├── useGameState.ts # ゲーム状態管理
│   └── useGameLoop.ts  # ゲームループ
├── types/              # 型定義
│   └── index.ts
├── constants/          # 定数
│   └── gameConfig.ts
└── App.tsx             # メインアプリケーション
```

## 🤝 コントリビューション

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🎉 デモ

[ゲームをプレイする](https://miya123123.github.io/test_repo_4_miya123123/)

---

**楽しいゲームプレイを！** 🎮✨
