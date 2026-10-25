// Operator information (site information page, linked from the footer)
const ISSUES = "https://github.com/ktkwmr/VocalLadder/issues";
const REPO = "https://github.com/ktkwmr/VocalLadder";

export default {
  slug: "about",
  schemaType: "AboutPage",
  modified: "2026-10-25",
  en: {
    title: "About This Site",
    heading: "About this site",
    nav: "About this site",
    description: "Operator information for Vocal Ladder: who runs the site, how to contact us, disclaimer, and copyright.",
    body: () => `
<div class="table-wrap">
  <table class="text stack">
    <tbody>
      <tr><th scope="row">Site name</th><td>Vocal Ladder</td></tr>
      <tr><th scope="row">URL</th><td><a href="/vocalladder/">https://ktkwmr.com/vocalladder/</a></td></tr>
      <tr><th scope="row">Operator</th><td>ktkwmr (individual developer)</td></tr>
      <tr><th scope="row">What we offer</th><td>A free web app for vocal warm-ups: a piano plays singing exercises and moves them up or down a half step at a time</td></tr>
      <tr><th scope="row">Contact</th><td><a href="${ISSUES}" rel="noopener">GitHub Issues</a></td></tr>
    </tbody>
  </table>
</div>

<h2 id="contact">Contact</h2>
<p>For questions, bug reports, and suggestions, please open an issue on <a href="${ISSUES}" rel="noopener">GitHub Issues</a>. A GitHub account (free) is required.</p>
<p>Issues are public. Do not include personal information. If an exercise plays wrongly, the notes and settings (for example <code>1 2 3 4 5 4 3 2 1--, C4 to G4, 100 BPM</code>), your browser, and your device are enough. You can also attach an exported set.</p>

<h2 id="disclaimer">Disclaimer</h2>
<ul>
  <li>We try to make the app accurate, but we do not guarantee that its notes, timing, sounds, or the information on this site are correct or complete. Timing can vary with your device, browser, and Bluetooth headphones or speakers.</li>
  <li>The app plays accompaniment only and does not teach or judge your singing. Warm up within a comfortable range, and stop if your voice hurts or feels tired. For vocal problems, ask a voice teacher or a doctor.</li>
  <li>We are not responsible for any loss or damage resulting from the use of this site.</li>
  <li>Links to other websites are provided for convenience. We are not responsible for their content.</li>
  <li>The content of this site may be changed or removed, and the service may be stopped, without notice.</li>
</ul>

<h2 id="copyright">Copyright</h2>
<ul>
  <li>The app's source code is published under the <a href="${REPO}/blob/main/LICENSE" rel="noopener">MIT License</a>. Libraries used by the app are listed under Settings → About in the app.</li>
  <li>The text and images on this site are © 2026 ktkwmr.</li>
</ul>

<h2 id="privacy">Privacy</h2>
<p>How this site handles information is described in the <a href="../privacy/">privacy policy</a>.</p>
`,
  },
  ja: {
    title: "運営者情報",
    heading: "運営者情報",
    nav: "運営者情報",
    description: "Vocal Ladder の運営者情報。運営者、お問い合わせ先、免責事項、著作権について。",
    body: () => `
<div class="table-wrap">
  <table class="text stack">
    <tbody>
      <tr><th scope="row">サイト名</th><td>Vocal Ladder</td></tr>
      <tr><th scope="row">URL</th><td><a href="/vocalladder/ja/">https://ktkwmr.com/vocalladder/ja/</a></td></tr>
      <tr><th scope="row">運営者</th><td>ktkwmr（個人開発者）</td></tr>
      <tr><th scope="row">内容</th><td>発声練習のパターンをピアノで弾き、半音ずつ上げ下げして伴奏する、無料の発声練習 Web アプリ</td></tr>
      <tr><th scope="row">お問い合わせ</th><td><a href="${ISSUES}" rel="noopener">GitHub の Issues</a></td></tr>
    </tbody>
  </table>
</div>

<h2 id="contact">お問い合わせ</h2>
<p>ご質問・不具合の報告・ご要望は、<a href="${ISSUES}" rel="noopener">GitHub の Issues</a> にお寄せください。投稿には GitHub のアカウント（無料）が必要です。</p>
<p>Issues の内容は公開されます。個人情報は書かないでください。練習の再生がおかしいときは、音と設定（例: <code>1 2 3 4 5 4 3 2 1--・C4〜G4・テンポ 100</code>）とブラウザ・端末の種類があれば十分です。エクスポートしたセットを添付していただいてもかまいません。</p>

<h2 id="disclaimer">免責事項</h2>
<ul>
  <li>アプリの内容はできるだけ正確になるよう努めていますが、音の高さ・リズム・音色・本サイトの情報が正確・完全であることを保証するものではありません。リズムのずれ方は、端末・ブラウザ・Bluetooth のイヤホンやスピーカーによって変わることがあります。</li>
  <li>このアプリは伴奏を弾くだけで、歌い方の指導や評価はしません。無理のない音域で練習し、のどに痛みや疲れを感じたら中止してください。声の不調は、ボイストレーナーや医師にご相談ください。</li>
  <li>本サイトの利用によって生じた損害について、運営者は責任を負いません。</li>
  <li>本サイトからリンクしている外部サイトの内容について、運営者は責任を負いません。</li>
  <li>本サイトの内容は、予告なく変更・削除したり、提供を終了したりすることがあります。</li>
</ul>

<h2 id="copyright">著作権</h2>
<ul>
  <li>アプリのソースコードは <a href="${REPO}/blob/main/LICENSE" rel="noopener">MIT ライセンス</a>で公開しています。アプリが使用しているライブラリは、アプリの「設定 → このアプリについて」に掲載しています。</li>
  <li>本サイトの文章と画像の著作権は ktkwmr に帰属します（© 2026 ktkwmr）。</li>
</ul>

<h2 id="privacy">プライバシー</h2>
<p>本サイトでの情報の取り扱いについては<a href="../privacy/">プライバシーポリシー</a>をご覧ください。</p>
`,
  },
};
