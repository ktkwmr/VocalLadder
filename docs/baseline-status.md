# ベースラインの実施状況（Vocal Ladder）

基準: WEBAPP_BASELINE.md（最終更新 2026-10-25 版、12-12 まで）
状態: ✅ 実装済み / ⚠️ 一部 / ❌ 未実装 / 👤 待ち（人間の作業） / — 対象外
最終更新: 2026-10-25（記事 4 本を追加した PR の時点）

## 0. 変数

| 変数 | 値 |
|---|---|
| アプリ名 | Vocal Ladder |
| スラッグ | `vocalladder` |
| ドメイン | `ktkwmr.com`（6 つ目のアプリ。§0 の A: 別 Worker + Route `ktkwmr.com/vocalladder*`） |
| リポジトリ | `ktkwmr/VocalLadder`（公開） |
| 運営者・問い合わせ | ktkwmr / GitHub Issues |
| 言語 | en（既定）+ ja（`/ja/`） |
| Web Analytics token | ほかのアプリと同じ |

## 項目

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 1-4 | Claude の GitHub App | ✅ | このセッションで push・PR・マージができた |
| 1-8 | Cloudflare の GitHub App | ✅ | PR に「Workers Builds: vocalladder」のチェックが付く |
| 2-1 | wrangler.jsonc | ✅ | `routes`・`workers_dev: false`・`preview_urls: true`・`previews: {}` |
| 2-2 | `/` の転送 | — | ドメイン直下は `ktkwmr/ktkwmr.com` |
| 2-3 | 404.html | ✅ | |
| 2-4〜2-10 | .gitignore・LF・`--check`・README・LICENSE・CLAUDE.md・バージョンなし | ✅ | |
| 2-11 | Cloudflare に接続 | ✅ | 2026-10-25 |
| 2-13 | 自動デプロイの確認 | ✅ | main へのマージで本番に反映（人間が本番で確認済み） |
| 2-14 | 同じドメインの追加アプリ | ✅ | sitemap は `/vocalladder/sitemap.xml` |
| 2-16 | トップページへの追加 | ⚠️ | `ktkwmr/ktkwmr.com` に PR を出した（記事の PR のマージ後にマージする） |
| 3-1〜3-5 | PWA | ✅ | SW の 2 回目の訪問でも再生を確認 |
| 3-7 | インストール案内 | ❌ | 任意 |
| 3-8 | アイコン生成 | ✅ | `scripts/render-icons.mjs` |
| 3-9, 3-10 | COEP / CDN | — | |
| 4-1〜4-3 | 多言語・`/ja/` の生成 | ✅ | |
| 4-4 | 日本語の検索用タイトル | ✅ | `scripts/build-ja.mjs` 冒頭 |
| 4-7 | `document.baseURI` | ✅ | JS で URL を組み立てていない。`/ja/` で再生・About を確認 |
| 5-1〜5-6 | title・hreflang・OGP・JSON-LD・sitemap | ✅ | |
| 5-7, 5-8 | h1 と説明 | ✅ | アプリの下の `<section class="intro">`。記事へのリンクも追加 |
| 5-11 | スクロールを止めない | ✅ | |
| 6-1〜6-4 | `_headers` と CSP | ✅ | CSP 付きのローカルサーバーで、アプリ・記事・情報ページの違反とエラーが 0 件 |
| 7-1〜7-3 | プライバシー・ポリシー・運営者情報 | ✅ | |
| 7-4 | 問い合わせ | ⚠️ | GitHub Issues のみ |
| 7-7 | ポリシー内の外部リンク | 👤 待ち | |
| 8-1〜8-3 | サードパーティライセンス | ✅ | ライブラリなし |
| 9-1 | ⚙ メニュー | ✅ | 使い方 / ガイド・記事 / エクスポート / インポート / プライバシー / このアプリについて / 保存した情報をすべて削除 |
| 9-2 | 使い方 | ✅ | 最後に使い方ガイドへのリンク |
| 9-3 | 状態の保存 | ✅ | `vocalladder-state`。再生状態は保存しない。全削除のメニューあり |
| 9-4, 9-8, 9-10, 9-11 | スマホ・アクセシビリティ・押した反応・ダイアログ | ✅ | |
| 9-5, 9-7 | ファイルを開く・保存 | ✅ | インポートは `pointer: coarse` で `accept` を外す。エクスポートは iOS で共有シート |
| 9-9 | 自動テスト | ⚠️ | Playwright の E2E は手元のみ（CI なし）。記事の値はアプリのコードから計算 |
| 10-1〜10-5 | 記事の仕組み・最初の記事・計算した表・画面写真・導線 | ✅ | guide・patterns・warmup-scales・faq（PR、人間の確認待ち） |
| 10-6 | スマホ幅のレビュー | ✅ | 390px で全 12 ページ、横スクロールなし |
| 10-7 | 内容の人間確認 | 👤 待ち | `docs/article-review.md` |
| 10-8 | 再生成できる値 | ✅ | `scripts/pages/vocal.mjs`、`scripts/render-guide-images.mjs` |
| 10-9 | 専門家の視点の校閲 | ✅ | `docs/article-review.md` の校閲の表 |
| 11-1〜11-4 | 解析 | ✅ | 本番での送信を人間が確認済み |
| 12-1, 12-2 | Actions | ✅ | |
| 12-3 | ブランチ → PR → squash | ✅ | 最初の 3 コミットだけ main を作るときに直接 push |
| 12-12 | 最初に動くものを見せる | ✅ | `scripts/build-preview.mjs` → Artifact |
| 13-1〜13-4 | 本番デプロイ・動作確認・実機・GitHub About | ✅ | 人間が確認済み（2026-10-25） |
| 14-1, 14-2 | Search Console | ✅ | サイトマップ送信済み。記事のマージ後に再送信する |
| 15 | AdSense | — | |

## 人間の作業（未完了）

| # | 内容 | 手順 | 終わったかの確かめ方 |
|---|---|---|---|
| 1 | 記事の内容確認（10-7） | 記事の PR のプレビューで読む。観点は `docs/article-review.md` | 「マージして」と伝える |
| 2 | サイトマップの再送信（14-2） | 記事のマージ後、Search Console で `https://ktkwmr.com/vocalladder/sitemap.xml` を再送信 | 「成功しました」になる |
| 3 | ポリシー内の外部リンク（7-7） | プライバシーポリシーの Cloudflare へのリンクを開く | ページが開く |
