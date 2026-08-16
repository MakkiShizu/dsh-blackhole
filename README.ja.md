# dsh-blackhole

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**言語：** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md)

![dsh-blackhole demo](demo.gif)

測地線追跡によるシュワルツシルト**ブラックホールを DeepSeek Harness (DSH) の中に** ——
DSH Web サーフェス向けの常駐クライアントプラグイン。[s0xDk/ghostty-blackhole](https://github.com/s0xDk/ghostty-blackhole)
（Ghostty カスタムシェーダー、MIT）からの移植です。ブラックホールはページの上の
クリックスルー WebGL2 オーバーレイに表示され、近傍の各ピクセルがシュワルツシルト
計量のヌル測地線を自ら積分します（ビネ形式 `a = -(3/2) h² x / r⁵`）。影・降着円盤・
光子リング・重力レンズはすべてレイトレーシングから自然に生まれます — 描き込みは一切ありません。

## 描画内容

- **影** — 衝突パラメータが `b_crit = (3√3/2) r_s` 未満の光線は渦を巻いて事象の地平面へ
  落ち込み、黒く戻ってきます。
- **降着円盤** — Shakura–Sunyaev 温度分布を持つ薄いケプラー円盤。相対論的ドップラー
  シフトとビーミング（`g = √(1 − 1.5 r_s/r)/(1 − β·k̂)`）。遠い側の弧が影の上下を
  越えて回り込みます（インターステラー風の見た目）。
- **光子リング** — `1.5 r_s` の光子球の近くを巻き付く光線。
- **重力レンズ** — オプションの **星空背景** を有効にすると、逃げ出した光線は
  プログラム生成の星空「空平面」に投影されます（ブラウザはページのピクセルを
  WebGL に渡せないため）。遠方では解析的な弱重力偏向とわずかな色収差を使用。
  オフ（既定）ではブラックホールがページの真上に浮かび、影・光子リング・
  降着円盤のみ、周囲は完全に透明です。
- **重力時間遅延** — ブラックホールが重くなるほど、円盤の縞模様はゆっくり進みます。

## モード

| モード | 動作 |
| --- | --- |
| **デモツアー** | 42 秒の自己実行デモ：右上隅の種から最大サイズまで成長し、8 つのチューナープリセットをクロスフェード（Inferno → Gargantua → M87* → Ember → Quasar → Blazar → Pure Lens）。 |
| **ポモドーロ** | 55/5 の時計周期 + 90 秒のキーボード/ポインター無操作検出（ブラウザの `Date.now()` が Ghostty の壊れた `iDate` を置き換え）。 |
| **コンテキスト** | 上流トークンモードの DSH ネイティブ版：セッションなし/空白セッション → 穴なし。会話の成長に合わせて穴が大きくなります（`1 − e^(−nodes/70)`）、充填が進むほど速く・広く動きます。 |
| **マニュアル** | 固定レベル 0–100 %。 |

上流チューナーと `ghostty-blackhole-main` の 15 の降着円盤プリセット、降着円盤の
剛体スピン、位置イージング付きのポインター追従、**自動ルック**（5〜20 秒ごとに
降着円盤の外観をランダム変更：プリセットからランダム、または完全にランダムな
パラメータ、スムーズな遷移付き）、完全な設定ページ（設定 → **Blackhole**、ライブ状態：
モード / レベル / FPS / シェーダーエラー）、**星空背景**トグル、独立した
ブラックホール/星空の不透明度スライダー、4 言語 UI（简体中文 / 繁體中文 / 日本語 /
English）。下部 10% の作業領域は覆われません。状態はすべてメモリ内のみです。

## 使い方

インストール後、`dsh web` のセッションごとにブラックホールが自動的に表示されます —
操作は不要です。既定：**コンテキスト**モード（現在の会話サイズに追従、空白セッションでは非表示）、
星空背景オフ、下部 10% が保護されます。

設定 → **Blackhole** を開いて操作します：

- **モード** — デモツアー（42 秒プリセットショーケース）· ポモドーロ（55/5 + アイドルフェード）· コンテキスト（会話サイズ）· マニュアル（固定レベル）· オフ。
- **プリセット** — 15 の降着円盤ルックの 1 つ。または**自動ルック**を有効にして 5〜20 秒ごとにランダム変更。
- **サイズと動き** — ブラックホール半径、最大充填面積、レンズ深度、ドリフト速度、**スピン速度**（円盤+光子リングの剛体回転）、作業領域、ポインター追従。
- **降着円盤** — 温度、明るさ、不透明度、ストリークコントラスト、星野の明るさ、露出、時間遅延の下限。
- **背景** — レンズ効果の星空（既定オフ）。
- **レンダリング** — 品質（測地線ステップ数）、独立したブラックホール/星空の不透明度。
- **言語** — 简体中文 / 繁體中文 / 日本語 / English。

## インストール（常駐、`dsh web` 起動のたびに自動ロード）

DSH の `web` プロファイルはバンドルパッチ層と、あなた自身のレイヤー
`$DSH_HOME/profiles/web/cordis.patch.yml` から構成されます。クライアントプラグインの
インストール = パッケージを 1 つ追加 + 行を 1 つ設定：

```powershell
# 1. プロファイルツリーにクローン
New-Item -ItemType Directory -Force "$env:USERPROFILE\.dsh\profiles\web\packages"
git clone https://github.com/<you>/dsh-blackhole "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 2. プロファイルにリンク（package.json に依存を記録）
dsh plugin --profile web add "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 3. ホスト側の解決アンカー（ベアパッケージ名はホイストされた node_modules から
#    解決されます。pnpm はローカルディレクトリを web/node_modules にのみリンク）
New-Item -ItemType Junction `
  -Path "$env:USERPROFILE\.dsh\profiles\node_modules\dsh-blackhole" `
  -Target "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 4. 設定行を追加：install/cordis.patch.example.yml を
#    $DSH_HOME/profiles/web/cordis.patch.yml に追記
```

`dsh web` を再起動します。起動のたびに `dsh-client-modules` が行の `dsh.client`
宣言を `window.__DSH_BOOT__` にスキャンし、`/plugins/dsh-blackhole/client.js` から
バンドルを配信します — セッションでの操作は不要です。

> 手順 3 のジャンクションだけは手動メンテナンスが必要です：他のパッケージの
> `dsh plugin add/remove` がホイストされた node_modules を掃除したら再作成してください。

### アンインストール

`cordis.patch.yml` から `blackhole` 行を削除し、次に
`dsh plugin --profile web remove dsh-blackhole` を実行します。

## 仕組み

- `package.json` — `dsh.client` 宣言（`platform: web`、`immediately: true`）と、
  モジュールシステムがスキャンする `./client` エクスポート。
- `lib/index.js` — ホスト側：ホスト Loader の行をマウントさせるための no-op `apply`。
- `lib/client.js` — ブラウザバンドル：クラシックスクリプトで
  `window.__ModuleLoader__.load({ id, factory })` ファクトリを登録し、そのエクスポートが
  Cordis プラグイン。シードモジュール `react` のみを require し、公式クライアント
  プラグイン同様 `inject: ["slots"]` を宣言します — クライアントカーネルはプラグインの
  `inject` に列挙されたサービスのみ公開するためです（そうでなければ
  `ctx.get("slots")` は `undefined`）。
- 3 つのスロットを登録：`shell.overlay`（全画面クリックスルー WebGL2 キャンバス、order −100）、
  `settings.section`（コントロールパネル）、`conversation.session.header.utilities`
  （null 描画のプローブ。会話スナップショットの `blank` / `nodes.length` リーフを読み、
  コンテキストモードを駆動）。
- `blackhole.glsl` の GLSL ES 3.00 移植で、2 つの意図的な変更：
  `gl_FragCoord.y` を Ghostty の**上から下**の規約に変換。構造体を返す三項演算子は
  if/else に書き換え — ANGLE（D3D11）は ESSL 3.00 でも構造体への `?:` を拒否するため。

## クレジットとライセンス

- シェーダー物理とデモツアー：[s0xDk/ghostty-blackhole](https://github.com/s0xDk/ghostty-blackhole)（MIT、© 2026 s13k）、Eric Bruneton の [black hole shader](https://ebruneton.github.io/black_hole_shader/) を参考。
- プリセット値とポインター追従のアイデア：[XboxNahida/ghostty-blackhole-main](https://github.com/XboxNahida/ghostty-blackhole-main)（MIT）。
- モード意味論のクロスチェック：[962412311/win-ghostty-blackhole](https://github.com/962412311/win-ghostty-blackhole)。

MIT — [LICENSE](LICENSE) を参照。
