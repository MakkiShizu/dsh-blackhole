# dsh-blackhole

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**阅读语言：** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md)

![dsh-blackhole demo](demo.gif)

一个基于测地线追踪的史瓦西**黑洞，悬浮在 DeepSeek Harness (DSH) 之中** ——
面向 DSH Web 界面的常驻客户端插件，移植自
[s0xDk/ghostty-blackhole](https://github.com/s0xDk/ghostty-blackhole)（Ghostty
自定义着色器，MIT）。黑洞位于页面之上的点击穿透 WebGL2 浮层中：近场的每个像素
都实时积分自己的史瓦西测地线（Binet 形式 `a = -(3/2) h² x / r⁵`），因此阴影、
吸积盘、光子环与引力透镜全部由光线追踪自然涌现 —— 没有一处是画上去的。

## 渲染内容

- **阴影** — 撞击参数小于 `b_crit = (3√3/2) r_s` 的光线螺旋坠入视界，返回为黑。
- **吸积盘** — 薄开普勒盘，Shakura–Sunyaev 温度分布，相对论多普勒频移与束流
  （`g = √(1 − 1.5 r_s/r)/(1 − β·k̂)`）；远侧弧线越过阴影上方与下方（星际穿越即视感）。
- **光子环** — 在 `1.5 r_s` 光子球附近缠绕的光线。
- **引力透镜** — 开启可选 **星空背景** 时，逃逸光线投影到程序生成的星空"天空平面"
  （浏览器无法把页面像素喂给 WebGL）；远场使用解析弱场偏折并带轻微色差。
  关闭（默认）时，黑洞直接悬浮在页面上方：只有阴影、光子环与吸积盘，周围完全透明。
- **引力时间膨胀** — 黑洞越重，吸积盘条纹随时间走得越慢。

## 模式

| 模式 | 行为 |
| --- | --- |
| **演示巡游** | 42 秒自运行展示：从右上角种子长到满尺寸，同时交叉淡入 8 个调参预设（Inferno → Gargantua → M87* → Ember → Quasar → Blazar → Pure Lens）。 |
| **番茄钟** | 55/5 墙钟周期 + 90 秒键盘/指针空闲检测（浏览器 `Date.now()` 替代 Ghostty 失效的 `iDate`）。 |
| **上下文** | 上游 token 模式的 DSH 原生类比：无/空白会话 → 无黑洞；黑洞随对话增长（`1 − e^(−nodes/70)`），填充越多移动越快、范围越广。 |
| **手动** | 固定等级 0–100 %。 |

上游调音器与 `ghostty-blackhole-main` 的 15 个吸积盘预设、吸积盘刚性自旋、
带位置缓动的跟随指针、**自动外观**（每 5–20 秒随机变换吸积盘外观：随机预设或
完全随机的参数，带平滑过渡）、完整的设置页（设置 → **Blackhole**，含实时状态：
模式 / 等级 / FPS / 着色器错误）、**星空背景**开关、独立的黑洞/星空不透明度滑块，
以及四语言界面（简体中文 / 繁體中文 / 日本語 / English）。底部 10% 工作区永不被
覆盖；所有状态仅存于内存。

## 用法

安装后每次 `dsh web` 会话都会自动出现黑洞 —— 无需任何操作。默认：**上下文**模式
（黑洞随当前会话内容量变化，空白会话时隐藏）、星空背景关闭、底部 10% 受保护。

打开 设置 → **Blackhole** 即可控制：

- **模式** — 演示巡游（42 秒预设展示）· 番茄钟（55/5 + 空闲淡出）· 上下文（对话规模）· 手动（固定等级）· 关闭。
- **预设** — 15 种吸积盘外观之一；或开启**自动外观**，每 5–20 秒随机切换。
- **尺寸与运动** — 黑洞半径、最大填充面积、透镜深度、漂移速度、**自旋速度**（盘+光子环刚性自转）、工作区、跟随指针。
- **吸积盘** — 温度、亮度、不透明度、条纹对比度、星场亮度、曝光、时间膨胀下限。
- **背景** — 被透镜的星空（默认关闭）。
- **渲染** — 画质（测地线步数）、独立的黑洞/星空不透明度。
- **语言** — 简体中文 / 繁體中文 / 日本語 / English。

## 安装（常驻，每次 `dsh web` 启动自动加载）

DSH 的 `web` profile 由 bundle 补丁层 + 你自己的补丁层
`$DSH_HOME/profiles/web/cordis.patch.yml` 组合而成。安装客户端插件 =
添加一个包 + 一行配置：

```powershell
# 1. 克隆到 profile 目录树
New-Item -ItemType Directory -Force "$env:USERPROFILE\.dsh\profiles\web\packages"
git clone https://github.com/<you>/dsh-blackhole "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 2. 链接进 profile（在 package.json 记录依赖）
dsh plugin --profile web add "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 3. 宿主侧解析锚点（裸包名从提升的 node_modules 解析；pnpm 只把本地目录
#    链接进 web/node_modules）
New-Item -ItemType Junction `
  -Path "$env:USERPROFILE\.dsh\profiles\node_modules\dsh-blackhole" `
  -Target "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 4. 添加配置行：把 install/cordis.patch.example.yml 追加到
#    $DSH_HOME/profiles/web/cordis.patch.yml
```

重启 `dsh web`。每次启动时 `dsh-client-modules` 会把该行的 `dsh.client` 声明
扫描进 `window.__DSH_BOOT__`，并从 `/plugins/dsh-blackhole/client.js` 提供
bundle —— 无需任何会话操作。

> 第 3 步的 junction 是唯一需要手工维护的部分：当 `dsh plugin add/remove` 其他包
> 清理了提升的 node_modules 后，请重建它。

### 卸载

删除 `cordis.patch.yml` 中的 `blackhole` 行，然后
`dsh plugin --profile web remove dsh-blackhole`。

## 工作原理

- `package.json` — `dsh.client` 声明（`platform: web`、`immediately: true`）
  以及模块系统扫描的 `./client` 导出。
- `lib/index.js` — 宿主半部：空操作 `apply`，让宿主 Loader 行得以挂载。
- `lib/client.js` — 浏览器 bundle：经典脚本，注册
  `window.__ModuleLoader__.load({ id, factory })` 工厂，其导出即为 Cordis 插件。
  它只依赖种子模块 `react`，并且像所有官方客户端插件一样声明
  `inject: ["slots"]` —— 客户端内核只暴露插件 `inject` 中列出的服务
  （否则 `ctx.get("slots")` 为 `undefined`）。
- 插件注册三个槽位：`shell.overlay`（全屏点击穿透 WebGL2 画布，order −100）、
  `settings.section`（控制面板）、`conversation.session.header.utilities`
  （空渲染探针，读取会话快照的 `blank` / `nodes.length` 叶子字段驱动上下文模式）。
- `blackhole.glsl` 的 GLSL ES 3.00 移植，含两处有意改动：
  `gl_FragCoord.y` 转换为 Ghostty 的**自上而下**约定；结构体返回三元改为
  if/else —— 因为 ANGLE（D3D11）在 ESSL 3.00 下也禁止对结构体使用 `?:`。

## 致谢与许可

- 着色器物理与演示巡游：[s0xDk/ghostty-blackhole](https://github.com/s0xDk/ghostty-blackhole)（MIT，© 2026 s13k），参考 Eric Bruneton 的 [black hole shader](https://ebruneton.github.io/black_hole_shader/)。
- 预设数值与跟随指针思路：[XboxNahida/ghostty-blackhole-main](https://github.com/XboxNahida/ghostty-blackhole-main)（MIT）。
- 模式语义交叉校验：[962412311/win-ghostty-blackhole](https://github.com/962412311/win-ghostty-blackhole)。

MIT — 见 [LICENSE](LICENSE)。
