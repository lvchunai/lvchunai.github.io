# 简历网站项目计划

## 项目概述
**目标**：打造一个精致产品感的前端工程师简历网站，给面试官留下深刻印象

**定位**：极简聚焦型 — "我是谁、我能做什么、联系我"

**技术栈**：React + Vite

**视觉风格**：浅色模式，米白暖灰基底 + 精致排版 + 细腻阴影

---

## 阶段规划

| 阶段 | 任务 | 状态 | 备注 |
|------|------|------|------|
| 1 | 项目初始化 - Vite + React | complete | |
| 2 | 设计系统搭建 - 配色、字体、样式变量 | complete | |
| 3 | 布局框架 - 导航、响应式结构 | complete | |
| 4 | Hero 区域实现 | complete | |
| 5 | 关于我板块 | complete | |
| 6 | 核心能力卡片组件 | complete | |
| 7 | 联系方式板块 | complete | |
| 8 | 交互动画实现 | complete | |
| 9 | 响应式优化 | complete | |
| 10 | 性能优化与部署 | complete | 构建成功 |

---

## 设计决策记录

### 配色方案
- 背景：`#FAF9F7`（暖调米白）
- 卡片：`#FFFFFF`（纯白）
- 主文字：`#1A1A1A`
- 次要文字：`#6B6B6B`
- 强调色：`#3B82F6`（蓝色）、`#F59E0B`（琥珀点缀）

### 字体选择
- 英文标题：CalSans / General Sans
- 英文正文：Satoshi / Switzer
- 中文：系统字体（思源黑体/苹方）

### 核心交互
- 页面加载：分段淡入， stagger 延迟
- 滚动动画：IntersectionObserver 触发
- 按钮 hover：上浮 2px + 阴影加深

---

## 文件清单
- `src/index.html` - 入口
- `src/main.jsx` - React 入口
- `src/App.jsx` - 主组件
- `src/components/` - 组件目录
- `src/styles/` - 样式文件

---

## 成功标准
- [ ] 加载速度 < 2s
- [ ] Lighthouse 性能分 > 90
- [ ] 响应式完美适配移动端
- [ ] 所有交互流畅无卡顿
