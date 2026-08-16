# dsh-blackhole

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**閱讀語言：** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md)

![dsh-blackhole demo](demo.gif)

一個基於測地線追蹤的史瓦西**黑洞，懸浮在 DeepSeek Harness (DSH) 之中** ——
面向 DSH Web 介面的常駐客戶端外掛，移植自
[s0xDk/ghostty-blackhole](https://github.com/s0xDk/ghostty-blackhole)（Ghostty
自訂著色器，MIT）。黑洞位於頁面之上的點擊穿透 WebGL2 浮層中：近場的每個像素
都即時積分自己的史瓦西測地線（Binet 形式 `a = -(3/2) h² x / r⁵`），因此陰影、
吸積盤、光子環與重力透鏡全部由光線追蹤自然湧現 —— 沒有一處是畫上去的。

## 渲染內容

- **陰影** — 撞擊參數小於 `b_crit = (3√3/2) r_s` 的光線螺旋墜入事件視界，返回為黑。
- **吸積盤** — 薄克卜勒盤，Shakura–Sunyaev 溫度分布，相對論都卜勒位移與束流
  （`g = √(1 − 1.5 r_s/r)/(1 − β·k̂)`）；遠側弧線越過陰影上方與下方（星際效應即視感）。
- **光子環** — 在 `1.5 r_s` 光子球附近纏繞的光線。
- **重力透鏡** — 開啟選用**星空背景**時，逃逸光線投影到程式生成的星空「天空平面」
  （瀏覽器無法把頁面像素餵給 WebGL）；遠場使用解析弱場偏折並帶輕微色差。
  關閉（預設）時，黑洞直接懸浮在頁面上方：只有陰影、光子環與吸積盤，周圍完全透明。
- **重力時間膨脹** — 黑洞越重，吸積盤條紋隨時間走得越慢。

## 模式

| 模式 | 行為 |
| --- | --- |
| **演示巡遊** | 42 秒自執行展示：從右上角種子長到滿尺寸，同時交叉淡入 8 個調參預設（Inferno → Gargantua → M87* → Ember → Quasar → Blazar → Pure Lens）。 |
| **番茄鐘** | 55/5 牆鐘週期 + 90 秒鍵盤/指標閒置偵測（瀏覽器 `Date.now()` 取代 Ghostty 失效的 `iDate`）。 |
| **上下文** | 上游 token 模式的 DSH 原生類比：無/空白會話 → 無黑洞；黑洞隨對話成長（`1 − e^(−nodes/70)`），填充越多移動越快、範圍越廣。 |
| **手動** | 固定等級 0–100 %。 |

上游調音器與 `ghostty-blackhole-main` 的 15 個吸積盤預設、吸積盤剛性自旋、
帶位置緩動的跟隨指標、**自動外觀**（每 5–20 秒隨機變換吸積盤外觀：隨機預設或
完全隨機的參數，帶平滑過渡）、完整的設定頁（設定 → **Blackhole**，含即時狀態：
模式 / 等級 / FPS / 著色器錯誤）、**星空背景**開關、獨立的黑洞/星空不透明度滑桿，
以及四語言介面（简体中文 / 繁體中文 / 日本語 / English）。底部 10% 工作區永不被
覆蓋；所有狀態僅存於記憶體。

## 用法

安裝後每次 `dsh web` 會話都會自動出現黑洞 —— 無需任何操作。預設：**上下文**模式
（黑洞隨目前會話內容量變化，空白會話時隱藏）、星空背景關閉、底部 10% 受保護。

開啟 設定 → **Blackhole** 即可控制：

- **模式** — 演示巡遊（42 秒預設展示）· 番茄鐘（55/5 + 閒置淡出）· 上下文（對話規模）· 手動（固定等級）· 關閉。
- **預設** — 15 種吸積盤外觀之一；或開啟**自動外觀**，每 5–20 秒隨機切換。
- **尺寸與運動** — 黑洞半徑、最大填充面積、透鏡深度、漂移速度、**自旋速度**（盤+光子環剛性自轉）、工作區、跟隨指標。
- **吸積盤** — 溫度、亮度、不透明度、條紋對比度、星場亮度、曝光、時間膨脹下限。
- **背景** — 被透鏡的星空（預設關閉）。
- **渲染** — 畫質（測地線步數）、獨立的黑洞/星空不透明度。
- **語言** — 简体中文 / 繁體中文 / 日本語 / English。

## 安裝（常駐，每次 `dsh web` 啟動自動載入）

DSH 的 `web` profile 由 bundle 修補層 + 你自己的修補層
`$DSH_HOME/profiles/web/cordis.patch.yml` 組合而成。安裝客戶端外掛 =
新增一個套件 + 一行設定：

```powershell
# 1. 複製到 profile 目錄樹
New-Item -ItemType Directory -Force "$env:USERPROFILE\.dsh\profiles\web\packages"
git clone https://github.com/<you>/dsh-blackhole "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 2. 連結進 profile（在 package.json 記錄相依性）
dsh plugin --profile web add "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 3. 主機端解析錨點（裸套件名從提升的 node_modules 解析；pnpm 只把本機目錄
#    連結進 web/node_modules）
New-Item -ItemType Junction `
  -Path "$env:USERPROFILE\.dsh\profiles\node_modules\dsh-blackhole" `
  -Target "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 4. 新增設定行：把 install/cordis.patch.example.yml 附加到
#    $DSH_HOME/profiles/web/cordis.patch.yml
```

重新啟動 `dsh web`。每次啟動時 `dsh-client-modules` 會把該行的 `dsh.client` 宣告
掃描進 `window.__DSH_BOOT__`，並從 `/plugins/dsh-blackhole/client.js` 提供
bundle —— 無需任何會話操作。

> 第 3 步的 junction 是唯一需要手工維護的部分：當 `dsh plugin add/remove` 其他套件
> 清理了提升的 node_modules 後，請重建它。

### 解除安裝

刪除 `cordis.patch.yml` 中的 `blackhole` 行，然後
`dsh plugin --profile web remove dsh-blackhole`。

## 運作原理

- `package.json` — `dsh.client` 宣告（`platform: web`、`immediately: true`）
  以及模組系統掃描的 `./client` 匯出。
- `lib/index.js` — 主機半部：空操作 `apply`，讓主機 Loader 行得以掛載。
- `lib/client.js` — 瀏覽器 bundle：經典指令碼，註冊
  `window.__ModuleLoader__.load({ id, factory })` 工廠，其匯出即為 Cordis 外掛。
  它只依賴種子模組 `react`，並且像所有官方客戶端外掛一樣宣告
  `inject: ["slots"]` —— 客戶端核心只暴露外掛 `inject` 中列出的服務
  （否則 `ctx.get("slots")` 為 `undefined`）。
- 外掛註冊三個槽位：`shell.overlay`（全螢幕點擊穿透 WebGL2 畫布，order −100）、
  `settings.section`（控制面板）、`conversation.session.header.utilities`
  （空渲染探針，讀取會話快照的 `blank` / `nodes.length` 葉子欄位驅動上下文模式）。
- `blackhole.glsl` 的 GLSL ES 3.00 移植，含兩處刻意改動：
  `gl_FragCoord.y` 轉換為 Ghostty 的**由上而下**約定；結構體回傳三元改為
  if/else —— 因為 ANGLE（D3D11）在 ESSL 3.00 下也禁止對結構體使用 `?:`。

## 致謝與授權

- 著色器物理與示範巡遊：[s0xDk/ghostty-blackhole](https://github.com/s0xDk/ghostty-blackhole)（MIT，© 2026 s13k），參考 Eric Bruneton 的 [black hole shader](https://ebruneton.github.io/black_hole_shader/)。
- 預設數值與跟隨指標思路：[XboxNahida/ghostty-blackhole-main](https://github.com/XboxNahida/ghostty-blackhole-main)（MIT）。
- 模式語意交叉校驗：[962412311/win-ghostty-blackhole](https://github.com/962412311/win-ghostty-blackhole)。

MIT — 見 [LICENSE](LICENSE)。
