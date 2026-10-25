// How to write your own patterns, and the built-in patterns.
// Every table is computed with the app's own parser and patterns (scripts/pages/vocal.mjs).
import { PRESETS, CUE_BEATS, parse, noteName, solfa } from "./vocal.mjs";
import { escapeHtml } from "./layout.mjs";

const C4 = 60;
const beatsText = (lang, b) => (lang === "ja" ? `${b} 拍` : b === 1 ? "1 beat" : `${b} beats`);
// "Do Re Mi" / "ドレミ" from a pattern
const names = (lang, text) => parse(text).notes.map((n) => solfa(lang, n)).join(lang === "ja" ? " " : " ");
// The notes of a pattern in the key of C4 ("C4 D4 E4 …")
const inC4 = (text) => parse(text).notes.map((n) => (n.rest ? "–" : noteName(C4 + n.semis))).join(" ");
const range = (p) => (p.hi > p.lo ? `${noteName(C4 + p.lo)}–${noteName(C4 + p.hi)}` : noteName(C4 + p.lo));

// What you can write, each with an example worked out by the app's parser
const TOKENS = [
  ["1 2 3 4 5 6 7", { en: "Do Re Mi Fa Sol La Ti of the key", ja: "そのキーのド レ ミ ファ ソ ラ シ" }],
  ["8 9 10 12", { en: "The next octave: 8 is Do, 9 Re, 10 Mi … up to 15", ja: "1 オクターブ上：8 がド、9 がレ、10 がミ…15 まで" }],
  ["b3 #4", { en: "b before a number: a half step lower. # before a number: a half step higher", ja: "数字の前の b：半音下げる。数字の前の #：半音上げる" }],
  ["5, 1'", { en: "“,” after a number: an octave lower. “'”: an octave higher", ja: "数字の後ろの「,」：1 オクターブ下。「'」：1 オクターブ上" }],
  ["1- 1--", { en: "Each “-” after a note makes it one beat longer", ja: "音の後ろの「-」1 つで 1 拍のばす" }],
  ["1/ 1//", { en: "Each “/” after a note makes it half as long", ja: "音の後ろの「/」1 つで半分の長さ" }],
  ["1 r 1", { en: "r is a rest (it can take - and / too). A pattern needs at least one note to sing", ja: "r は休み（- や / も付けられる）。歌う音が 1 つ以上必要" }],
];
function tokenTable(lang) {
  const h = lang === "ja" ? ["書き方", "意味", "C4 のキーで弾く音"] : ["Write", "Meaning", "Played in the key of C4"];
  const rows = TOKENS.map(([text, meaning]) => {
    const p = parse(text);
    const played = p.notes.map((n) => (n.rest ? (lang === "ja" ? "休み" : "rest") : noteName(C4 + n.semis)) + (n.beats !== 1 ? ` (${beatsText(lang, n.beats)})` : "")).join(", ");
    return `      <tr><th scope="row"><code>${escapeHtml(text)}</code></th><td data-label="${h[1]}:">${meaning[lang]}</td><td data-label="${h[2]}:">${played}</td></tr>`;
  });
  return `<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">${h[0]}</th><th scope="col">${h[1]}</th><th scope="col">${h[2]}</th></tr></thead>
    <tbody>
${rows.join("\n")}
    </tbody>
  </table>
</div>`;
}

function presetTable(lang) {
  const h = lang === "ja"
    ? ["パターン", "書き方", "音", "C4 のキーで歌う音域", "1 キーの長さ（和音を含む）"]
    : ["Pattern", "Written as", "Notes", "Range in the key of C4", "One key, with the chord"];
  const rows = PRESETS.map((q) =>
    `      <tr><th scope="row">${escapeHtml(q.name[lang])}</th><td data-label="${h[1]}:"><code>${escapeHtml(q.text)}</code></td><td data-label="${h[2]}:">${names(lang, q.text)}</td><td data-label="${h[3]}:">${range(q)}</td><td data-label="${h[4]}:" class="num">${beatsText(lang, q.keyBeats)}</td></tr>`
  );
  // Stacked into cards on phones (the notes are too long for five columns)
  return `<div class="table-wrap">
  <table class="text stack">
    <thead><tr>${h.map((x) => `<th scope="col">${x}</th>`).join("")}</tr></thead>
    <tbody>
${rows.join("\n")}
    </tbody>
  </table>
</div>`;
}

// Own patterns as examples, worked out the same way
const EXAMPLES = [
  { text: "1 3 5 3 1 3 5 3 1-", en: "Do-Mi-Sol twice, for longer breath", ja: "ドミソを 2 往復。息を長く使う練習に" },
  { text: "5 4 3 2 1 2 3 4 5 4 3 2 1-", en: "Sol down to Do and back, then down again", ja: "ソからドへ下りて戻り、もう一度下りる" },
  { text: "1/ 2/ 3/ 4/ 5/ 4/ 3/ 2/ 1---", en: "A quick five-note run with a long last note", ja: "5 音を速く動いて、最後を長くのばす" },
  { text: "1 b3 5 b3 1-", en: "Do-Mi♭-Sol: a minor arpeggio (the chord before each key is minor too)", ja: "ド・ミ♭・ソの短調のアルペジオ（キーの最初の和音も短調になる）" },
];
function exampleList(lang) {
  return `<ul>
${EXAMPLES.map((x) => {
  const p = parse(x.text);
  const beats = p.notes.reduce((a, n) => a + n.beats, 0) + CUE_BEATS;
  return `  <li><code>${escapeHtml(x.text)}</code> – ${x[lang]}. ${lang === "ja" ? `C4 のキーで ${inC4(x.text)}、1 キー ${beatsText(lang, beats)}。` : `In the key of C4: ${inC4(x.text)}; ${beatsText(lang, beats)} per key.`}</li>`;
}).join("\n")}
</ul>`;
}

export default {
  slug: "patterns",
  en: {
    title: "Writing Your Own Vocal Warm-up Patterns with Numbers",
    heading: "Writing your own warm-up patterns",
    nav: "Writing your own patterns",
    description:
      "How to write vocal warm-up patterns as scale-degree numbers in Vocal Ladder: Do to Ti, the next octave, flats and sharps, longer and shorter notes, and rests, with the built-in patterns and examples.",
    body: () => `
<p class="lead">In Vocal Ladder, an exercise is written as numbers: the degrees of the scale, counted from Do. Because the numbers do not name actual notes, the same pattern works in every key, and the app moves it up or down for you.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#basics">Numbers are scale degrees</a></li>
  <li><a href="#all">Everything you can write</a></li>
  <li><a href="#builtin">The built-in patterns</a></li>
  <li><a href="#examples">Examples of your own patterns</a></li>
  <li><a href="#tips">Tips</a></li>
</ol></nav>

<h2 id="basics">Numbers are scale degrees</h2>
<p><code>1</code> is Do, the note of the key. <code>2</code> to <code>7</code> are Re, Mi, Fa, Sol, La, and Ti of the major scale, and <code>8</code> is Do an octave up. Separate the notes with spaces. So Do-Re-Mi-Fa-Sol-Fa-Mi-Re-Do is <code>1 2 3 4 5 4 3 2 1</code>.</p>
<p>Each number is one beat at the tempo you set. Add <code>-</code> to make a note longer: <code>1 2 3 4 5 4 3 2 1-</code> holds the last Do for two beats.</p>

<h2 id="all">Everything you can write</h2>
${tokenTable("en")}
<p class="cap">Up to two octaves above or below Do. If the app cannot read something, it shows what it could not read, and Start stays off until it is fixed.</p>

<h2 id="builtin">The built-in patterns</h2>
${presetTable("en")}
<p class="cap">“One key” is the 2-beat chord plus the melody. The next key's chord comes right after it.</p>

<h2 id="examples">Examples of your own patterns</h2>
${exampleList("en")}
<p>To keep one, tap <b>Save this pattern</b> and give it a name. It is added at the top of the pattern list for every set and exercise. See the <a href="../guide/#mine">guide</a>.</p>

<h2 id="tips">Tips</h2>
<ul>
  <li><b>Ending:</b> holding the last note for 2 beats (<code>1-</code>) gives you a moment before the next key's chord.</li>
  <li><b>Bars:</b> if the beats of one key, including the 2-beat chord, add up to a multiple of 4, every key starts on the first beat of a bar. Most built-in patterns do.</li>
  <li><b>Minor:</b> a pattern with <code>b3</code> and no <code>3</code> gets a minor chord before each key.</li>
  <li><b>Range:</b> the pattern's lowest and highest notes decide the range you sing. Check the range shown under the start and end keys before you start.</li>
</ul>
`,
  },
  ja: {
    title: "発声練習のパターンを数字で作る方法（ドレミを 1〜8 で）",
    heading: "練習パターンの書き方",
    nav: "練習パターンの書き方",
    description:
      "Vocal Ladder で発声練習のパターンを数字で書く方法。ド〜シと 1 オクターブ上、♭と♯、音の長さ、休みの書き方を、基本のパターンの一覧とオリジナルの例と一緒に説明します。",
    body: () => `
<p class="lead">Vocal Ladder では、練習の音を数字で書きます。数字はドから数えた音階の何番目かを表します。実際の音の名前ではないので、同じパターンをどのキーでも使え、アプリが半音ずつ上げ下げします。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#basics">数字は音階の何番目か</a></li>
  <li><a href="#all">書けることの一覧</a></li>
  <li><a href="#builtin">基本のパターン</a></li>
  <li><a href="#examples">オリジナルのパターンの例</a></li>
  <li><a href="#tips">作るときのコツ</a></li>
</ol></nav>

<h2 id="basics">数字は音階の何番目か</h2>
<p><code>1</code> がド（そのキーの音）、<code>2</code>〜<code>7</code> が長音階のレ・ミ・ファ・ソ・ラ・シ、<code>8</code> が 1 オクターブ上のドです。音と音の間はスペースで区切ります。ドレミファソファミレドは <code>1 2 3 4 5 4 3 2 1</code> です。</p>
<p>数字 1 つが、設定したテンポの 1 拍です。<code>-</code> を付けると長くなります。<code>1 2 3 4 5 4 3 2 1-</code> は最後のドを 2 拍のばします。</p>

<h2 id="all">書けることの一覧</h2>
${tokenTable("ja")}
<p class="cap">ドから上下 2 オクターブまで書けます。読めない書き方があると、読めなかった部分を表示し、直すまで「スタート」は押せません。</p>

<h2 id="builtin">基本のパターン</h2>
${presetTable("ja")}
<p class="cap">「1 キーの長さ」は、最初の和音（2 拍）とメロディーを合わせた長さです。次のキーの和音は、そのすぐ後に入ります。</p>

<h2 id="examples">オリジナルのパターンの例</h2>
${exampleList("ja")}
<p>残しておくときは <b>このパターンを保存</b> を押して名前を付けます。パターンの一番上に追加され、どのセット・練習からも選べます。<a href="../guide/#mine">使い方ガイド</a>もご覧ください。</p>

<h2 id="tips">作るときのコツ</h2>
<ul>
  <li><b>終わり方：</b>最後の音を 2 拍のばす（<code>1-</code>）と、次のキーの和音までひと呼吸おけます。</li>
  <li><b>小節：</b>1 キーの拍数（最初の和音の 2 拍を含む）が 4 の倍数になると、どのキーも小節の頭から始まります。基本のパターンの多くはそうなっています。</li>
  <li><b>短調：</b><code>b3</code> があって <code>3</code> がないパターンでは、キーの最初の和音も短調になります。</li>
  <li><b>音域：</b>パターンの一番低い音と高い音で、歌う音域が決まります。始める前に、開始・終了キーの下に出る音域を確かめてください。</li>
</ul>
`,
  },
};
