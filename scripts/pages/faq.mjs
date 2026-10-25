// Questions and answers. The answers are HTML; build-pages.mjs also puts a plain-text
// copy in the FAQPage structured data.
const EN = [
  {
    q: "Is Vocal Ladder free?",
    a: "Yes. It is free to use, with no sign-up or account.",
  },
  {
    q: "Is anything sent to a server? Does it use the microphone?",
    a: 'No to both. The piano sound is made in your browser, your sets are saved only in your browser, and the app never listens to you. See the <a href="../privacy/">privacy policy</a>.',
  },
  {
    q: "What is the “key” in the start and end keys?",
    a: 'It is the note that is Do (1) in the pattern. Do-Re-Mi-Fa-Sol in the key of C4 is C4-D4-E4-F4-G4. The notes you sing go higher than the key; the app shows the range under the keys. See <a href="../warmup-scales/">warm-up scales and your range</a>.',
  },
  {
    q: "I have a low voice. Which keys should I use?",
    a: 'The piano plays at real pitch, where C4 is middle C. If you sing an octave below the written notes, choose keys an octave lower, for example from C3. See the <a href="../warmup-scales/#voices">typical ranges by voice type</a>.',
  },
  {
    q: "Can I make my own exercise?",
    a: 'Yes. Type the notes as numbers in the notes box (1 to 7 are Do to Ti, 8 is Do an octave up), and save it with “Save this pattern” to use it again. See <a href="../patterns/">writing your own patterns</a>.',
  },
  {
    q: "How do I give a set to a student?",
    a: 'Open ⚙ → Export all sets and send the file. The student opens ⚙ → Import sets in their own Vocal Ladder. The file holds all your sets and saved patterns; importing only adds, and skips sets that are already there. See the <a href="../guide/#share">guide</a>.',
  },
  {
    q: "Can I play only one exercise, or the whole set?",
    a: "Both. With “Continue to the next exercise” off (the default), playing stops at the end of the exercise. Turn it on to play the rest of the set in order.",
  },
  {
    q: "Can I use my sets on another device?",
    a: "Yes, with Export and Import. Sets are saved in the browser where you made them and are not synced automatically.",
  },
  {
    q: "My sets disappeared.",
    a: "Sets are kept in the browser's site data. They are lost if the site data is cleared, in a private window, or, on some browsers, if the site has not been opened for a long time. Keep a copy with Export, and add the app to your home screen to make this less likely.",
  },
  {
    q: "I hear no sound on my iPhone.",
    a: "Check the volume. If it is still silent, turn off silent mode. Then tap Start again.",
  },
  {
    q: "The piano sounds late with Bluetooth earphones.",
    a: "Bluetooth adds a delay to every sound. The timing stays even, but each note comes a little late. Use the device speaker or wired earphones if this bothers you.",
  },
  {
    q: "How do I start over?",
    a: "Open ⚙ → Delete all saved data. Your sets, saved patterns, and settings are deleted, and the app returns to how it looks when first opened. Export first if you want to keep anything.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. After you have opened it once, it works without a connection. You can also add it to your home screen (on an iPhone: Share → Add to Home Screen; on Android, from the browser menu).",
  },
];

const JA = [
  {
    q: "無料ですか？",
    a: "はい。無料で、登録やアカウントも不要です。",
  },
  {
    q: "サーバーに何か送られますか？マイクは使いますか？",
    a: 'どちらも「いいえ」です。ピアノの音はブラウザの中で作り、セットはブラウザの中だけに保存します。アプリが歌声を聞くこともありません。<a href="../privacy/">プライバシーポリシー</a>をご覧ください。',
  },
  {
    q: "開始キー・終了キーの「キー」とは何ですか？",
    a: 'パターンの「ド（1）」になる音です。ドレミファソを C4 のキーで弾くと C4・D4・E4・F4・G4 になります。歌う音はキーより高くなるので、キーの下に歌う音域を表示しています。<a href="../warmup-scales/">発声練習の音階と音域の決め方</a>をご覧ください。',
  },
  {
    q: "声が低いのですが、どのキーにすればいいですか？",
    a: 'ピアノは実際の高さで弾き、C4 がピアノの真ん中のドです。楽譜より 1 オクターブ下で歌う場合は、キーも 1 オクターブ下（たとえば C3 から）にしてください。<a href="../warmup-scales/#voices">声種ごとの音域の目安</a>もご覧ください。',
  },
  {
    q: "自分で練習を作れますか？",
    a: '作れます。音の欄に数字で入力し（1〜7 がド〜シ、8 が 1 オクターブ上のド）、「このパターンを保存」で保存すると、くり返し使えます。<a href="../patterns/">練習パターンの書き方</a>をご覧ください。',
  },
  {
    q: "生徒にセットを渡すには？",
    a: '⚙ の「セットをエクスポート」でファイルを保存して送ります。生徒は自分の Vocal Ladder の ⚙ →「セットをインポート」で読み込みます。ファイルにはすべてのセットとマイパターンが入っています。インポートは追加だけで、すでにあるセットは読み込みません。<a href="../guide/#share">使い方ガイド</a>もご覧ください。',
  },
  {
    q: "1 つの練習だけ、またはセット全体を続けて再生できますか？",
    a: "どちらもできます。「次の練習へ続けて再生」がオフ（初期値）なら、練習の最後で止まります。オンにすると、セットの残りの練習を順に再生します。",
  },
  {
    q: "別の端末でもセットを使えますか？",
    a: "エクスポートとインポートで移せます。セットは作ったブラウザに保存され、自動では同期されません。",
  },
  {
    q: "セットが消えてしまいました。",
    a: "セットはブラウザのサイトデータに保存しています。サイトデータを削除したとき、プライベートモードのとき、ブラウザによっては長い間サイトを開かなかったときに消えます。エクスポートで控えを残し、ホーム画面に追加して使うと消えにくくなります。",
  },
  {
    q: "iPhone で音が出ません。",
    a: "音量を確かめてください。それでも鳴らないときは、消音モードを解除してから、もう一度「スタート」を押してください。",
  },
  {
    q: "Bluetooth のイヤホンだとピアノが遅れて聞こえます。",
    a: "Bluetooth はすべての音を少し遅らせて届けます。リズムは一定のままですが、どの音も少し遅れます。気になるときは、本体のスピーカーか有線のイヤホンを使ってください。",
  },
  {
    q: "最初からやり直すには？",
    a: "⚙ の「保存した情報をすべて削除」を選びます。セット・マイパターン・設定が消え、初めて開いたときの状態に戻ります。残したいものがあれば、先にエクスポートしてください。",
  },
  {
    q: "オフラインで使えますか？",
    a: "はい。一度アプリを開くと、通信なしでも使えます。ホーム画面に追加することもできます（iPhone・iPad は「共有 → ホーム画面に追加」、Android はブラウザのメニューから）。",
  },
];

const list = (items) => `<dl class="faq">\n${items.map((x) => `  <dt>${x.q}</dt>\n  <dd>${x.a}</dd>`).join("\n")}\n</dl>`;

export default {
  slug: "faq",
  faq: true,
  en: {
    title: "Vocal Ladder FAQ",
    heading: "Frequently asked questions",
    nav: "FAQ",
    description:
      "Answers to common questions about Vocal Ladder: what the start and end keys mean, keys for low voices, your own patterns, sharing sets with students, playing a whole set, sound on iPhone, offline use, and privacy.",
    faq: EN,
    body: () => `<p class="lead">Short answers to common questions. For step-by-step instructions, see the <a href="../guide/">guide</a>.</p>\n${list(EN)}`,
  },
  ja: {
    title: "よくある質問（FAQ）",
    heading: "よくある質問",
    nav: "よくある質問",
    description:
      "Vocal Ladder についてのよくある質問。開始キー・終了キーの意味、低い声のキーの選び方、オリジナルのパターン、生徒とのセットの共有、セットの連続再生、iPhone の音、オフライン、プライバシーについて。",
    faq: JA,
    body: () => `<p class="lead">よくある質問への短い回答です。詳しい手順は<a href="../guide/">使い方ガイド</a>をご覧ください。</p>\n${list(JA)}`,
  },
};
