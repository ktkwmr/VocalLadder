// Vocal warm-up scales that move a half step at a time, and how to choose the start and end keys.
// General knowledge: reviewed against the sources listed at the end (docs/article-review.md).
// Note names, ranges, and example settings are computed with the app's own code (scripts/pages/vocal.mjs).
import { PRESETS, noteName } from "./vocal.mjs";
import { wideTable, escapeHtml } from "./layout.mjs";

const note = (s) => {
  const m = /^([A-G])(b?)(\d)$/.exec(s);
  return (+m[3] + 1) * 12 + { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] - (m[2] ? 1 : 0);
};
const preset = (id) => {
  const q = PRESETS.find((x) => x.id === id);
  if (!q) throw new Error(`scripts/pages/warmup-scales.mjs: no built-in pattern "${id}"`);
  return q;
};
const five = preset("five");

// Typical ranges often given for each voice type (they differ a little between sources; see SOURCES)
const VOICES = [
  { en: "Soprano", ja: "ソプラノ", lo: "C4", hi: "C6" },
  { en: "Mezzo-soprano", ja: "メゾソプラノ", lo: "A3", hi: "A5" },
  { en: "Alto", ja: "アルト", lo: "F3", hi: "F5" },
  { en: "Tenor", ja: "テノール", lo: "C3", hi: "C5" },
  { en: "Baritone", ja: "バリトン", lo: "A2", hi: "A4" },
  { en: "Bass", ja: "バス", lo: "E2", hi: "E4" },
];
// Example: Do-Re-Mi-Fa-Sol kept 3 half steps inside the typical range at both ends
const MARGIN = 3;
const example = (v) => {
  const start = note(v.lo) + MARGIN - five.lo, end = note(v.hi) - MARGIN - five.hi;
  return { start, end, lo: start + five.lo, hi: end + five.hi };
};

function voiceTable(lang) {
  const h = lang === "ja"
    ? ["声種", "よく挙げられる音域", "ドレミファソの設定例", "歌う音域"]
    : ["Voice type", "Range often given", "Example for Do-Re-Mi-Fa-Sol", "You sing"];
  const rows = VOICES.map((v) => {
    const x = example(v);
    return `      <tr><th scope="row">${v[lang]}</th><td>${v.lo}–${v.hi}</td><td>${noteName(x.start)} → ${noteName(x.end)}</td><td>${noteName(x.lo)}–${noteName(x.hi)}</td></tr>`;
  });
  return wideTable(lang, `<table>
    <thead><tr>${h.map((x) => `<th scope="col">${x}</th>`).join("")}</tr></thead>
    <tbody>
${rows.join("\n")}
    </tbody>
  </table>`);
}

// How wide each built-in pattern is: the range you sing is the keys plus this
function spanList(lang) {
  return `<ul>
${PRESETS.map((q) => {
  const span = q.hi - q.lo;
  const top = noteName(note("G4") + q.hi);
  return `  <li><b>${escapeHtml(q.name[lang])}</b> – ${lang === "ja" ? `ドから上に ${span} 半音。C4〜G4 のキーで練習すると、一番高い音は ${top}` : `${span} half steps above Do. From C4 to G4, the highest note is ${top}`}</li>`;
}).join("\n")}
</ul>`;
}

// Checked on 2026-10-25 (docs/article-review.md)
const SOURCES = [
  ["https://www.musicnotes.com/blog/determine-vocal-range", "Musicnotes: How To Determine Your Vocal Range"],
  ["https://www.masterclass.com/articles/vocal-range", "MasterClass: vocal range"],
  ["https://operaforall.substack.com/p/understanding-voice-types-voice-types", "Opera for All: Understanding voice types"],
];
const sources = () => `<ul>
${SOURCES.map(([url, title]) => `  <li><a href="${url}" rel="noopener">${title}</a></li>`).join("\n")}
</ul>`;

export default {
  slug: "warmup-scales",
  en: {
    title: "Vocal Warm-up Scales: Moving Up a Half Step and Choosing Your Range",
    heading: "Warm-up scales that move a half step at a time",
    nav: "Warm-up scales and your range",
    description:
      "Why vocal warm-up exercises are repeated a half step higher each time, how to choose the starting and ending keys for your voice, typical ranges for each voice type, and example settings.",
    body: () => `
<p class="lead">In voice lessons and choir rehearsals, a short exercise is often sung, then repeated a half step higher, and again, a little at a time. This article explains how that works and how to choose where to start and stop for your own voice.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#what">The exercise moves, the pattern stays</a></li>
  <li><a href="#why">Why a half step at a time</a></li>
  <li><a href="#range">Keys are not the range you sing</a></li>
  <li><a href="#voices">Typical ranges by voice type</a></li>
  <li><a href="#choose">Choosing the start and end keys</a></li>
  <li><a href="#care">Taking care of your voice</a></li>
  <li><a href="#sources">Sources</a></li>
</ol></nav>

<h2 id="what">The exercise moves, the pattern stays</h2>
<p>A warm-up such as Do-Re-Mi-Fa-Sol-Fa-Mi-Re-Do is sung in one key, then the pianist plays a chord a half step higher and it is sung again in the new key. The shape of the exercise never changes; only its starting note does. Exercises that go down (Sol-Fa-Mi-Re-Do) are also moved down a half step at a time.</p>

<h2 id="why">Why a half step at a time</h2>
<ul>
  <li><b>Small steps.</b> Each repetition is only a little higher than the last, so you approach the top (or bottom) of your range gradually and notice where it starts to get harder.</li>
  <li><b>Easy to stop in time.</b> You can stop, or go back a key, as soon as a note feels strained.</li>
  <li><b>Attention on the sound.</b> Because the pattern stays the same, you can listen to your tone, breath, and vowels instead of the notes.</li>
</ul>
<p>Moving a whole step at a time covers the same range in fewer repetitions, which is useful when time is short.</p>

<h2 id="range">Keys are not the range you sing</h2>
<p>The start and end keys are where Do is. The notes you sing go higher (and sometimes lower) than Do, by as much as the pattern spans:</p>
${spanList("en")}
<p>So for Do-Re-Mi-Fa-Sol from C4 to G4, you sing from C4 up to D5. Vocal Ladder shows the range you sing under the start and end keys.</p>

<h2 id="voices">Typical ranges by voice type</h2>
<p>These are ranges often given for trained voices. Sources differ by a note or two, and every voice is different: use them only as a rough starting point. The example keeps Do-Re-Mi-Fa-Sol ${MARGIN} half steps inside the range at each end.</p>
${voiceTable("en")}
<p class="cap">C4 is middle C. Notes are at their real pitch, as the piano plays them.</p>
<p>Music for men's voices is often written an octave higher than it sounds. Vocal Ladder plays notes at their real pitch, so if you sing the exercise an octave below a written C4, set the start key to C3; the piano then plays in the same octave as you.</p>

<h2 id="choose">Choosing the start and end keys</h2>
<ol>
  <li><b>Start</b> where the exercise is comfortable and easy, a little above the lowest notes you can sing well.</li>
  <li><b>End</b> where the highest note of the exercise is still comfortable. Look at “Notes you sing” under the keys.</li>
  <li><b>Extend gradually.</b> If the last key felt easy, move the end key up a half step next time.</li>
  <li><b>Go both ways.</b> With “Then back to start”, the exercise comes back down after the top, ending where it began.</li>
</ol>

<h2 id="care">Taking care of your voice</h2>
<ul>
  <li>Start with small, easy exercises (Do-Re-Mi, Do-Re-Mi-Fa-Sol) before wide leaps.</li>
  <li>Slow down the tempo for wide patterns, and add a rest between keys if you need a breath.</li>
  <li>Stop if your throat hurts or your voice becomes hoarse. For lasting problems, ask a voice teacher or a doctor.</li>
</ul>
<p>Vocal Ladder only plays the accompaniment: it does not listen to or judge your singing.</p>

<h2 id="sources">Sources</h2>
<p>Ranges by voice type:</p>
${sources()}
`,
  },
  ja: {
    title: "発声練習の音階を半音ずつ上げる理由と、開始・終了の音の決め方",
    heading: "半音ずつ上がる発声練習の音階と、音域の決め方",
    nav: "発声練習の音階と音域の決め方",
    description:
      "発声練習で同じ音階を半音ずつ上げて繰り返す理由、自分の声に合わせた開始キーと終了キーの決め方、声種ごとの音域の目安と設定例をまとめました。",
    body: () => `
<p class="lead">ボイストレーニングや合唱の練習では、短い練習を歌ったあと、半音上げてもう一度、さらにもう一度…と少しずつ高さを変えて繰り返すことがよくあります。この記事では、その仕組みと、自分の声に合わせた始める音・終える音の決め方を説明します。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#what">動くのはキー、パターンは同じ</a></li>
  <li><a href="#why">半音ずつ上げる理由</a></li>
  <li><a href="#range">キーと歌う音域は違う</a></li>
  <li><a href="#voices">声種ごとの音域の目安</a></li>
  <li><a href="#choose">開始キーと終了キーの決め方</a></li>
  <li><a href="#care">のどを大切に</a></li>
  <li><a href="#sources">参考資料</a></li>
</ol></nav>

<h2 id="what">動くのはキー、パターンは同じ</h2>
<p>ドレミファソファミレドのような練習を 1 つのキーで歌い終えると、伴奏者が半音高い和音を弾き、新しいキーでもう一度歌います。練習の形は変わらず、始まりの音だけが変わります。ソファミレドのように下がる練習も、同じように半音ずつ下げていきます。</p>

<h2 id="why">半音ずつ上げる理由</h2>
<ul>
  <li><b>少しずつ近づける。</b>1 回ごとに少しだけ高くなるので、音域の上（または下）の端に少しずつ近づき、どこから難しくなるかに気づけます。</li>
  <li><b>無理をする前にやめられる。</b>苦しいと感じたら、すぐに止めたり、1 キー戻ったりできます。</li>
  <li><b>声そのものに集中できる。</b>パターンが同じなので、音を覚える必要がなく、声の響き・息・母音に耳を向けられます。</li>
</ul>
<p>全音ずつ上げると、同じ範囲を少ない回数で通れます。時間がないときに便利です。</p>

<h2 id="range">キーと歌う音域は違う</h2>
<p>開始キーと終了キーは、ドになる音です。実際に歌う音は、パターンの幅だけドより高く（ときには低く）なります。</p>
${spanList("ja")}
<p>たとえばドレミファソを C4〜G4 のキーで練習すると、歌うのは C4 から D5 までです。Vocal Ladder では、開始キー・終了キーの下に歌う音域を表示します。</p>

<h2 id="voices">声種ごとの音域の目安</h2>
<p>よく挙げられる、訓練を受けた声の音域です。資料によって 1〜2 音違い、声は一人ひとり違うので、あくまで出発点の目安にしてください。設定例は、ドレミファソが音域の上下の端から ${MARGIN} 半音内側に収まるようにしたものです。</p>
${voiceTable("ja")}
<p class="cap">C4 はピアノの真ん中のドです。音名は、ピアノが実際に鳴らす高さで書いています。</p>
<p>男声の楽譜は、実際より 1 オクターブ高く書くことがよくあります。Vocal Ladder は実際の高さで弾くので、楽譜の C4 を 1 オクターブ下で歌う場合は、開始キーを C3 にすると、ピアノも同じ高さで弾きます。</p>

<h2 id="choose">開始キーと終了キーの決め方</h2>
<ol>
  <li><b>開始キー</b>は、練習が楽に歌える高さにします。きれいに出せる一番低い音より少し上が目安です。</li>
  <li><b>終了キー</b>は、練習の一番高い音がまだ楽に出せる高さにします。キーの下の「歌う音域」を見て決めます。</li>
  <li><b>少しずつ広げる。</b>最後のキーが楽だったら、次は終了キーを半音上げます。</li>
  <li><b>行って戻る。</b>「開始まで戻る」をオンにすると、一番上まで行ったあと下りてきて、始めの高さで終わります。</li>
</ol>

<h2 id="care">のどを大切に</h2>
<ul>
  <li>大きな跳躍の前に、小さく楽な練習（ドレミ、ドレミファソ）から始めます。</li>
  <li>幅の広いパターンはテンポを遅くし、息継ぎが必要ならキーの間に休みを入れます。</li>
  <li>のどが痛いとき、声がかれてきたときはやめてください。続くときは、ボイストレーナーや医師に相談してください。</li>
</ul>
<p>Vocal Ladder は伴奏を弾くだけで、歌声を聞いたり評価したりはしません。</p>

<h2 id="sources">参考資料</h2>
<p>声種ごとの音域（英語）：</p>
${sources()}
`,
  },
};
