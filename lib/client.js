// dsh-blackhole client bundle. Loaded by the shell module system as a classic
// script; it only REGISTERS this factory. Materialization (factory(require))
// returns the plugin object the vendored cordis Loader mounts into the client.
//
// The effect: a geodesic-traced Schwarzschild black hole (ported from
// s0xDk/ghostty-blackhole, blackhole.glsl, MIT) rendered by WebGL2 on a
// click-through fullscreen overlay above the DSH page, driven by four modes
// (demo / pomodoro / context / manual) and 15 presets.
window.__ModuleLoader__.load({
	id: "dsh-blackhole",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");

		function apply(ctx) {
			try {
				const slots = ctx.get("slots");
				if (slots === undefined) return;
				const h = React.createElement;
				const locale = ctx.get("locale");

				// ---------------- i18n: zh-CN / zh-TW / ja / en ----------------
				// DSH's locale preference only ships zh/en, so the plugin owns its
				// own four dictionaries; the settings page carries a language
				// selector, defaulting to the DSH locale (zh -> 简体中文).
				const I18N = {
					"zh-CN": {
						nav: "黑洞", title: "黑洞",
						sub: "由 s0xDk/ghostty-blackhole 移植的史瓦西黑洞（实时追踪史瓦西测地线）。它悬浮在页面之上，底部工作区永不被遮挡。",
						running: "运行中 · {mode} · {level} · {fps} fps", hidden: "隐藏（无会话）",
						gDrive: "驱动", gPreset: "预设", gSize: "尺寸与运动", gDisk: "吸积盘", gBg: "背景", gRender: "渲染", gAuto: "自动外观",
						fAuto: "随机变换外观", autoPreset: "随机预设", autoRandom: "随机参数", custom: "自定义",
						nAuto: "开启后每 5–20 秒随机更换一次吸积盘外观：「随机预设」从 15 个预设中随机挑选，「随机参数」生成完全随机的吸积盘参数。",
						modeDemo: "演示巡游 — 42 秒预设循环", modePomodoro: "番茄钟 — 55/5 墙钟", modeContext: "上下文 — 对话规模", modeManual: "手动 — 固定等级", modeOff: "关闭",
						mlDemo: "演示巡游", mlPomodoro: "番茄钟", mlContext: "上下文", mlManual: "手动", mlOff: "关闭",
						fLevel: "手动等级", fHoleRadius: "黑洞半径", fMaxArea: "最大填充面积", fLensDepth: "透镜深度", fDrift: "漂移速度", fWorkArea: "工作区（底部）", fFollow: "跟随指针",
						fTemp: "吸积盘温度", fGain: "吸积盘亮度", fOpacity: "吸积盘不透明度", fContrast: "条纹对比度", fStar: "星场亮度", fExposure: "曝光", fDilation: "时间膨胀下限",
						fQuality: "画质", fHoleOpacity: "黑洞不透明度", fSkyOpacity: "星空背景不透明度", fSky: "星空背景", fLang: "语言", fPresetLook: "吸积盘外观", fMode: "模式", fSpin: "自旋速度", wallClock: "墙钟",
						qLow: "低 — 24 步测地线积分", qMed: "中 — 48 步", qHigh: "高 — 72 步",
						reset: "重置默认值",
						nContext: "无会话或空白会话 → 无黑洞。会话节点数：{n} → 填充约 {pct}%。新会话在右上角种下小种子。",
						nPomodoro: "工作 55 分钟期间逐渐变大，5 分钟休息期间保持小尺寸；90 秒无键盘/指针操作后缩小。",
						nDemo: "自运行演示：从可见种子长到满尺寸，同时巡游调参预设（Inferno → Gargantua → M87* → Ember → Quasar → Blazar → Pure Lens）。",
						nOff: "效果已隐藏，浮层完全透明。",
						nSky: "关闭（默认）：黑洞悬浮在页面之上 —— 仅阴影、光子环与吸积盘，周围完全透明。开启：被透镜的程序化星空盘（原版 Ghostty 风格）回归。",
						footer: "常驻 Web 插件（dsh-blackhole）。状态仅存于内存，不持久化。致谢：s0xDk/ghostty-blackhole（MIT）、XboxNahida/ghostty-blackhole-main、962412311/win-ghostty-blackhole；物理参考 Eric Bruneton 的黑洞着色器。",
					},
					"zh-TW": {
						nav: "黑洞", title: "黑洞",
						sub: "由 s0xDk/ghostty-blackhole 移植的史瓦西黑洞（即時追蹤史瓦西測地線）。它懸浮在頁面之上，底部工作區永不被遮擋。",
						running: "執行中 · {mode} · {level} · {fps} fps", hidden: "隱藏（無會話）",
						gDrive: "驅動", gPreset: "預設", gSize: "尺寸與運動", gDisk: "吸積盤", gBg: "背景", gRender: "渲染", gAuto: "自動外觀",
						fAuto: "隨機變換外觀", autoPreset: "隨機預設", autoRandom: "隨機參數", custom: "自訂",
						nAuto: "開啟後每 5–20 秒隨機更換一次吸積盤外觀：「隨機預設」從 15 個預設中隨機挑選，「隨機參數」產生完全隨機的吸積盤參數。",
						modeDemo: "演示巡遊 — 42 秒預設循環", modePomodoro: "番茄鐘 — 55/5 牆鐘", modeContext: "上下文 — 對話規模", modeManual: "手動 — 固定等級", modeOff: "關閉",
						mlDemo: "演示巡遊", mlPomodoro: "番茄鐘", mlContext: "上下文", mlManual: "手動", mlOff: "關閉",
						fLevel: "手動等級", fHoleRadius: "黑洞半徑", fMaxArea: "最大填充面積", fLensDepth: "透鏡深度", fDrift: "漂移速度", fWorkArea: "工作區（底部）", fFollow: "跟隨指標",
						fTemp: "吸積盤溫度", fGain: "吸積盤亮度", fOpacity: "吸積盤不透明度", fContrast: "條紋對比度", fStar: "星場亮度", fExposure: "曝光", fDilation: "時間膨脹下限",
						fQuality: "畫質", fHoleOpacity: "黑洞不透明度", fSkyOpacity: "星空背景不透明度", fSky: "星空背景", fLang: "語言", fPresetLook: "吸積盤外觀", fMode: "模式", fSpin: "自旋速度", wallClock: "牆鐘",
						qLow: "低 — 24 步測地線積分", qMed: "中 — 48 步", qHigh: "高 — 72 步",
						reset: "重設預設值",
						nContext: "無會話或空白會話 → 無黑洞。會話節點數：{n} → 填充約 {pct}%。新會話在右上角種下小種子。",
						nPomodoro: "工作 55 分鐘期間逐漸變大，5 分鐘休息期間保持小尺寸；90 秒無鍵盤/指標操作後縮小。",
						nDemo: "自執行展示：從可見種子長到滿尺寸，同時巡遊調參預設（Inferno → Gargantua → M87* → Ember → Quasar → Blazar → Pure Lens）。",
						nOff: "效果已隱藏，浮層完全透明。",
						nSky: "關閉（預設）：黑洞懸浮在頁面之上 —— 僅陰影、光子環與吸積盤，周圍完全透明。開啟：被透鏡的程式化星空盤（原版 Ghostty 風格）回歸。",
						footer: "常駐 Web 外掛（dsh-blackhole）。狀態僅存於記憶體，不持久化。致謝：s0xDk/ghostty-blackhole（MIT）、XboxNahida/ghostty-blackhole-main、962412311/win-ghostty-blackhole；物理參考 Eric Bruneton 的黑洞著色器。",
					},
					"ja": {
						nav: "ブラックホール", title: "ブラックホール",
						sub: "s0xDk/ghostty-blackhole を移植したシュワルツシルトブラックホール（測地線をリアルタイム追跡）。ページの上に浮かび、下部の作業領域を覆うことはありません。",
						running: "実行中 · {mode} · {level} · {fps} fps", hidden: "非表示（セッションなし）",
						gDrive: "駆動", gPreset: "プリセット", gSize: "サイズと動き", gDisk: "降着円盤", gBg: "背景", gRender: "レンダリング", gAuto: "自動ルック",
						fAuto: "外観をランダム変更", autoPreset: "プリセットからランダム", autoRandom: "ランダムパラメータ", custom: "カスタム",
						nAuto: "有効にすると 5〜20 秒ごとに降着円盤の外観をランダムに変更します。「プリセットからランダム」は 15 個のプリセットから選択、「ランダムパラメータ」は完全にランダムなパラメータを生成します。",
						modeDemo: "デモツアー — 42秒プリセットループ", modePomodoro: "ポモドーロ — 55/5 時計", modeContext: "コンテキスト — 会話サイズ", modeManual: "マニュアル — 固定レベル", modeOff: "オフ",
						mlDemo: "デモツアー", mlPomodoro: "ポモドーロ", mlContext: "コンテキスト", mlManual: "マニュアル", mlOff: "オフ",
						fLevel: "マニュアルレベル", fHoleRadius: "ブラックホール半径", fMaxArea: "最大充填面積", fLensDepth: "レンズ深度", fDrift: "ドリフト速度", fWorkArea: "作業領域（下部）", fFollow: "ポインター追従",
						fTemp: "降着円盤の温度", fGain: "降着円盤の明るさ", fOpacity: "降着円盤の不透明度", fContrast: "ストリークコントラスト", fStar: "星野の明るさ", fExposure: "露出", fDilation: "時間遅延の下限",
						fQuality: "品質", fHoleOpacity: "ブラックホールの不透明度", fSkyOpacity: "星空背景の不透明度", fSky: "星空背景", fLang: "言語", fPresetLook: "降着円盤の外観", fMode: "モード", fSpin: "スピン速度", wallClock: "時計",
						qLow: "低 — 24 ステップの測地線積分", qMed: "中 — 48 ステップ", qHigh: "高 — 72 ステップ",
						reset: "既定値にリセット",
						nContext: "セッションなし・空白セッション → ブラックホールなし。会話ノード数：{n} → 充填約 {pct}%。新しいセッションは右上隅に小さな種をまきます。",
						nPomodoro: "作業の55分間で成長し、5分の休憩中は小さいまま。90秒キーボード/ポインター操作がなければ縮小します。",
						nDemo: "自己実行デモ：目に見える種から最大サイズまで成長し、プリセットを巡ります（Inferno → Gargantua → M87* → Ember → Quasar → Blazar → Pure Lens）。",
						nOff: "効果は非表示です。オーバーレイは完全に透明です。",
						nSky: "オフ（既定）：ブラックホールがページの上に浮かびます — 影・光子リング・降着円盤のみで、周囲は完全に透明。オン：レンズ効果のプログラム星野ディスク（Ghostty オリジナル風）に戻ります。",
						footer: "常駐 Web プラグイン（dsh-blackhole）。状態はメモリ内のみ、永続化しません。謝辞：s0xDk/ghostty-blackhole（MIT）、XboxNahida/ghostty-blackhole-main、962412311/win-ghostty-blackhole；物理は Eric Bruneton のブラックホールシェーダーを参考。",
					},
					"en": {
						nav: "Blackhole", title: "Blackhole",
						sub: "Geodesic-traced Schwarzschild black hole, ported from s0xDk/ghostty-blackhole. It floats above the page; the bottom work area stays clear.",
						running: "running · {mode} · {level} · {fps} fps", hidden: "hidden (no session)",
						gDrive: "Drive", gPreset: "Preset", gSize: "Size & motion", gDisk: "Disk", gBg: "Background", gRender: "Render", gAuto: "Auto look",
						fAuto: "Random look", autoPreset: "Random presets", autoRandom: "Random parameters", custom: "Custom",
						nAuto: "When enabled, the disk look randomly changes every 5–20 s: \"Random presets\" picks from the 15 presets, \"Random parameters\" generates a fully random disk.",
						modeDemo: "Demo tour — 42 s preset loop", modePomodoro: "Pomodoro — 55/5 wall clock", modeContext: "Context — conversation size", modeManual: "Manual — fixed level", modeOff: "Off",
						mlDemo: "Demo tour", mlPomodoro: "Pomodoro", mlContext: "Context", mlManual: "Manual", mlOff: "Off",
						fLevel: "Manual level", fHoleRadius: "Hole radius", fMaxArea: "Max fill area", fLensDepth: "Lens depth", fDrift: "Drift speed", fWorkArea: "Work area (bottom)", fFollow: "Follow pointer",
						fTemp: "Disk temperature", fGain: "Disk gain", fOpacity: "Disk opacity", fContrast: "Streak contrast", fStar: "Starfield gain", fExposure: "Exposure", fDilation: "Time dilation floor",
						fQuality: "Quality", fHoleOpacity: "Hole opacity", fSkyOpacity: "Sky opacity", fSky: "Sky background", fLang: "Language", fPresetLook: "Disk look", fMode: "Mode", fSpin: "Spin speed", wallClock: "wall clock",
						qLow: "Low — 24 geodesic steps", qMed: "Medium — 48 steps", qHigh: "High — 72 steps",
						reset: "Reset defaults",
						nContext: "No session open or the session is blank → no hole. Conversation nodes: {n} → fill ≈ {pct} %. A fresh session seeds a tiny hole in the top-right corner.",
						nPomodoro: "Grows through 55 min of work, stays small through the 5 min break, and shrinks after 90 s without keyboard/pointer activity.",
						nDemo: "Self-running showcase: grows from a visible seed to full size while touring the tuner presets (Inferno → Gargantua → M87* → Ember → Quasar → Blazar → Pure Lens).",
						nOff: "The effect is hidden; the overlay is fully transparent.",
						nSky: "Off (default): the hole floats over the page — shadow, photon ring and accretion disk only, everything around is transparent. On: the lensed procedural starfield disc (the original Ghostty-style look) returns.",
						footer: "Persistent web plugin (dsh-blackhole). State lives in memory only — nothing is persisted. Credits: s0xDk/ghostty-blackhole (MIT), XboxNahida/ghostty-blackhole-main, 962412311/win-ghostty-blackhole; physics after Eric Bruneton’s black hole shader.",
					},
				};
				const LANGS = [
					{ id: "zh-CN", label: "简体中文" },
					{ id: "zh-TW", label: "繁體中文" },
					{ id: "ja", label: "日本語" },
					{ id: "en", label: "English" },
				];
				const fmt = (tpl, vars) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => (vars && k in vars ? String(vars[k]) : m));

			// ---------------- shared runtime state (plain owned data) ----------------
			const DEFAULTS = {
				mode: "context",
				level: 0.5,
				preset: "Inferno",
				sky: false,
				holeRadius: 0.02,
				lensDepth: 13,
				starGain: 0,
				diskInner: 1.8,
				diskOuter: 8,
				diskIncl: 1.5,
				diskRoll: 0.35,
				diskGain: 2.2,
				diskOpacity: 0.9,
				diskTemp: 5500,
				dopplerMix: 0.6,
				diskBeam: 2.5,
				diskSpeed: 5,
				diskWind: 7,
				diskContrast: 1.6,
				exposure: 1.4,
				driftSpeed: 1,
				workArea: 0.1,
				dilationMin: 0.2,
				tokenAreaMin: 0.01,
				tokenAreaMax: 0.5,
				tokenHomeX: 0.96,
				tokenHomeY: 0.04,
				tokenEase: 1,
				tokenReach: 1,
				tokenCalm: 0.04,
				tokenRush: 1.1,
				holeOpacity: 1,
				skyOpacity: 0.6,
				rotSpeed: 0.2,
				autoLook: false,
				autoMode: "preset",
				followMouse: false,
				quality: 48,
			};
			const PRESETS = {
				"Inferno": { diskTemp: 5500, diskIncl: 1.5, diskRoll: 0.35, diskInner: 1.8, diskOuter: 8.0, diskOpacity: 0.9, dopplerMix: 0.6, diskBeam: 2.5, diskGain: 2.2, diskContrast: 1.6, diskWind: 7.0, diskSpeed: 5.0, exposure: 1.4, starGain: 0 },
				"Gargantua": { diskTemp: 4500, diskIncl: 1.52, diskRoll: 0.1, diskInner: 2.2, diskOuter: 7.0, diskOpacity: 0.85, dopplerMix: 0.35, diskBeam: 2.0, diskGain: 1.4, diskContrast: 0.5, diskWind: 7.0, diskSpeed: 5.0, exposure: 1.2, starGain: 0 },
				"M87* Donut": { diskTemp: 3800, diskIncl: 0.55, diskRoll: -0.3, diskInner: 2.2, diskOuter: 6.0, diskOpacity: 0.45, dopplerMix: 0.9, diskBeam: 3.5, diskGain: 1.6, diskContrast: 0.4, diskWind: 3.0, diskSpeed: 2.5, exposure: 1.1, starGain: 0 },
				"Face-on Ember": { diskTemp: 6500, diskIncl: 0.3, diskRoll: 0.0, diskInner: 3.0, diskOuter: 10.0, diskOpacity: 0.5, dopplerMix: 0.8, diskBeam: 2.5, diskGain: 1.0, diskContrast: 1.1, diskWind: 7.0, diskSpeed: 5.0, exposure: 1.0, starGain: 0 },
				"Quasar": { diskTemp: 15000, diskIncl: 1.3, diskRoll: 0.35, diskInner: 3.0, diskOuter: 14.0, diskOpacity: 0.35, dopplerMix: 1.0, diskBeam: 4.0, diskGain: 1.2, diskContrast: 1.3, diskWind: 8.0, diskSpeed: 5.0, exposure: 0.8, starGain: 0 },
				"Blazar": { diskTemp: 18000, diskIncl: 1.05, diskRoll: 0.55, diskInner: 3.0, diskOuter: 16.0, diskOpacity: 0.3, dopplerMix: 1.0, diskBeam: 5.0, diskGain: 1.0, diskContrast: 1.5, diskWind: 9.0, diskSpeed: 6.0, exposure: 0.75, starGain: 0 },
				"Pure Lens": { diskTemp: 5500, diskIncl: 1.5, diskRoll: 0.35, diskInner: 1.8, diskOuter: 8.0, diskOpacity: 0.0, dopplerMix: 1.0, diskBeam: 2.5, diskGain: 0.0, diskContrast: 1.6, diskWind: 7.0, diskSpeed: 5.0, exposure: 1.0, starGain: 0.6 },
				"Crimson Vortex": { diskTemp: 3200, diskIncl: 1.45, diskRoll: 0.6, diskInner: 2.0, diskOuter: 9.0, diskOpacity: 0.95, dopplerMix: 0.2, diskBeam: 1.5, diskGain: 3.0, diskContrast: 2.0, diskWind: 5.0, diskSpeed: 4.0, exposure: 1.6, starGain: 0 },
				"Azure Spiral": { diskTemp: 8000, diskIncl: 1.2, diskRoll: -0.5, diskInner: 2.5, diskOuter: 7.0, diskOpacity: 0.7, dopplerMix: 0.75, diskBeam: 2.8, diskGain: 1.8, diskContrast: 1.4, diskWind: 8.0, diskSpeed: 5.5, exposure: 1.3, starGain: 0 },
				"Ruby Ring": { diskTemp: 2500, diskIncl: 1.55, diskRoll: 0.2, diskInner: 1.6, diskOuter: 6.0, diskOpacity: 0.6, dopplerMix: 0.1, diskBeam: 1.2, diskGain: 2.6, diskContrast: 1.8, diskWind: 4.0, diskSpeed: 3.0, exposure: 1.5, starGain: 0 },
				"Ghost Halo": { diskTemp: 12000, diskIncl: 0.8, diskRoll: 0.45, diskInner: 2.8, diskOuter: 12.0, diskOpacity: 0.4, dopplerMix: 0.95, diskBeam: 3.5, diskGain: 1.5, diskContrast: 1.2, diskWind: 8.5, diskSpeed: 5.0, exposure: 0.9, starGain: 0 },
				"Top-down Galaxy": { diskTemp: 5000, diskIncl: 0.1, diskRoll: 0.0, diskInner: 2.0, diskOuter: 9.0, diskOpacity: 0.85, dopplerMix: 0.5, diskBeam: 2.0, diskGain: 1.3, diskContrast: 1.5, diskWind: 6.0, diskSpeed: 4.5, exposure: 1.1, starGain: 0 },
				"White Dwarf Beam": { diskTemp: 22000, diskIncl: 1.4, diskRoll: 0.7, diskInner: 3.5, diskOuter: 18.0, diskOpacity: 0.25, dopplerMix: 1.0, diskBeam: 4.5, diskGain: 0.9, diskContrast: 1.7, diskWind: 10.0, diskSpeed: 6.5, exposure: 0.7, starGain: 0 },
				"Solar Forge": { diskTemp: 4200, diskIncl: 1.48, diskRoll: 0.15, diskInner: 1.9, diskOuter: 7.5, diskOpacity: 0.8, dopplerMix: 0.45, diskBeam: 2.2, diskGain: 2.0, diskContrast: 0.8, diskWind: 6.5, diskSpeed: 4.8, exposure: 1.25, starGain: 0 },
				"Obsidian Eye": { diskTemp: 9000, diskIncl: 0.45, diskRoll: -0.15, diskInner: 2.6, diskOuter: 11.0, diskOpacity: 0.55, dopplerMix: 0.85, diskBeam: 3.0, diskGain: 1.1, diskContrast: 1.3, diskWind: 7.5, diskSpeed: 5.2, exposure: 1.05, starGain: 0 },
			};
			const state = Object.assign({}, DEFAULTS);
			state.lang = locale && typeof locale.getLocale === "function" && locale.getLocale().id === "zh" ? "zh-CN" : "en";
			const rt = {
				activityAt: 0, pointerX: 0.5, pointerY: 0.3, pointerSeen: false, ctxNodes: -1,
				followX: 0.5, followY: 0.3,
				statusKind: "init", statusText: "initializing…", fps: 0, frames: 0, demoPct: 0,
			};
			const listeners = new Set();
			const notify = () => { listeners.forEach((fn) => fn()); };
			const patch = (p) => { Object.assign(state, p); notify(); };
			// Random disk-look generator for the auto-look option: either a random
			// preset from PRESETS or fully random parameters within sane ranges.
			const applyAutoLook = () => {
				if (state.autoMode === "preset") {
					const keys = Object.keys(PRESETS);
					const k = keys[Math.floor(Math.random() * keys.length)];
					patch(Object.assign({ preset: k }, PRESETS[k]));
				} else {
					const r = (min, max) => min + Math.random() * (max - min);
					patch({
						preset: "Custom",
						diskTemp: Math.round(r(2500, 22000) / 100) * 100,
						diskIncl: +r(0.1, 1.55).toFixed(2),
						diskRoll: +r(-0.7, 0.7).toFixed(2),
						diskInner: +r(1.6, 3.5).toFixed(1),
						diskOuter: +r(6, 18).toFixed(1),
						diskOpacity: +r(0, 1).toFixed(2),
						dopplerMix: +r(0, 1).toFixed(2),
						diskBeam: +r(1, 5).toFixed(1),
						diskGain: +r(0, 3).toFixed(1),
						diskContrast: +r(0, 2).toFixed(1),
						diskWind: +r(3, 10).toFixed(1),
						diskSpeed: +r(2, 7).toFixed(1),
						exposure: +r(0.7, 1.6).toFixed(2),
						starGain: +r(0, 0.8).toFixed(2),
					});
				}
			};
			const useStore = () => {
				const [n, setN] = React.useState(0);
				React.useEffect(() => {
					const fn = () => setN((x) => x + 1);
					listeners.add(fn);
					return () => { listeners.delete(fn); };
				}, []);
				return state;
			};

			// ---------------- shaders (WebGL2 / GLSL ES 3.00) ----------------
			const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;
			const FRAG = `#version 300 es
precision highp float;
precision highp int;

// blackhole.frag — geodesic-traced Schwarzschild black hole, ported from
// s0xDk/ghostty-blackhole (blackhole.glsl, MIT) to WebGL2 / GLSL ES 3.00.
// Each near-field pixel integrates its own null geodesic
// (Binet form: a = -(3/2) h^2 x / r^5); the far field uses the analytic
// weak-field deflection. The lensed background sky is a procedural texture
// (uBackground) instead of the terminal framebuffer, and the result is
// composited as a premultiplied-alpha overlay above the page.

uniform vec2  uResolution;
uniform float uTime;
uniform float uWall;
uniform float uLastActivity;
uniform float uLevel;
uniform int   uMode;
uniform sampler2D uBackground;
uniform vec2  uFollowPos;
uniform float uFollowWeight;
uniform float uHoleRadius;
uniform float uLensDepth;
uniform float uStarGain;
uniform float uDiskInner;
uniform float uDiskOuter;
uniform float uDiskIncl;
uniform float uDiskRoll;
uniform float uDiskGain;
uniform float uDiskOpacity;
uniform float uDiskTemp;
uniform float uDopplerMix;
uniform float uDiskBeam;
uniform float uDiskSpeed;
uniform float uDiskWind;
uniform float uDiskContrast;
uniform float uExposure;
uniform float uDriftSpeed;
uniform float uWorkArea;
uniform float uDilationMin;
uniform float uTokenAreaMin;
uniform float uTokenAreaMax;
uniform float uTokenHomeX;
uniform float uTokenHomeY;
uniform float uTokenEase;
uniform float uTokenReach;
uniform float uTokenCalm;
uniform float uTokenRush;
uniform float uHoleOpacity; // opacity of the hole itself (shadow + accretion disk)
uniform float uSkyOpacity;  // opacity of the lensed starfield sky plane
uniform float uSky; // 1 = draw the lensed starfield sky around the hole; 0 = hole only (page shows through)
uniform float uRot; // rigid-body spin of the whole disk + photon ring about the hole axis (radians)
uniform int   uSteps;

const int MODE_POMODORO = 0;
const int MODE_CONTEXT  = 1;
const int MODE_MANUAL   = 2;
const int MODE_DEMO     = 3;

const float WORK_PERIOD_MIN = 55.0;
const float BREAK_MIN       = 5.0;
const float IDLE_FADE_SEC   = 90.0;
const float DEMO_SEC        = 42.0;
const float DEMO_GROW_SEC   = 40.0;
const float DEMO_XFADE      = 0.18;
const float DEMO_LEVEL_FLOOR = 0.08;
const float B_CRIT          = 2.5980762;

out vec4 fragColor;

float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

float vnoiseWrapY(vec2 p, float perY) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float y0 = mod(i.y, perY), y1 = mod(i.y + 1.0, perY);
    return mix(mix(hash21(vec2(i.x, y0)), hash21(vec2(i.x + 1.0, y0)), f.x),
               mix(hash21(vec2(i.x, y1)), hash21(vec2(i.x + 1.0, y1)), f.x),
               f.y);
}

vec2 mirrorUV(vec2 u) { return 1.0 - abs(1.0 - mod(u, 2.0)); }

vec2 rot(vec2 v, float a) {
    float c = cos(a), s = sin(a);
    return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
}

vec2 lissa(float t) {
    return vec2(0.75 * sin(t * 0.37) + 0.25 * sin(t * 0.83 + 1.0),
                0.70 * sin(t * 0.54 + 2.1) + 0.30 * sin(t * 1.07));
}

vec3 blackbody(float T) {
    float t = clamp(T, 1500.0, 40000.0) / 100.0;
    float r = t <= 66.0 ? 1.0 : clamp(1.292936 * pow(t - 60.0, -0.1332047), 0.0, 1.0);
    float g = t <= 66.0 ? clamp(0.3900816 * log(t) - 0.6318414, 0.0, 1.0)
                        : clamp(1.1298909 * pow(t - 60.0, -0.0755148), 0.0, 1.0);
    float b = t >= 66.0 ? 1.0 : (t <= 19.0 ? 0.0 : clamp(0.5432068 * log(t - 10.0) - 1.1962540, 0.0, 1.0));
    return vec3(r, g, b);
}

vec3 stars(vec3 d) {
    vec2 sph = vec2(atan(d.x, -d.z), asin(clamp(d.y, -1.0, 1.0)));
    vec2 g   = sph * 40.0;
    vec2 id  = floor(g);
    float hh = hash21(id);
    if (hh < 0.92) return vec3(0.0);
    vec2 f   = fract(g) - 0.5;
    vec2 off = (vec2(hash21(id + 17.3), hash21(id + 31.7)) - 0.5) * 0.7;
    float spark = smoothstep(0.10, 0.0, length(f - off));
    float tw    = 0.7 + 0.3 * sin(uTime * (0.5 + 2.0 * hash21(id + 5.1)) + 40.0 * hh);
    vec3 tint   = mix(vec3(1.0, 0.82, 0.60), vec3(0.75, 0.85, 1.0), hash21(id + 2.9));
    return tint * spark * tw * ((hh - 0.92) / 0.08);
}

struct DiskLook {
    float temp, incl, roll, inner, outer, opac, dopp, beam, gain, contr, wind, speed, expo, star;
};

DiskLook lookUniforms() {
    return DiskLook(uDiskTemp, uDiskIncl, uDiskRoll, uDiskInner, uDiskOuter, uDiskOpacity,
                    uDopplerMix, uDiskBeam, uDiskGain, uDiskContrast, uDiskWind, uDiskSpeed,
                    uExposure, uStarGain);
}

DiskLook mixLook(DiskLook a, DiskLook b, float f) {
    return DiskLook(
        mix(a.temp,  b.temp,  f), mix(a.incl,  b.incl,  f),
        mix(a.roll,  b.roll,  f), mix(a.inner, b.inner, f),
        mix(a.outer, b.outer, f), mix(a.opac,  b.opac,  f),
        mix(a.dopp,  b.dopp,  f), mix(a.beam,  b.beam,  f),
        mix(a.gain,  b.gain,  f), mix(a.contr, b.contr, f),
        mix(a.wind,  b.wind,  f), mix(a.speed, b.speed, f),
        mix(a.expo,  b.expo,  f), mix(a.star,  b.star,  f));
}

DiskLook demoSlot(int i) {
    if (i == 0) return DiskLook( 5500.0, 1.50,  0.35, 1.8,  8.0, 0.90, 0.60, 2.5, 2.2, 1.6, 7.0, 5.0, 1.40, 0.0);
    if (i == 1) return DiskLook( 4500.0, 1.52,  0.10, 2.2,  7.0, 0.85, 0.35, 2.0, 1.4, 0.5, 7.0, 5.0, 1.20, 0.0);
    if (i == 2) return DiskLook( 3800.0, 0.55, -0.30, 2.2,  6.0, 0.45, 0.90, 3.5, 1.6, 0.4, 3.0, 2.5, 1.10, 0.0);
    if (i == 3) return DiskLook( 6500.0, 0.30,  0.00, 3.0, 10.0, 0.50, 0.80, 2.5, 1.0, 1.1, 7.0, 5.0, 1.00, 0.0);
    if (i == 4) return DiskLook(15000.0, 1.30,  0.35, 3.0, 14.0, 0.35, 1.00, 4.0, 1.2, 1.3, 8.0, 5.0, 0.80, 0.0);
    if (i == 5) return DiskLook(18000.0, 1.05,  0.55, 3.0, 16.0, 0.30, 1.00, 5.0, 1.0, 1.5, 9.0, 6.0, 0.75, 0.0);
    if (i == 6) return DiskLook( 5500.0, 1.50,  0.35, 1.8,  8.0, 0.00, 1.00, 2.5, 0.0, 1.6, 7.0, 5.0, 1.00, 0.6);
    return DiskLook( 5500.0, 1.50,  0.35, 1.8,  8.0, 0.90, 0.60, 2.5, 2.2, 1.6, 7.0, 5.0, 1.40, 0.0);
}

DiskLook demoLook() {
    float u = mod(uTime, DEMO_SEC) / DEMO_SEC * 8.0;
    int i = int(min(u, 7.999));
    float f = smoothstep(1.0 - DEMO_XFADE, 1.0, fract(u));
    int j = i + 1 >= 8 ? 0 : i + 1;
    return mixLook(demoSlot(i), demoSlot(j), f);
}

void main() {
    vec2  res    = uResolution;
    // Ghostty's fragCoord y runs TOP-DOWN; WebGL's gl_FragCoord y runs
    // bottom-up — convert here so every downstream y-semantic (corner home,
    // work-area shield, drift box) matches the upstream shader exactly.
    vec2  uv     = vec2(gl_FragCoord.x / res.x, 1.0 - gl_FragCoord.y / res.y);
    float aspect = res.x / res.y;
    float yUp    = 1.0 - uv.y;
    float t      = uTime * uDriftSpeed;

    // NOTE: no struct-returning ternary here — ANGLE (D3D11) rejects
    // "?: on structures" even in ESSL 3.00, so use if/else assignment.
    DiskLook L = lookUniforms();
    if (uMode == MODE_DEMO) L = demoLook();

    float rin  = max(L.inner, 1.6);
    float rout = max(L.outer, rin + 0.5);

    float I, sz;
    vec2  center;
    if (uMode == MODE_POMODORO) {
        float workSec  = WORK_PERIOD_MIN * 60.0;
        float cycleSec = workSec + BREAK_MIN * 60.0;
        float phase    = mod(uWall, cycleSec);
        float collapse = min(60.0, workSec * 0.15);
        float grow = clamp(phase / workSec, 0.0, 1.0)
                   * (1.0 - smoothstep(workSec - collapse, workSec, phase));
        I = mix(0.12, 1.0, grow);
        float idle = max(0.0, uTime - uLastActivity);
        I *= 1.0 - smoothstep(IDLE_FADE_SEC, max(BREAK_MIN * 60.0, IDLE_FADE_SEC + 1.0), idle);
        sz = mix(0.22, 1.0, I);
        float ext = (rout / B_CRIT) * uHoleRadius * sz;
        float yLo = uWorkArea + 0.12 + ext;
        float yHi = max(yLo, 0.90 - ext);
        float spd = mix(0.35, 1.0, I);
        center = vec2(
            0.5 + (0.24 * sin(t * 0.21) + 0.05 * sin(t * 0.083)) * spd,
            1.0 - mix(yLo, yHi, 0.5 + (0.42 * sin(t * 0.157 + 2.0) + 0.08 * sin(t * 0.117)) * spd));
        center += I * vec2(0.040 * sin(t * 0.83) + 0.020 * sin(t * 1.31),
                           0.030 * sin(t * 1.03 + 1.0));
    } else {
        float lvl = (uMode == MODE_DEMO)
                  ? mix(DEMO_LEVEL_FLOOR, 1.0, min(mod(uTime, DEMO_SEC) / DEMO_GROW_SEC, 1.0))
                  : uLevel;
        if (lvl < 0.0) { fragColor = vec4(0.0); return; }
        float g = pow(clamp(lvl, 0.0, 1.0), uTokenEase);
        I = mix(0.10, 1.0, g);
        float rhMin = sqrt(uTokenAreaMin * aspect / 3.1415927);
        float rhMax = sqrt(uTokenAreaMax * aspect / 3.1415927);
        float rhT = mix(rhMin, rhMax, g) * (uHoleRadius / 0.08);
        sz = rhT / max(uHoleRadius, 1e-4);
        float marg = min(rhT * mix(1.45, 0.90, g), 0.5 * (1.0 - uWorkArea - 0.03));
        float xPad = marg / aspect;
        vec2  fullLo = vec2(min(xPad, 0.5), marg);
        vec2  fullHi = vec2(max(0.5, 1.0 - xPad), max(marg, 1.0 - (uWorkArea + 0.03 + marg)));
        vec2  corner = clamp(vec2(uTokenHomeX, uTokenHomeY), fullLo, fullHi);
        float reach  = mix(0.06, max(uTokenReach, 0.06), g);
        vec2  lo = vec2(mix(corner.x, fullLo.x, reach), fullLo.y);
        vec2  hi = vec2(fullHi.x, mix(corner.y, fullHi.y, reach));
        vec2  room   = max((hi - lo) * 0.5, vec2(0.0));
        vec2  wobAmp = min(vec2(0.010 + 0.030 * g), max(room * 0.35, vec2(0.006)));
        vec2  ampEff = max(room - wobAmp, vec2(0.0));
        vec2  wander = mix(lissa(t * uTokenCalm), lissa(t * uTokenRush), g);
        center = (lo + hi) * 0.5 + wander * ampEff
               + wobAmp * vec2(cos(t * 0.8), sin(t * 1.0));
    }

    center = mix(center, uFollowPos, clamp(uFollowWeight, 0.0, 1.0));

    float vis = smoothstep(0.0, 0.10, I);
    if (vis <= 0.0) { fragColor = vec4(0.0); return; }
    float rh = uHoleRadius * sz;

    float dil = mix(1.0, uDilationMin, I);
    float shield = vis * smoothstep(uWorkArea, uWorkArea + 0.18, yUp);

    vec2  p    = (uv - center) * vec2(aspect, 1.0);
    float plen = length(p);

    float windowF = exp(-pow(plen / (7.0 * rh), 2.0));

    // Overlay envelope. R1 must stay strictly below R2: smoothstep(edge0,
    // edge1, x) is UNDEFINED when edge0 >= edge1, and big-disk presets
    // (Quasar outer=14, Blazar=16, White Dwarf Beam=18) push rout/B_CRIT+1.35
    // past 6.5 — on ANGLE the reversed edges invert env (hole vanishes, the
    // surrounding sky stays). Cap R1 at 5.0*rh so the fade band always exists.
    float R1 = min(rh * (rout / B_CRIT + 1.35), rh * 5.0);
    float R2 = rh * 6.5;
    float env = 1.0 - smoothstep(R1, R2, plen);

    float W  = B_CRIT / max(rh, 1e-4);
    vec2  pr = rot(vec2(p.x, -p.y), L.roll) * W;
    float b  = length(pr);

    float bmax = rout + 3.0;
    float Z0   = max(14.0, rout + 5.0);

    if (b >= bmax) {
        float u    = Z0 * inversesqrt(Z0 * Z0 + b * b);
        float defl = (2.0 / (W * W)) / max(plen, 1e-4)
                   * (1.29 * u + 0.07) * max(uLensDepth - 2.14 * u + 0.75, 0.0)
                   * windowF * shield;
        vec2  dir  = p / max(plen, 1e-5);
        vec3  term = vec3(0.0);
        float ab = 0.035 * smoothstep(1.0, 2.0, b / bmax);
        for (int i = 0; i < 3; i++) {
            float k   = 1.0 + (float(i) - 1.0) * ab;
            vec2  sp  = p - dir * defl * k;
            vec2  suv = mirrorUV(center + sp / vec2(aspect, 1.0));
            term[i]   = texture(uBackground, suv)[i];
        }
        vec3 d = normalize(vec3(-(pr / b) * (2.0 / b), -1.0));
        // far field: only the sky layer exists here (outside the disk region)
        vec3  skyLayer = term + stars(d) * L.star * windowF;
        float skyA = uSky * uSkyOpacity * vis * shield * env;
        fragColor = vec4(skyLayer * skyA, skyA);
        return;
    }

    vec3  x  = vec3(pr, Z0);
    vec3  v  = vec3(0.0, 0.0, -1.0);
    float h2 = dot(pr, pr);

    float ci = cos(L.incl), si = sin(L.incl);
    vec3  n  = vec3(0.0, si, ci);
    vec3  e2 = vec3(0.0, ci, -si);
    float sdir = L.speed < 0.0 ? -1.0 : 1.0;
    float spd  = abs(L.speed);

    vec3  emitc = vec3(0.0);
    float trans = 1.0;
    bool  captured = false;
    float sPrev = dot(x, n);
    vec3  xPrev = x;

    for (int i = 0; i < uSteps; i++) {
        float r2 = dot(x, x);
        if (r2 < 1.0) { captured = true; break; }
        if (x.z < -Z0 && v.z < 0.0) break;
        if (r2 > 4.0 * Z0 * Z0) break;
        float r  = sqrt(r2);
        float dt = clamp(0.16 * r, 0.03, 1.5);
        vec3 a = -1.5 * h2 * x / (r2 * r2 * r);
        v += a * (0.5 * dt);
        x += v * dt;
        r2 = dot(x, x);
        r  = sqrt(r2);
        a  = -1.5 * h2 * x / (r2 * r2 * r);
        v += a * (0.5 * dt);

        float s = dot(x, n);
        if (s * sPrev < 0.0 && trans > 0.02) {
            float tc = sPrev / (sPrev - s);
            vec3  xc = mix(xPrev, x, tc);
            float rc = length(xc);
            if (rc > rin && rc < rout) {
                float band = smoothstep(rin, rin * 1.25, rc)
                           * (1.0 - smoothstep(rout * 0.70, rout, rc));
                float phi   = atan(dot(xc, e2), xc.x);
                // rigid-body spin: the whole disk + photon ring revolve about the
                // hole axis (uRot, radians) — the inclination is untouched
                float turns = (phi + uRot) / 6.2831853;
                float kep   = pow(rin / rc, 1.5);
                float gloc  = sqrt(max(1.0 - 1.5 / rc, 0.02));
                float swirl = rc * L.wind * 0.12 - t * kep * spd * gloc * dil * sdir;
                float streaks = vnoiseWrapY(vec2(rc * 2.8, turns * 19.0 + swirl * 3.0), 19.0) * 0.65 +
                                vnoiseWrapY(vec2(rc * 1.0, turns * 9.0  + swirl * 1.5 + 7.0), 9.0) * 0.35;
                streaks = 0.35 + L.contr * streaks * streaks;
                vec3  gasdir = normalize(cross(n, xc)) * sdir;
                float beta   = clamp(inversesqrt(max(2.0 * (rc - 1.0), 0.2)), 0.0, 0.99);
                float g      = gloc / max(1.0 + beta * dot(gasdir, normalize(v)), 0.05);
                g = mix(1.0, g, L.dopp);
                float xpr   = max(1.0 - sqrt(rin / rc), 0.0);
                float tprof = pow(rin / rc, 0.75) * pow(xpr, 0.25) / 0.488;
                vec3  cbb   = blackbody(L.temp * tprof * g);
                float boost = pow(g, L.beam);
                float density = band * streaks;
                emitc += trans * cbb * (L.gain * 2.2 * density * tprof * tprof * boost);
                trans *= 1.0 - clamp(L.opac * density, 0.0, 1.0);
            }
        }
        sPrev = s;
        xPrev = x;
    }
    if (!captured && dot(x, x) < 4.0) captured = true;

    vec3 bg = vec3(0.0);
    if (!captured) {
        vec3 d = normalize(v);
        bg += stars(d) * L.star * windowF * shield;
        if (d.z < -0.05) {
            float tpl = (-uLensDepth - x.z) / d.z;
            vec3  hp  = x + d * tpl;
            vec2  q   = rot(hp.xy, -L.roll) / W;
            vec2  sp  = vec2(q.x, -q.y);
            vec2  suv = mirrorUV(center + (p + (sp - p) * windowF * shield) / vec2(aspect, 1.0));
            float toward = smoothstep(0.05, 0.35, -d.z);
            bg += texture(uBackground, suv).rgb * toward;
        }
    }

    // Two independently-opacity'd layers, composited hole-over-sky
    // (premultiplied "over"). Hole = shadow + accretion disk (uHoleOpacity);
    // sky = the lensed starfield plane (uSkyOpacity). With uSky off the sky
    // layer vanishes and only the hole renders over the untouched page.
    vec3  diskCol   = vec3(1.0) - exp(-emitc * L.expo);
    vec3  skyLayer  = bg * trans;
    vec3  holeLayer = diskCol;
    float skyA  = uSky * uSkyOpacity * vis * shield * env;
    float holeA = uHoleOpacity * vis * shield
        * (captured ? 1.0 : max(max(diskCol.r, diskCol.g), diskCol.b));
    vec3  col   = holeLayer * holeA + skyLayer * skyA * (1.0 - holeA);
    float alpha = holeA + skyA * (1.0 - holeA);
    fragColor = vec4(col, alpha);
}
`;
			const UNIFORM_NAMES = [
				"uResolution", "uTime", "uWall", "uLastActivity", "uLevel", "uMode",
				"uBackground", "uFollowPos", "uFollowWeight",
				"uHoleRadius", "uLensDepth", "uStarGain",
				"uDiskInner", "uDiskOuter", "uDiskIncl", "uDiskRoll",
				"uDiskGain", "uDiskOpacity", "uDiskTemp", "uDopplerMix", "uDiskBeam",
				"uDiskSpeed", "uDiskWind", "uDiskContrast", "uExposure",
				"uDriftSpeed", "uWorkArea", "uDilationMin",
				"uTokenAreaMin", "uTokenAreaMax", "uTokenHomeX", "uTokenHomeY",
				"uTokenEase", "uTokenReach", "uTokenCalm", "uTokenRush",
				"uHoleOpacity", "uSkyOpacity", "uSky", "uRot", "uSteps",
			];

			// ---------------- helpers ----------------
			function mulberry32(seed) {
				let a = seed >>> 0;
				return function () {
					a |= 0;
					a = (a + 0x6D2B79F5) | 0;
					let t = Math.imul(a ^ (a >>> 15), 1 | a);
					t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
					return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
				};
			}

			function makeSkyTexture(gl) {
				const W = 2048, H = 1152;
				const cnv = document.createElement("canvas");
				cnv.width = W;
				cnv.height = H;
				const g = cnv.getContext("2d");
				if (!g) return null;
				const rng = mulberry32(0xB1AC4E01);
				const grad = g.createLinearGradient(0, 0, W * 0.25, H);
				grad.addColorStop(0, "#04050d");
				grad.addColorStop(0.45, "#070a18");
				grad.addColorStop(1, "#0b0e20");
				g.fillStyle = grad;
				g.fillRect(0, 0, W, H);
				g.save();
				g.translate(W * 0.5, H * 0.45);
				g.rotate(-0.35);
				const band = g.createLinearGradient(0, -140, 0, 140);
				band.addColorStop(0, "rgba(190,200,255,0)");
				band.addColorStop(0.5, "rgba(200,210,255,0.055)");
				band.addColorStop(1, "rgba(190,200,255,0)");
				g.fillStyle = band;
				g.fillRect(-W, -140, W * 2, 280);
				g.restore();
				const hues = [
					[232, 70, 0.05], [196, 60, 0.045], [24, 45, 0.04],
					[268, 60, 0.05], [208, 55, 0.045], [16, 40, 0.035],
					[250, 50, 0.04], [180, 45, 0.035],
				];
				for (let i = 0; i < 10; i++) {
					const x = rng() * W, y = rng() * H;
					const r = 90 + rng() * 260;
					const hc = hues[i % hues.length];
					const rg = g.createRadialGradient(x, y, 0, x, y, r);
					rg.addColorStop(0, "hsla(" + hc[0] + "," + hc[1] + "%,60%," + hc[2] + ")");
					rg.addColorStop(1, "hsla(" + hc[0] + "," + hc[1] + "%,60%,0)");
					g.fillStyle = rg;
					g.fillRect(x - r, y - r, r * 2, r * 2);
				}
				for (let i = 0; i < 26; i++) {
					const x = rng() * W, y = rng() * H;
					const r = 6 + rng() * 26;
					g.save();
					g.translate(x, y);
					g.rotate(rng() * Math.PI);
					g.scale(1, 0.35 + rng() * 0.4);
					const rg = g.createRadialGradient(0, 0, 0, 0, 0, r);
					rg.addColorStop(0, "rgba(255,245,225,0.5)");
					rg.addColorStop(0.4, "rgba(170,190,230,0.16)");
					rg.addColorStop(1, "rgba(120,140,200,0)");
					g.fillStyle = rg;
					g.fillRect(-r, -r, r * 2, r * 2);
					g.restore();
				}
				for (let i = 0; i < 1500; i++) {
					const x = rng() * W, y = rng() * H;
					const b = Math.pow(rng(), 3);
					const rad = 0.4 + rng() * 1.5 * (0.4 + b);
					const warm = rng();
					let col;
					if (warm < 0.18) col = "rgba(255,205,150," + (0.25 + 0.75 * b) + ")";
					else if (warm < 0.34) col = "rgba(160,200,255," + (0.25 + 0.75 * b) + ")";
					else col = "rgba(255,255,255," + (0.2 + 0.8 * b) + ")";
					if (b > 0.75 && i < 220) {
						const rg = g.createRadialGradient(x, y, 0, x, y, rad * 6);
						rg.addColorStop(0, col);
						rg.addColorStop(1, "rgba(0,0,0,0)");
						g.fillStyle = rg;
						g.fillRect(x - rad * 6, y - rad * 6, rad * 12, rad * 12);
					} else {
						g.fillStyle = col;
						g.fillRect(x, y, rad, rad);
					}
				}
				const tex = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, tex);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cnv);
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				return tex;
			}

			// ---------------- overlay canvas ----------------
			function BlackholeCanvas() {
				let node = null;
				React.useEffect(() => {
					const canvas = node;
					if (!canvas) return;
					const cleanups = [];
					let gl = null;
					let prog = null;
					let bgTex = null;
					let raf = 0;
					const fail = (msg) => {
						rt.statusKind = "error";
						rt.statusText = msg;
						console.error("[blackhole] " + msg);
						notify();
					};
					try {
						gl = canvas.getContext("webgl2", {
							alpha: true, premultipliedAlpha: true, antialias: false,
							depth: false, stencil: false, powerPreference: "high-performance",
						});
						if (!gl) {
							fail("WebGL2 unavailable — enable browser hardware acceleration, then reload the page.");
							return;
						}
						const vs = gl.createShader(gl.VERTEX_SHADER);
						gl.shaderSource(vs, VERT);
						gl.compileShader(vs);
						if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
							fail("vertex shader failed: " + gl.getShaderInfoLog(vs).slice(0, 240));
							gl.deleteShader(vs);
							return;
						}
						const fs = gl.createShader(gl.FRAGMENT_SHADER);
						gl.shaderSource(fs, FRAG);
						gl.compileShader(fs);
						if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
							fail("fragment shader failed: " + gl.getShaderInfoLog(fs).slice(0, 240));
							gl.deleteShader(vs);
							gl.deleteShader(fs);
							return;
						}
						prog = gl.createProgram();
						gl.attachShader(prog, vs);
						gl.attachShader(prog, fs);
						gl.linkProgram(prog);
						gl.deleteShader(vs);
						gl.deleteShader(fs);
						if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
							fail("link failed: " + gl.getProgramInfoLog(prog).slice(0, 240));
							return;
						}
						gl.useProgram(prog);
						const U = {};
						UNIFORM_NAMES.forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });
						bgTex = makeSkyTexture(gl);
						gl.activeTexture(gl.TEXTURE0);
						gl.bindTexture(gl.TEXTURE_2D, bgTex);
						gl.uniform1i(U.uBackground, 0);

						const t0 = performance.now() / 1000;
						let last = t0;
						let shown = state.level;
						let followW = 0;
						let moveTick = 0;
						let lastSec = -1;
						let lastFrames = 0;
						let lastAutoLookAt = -1;
						let nextAutoDelay = 0;

						const resize = () => {
							const area = window.innerWidth * window.innerHeight;
							const cap = area > 2600000 ? 1 : 1.5;
							const dpr = Math.min(window.devicePixelRatio || 1, cap);
							const w = Math.max(2, Math.floor(window.innerWidth * dpr));
							const hh = Math.max(2, Math.floor(window.innerHeight * dpr));
							if (canvas.width !== w || canvas.height !== hh) {
								canvas.width = w;
								canvas.height = hh;
							}
							gl.viewport(0, 0, canvas.width, canvas.height);
						};
						resize();
						const onResize = () => resize();
						window.addEventListener("resize", onResize);
						cleanups.push(() => window.removeEventListener("resize", onResize));

						const onActivity = () => { rt.activityAt = performance.now() / 1000 - t0; };
						const onMove = (ev) => {
							rt.pointerX = ev.clientX / Math.max(1, window.innerWidth);
							rt.pointerY = ev.clientY / Math.max(1, window.innerHeight);
							rt.pointerSeen = true;
							rt.activityAt = performance.now() / 1000 - t0;
						};
						const onMoveT = (ev) => {
							const nowMs = performance.now();
							if (nowMs - moveTick > 80) {
								moveTick = nowMs;
								onMove(ev);
							}
						};
						window.addEventListener("pointermove", onMoveT, { passive: true });
						window.addEventListener("pointerdown", onActivity, { passive: true });
						window.addEventListener("keydown", onActivity, { passive: true });
						cleanups.push(() => window.removeEventListener("pointermove", onMoveT));
						cleanups.push(() => window.removeEventListener("pointerdown", onActivity));
						cleanups.push(() => window.removeEventListener("keydown", onActivity));

						const drive = () => {
							const m = state.mode;
							if (m === "demo") return { mode: 3, level: -1 };
							if (m === "pomodoro") return { mode: 0, level: -1 };
							if (m === "manual") return { mode: 2, level: state.level };
							if (m === "context") {
								const n = rt.ctxNodes;
								if (n == null || n < 0) return { mode: 1, level: -1 };
								return { mode: 1, level: 1 - Math.exp(-n / 70) };
							}
							return { mode: 1, level: -1 };
						};

						const frame = (ms) => {
							raf = window.requestAnimationFrame(frame);
							const now = ms / 1000;
							const dt = Math.min(0.1, Math.max(0.001, now - last));
							last = now;
							const t = now - t0;
							const drv = drive();
							let level = drv.level;
							if ((drv.mode === 1 || drv.mode === 2) && level >= 0) {
								const k = 1 - Math.exp(-dt / 0.35);
								shown += (level - shown) * k;
								if (Math.abs(level - shown) < 0.0004) shown = level;
								level = shown;
							}
							const followTarget = state.followMouse && rt.pointerSeen && (t - rt.activityAt) < 6 ? 1 : 0;
							followW += (followTarget - followW) * (1 - Math.exp(-dt / 0.4));
							const fpx = Math.min(0.95, Math.max(0.05, rt.pointerX));
							// the hole hovers 10% above the cursor, free to follow the
							// pointer down to just above the work area (not pinned to
							// the top); the lower band stays protected
							const fpy = Math.min(Math.max(rt.pointerY - 0.1, 0.04), Math.max(0.12, 1 - state.workArea - 0.06));
							// positional easing: the hole glides toward the pointer
							// instead of snapping (both weight and position ease)
							const fe = 1 - Math.exp(-dt / 0.5);
							rt.followX += (fpx - rt.followX) * fe;
							rt.followY += (fpy - rt.followY) * fe;

							gl.uniform2f(U.uResolution, canvas.width, canvas.height);
							gl.uniform1f(U.uTime, t);
							gl.uniform1f(U.uWall, (Date.now() / 1000) % 3600);
							gl.uniform1f(U.uLastActivity, rt.activityAt);
							gl.uniform1f(U.uLevel, level);
							gl.uniform1i(U.uMode, drv.mode);
							gl.uniform2f(U.uFollowPos, rt.followX, rt.followY);
							gl.uniform1f(U.uFollowWeight, followW);
							gl.uniform1f(U.uHoleRadius, state.holeRadius);
							gl.uniform1f(U.uLensDepth, state.lensDepth);
							gl.uniform1f(U.uStarGain, state.starGain);
							gl.uniform1f(U.uDiskInner, state.diskInner);
							gl.uniform1f(U.uDiskOuter, state.diskOuter);
							gl.uniform1f(U.uDiskIncl, state.diskIncl);
							gl.uniform1f(U.uDiskRoll, state.diskRoll);
							gl.uniform1f(U.uDiskGain, state.diskGain);
							gl.uniform1f(U.uDiskOpacity, state.diskOpacity);
							gl.uniform1f(U.uDiskTemp, state.diskTemp);
							gl.uniform1f(U.uDopplerMix, state.dopplerMix);
							gl.uniform1f(U.uDiskBeam, state.diskBeam);
							gl.uniform1f(U.uDiskSpeed, state.diskSpeed);
							gl.uniform1f(U.uDiskWind, state.diskWind);
							gl.uniform1f(U.uDiskContrast, state.diskContrast);
							gl.uniform1f(U.uExposure, state.exposure);
							gl.uniform1f(U.uDriftSpeed, state.driftSpeed);
							gl.uniform1f(U.uWorkArea, state.workArea);
							gl.uniform1f(U.uDilationMin, state.dilationMin);
							gl.uniform1f(U.uTokenAreaMin, state.tokenAreaMin);
							gl.uniform1f(U.uTokenAreaMax, state.tokenAreaMax);
							gl.uniform1f(U.uTokenHomeX, state.tokenHomeX);
							gl.uniform1f(U.uTokenHomeY, state.tokenHomeY);
							gl.uniform1f(U.uTokenEase, state.tokenEase);
							gl.uniform1f(U.uTokenReach, state.tokenReach);
							gl.uniform1f(U.uTokenCalm, state.tokenCalm);
							gl.uniform1f(U.uTokenRush, state.tokenRush);
							gl.uniform1f(U.uHoleOpacity, state.holeOpacity);
							gl.uniform1f(U.uSkyOpacity, state.skyOpacity);
							gl.uniform1f(U.uRot, state.rotSpeed * t);
							gl.uniform1f(U.uSky, state.sky ? 1 : 0);
							gl.uniform1i(U.uSteps, state.quality);

							// auto look: randomly change the disk appearance every
							// 5-20 s (random delay per cycle); skipped in demo mode,
							// where the shader tours its own preset sequence
							if (state.autoLook && drv.mode !== 3) {
								if (lastAutoLookAt < 0) {
									lastAutoLookAt = t;
									nextAutoDelay = 5 + Math.random() * 15;
								} else if (t - lastAutoLookAt >= nextAutoDelay) {
									lastAutoLookAt = t;
									nextAutoDelay = 5 + Math.random() * 15;
									applyAutoLook();
								}
							}
							gl.drawArrays(gl.TRIANGLES, 0, 3);

							rt.frames++;
							rt.demoPct = Math.min(t / 40, 1);
							const sec = Math.floor(t);
							if (sec !== lastSec) {
								lastSec = sec;
								rt.fps = rt.frames - lastFrames;
								lastFrames = rt.frames;
								if (rt.statusKind !== "ok") {
									rt.statusKind = "ok";
									rt.statusText = "running";
								}
								notify();
							}
						};
						raf = window.requestAnimationFrame(frame);
						cleanups.push(() => window.cancelAnimationFrame(raf));
					} catch (err) {
						fail("init failed: " + (err && err.message ? err.message : String(err)));
					}
					return () => {
						for (const d of cleanups) { try { d(); } catch (e) { /* noop */ } }
						if (bgTex && gl) gl.deleteTexture(bgTex);
						if (prog && gl) gl.deleteProgram(prog);
					};
				}, []);
				return h("canvas", {
					ref: (n) => { node = n; },
					style: {
						position: "fixed", inset: 0, width: "100vw", height: "100vh",
						pointerEvents: "none", background: "transparent", zIndex: 0,
					},
				});
			}

			// ---------------- settings page ----------------
			const S = {
				page: { padding: "18px 20px 28px", display: "flex", flexDirection: "column", gap: "14px", maxWidth: 660, fontSize: 13, lineHeight: 1.5, color: "#d7dae2" },
				title: { fontSize: 16, fontWeight: 700, margin: 0, color: "#f2f4f8" },
				sub: { fontSize: 12, color: "#9aa1b2", margin: 0 },
				group: { display: "flex", flexDirection: "column", gap: 8, padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" },
				groupTitle: { fontSize: 12, fontWeight: 700, color: "#f5a623", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" },
				row: { display: "flex", alignItems: "center", gap: 10 },
				lbl: { flex: "0 0 150px", color: "#aab1c2", fontSize: 12.5 },
				val: { flex: "0 0 62px", textAlign: "right", color: "#f5a623", fontSize: 12, fontVariantNumeric: "tabular-nums" },
				input: { flex: 1, background: "rgba(0,0,0,0.35)", color: "#e8eaf0", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "4px 6px", fontSize: 12.5 },
				range: { flex: 1, accentColor: "#f5a623" },
				btn: { alignSelf: "flex-start", background: "rgba(245,166,35,0.12)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 12.5, cursor: "pointer" },
				note: { fontSize: 11.5, color: "#7d8496", margin: 0 },
				statusRow: { display: "flex", alignItems: "center", gap: 8 },
				statusDot: { width: 8, height: 8, borderRadius: 4, display: "inline-block" },
				statusText: { fontSize: 12, color: "#9aa1b2", fontVariantNumeric: "tabular-nums" },
			};

			function SettingsPage(props) {
				const s = useStore();
				const L = I18N[s.lang] || I18N.en;
				const onNum = (key) => (ev) => patch({ [key]: parseFloat(ev.target.value) });
				const onStr = (key) => (ev) => patch({ [key]: ev.target.value });
				const onBool = (key) => (ev) => patch({ [key]: ev.target.checked });
				const row = (label, ctrl, val) => h("div", { style: S.row, key: label }, h("span", { style: S.lbl }, label), ctrl, val);
				const slider = (key, label, min, max, step, fmt2) => row(
					label,
					h("input", { type: "range", min, max, step, value: s[key], onChange: onNum(key), style: S.range }),
					h("span", { style: S.val }, fmt2 ? fmt2(s[key]) : String(s[key])),
				);
				const group = (title, children) => h("div", { style: S.group, key: title },
					h("p", { style: S.groupTitle }, title), ...children);
				const pct = (v) => Math.round(v * 100) + " %";
				const MODE_LABELS = { demo: L.mlDemo, pomodoro: L.mlPomodoro, context: L.mlContext, manual: L.mlManual, off: L.mlOff };

				const langSelect = h("select", { value: s.lang, onChange: onStr("lang"), style: S.input },
					LANGS.map((lg) => h("option", { value: lg.id, key: lg.id }, lg.label)));
				const modeSelect = h("select", { value: s.mode, onChange: onStr("mode"), style: S.input },
					h("option", { value: "demo" }, L.modeDemo),
					h("option", { value: "pomodoro" }, L.modePomodoro),
					h("option", { value: "context" }, L.modeContext),
					h("option", { value: "manual" }, L.modeManual),
					h("option", { value: "off" }, L.modeOff));
				const presetSelect = h("select", { value: s.preset, onChange: (ev) => {
					if (ev.target.value === "Custom") return; // marker for random params
					const p = PRESETS[ev.target.value];
					if (p) patch(Object.assign({ preset: ev.target.value }, p));
				}, style: S.input },
					h("option", { value: "Custom", key: "Custom" }, L.custom),
					Object.keys(PRESETS).map((k) => h("option", { value: k, key: k }, k)));
				const qualitySelect = h("select", { value: String(s.quality), onChange: (ev) => patch({ quality: parseInt(ev.target.value, 10) }), style: S.input },
					h("option", { value: "24" }, L.qLow),
					h("option", { value: "48" }, L.qMed),
					h("option", { value: "72" }, L.qHigh));

				const stColor = rt.statusKind === "ok" ? "#3ddc84" : rt.statusKind === "error" ? "#ff5d5d" : "#f5a623";
				let stText;
				if (rt.statusKind === "error") stText = "✗ " + rt.statusText;
				else if (rt.statusKind === "ok") {
					let lvlTxt = "—";
					if (s.mode === "demo") lvlTxt = Math.round(rt.demoPct * 100) + " %";
					else if (s.mode === "manual") lvlTxt = Math.round(s.level * 100) + " %";
					else if (s.mode === "context") lvlTxt = rt.ctxNodes < 0 ? L.hidden : Math.round((1 - Math.exp(-rt.ctxNodes / 70)) * 100) + " %";
					else if (s.mode === "pomodoro") lvlTxt = L.wallClock;
					stText = fmt(L.running, { mode: MODE_LABELS[s.mode] || s.mode, level: lvlTxt, fps: rt.fps });
				} else stText = rt.statusText;

				let modeNote = null;
				if (s.mode === "context") {
					const n = rt.ctxNodes;
					const fill = n == null || n < 0 ? 0 : 1 - Math.exp(-n / 70);
					modeNote = h("p", { style: S.note }, fmt(L.nContext, { n: n == null || n < 0 ? "—" : n, pct: Math.round(fill * 100) }));
				} else if (s.mode === "pomodoro") {
					modeNote = h("p", { style: S.note }, L.nPomodoro);
				} else if (s.mode === "demo") {
					modeNote = h("p", { style: S.note }, L.nDemo);
				} else if (s.mode === "off") {
					modeNote = h("p", { style: S.note }, L.nOff);
				}

				return h("div", { style: S.page },
					h("h3", { style: S.title }, L.title),
					h("p", { style: S.sub }, L.sub),
					h("div", { style: S.statusRow },
						h("span", { style: Object.assign({}, S.statusDot, { background: stColor }) }),
						h("span", { style: S.statusText }, stText)),
					group(L.gDrive, [
						row(L.fLang, langSelect, null),
						row(L.fMode, modeSelect, null),
						s.mode === "manual" ? slider("level", L.fLevel, 0, 1, 0.01, pct) : null,
						modeNote,
					].filter(Boolean)),
					group(L.gPreset, [row(L.fPresetLook, presetSelect, null)]),
					group(L.gAuto, [
						row(L.fAuto, h("input", { type: "checkbox", checked: s.autoLook, onChange: onBool("autoLook") }), null),
						s.autoLook ? row(L.fMode, h("select", { value: s.autoMode, onChange: onStr("autoMode"), style: S.input },
							h("option", { value: "preset" }, L.autoPreset),
							h("option", { value: "random" }, L.autoRandom))) : null,
						s.autoLook ? h("p", { style: S.note }, L.nAuto) : null,
					].filter(Boolean)),
					group(L.gSize, [
						slider("holeRadius", L.fHoleRadius, 0.005, 0.15, 0.005, (v) => v.toFixed(3)),
						slider("tokenAreaMax", L.fMaxArea, 0.02, 1, 0.01, pct),
						slider("lensDepth", L.fLensDepth, 4, 40, 1, (v) => Math.round(v)),
						slider("driftSpeed", L.fDrift, 0, 3, 0.05, (v) => v.toFixed(2)),
						slider("rotSpeed", L.fSpin, 0, 1, 0.01, (v) => v.toFixed(2)),
						slider("workArea", L.fWorkArea, 0.05, 0.7, 0.01, pct),
						row(L.fFollow, h("input", { type: "checkbox", checked: s.followMouse, onChange: onBool("followMouse") }), null),
					]),
					group(L.gDisk, [
						slider("diskTemp", L.fTemp, 2000, 25000, 500, (v) => Math.round(v) + " K"),
						slider("diskGain", L.fGain, 0, 5, 0.1, (v) => v.toFixed(1)),
						slider("diskOpacity", L.fOpacity, 0, 1, 0.05, (v) => v.toFixed(2)),
						slider("diskContrast", L.fContrast, 0, 3, 0.1, (v) => v.toFixed(1)),
						slider("starGain", L.fStar, 0, 1.5, 0.05, (v) => v.toFixed(2)),
						slider("exposure", L.fExposure, 0.2, 3, 0.05, (v) => v.toFixed(2)),
						slider("dilationMin", L.fDilation, 0.05, 1, 0.05, (v) => v.toFixed(2)),
					]),
					group(L.gBg, [
						row(L.fSky, h("input", { type: "checkbox", checked: s.sky, onChange: onBool("sky") }), null),
						h("p", { style: S.note }, L.nSky),
					]),
					group(L.gRender, [
						row(L.fQuality, qualitySelect, null),
						slider("holeOpacity", L.fHoleOpacity, 0, 1, 0.05, pct),
						slider("skyOpacity", L.fSkyOpacity, 0, 1, 0.05, pct),
						h("button", { style: S.btn, type: "button", onClick: () => patch(Object.assign({}, DEFAULTS)) }, L.reset),
					]),
					h("p", { style: S.note }, L.footer),
				);
			}

			// ---------------- conversation probe (context mode) ----------------
			function SessionProbe(props) {
				const hook = props && typeof props.useSession === "function" ? props.useSession : null;
				const count = hook ? hook((snap) => {
					if (snap == null || snap.blank) return -1;
					if (Array.isArray(snap.nodes)) return snap.nodes.length;
					return -1;
				}) : -1;
				React.useEffect(() => {
					if (rt.ctxNodes !== count) {
						rt.ctxNodes = count;
						notify();
					}
				}, [count]);
				return null;
			}

			// ---------------- slot registrations ----------------
			slots.inject("shell.overlay", () => slots.register(
				{ name: "shell.overlay", id: "blackhole-canvas", order: -100, label: "Blackhole" },
				() => h(BlackholeCanvas),
			));
			slots.inject("settings.section", () => slots.register(
				{ name: "settings.section", id: "blackhole", order: 30, label: () => {
					const dshZh = locale && typeof locale.getLocale === "function" && locale.getLocale().id === "zh";
					return dshZh ? I18N["zh-CN"].nav : I18N.en.nav;
				} },
				(props) => h(SettingsPage, props),
			));
			slots.inject("conversation.session.header.utilities", () => slots.register(
				{ name: "conversation.session.header.utilities", id: "blackhole-probe", order: 900, label: "Blackhole" },
				(props) => h(SessionProbe, props),
			));
			} catch (err) {
				console.error("[blackhole] apply threw:", err);
			}
		}

		// The client kernel only exposes services declared via `inject` — this
		// is the shipped client-plugin pattern (cf. dsh-client-ui-* bundles).
		exports.apply = apply;
		exports.inject = ["slots"];
		return module.exports;
	}
});
