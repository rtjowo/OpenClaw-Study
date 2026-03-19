---
name: academic-assistant
description: "This skill should be used when the user needs academic research assistance, including resource discovery and downloading, document deep analysis (PDF/PPTX), knowledge visualization (mind maps, flowcharts, architecture diagrams), structured learning plans, persistent memory for progress tracking, and Chinese text humanization. It covers the full academic workflow from material collection to polished output."
---

# Academic Assistant

## Overview

A comprehensive academic workflow skill that integrates six core capabilities: web resource discovery (agent-browser), visual diagram generation (diagram-generator), PPTX deep analysis and creation (pptx), action-oriented learning management (ship-learn-next), persistent memory and progress tracking (personal-assistant), and Chinese text humanization (Humanizer-zh). Designed to automate the full pipeline from research material collection to professional deliverables.

## Workflow Decision Tree

Determine the user's intent and route to the appropriate capability:

| User Intent | Capability | Section |
|:---|:---|:---|
| Search/download academic resources | agent-browser | Phase 1 |
| Visualize knowledge structures | diagram-generator | Phase 2A |
| Read/create/edit PPTX presentations | pptx | Phase 2B |
| Create structured learning plans | ship-learn-next | Phase 3 |
| Track progress, manage tasks, remember context | personal-assistant | Phase 4 |
| Polish Chinese text, remove AI writing traces | Humanizer-zh | Phase 5 |

Multiple capabilities can be chained in a single session. For example: download resources (Phase 1) → extract knowledge (Phase 2) → create learning plan (Phase 3) → track progress (Phase 4) → polish final output (Phase 5).

---

## Phase 1: Resource Discovery — agent-browser

### Prerequisites

```bash
npm install -g agent-browser
agent-browser install --with-deps
```

### Core Workflow

1. **Navigate**: `agent-browser open <url>`
2. **Snapshot**: `agent-browser snapshot -i` (get interactive elements with refs like @e1, @e2)
3. **Interact** using refs from the snapshot
4. **Re-snapshot** after navigation or significant DOM changes

### Key Commands

```bash
# Search and navigate
agent-browser open <url>
agent-browser snapshot -i         # Interactive elements only
agent-browser click @e1           # Click element by ref
agent-browser fill @e2 "text"     # Fill input field

# Download and save
agent-browser upload @e1 file.pdf # Upload files
agent-browser screenshot path.png # Save screenshot
agent-browser pdf output.pdf      # Save as PDF

# Session management
agent-browser state save auth.json    # Save session
agent-browser state load auth.json    # Restore session
agent-browser close                   # Close browser
```

### Academic Use Cases

- Search academic databases for papers and textbooks
- Navigate publisher sites and download resources
- Capture web-based course materials as PDF
- Automate multi-page resource collection

---

## Phase 2A: Knowledge Visualization — diagram-generator

### Prerequisites

Requires `mcp-diagram-generator` MCP server. Add to Claude Code config:

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

### Supported Diagram Types

| Type | Best Format | Use Case |
|:---|:---|:---|
| Flowchart | mermaid / drawio | Processes, decision trees |
| Sequence diagram | mermaid | Component interactions over time |
| Mind map | mermaid / excalidraw | Hierarchical knowledge, brainstorming |
| Class diagram | mermaid | OOP structures |
| ER diagram | mermaid | Database schemas |
| Architecture diagram | drawio | System architecture, complex components |

### Format Selection

- **drawio**: Complex diagrams, nested containers, fine-grained styling, manual editing
- **mermaid**: Quick generation, code-friendly, version control, documentation
- **excalidraw**: Hand-drawn style, creative flexibility, informal sketches

### Workflow

1. Extract key concepts from the academic material
2. Determine diagram type (mind map for overview, flowchart for process, timeline for history)
3. Generate structured JSON specification
4. Call MCP server: `generate_diagram` with `diagram_spec`
5. Output saved automatically to `diagrams/{format}/`

### Academic Use Cases

- Generate mind maps for textbook chapter overviews
- Create timelines for historical subjects
- Visualize theoretical frameworks and relationships
- Build architecture diagrams for technical systems

---

## Phase 2B: Presentation Analysis & Creation — pptx

### Quick Reference

| Task | Method |
|:---|:---|
| Read/analyze content | `python -m markitdown presentation.pptx` |
| Edit existing PPTX | Read `references/workflow.md` for unpack/repack flow |
| Create from scratch | Use PptxGenJS (`npm install -g pptxgenjs`) |

### Reading PPTX

```bash
# Text extraction
python -m markitdown presentation.pptx

# Visual overview (thumbnails)
python scripts/thumbnail.py presentation.pptx

# Raw XML inspection
python scripts/office/unpack.py presentation.pptx unpacked/
```

### Creating Presentations

Design principles for academic presentations:

- **Choose bold, topic-specific color schemes** — not generic blue
- **Dominant color hierarchy**: 60-70% primary, secondary accents, one highlight
- **Dark/light contrast**: Dark backgrounds for title/closing, light for content
- **Every slide needs a visual element** — images, charts, icons, or shapes
- **Font pairing**: Bold title font (36-44pt) + clean body font (14-16pt)
- **Minimum margins**: 0.5", spacing between blocks 0.3-0.5"

### QA Process (Mandatory)

```bash
# Content QA
python -m markitdown output.pptx

# Visual QA — convert to images
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide
```

Inspect each slide image for overlapping elements, text overflow, low contrast, and placeholder remnants. Fix and re-verify.

### Dependencies

```bash
pip install "markitdown[pptx]" Pillow
npm install -g pptxgenjs
```

---

## Phase 3: Structured Learning — ship-learn-next

### Core Framework: Ship-Learn-Next

Each learning cycle follows three phases:

1. **SHIP (交付)**: Create something real — a report, analysis, presentation, or code
2. **LEARN (复盘)**: Honest reflection on what happened
3. **NEXT (迭代)**: Plan next iteration based on insights

**Key principle**: 100 reps > 100 hours of passive study. Learning = doing better, not knowing more.

### When to Activate

- User has materials and wants to "implement the learnings"
- User needs to "turn this into a plan" or "make it actionable"
- User wants to break big goals into deliverable iterations
- User says "I read/watched X, now what do I do?"

### Workflow

1. **Read content**: Analyze provided materials (textbooks, papers, notes)
2. **Extract core lessons**: Identify actionable principles, skills being taught, case studies
3. **Define quest**: Set 4-8 week learning goal with specific, measurable success criteria
4. **Design Rep 1**: Break into the smallest deliverable version (1-7 days)
5. **Create rep plan**: Ship Goal → Success Criteria → What You'll Learn → Resources → Timeline → Action Steps → Reflection Questions
6. **Map Reps 2-5**: Progressive difficulty, each adding one new element

### Output Format

Save as `Ship-Learn-Next Plan - [Quest Title].md` containing:

- Quest Overview (goal, source, core lessons)
- Rep 1-5 detailed plans with timelines
- Action steps and reflection questions
- Source material references

### Critical Rules

- ❌ Do NOT create "study plans" → create SHIP plans
- ❌ Do NOT list all reading materials → curate minimum for current rep
- ❌ Do NOT accept vague goals ("learn X") → require "deliver Y by date Z"
- ✅ Always ask: "What's the smallest version you could ship this week?"

---

## Phase 4: Persistent Memory — personal-assistant

### Overview

Provides persistent memory across sessions. Tracks user profiles, tasks, schedules, and context. Data stored at `~/.claude/personal_assistant/`.

### Setup

```bash
# Check if profile exists
python3 scripts/assistant_db.py has_profile

# Get full profile
python3 scripts/assistant_db.py get_profile

# Quick summary
python3 scripts/assistant_db.py summary
```

### Profile Management

On first use, collect: name, timezone, work hours, goals (short-term + long-term), routines, preferences, recurring commitments.

```python
import sys
sys.path.append('[SKILL_DIR]/scripts')
from assistant_db import save_profile, get_profile

profile = {
    "name": "User Name",
    "timezone": "Asia/Shanghai",
    "work_hours": {"start": "09:00", "end": "17:00"},
    "goals": {
        "short_term": ["Complete thesis draft by month end"],
        "long_term": ["Publish 2 papers this year"]
    },
    "preferences": {
        "communication_style": "concise",
        "reminder_style": "gentle",
        "task_organization": "by_priority"
    }
}
save_profile(profile)
```

### Task Management

```bash
# List all tasks
python3 scripts/task_helper.py list

# Add task
python3 scripts/task_helper.py add "Write literature review" high "2025-12-15" academic

# Complete task
python3 scripts/task_helper.py complete <task_id>

# View overdue
python3 scripts/task_helper.py overdue
```

### Context Memory

```python
from assistant_db import add_context

# Track learning progress
add_context("interaction", "User completed Rep 2 of film history learning plan", "normal")

# Important permanent notes
add_context("note", "User prefers visual learning with diagrams", "high")

# Temporary context (auto-cleanup after 7 days)
add_context("temporary", "Working on midterm paper deadline next week", "normal")
```

### Data Retention

- Profile & pending tasks: never auto-deleted
- Completed tasks & past events: 30 days
- Interactions: 30 days (unless high importance)
- Temporary context: 7 days

```bash
# Monthly cleanup
python3 scripts/assistant_db.py cleanup
```

---

## Phase 5: Chinese Text Humanization — Humanizer-zh

### Overview

Remove AI writing traces from Chinese text. Based on Wikipedia's "Signs of AI writing" guide, adapted for Chinese context.

### 5 Core Rules

1. **删除填充短语**: Remove openers and filler crutches ("此外", "值得注意的是", "总而言之")
2. **打破公式结构**: Avoid binary contrasts, dramatic setups, rhetorical devices
3. **变化节奏**: Mix sentence lengths, vary paragraph endings (two-item lists beat three-item ones)
4. **信任读者**: State directly, skip softening and hand-holding
5. **删除金句**: Rewrite overly quotable, polished-sounding phrases

### AI Patterns to Detect and Fix

**Content patterns:**
- Overstating significance ("标志着", "体现了", "至关重要")
- Vague attribution ("专家认为", "行业报告显示")
- Promotional language ("充满活力的", "令人叹为观止的")
- Formulaic "challenges and future outlook" sections

**Language patterns:**
- High-frequency AI vocabulary: 此外、至关重要、深入探讨、增强、培养、格局、强调
- Copula avoidance: using "作为/代表/充当" instead of "是"
- Negation parallelism: "不仅仅是……而是……"
- Forced rule-of-three: cramming ideas into triples
- Synonym cycling: excessive variation to avoid repetition

**Style patterns:**
- Excessive dashes, bold, emoji usage
- Inline-header vertical lists (bold + colon)
- Curly quotes instead of straight quotes

**Communication patterns:**
- Collaborative traces ("希望这对您有帮助")
- Sycophantic tone and excessive qualification
- Generic positive conclusions

### Humanization Process

1. **Scan** text against the 24 patterns above
2. **Rewrite** flagged segments with natural expression
3. **Inject personality**: Have opinions, acknowledge complexity, use "我", allow imperfection
4. **Verify** with quality scoring (1-10 on each dimension):
   - 直接性 (Directness)
   - 节奏 (Rhythm)
   - 信任度 (Trust)
   - 真实性 (Authenticity)
   - 精炼度 (Conciseness)

### Example

**Before (AI-flavored):**
> 新的软件更新作为公司致力于创新的证明。此外，它提供了无缝、直观和强大的用户体验——确保用户能够高效地完成目标。这不仅仅是一次更新，而是我们思考生产力方式的革命。

**After (Humanized):**
> 软件更新添加了批处理、键盘快捷键和离线模式。来自测试用户的早期反馈是积极的，大多数报告任务完成速度更快。

---

## Chained Workflow Example

**Scenario**: User needs to master "World Film History" for an academic paper in 3 months.

1. **Phase 1** → `agent-browser` searches and downloads textbook resources
2. **Phase 2A** → `diagram-generator` creates a mind map of film history timeline
3. **Phase 2B** → `pptx` extracts core points from 50-page lecture slides
4. **Phase 3** → `ship-learn-next` creates a 5-rep learning plan targeting professional film analysis capability
5. **Phase 4** → `personal-assistant` tracks weekly progress, adjusts schedules, sends reminders
6. **Phase 5** → `Humanizer-zh` polishes the final paper to read like an experienced film student's independent analysis
