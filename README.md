# OpenClaw Study — Academic Assistant Skills

一套为 AI Agent（OpenClaw / Claude Code）打造的学术工作流技能包，覆盖从资源采集到论文润色的完整学术流程。

## 六大核心能力

| # | Skill | 用途 | 来源 |
|:--|:------|:-----|:-----|
| 1 | **agent-browser** | 浏览器自动化，搜索/下载学术资源 | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) |
| 2 | **diagram-generator** | 生成思维导图、流程图、架构图等 | [ClawHub @Matthewyin](https://clawhub.ai/Matthewyin/diagram-generator) + [mcp-diagram-generator](https://www.npmjs.com/package/mcp-diagram-generator) |
| 3 | **pptx** | 读取/创建/编辑 PowerPoint 演示文稿 | [ClawHub @ivangdavila](https://clawhub.ai/ivangdavila/powerpoint-pptx) + [markitdown](https://github.com/microsoft/markitdown) + [PptxGenJS](https://github.com/gitbrent/PptxGenJS) |
| 4 | **ship-learn-next** | 将学习内容转化为可交付的行动计划 | [ClawHub @Matthewyin](https://clawhub.ai/Matthewyin/ship-learn-next) |
| 5 | **personal-assistant** | 持久记忆、任务管理、进度追踪 | [ailabs-393/ai-labs-claude-skills](https://github.com/ailabs-393/ai-labs-claude-skills) |
| 6 | **humanizer-zh** | 去除中文文本的 AI 写作痕迹 | [ClawHub @liuxy951129-cpu](https://clawhub.ai/liuxy951129-cpu/humanizer-zh) |

## 典型工作流

```
找资源 → 提取知识 → 制定计划 → 追踪进度 → 润色输出
  ①          ②③         ④          ⑤          ⑥
```

**示例：3 个月掌握《世界电影史》**

1. `agent-browser` 搜索并下载教材资源
2. `diagram-generator` 生成电影史时间线思维导图
3. `pptx` 解析 50 页课件 PPT 的核心要点
4. `ship-learn-next` 制定 5 轮迭代学习计划
5. `personal-assistant` 每周追踪进度、调整安排
6. `humanizer-zh` 润色期末论文，去除 AI 痕迹

## 项目结构

```
├── SKILL.md                        # 主编排文档（决策路由 + 全流程串联）
├── references/workflow.md          # 详细工作流参考
├── skills/
│   ├── agent-browser/              # 浏览器自动化
│   ├── diagram-generator/          # 图表生成（MCP Server）
│   ├── humanizer-zh/               # 中文文本人性化
│   ├── personal-assistant/         # 持久记忆助手（含 Python 脚本）
│   │   └── scripts/
│   │       ├── assistant_db.py     # 数据库管理
│   │       └── task_helper.py      # 任务管理
│   ├── pptx/                       # PowerPoint 处理
│   └── ship-learn-next/            # 行动学习计划
└── vendor/                         # 第三方依赖源码
    ├── agent-browser/              # submodule: vercel-labs/agent-browser
    ├── markitdown/                 # submodule: microsoft/markitdown
    ├── PptxGenJS/                  # submodule: gitbrent/PptxGenJS
    └── mcp-diagram-generator/      # npm 包源码
```

## 快速开始

### 1. 克隆仓库

```bash
git clone --recurse-submodules https://github.com/rtjowo/OpenClaw-Study.git
cd OpenClaw-Study
```

### 2. 安装依赖

```bash
# 浏览器自动化
npm install -g agent-browser
agent-browser install

# PPT 处理
pip install "markitdown[pptx]" Pillow
npm install -g pptxgenjs

# 图表生成（MCP Server，二选一）
# 方式 A：npx 自动下载
# 方式 B：使用本地 vendor/mcp-diagram-generator
```

### 3. 配置 MCP Server（图表生成）

在 `~/.claude.json` 或项目 `.claude.json` 中添加：

```json
{
  "mcpServers": {
    "mcp-diagram-generator": {
      "command": "npx",
      "args": ["-y", "mcp-diagram-generator"]
    }
  }
}
```

### 4. 作为 OpenClaw Skill 使用

将 `SKILL.md` 复制到你的项目 `.codebuddy/skills/academic-assistant/` 目录，或直接在对话中引用本仓库。

## 许可证

各 skill 遵循其原始许可证（大部分为 MIT-0）。详见各子目录内的说明。
