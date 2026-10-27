// How to use the app. Screenshots: node scripts/render-guide-images.mjs
import { readFileSync } from "node:fs";

const IMAGES = new URL("../../public/vocalladder/images/guide/", import.meta.url);
const SRC = "/vocalladder/images/guide/";

// Width and height from the PNG header, so the page reserves the right space before the image loads
function size(file) {
  const buf = readFileSync(new URL(file, IMAGES));
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

// A screenshot that opens at full size when tapped. half: a 2x screenshot shown at its real size
const img = (lang, name, alt, { half } = {}) => {
  const file = `${lang}-${name}.png`;
  const { w, h } = size(file);
  const style = half ? ` style="max-width:${w / 2}px"` : "";
  return `<a href="${SRC}${file}"><img src="${SRC}${file}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async"${style}></a>`;
};

export default {
  slug: "guide",
  en: {
    title: "How to Use Vocal Ladder: Vocal Warm-up Scales on the Piano",
    heading: "How to use Vocal Ladder",
    nav: "How to use (guide)",
    description:
      "Step-by-step guide to Vocal Ladder: choose a warm-up pattern, the start and end keys, and the tempo, play it a half step higher each time, build practice sets, save your own patterns, and share sets as a file.",
    body: () => `
<p class="lead">Vocal Ladder plays the piano part of a vocal warm-up for you. It plays an exercise such as Do-Re-Mi-Fa-Sol-Fa-Mi-Re-Do, then moves it up (or down) a half step and plays it again, until it reaches the key you chose. This guide walks through every part of the screen.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#quick">Start in three steps</a></li>
  <li><a href="#screen">The screen at a glance</a></li>
  <li><a href="#playing">While it plays</a></li>
  <li><a href="#settings">Pattern, start and end, tempo, piano</a></li>
  <li><a href="#sets">Practice sets</a></li>
  <li><a href="#mine">Saving your own patterns</a></li>
  <li><a href="#share">Sharing sets as a file</a></li>
  <li><a href="#phone">On a phone</a></li>
  <li><a href="#offline">Saving, installing, and offline use</a></li>
</ol></nav>

<h2 id="quick">Start in three steps</h2>
<ol>
  <li><b>Choose an exercise pattern</b>, such as Do-Re-Mi-Fa-Sol.</li>
  <li><b>Choose the start key and the end key.</b> The key is the note that is Do. For example, from C4 (middle C) to G4.</li>
  <li><b>Tap Start.</b> The piano plays a chord, then the melody, and moves up a half step each time until it reaches the end key.</li>
</ol>

<h2 id="screen">The screen at a glance</h2>
<figure class="shot">
  ${img("en", "overview", "Vocal Ladder on a computer: the practice set and its exercises on the left; on the right, the current key C4, the notes of the exercise drawn at their pitch, the row of keys from C4 to G4, the Start button, and the settings below. Numbers 1 to 16 mark the controls.")}
  <figcaption>The numbers match the list below. Tap the image to enlarge it.</figcaption>
</figure>
<ol>
  <li><b>Choose a set</b> – Switch between practice sets, for example by purpose or voice type. The set name is in the box below it.</li>
  <li><b>Exercises</b> – The exercises of the set, in the order they play. Each shows its keys and tempo. Tap one to select it.</li>
  <li><b>Exercise buttons</b> – Add an exercise after the selected one, duplicate it, move it up or down, or delete it.</li>
  <li><b>Title</b> – The exercise's name. If you leave it empty, the name of its pattern is shown.</li>
  <li><b>Current key</b> – The key being played (the note that is Do), which key it is out of how many, and the notes you sing in it.</li>
  <li><b>Notes</b> – The notes of the exercise, drawn at their height. Wider boxes are longer notes. The note being played turns black.</li>
  <li><b>Row of keys</b> – Every key the exercise goes through. Tap one to play from that key.</li>
  <li><b>◀ Key / Start / Key ▶</b> – Start or stop, and go back or forward one key.</li>
  <li><b>Exercise pattern</b> – The built-in patterns, and your own saved patterns at the top.</li>
  <li><b>Notes</b> – The pattern written as numbers. Edit it to make your own.</li>
  <li><b>Start key and end key</b> – From C2 to C6. The text below shows how many keys it goes through and the range you sing.</li>
  <li><b>Half step / Whole step / Then back to start</b> – How far to move each time, and whether to come back the same way.</li>
  <li><b>Tempo</b> – Beats per minute, from 30 to 240. One number in the pattern is one beat.</li>
  <li><b>Piano</b> – Whether to play a chord before each key, whether to play the first key twice, and the rest between keys. The piano always plays the melody with you.</li>
  <li><b>For all exercises</b> – Whether to continue to the next exercise, the sound (piano, or a soft held tone), and the volume.</li>
  <li><b>⚙ Settings</b> – How to use, these guides, export and import, privacy, about, and deleting all saved data.</li>
</ol>

<h2 id="playing">While it plays</h2>
<ul>
  <li>For each key, the piano plays the chord of that key for 2 beats, then the melody. The next key's chord comes right after the last note, so the exercise keeps going in time.</li>
  <li>To repeat a key, tap <b>◀ Key</b>. To skip ahead, tap <b>Key ▶</b>, or tap a key in the row of keys.</li>
  <li>When you stop, the key you were on stays selected, and Start continues from there. To start from the beginning, tap the first key in the row.</li>
  <li>If you change the pattern or the keys while it plays, it starts again from the beginning of the current key. Changing the tempo does not interrupt it.</li>
  <li>With <b>Continue to the next exercise</b> on, the next exercise in the set starts when one ends, so a whole routine plays without touching the screen. When it is off, playing stops at the end of the exercise.</li>
  <li>On a computer: <kbd>Space</kbd> starts and stops, <kbd>←</kbd> <kbd>→</kbd> move one key, and <kbd>↑</kbd> <kbd>↓</kbd> move between exercises.</li>
</ul>

<h2 id="settings">Pattern, start and end, tempo, piano</h2>
<h3>Pattern</h3>
<p>Choose a built-in pattern, or type your own notes as numbers: <code>1</code>–<code>7</code> are Do to Ti, <code>8</code> is Do an octave up, and a <code>-</code> after a number makes it one beat longer. See <a href="../patterns/">writing your own patterns</a> for everything you can write.</p>
<h3>Start and end</h3>
<p>The start key and the end key are the note that is Do. If the end is higher than the start, the exercise goes up; if it is lower, it goes down. The text under them shows the notes you actually sing, which is wider than the keys: Do-Re-Mi-Fa-Sol from C4 to G4 goes up to D5. See <a href="../warmup-scales/">warm-up scales and your range</a> for how to choose.</p>
<ul>
  <li><b>Whole step</b> moves two half steps each time, so it covers the same range in fewer keys.</li>
  <li><b>Then back to start</b> goes to the end key and comes back down the same way.</li>
</ul>
<h3>Tempo and piano</h3>
<ul>
  <li><b>Tempo</b> counts beats per minute. The default is 120. Slow it down for wide leaps or when you are just starting.</li>
  <li><b>Chord before each key</b> plays the key's chord (Do-Mi-Sol with a bass note) for 2 beats, so you hear the new key before you sing.</li>
  <li><b>First key twice (listen, then sing)</b> plays the first key one extra time before you sing, as in a lesson where the teacher plays the exercise first. “♪ Listen” shows while it plays. Then the same key comes again for you to sing, and the exercise goes on as usual.</li>
  <li><b>Rest between keys</b> adds silent beats before the next key, for a breath.</li>
</ul>

<h2 id="sets">Practice sets</h2>
<ul>
  <li>A practice set is a list of exercises. Make as many as you like, by purpose, voice type, or day, with <b>+ New set</b>, and type its name in the set name box.</li>
  <li><b>+ Add exercise</b> adds one after the selected exercise, with the same keys and tempo, so a series is quick to build.</li>
  <li>To delete a set, tap <b>Delete set</b> twice within 4 seconds.</li>
</ul>

<h2 id="mine">Saving your own patterns</h2>
<ul>
  <li>Type your own notes in the notes box, tap <b>Save this pattern</b>, and give it a name. It goes to the top of the pattern list as one of your patterns, and you can choose it in any set and exercise.</li>
  <li>Saving with the name of a pattern you already saved overwrites that pattern.</li>
  <li>Choose a saved pattern to <b>Rename</b> it or <b>Delete pattern</b> (tap twice). Exercises that use a deleted pattern keep their notes.</li>
</ul>

<h2 id="share">Sharing sets as a file</h2>
<ol>
  <li>Open ⚙ and choose <b>Export all sets</b>. All your sets and saved patterns are saved in one small file (a .json file). On an iPhone, the share menu opens instead.</li>
  <li>Send the file by email or a chat app.</li>
  <li>Whoever receives it opens Vocal Ladder, opens ⚙, chooses <b>Import sets</b>, and picks the file. The sets and patterns are added; nothing they already have is replaced, and sets they already have are skipped.</li>
</ol>
<p>The same steps move your sets to another device of your own. As one example of sharing, a voice teacher can put a week's warm-ups in a set and send the file to students.</p>

<h2 id="phone">On a phone</h2>
<figure class="shot phone">
  ${img("en", "phone", "Vocal Ladder on a phone: the title box, the current key C4, the notes drawn at their pitch, the row of keys, and the Start button.", { half: true })}
  <figcaption>On a phone, the player comes first. The practice set, the exercise list, and the settings for all exercises are further down the page.</figcaption>
</figure>
<p>While it plays, the app asks the phone to keep the screen on. If you hear nothing on an iPhone, check the volume, and turn off silent mode if it is on.</p>

<h2 id="offline">Saving, installing, and offline use</h2>
<ul>
  <li>Your sets and patterns are saved in this browser on this device. They are not sent anywhere. Use Export to keep a copy or to move them to another device.</li>
  <li>⚙ → <b>Delete all saved data</b> returns the app to how it looks when first opened.</li>
  <li>To use it like an app, add it to your home screen: on an iPhone, Share → Add to Home Screen; on Android or a computer, use “Install app” in the browser menu. After you have opened it once, it also works offline.</li>
</ul>
`,
  },
  ja: {
    title: "Vocal Ladder の使い方：発声練習の音階をピアノで半音ずつ",
    heading: "Vocal Ladder の使い方",
    nav: "使い方ガイド",
    description:
      "Vocal Ladder の使い方。練習パターン・開始と終了のキー・テンポを選んで半音ずつ上げながら再生する方法、練習セットの作り方、マイパターンの保存、ファイルでのセットの共有を、画面写真付きで説明します。",
    body: () => `
<p class="lead">Vocal Ladder は、発声練習のピアノ伴奏を代わりに弾くアプリです。「ドレミファソファミレド」などの練習を弾き、半音ずつ上げて（または下げて）、選んだキーまで繰り返します。このガイドでは、画面の各部分を順に説明します。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#quick">3 ステップではじめる</a></li>
  <li><a href="#screen">画面の見方</a></li>
  <li><a href="#playing">再生中の操作</a></li>
  <li><a href="#settings">パターン・開始と終了・テンポ・ピアノ</a></li>
  <li><a href="#sets">練習セット</a></li>
  <li><a href="#mine">オリジナルのパターンを保存する</a></li>
  <li><a href="#share">セットをファイルで共有する</a></li>
  <li><a href="#phone">スマホで使う</a></li>
  <li><a href="#offline">保存・インストール・オフライン</a></li>
</ol></nav>

<h2 id="quick">3 ステップではじめる</h2>
<ol>
  <li><b>練習パターンを選ぶ</b>（例：ドレミファソ）。</li>
  <li><b>開始キーと終了キーを選ぶ。</b>キーはドになる音です。例：C4（真ん中のド）から G4 まで。</li>
  <li><b>「スタート」を押す。</b>ピアノが和音とメロディーを弾き、半音ずつ上がって終了キーまで続けます。</li>
</ol>

<h2 id="screen">画面の見方</h2>
<figure class="shot">
  ${img("ja", "overview", "パソコンで開いた Vocal Ladder：左に練習セットと練習の一覧、右に現在のキー C4、音の高さに並べた練習の音、C4 から G4 までのキーの一覧、スタートボタン、その下に設定。1〜16 の番号が各部分を示している。")}
  <figcaption>番号は下の一覧と対応しています。画像を押すと拡大できます。</figcaption>
</figure>
<ol>
  <li><b>セットを選ぶ</b> – 練習セットを切り替えます（目的ごと・声種ごとなど）。下の欄がセットの名前です。</li>
  <li><b>練習</b> – セットの練習を、再生する順に並べています。それぞれのキーとテンポも表示します。押すと選択します。</li>
  <li><b>練習のボタン</b> – 選択中の練習の後ろに追加、複製、上下に移動、削除します。</li>
  <li><b>タイトル</b> – 練習の名前です。空欄なら、パターンの名前を表示します。</li>
  <li><b>現在のキー</b> – 弾いているキー（ドになる音）、全部で何キー中の何番目か、そのキーで歌う音域です。</li>
  <li><b>音</b> – 練習の音を高さの位置に並べています。横に長いほど長い音です。弾いている音が黒くなります。</li>
  <li><b>キーの一覧</b> – 練習が通るすべてのキーです。押すと、そのキーから再生します。</li>
  <li><b>◀ キー／スタート／キー ▶</b> – 再生と停止、1 キー戻る・進む。</li>
  <li><b>練習パターン</b> – 基本のパターンと、一番上に保存したマイパターンが並びます。</li>
  <li><b>音</b> – パターンを数字で書いたものです。書き換えるとオリジナルのパターンになります。</li>
  <li><b>開始キーと終了キー</b> – C2〜C6 から選びます。下に、通るキーの数と歌う音域を表示します。</li>
  <li><b>半音ずつ／全音ずつ／開始まで戻る</b> – 1 回に動く幅と、同じ道を戻ってくるかどうか。</li>
  <li><b>テンポ</b> – 1 分あたりの拍数（30〜240）。パターンの数字 1 つが 1 拍です。</li>
  <li><b>ピアノ</b> – キーごとに最初に和音を弾くか、最初のキーを 2 回弾くか、キーの間の休み。メロディーはいつも一緒に弾きます。</li>
  <li><b>すべての練習に共通</b> – 次の練習へ続けて再生するか、音色（ピアノ／やわらかい音）、音量。</li>
  <li><b>⚙ 設定</b> – 使い方、このガイド、エクスポートとインポート、プライバシー、このアプリについて、保存した情報の削除。</li>
</ol>

<h2 id="playing">再生中の操作</h2>
<ul>
  <li>キーごとに、ピアノはそのキーの和音を 2 拍弾いてからメロディーを弾きます。次のキーの和音は最後の音のすぐ後に入るので、リズムに乗ったまま続きます。</li>
  <li>同じキーをもう一度練習するときは <b>◀ キー</b>、先へ進むときは <b>キー ▶</b> か、キーの一覧のキーを押します。</li>
  <li>止めると、そのときのキーが選ばれたまま残り、「スタート」でそこから続けられます。最初からにするときは、キーの一覧の最初のキーを押します。</li>
  <li>再生中にパターンやキーを変えると、そのキーの最初から弾き直します。テンポは変えても止まりません。</li>
  <li><b>次の練習へ続けて再生</b> がオンなら、練習が終わるとセットの次の練習が始まるので、画面に触れずに最後まで通せます。オフなら、その練習の最後で止まります。</li>
  <li>パソコンでは、<kbd>Space</kbd> で再生と停止、<kbd>←</kbd> <kbd>→</kbd> で 1 キー移動、<kbd>↑</kbd> <kbd>↓</kbd> で練習を移動できます。</li>
</ul>

<h2 id="settings">パターン・開始と終了・テンポ・ピアノ</h2>
<h3>パターン</h3>
<p>基本のパターンから選ぶか、音を数字で入力します。<code>1</code>〜<code>7</code> がド〜シ、<code>8</code> が 1 オクターブ上のド、数字の後ろの <code>-</code> で 1 拍のばします。書けることの一覧は<a href="../patterns/">練習パターンの書き方</a>をご覧ください。</p>
<h3>開始と終了</h3>
<p>開始キーと終了キーは、ドになる音です。終了が開始より高ければ上がり、低ければ下がります。下の説明に、実際に歌う音域が出ます。キーより広く、たとえばドレミファソを C4〜G4 で練習すると、一番高い音は D5 です。決め方は<a href="../warmup-scales/">発声練習の音階と音域の決め方</a>をご覧ください。</p>
<ul>
  <li><b>全音ずつ</b> は 1 回に半音 2 つ分動くので、同じ範囲を少ないキーで通れます。</li>
  <li><b>開始まで戻る</b> は、終了キーまで行ったあと、同じ道を戻ってきます。</li>
</ul>
<h3>テンポとピアノ</h3>
<ul>
  <li><b>テンポ</b> は 1 分あたりの拍数です。初期値は 120 です。跳躍の大きい練習や、慣れないうちは遅くします。</li>
  <li><b>キーごとに最初に和音</b> は、そのキーの和音（ドミソと低い音）を 2 拍弾きます。歌う前に新しいキーが分かります。</li>
  <li><b>最初のキーを 2 回（聴いてから歌う）</b> は、歌い始める前に最初のキーをもう 1 回弾きます。レッスンで先生がまず弾いてみせるのと同じ形です。この 1 回目のあいだは「♪ 聴く」と表示します。続けて同じキーをもう一度弾くので、そこから歌い、あとはいつもどおり進みます。</li>
  <li><b>キーの間の休み</b> は、次のキーの前に休みの拍を入れます。息継ぎに使います。</li>
</ul>

<h2 id="sets">練習セット</h2>
<ul>
  <li>練習セットは、練習を並べたものです。目的ごと・声種ごと・日ごとなど、<b>＋ 新しいセット</b> でいくつでも作れます。セットの名前の欄に名前を入れます。</li>
  <li><b>＋ 練習の追加</b> は、選択中の練習の後ろに、同じキーとテンポで練習を足します。続けて作るときに便利です。</li>
  <li>セットを削除するときは、<b>セットを削除</b> を 4 秒以内に 2 回押します。</li>
</ul>

<h2 id="mine">オリジナルのパターンを保存する</h2>
<ul>
  <li>音の欄にオリジナルの音を入力して <b>このパターンを保存</b> を押し、名前を付けます。パターンの一番上に「マイパターン」として並び、どのセット・練習からも選べます。</li>
  <li>すでに保存した名前で保存すると、そのパターンを上書きします。</li>
  <li>マイパターンを選ぶと <b>名前を変更</b> と <b>パターンを削除</b>（2 回押す）が出ます。削除しても、そのパターンを使っていた練習の音は残ります。</li>
</ul>

<h2 id="share">セットをファイルで共有する</h2>
<ol>
  <li>⚙ の <b>セットをエクスポート</b> を選びます。すべてのセットとマイパターンが、1 つの小さなファイル（.json）に保存されます。iPhone では共有メニューが開きます。</li>
  <li>ファイルをメールやチャットアプリで送ります。</li>
  <li>受け取った人は Vocal Ladder を開き、⚙ の <b>セットをインポート</b> でファイルを選びます。セットとマイパターンが追加されます。今あるものは置き換えず、同じセットがすでにあれば読み込みません。</li>
</ol>
<p>自分の別の端末にセットを移すときも同じ手順です。共有の使い方の一例として、ボーカルレッスンの先生がその週の発声練習をセットにして、生徒にファイルで渡すこともできます。</p>

<h2 id="phone">スマホで使う</h2>
<figure class="shot phone">
  ${img("ja", "phone", "スマホで開いた Vocal Ladder：タイトルの欄、現在のキー C4、音の高さに並べた練習の音、キーの一覧、スタートボタン。", { half: true })}
  <figcaption>スマホでは、プレーヤーが上に来ます。練習セット・練習の一覧・すべての練習に共通の設定は、ページの下のほうにあります。</figcaption>
</figure>
<p>再生中は、画面が消えないようにスマホに頼みます。iPhone で音が出ないときは、音量を確かめ、消音モードになっていれば解除してください。</p>

<h2 id="offline">保存・インストール・オフライン</h2>
<ul>
  <li>セットとマイパターンは、この端末のこのブラウザに保存されます。どこにも送られません。控えを残したり別の端末に移したりするときは、エクスポートを使います。</li>
  <li>⚙ の <b>保存した情報をすべて削除</b> で、初めて開いたときの状態に戻ります。</li>
  <li>アプリのように使うには、ホーム画面に追加します。iPhone は「共有 → ホーム画面に追加」、Android やパソコンはブラウザのメニューの「アプリをインストール」です。一度開けば、オフラインでも使えます。</li>
</ul>
`,
  },
};
