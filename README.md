# mono-front

This project uses Svelte, the Radical JavaScript Framework.

If you want to learn more about Svelte, please visit its website: <https://svelte.dev/>.


## 技術スタック

| 項目          | 使用技術         | バージョン     |
|-------------|--------------|-----------|
| **Frontend** | Svelte         | 5        |
|             | SvelteKit      | 2.16.0    |
|             | TypeScript | 5 |

## ディレクトリ構成
```
src/
├── lib/
│   ├── api.ts           # API関連
│   └── index.ts         # エクスポートやユーティリティ用
├── routes/
│   ├── user/            
│   │   └── [id]/
│   │       └── +page.svelte  # ユーザー詳細画面
│   ├── +layout.svelte   # 共通レイアウト
│   └── +page.svelte     # ユーザ一覧画面(Top画面)
```

## 実行方法
```
pnpm dev --open
```