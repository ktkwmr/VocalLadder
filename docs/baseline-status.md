# ベースラインの実施状況（Vocal Ladder）

基準: WEBAPP_BASELINE.md（最終更新 2026-10-25 版）
状態: ✅ 実装済み / ⚠️ 一部 / ❌ 未実装 / 👤 待ち（人間の作業） / — 対象外

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| §0 | 変数 | ✅ | Vocal Ladder / `vocalladder` / `ktkwmr.com`（§0 の A: 別 Worker + Route `ktkwmr.com/vocalladder*`）/ `ktkwmr/VocalLadder` / en + ja |
| 1-4 | Claude の GitHub App | ✅ | このセッションで push できた |
| 1-8 | Cloudflare の GitHub App | 👤 待ち | |
| 2-1 | wrangler.jsonc | ✅ | `routes`・`workers_dev: false`・`preview_urls: true`・`previews: {}` |
| 2-2 | `/` の転送 | — | ドメイン直下は `ktkwmr/ktkwmr.com` |
| 2-3 | 404.html | ✅ | |
| 2-4, 2-5 | .gitignore / .gitattributes | ✅ | |
| 2-6 | `--check` | ✅ | |
| 2-7〜2-10 | README / LICENSE / CLAUDE.md / バージョンなし | ✅ | |
| 2-11, 2-13 | Cloudflare 接続・自動デプロイ確認 | 👤 待ち | |
| 2-14 | 同じドメインの追加アプリ | ✅ | sitemap は `/vocalladder/sitemap.xml`。`ktkwmr/ktkwmr.com` の robots.txt への追加は未（2-16 と同じ PR） |
| 2-16 | トップページへの追加 | ❌ | `ktkwmr/ktkwmr.com` の `home.mjs`（`APPS`・`ICON`）と `robots.txt` に PR が必要（ユーザーの了承待ち） |
| 3-1〜3-5 | PWA | ✅ | SW の 2 回目の訪問（SW 制御下）で再生を確認 |
| 3-7 | インストール案内 | ❌ | 任意 |
| 3-8 | アイコン生成 | ✅ | `scripts/render-icons.mjs` |
| 3-9, 3-10 | COEP / CDN | — | |
| 4-1〜4-4 | 多言語・`/ja/` の生成・日本語タイトル | ✅ | 日本語タイトル・説明は `scripts/build-ja.mjs` 冒頭（👤 確認待ち） |
| 4-7 | `document.baseURI` | ✅ | JS で URL を組み立てていない（相対パスのみ）。`/ja/` で再生・About を確認 |
| 5-1〜5-6 | title・hreflang・OGP・JSON-LD・sitemap | ✅ | |
| 5-7, 5-8 | h1 と説明 | ✅ | アプリの下の `<section class="intro">` |
| 5-11 | スクロールを止めない | ✅ | |
| 6-1〜6-4 | `_headers` と CSP | ✅ | CSP 付きのローカルサーバーで違反・エラー 0 件（日英、1280px・390px） |
| 7-1〜7-3 | プライバシー・ポリシー・運営者情報 | ✅ | エクスポートのファイルに入力した名前が入ることも記載。制定日 2026-10-25 |
| 7-4 | 問い合わせ | ⚠️ | GitHub Issues のみ |
| 7-7 | ポリシー内の外部リンク | 👤 待ち | |
| 8-1〜8-3 | サードパーティライセンス | ✅ | ライブラリなし |
| 9-1 | ⚙ メニュー | ⚠️ | 記事がないので「ガイド・記事」は置いていない |
| 9-2 | 使い方 | ✅ | パターンの書き方も記載 |
| 9-3 | 状態の保存 | ✅ | `vocalladder-state`。再生状態は保存しない |
| 9-4, 9-8, 9-10, 9-11 | スマホ・アクセシビリティ・押した反応・ダイアログのフォーカス | ✅ | |
| 9-5 | スマホでファイルを開く | ✅ | `pointer: coarse` では `accept` を外す |
| 9-7 | 保存 | ✅ | `a[download]`、iOS は共有シート |
| 9-9 | 自動テスト | ⚠️ | Playwright での E2E は手元のみ（CI なし） |
| 10 | 記事 | ❌ | 未作成（人間の指示待ち） |
| 11-1〜11-3 | 解析 | ✅ | 同じ token |
| 11-4 | 本番での送信確認 | 👤 待ち | |
| 12-1, 12-2 | Actions | ✅ | |
| 12-12 | 最初に動くものを見せる | ✅ | `scripts/build-preview.mjs` → Artifact https://claude.ai/artifact/Bwsc7DtVBnAsdqfdKcau2o（エクスポートは `downloads` capability） |
| 13, 14 | 公開・Search Console | 👤 待ち | |
| 15 | AdSense | — | |
