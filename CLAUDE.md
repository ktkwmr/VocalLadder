# Vocal Ladder

発声練習のパターン（ドレミファソファミレドなど）をピアノで弾き、開始の音から終了の音まで半音ずつ上げ下げして伴奏する Web アプリ。練習セットを並べて通しで再生でき、セットはエクスポート・インポートで共有できる。公開 URL: https://ktkwmr.com/vocalladder/ （日本語: /vocalladder/ja/）
構成・開発・デプロイの詳細は README.md を参照。

## 共通ベースライン
- 独自機能以外の共通項目は ktkwmr/webapp-baseline（非公開）の WEBAPP_BASELINE.md に従う。
  セッションに無ければ add_repo（read。更新するときは push）で追加して読む。
- 各項目の状態は docs/baseline-status.md に記録する。
- どのアプリにも当てはまる新しい作業・設定・落とし穴が出てきたら、作業の最後に
  ベースラインへの追記案を出す（ユーザーが了承したらベースラインのリポジトリに PR）。
- 独自機能（パターン・キーの上げ下げ・ピアノの音・練習セット・エクスポート/インポート）の変更だけなら追記は不要。

## このアプリの値
- スラッグ: `vocalladder` / ドメイン: `ktkwmr.com` / 言語: en（既定）+ ja（`/ja/`）
- 運営者: ktkwmr / 問い合わせ: GitHub Issues
- Cloudflare Web Analytics token: `5c53079cb9a64d819d1ca53e8533ca63`（ほかのアプリと同じサイト）
- ホスティング: Cloudflare Workers 静的アセット。別 Worker に Route `ktkwmr.com/vocalladder*` だけを割り当てる（ベースライン §0 の A）。
  ドメイン直下（トップページ、`robots.txt`、ルートの `sitemap.xml`、ルートの 404）は `ktkwmr/ktkwmr.com`（Worker `ktkwmr-home`）にある。このアプリの sitemap は `/vocalladder/sitemap.xml`。

## ルール
- 手で編集するのはアプリ本体 `public/vocalladder/index.html`（と `timer.js`・`sw.js`）と `scripts/`。生成ファイル（`public/vocalladder/ja/index.html`、情報ページ `about/`・`privacy/` とその `ja/`、`public/vocalladder/sitemap.xml`）は編集せず、`node scripts/build-ja.mjs` と `node scripts/build-pages.mjs` で作り直す（`--check` で確認）。
- 画面の文言は `index.html` の `I18N`（en / ja）に書き、要素には `data-i18n` / `data-i18n-html` / `data-i18n-attr` を付ける。JS で作る文言は `t()` を使う。子要素を持つ要素に `data-i18n` は付けない（`build-ja.mjs` が止まる）。
- 練習セットは `localStorage` の `vocalladder-state` に保存する。読み込んだ値・インポートしたファイルは `sanitizeSet()` / `sanitizeItem()` で検証してから使う。
- エクスポートはすべてのセットを 1 ファイルにする（`format: "vocalladder-sets"`, `version: 2`, `sets: [...]`）。ほかの人に渡したファイルが読めなくならないよう互換性を保ち、1 セットだけの旧形式（`"vocalladder-set"`, `version: 1`）も読めるようにしておく。項目を変えるときは `version` を上げ、古い形式も `sanitizeItem()` で読めるようにする。インポートは追加のみで、名前と中身が同じセットは読み込まない。
- 記事（ガイド）は未作成。作るときは `scripts/pages/<slug>.mjs` と `build-pages.mjs` の `PAGES`、設定メニューと使い方からのリンクを足し、PR のプレビューで人間が内容を確認してからマージする（ベースライン §10）。
- 外部ホストを足したら `public/_headers` の CSP と、プライバシーの説明（`scripts/pages/privacy.mjs`、アプリ内の `privacy.body`、README）を同じ PR で直す。
- トップページ（https://ktkwmr.com/）のアプリ一覧に載せたら、アプリ名・説明・アイコン・記事を変えたときに `ktkwmr/ktkwmr.com` の `scripts/pages/home.mjs` を直す PR を別に出す（ベースライン §2-16）。
- 作業はブランチ → PR → Cloudflare のプレビュービルド確認 → squash マージ。
- 本番サイト・Cloudflare 管理画面・外部 CDN にはこの環境から届かないことが多い。確かめられなかったことは「未確認」と書き、ユーザーに確認手順を伝える。
