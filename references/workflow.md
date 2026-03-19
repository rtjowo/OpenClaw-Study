# Academic Assistant — Detailed Workflow Reference

## Full Pipeline Walkthrough

This document provides detailed guidance for executing the complete academic workflow from resource collection to polished deliverables.

---

## 1. Resource Collection Pipeline (agent-browser)

### Search Strategy

When searching for academic resources, follow this priority order:

1. **Open-access repositories first**: arXiv, PubMed Central, SSRN, Google Scholar
2. **Institutional repositories**: University digital libraries
3. **General web search**: For supplementary materials, lecture slides, course notes

### Multi-Step Download Example

```bash
# Step 1: Open search engine
agent-browser open https://scholar.google.com

# Step 2: Get interactive elements
agent-browser snapshot -i

# Step 3: Fill search box and submit
agent-browser fill @e1 "world film history textbook"
agent-browser click @e2  # Search button

# Step 4: Wait for results
agent-browser wait --load networkidle

# Step 5: Snapshot results and click target
agent-browser snapshot -i
agent-browser click @e3  # First relevant result

# Step 6: Download if available
agent-browser snapshot -i
agent-browser click @e5  # Download button

# Step 7: Save as PDF if no download available
agent-browser pdf "world-film-history.pdf"
```

### Session Persistence

For sites requiring login (e.g., university libraries):

```bash
# Login once, save session
agent-browser open https://library.example.edu
agent-browser snapshot -i
agent-browser fill @e1 "student_id"
agent-browser fill @e2 "password"
agent-browser click @e3
agent-browser wait --url "/dashboard"
agent-browser state save library-auth.json

# Reuse in future sessions
agent-browser state load library-auth.json
agent-browser open https://library.example.edu/search
```

---

## 2. Knowledge Extraction and Visualization

### From Text to Diagram

**Step 1**: Extract key concepts from source material

Identify: main topics, subtopics, relationships, timelines, hierarchies

**Step 2**: Choose visualization type

| Material Type | Recommended Diagram |
|:---|:---|
| Textbook overview | Mind map |
| Historical subject | Timeline (flowchart) |
| Technical system | Architecture diagram |
| Theoretical framework | Class/ER diagram |
| Research methodology | Flowchart |
| Literature review | Mind map with clusters |

**Step 3**: Generate diagram specification

For a mind map example (World Film History):

```json
{
  "format": "mermaid",
  "title": "World Film History Overview",
  "elements": [
    {"id": "root", "type": "node", "name": "World Film History"},
    {"id": "silent", "type": "node", "name": "Silent Era (1895-1927)"},
    {"id": "golden", "type": "node", "name": "Golden Age (1927-1960)"},
    {"id": "newwave", "type": "node", "name": "New Wave (1960-1980)"},
    {"id": "modern", "type": "node", "name": "Modern Era (1980-present)"},
    {"id": "e1", "type": "edge", "source": "root", "target": "silent"},
    {"id": "e2", "type": "edge", "source": "root", "target": "golden"},
    {"id": "e3", "type": "edge", "source": "root", "target": "newwave"},
    {"id": "e4", "type": "edge", "source": "root", "target": "modern"}
  ]
}
```

### PPTX Deep Reading Workflow

**For existing lecture slides:**

```bash
# 1. Extract all text content
python -m markitdown lecture-slides.pptx > lecture-content.md

# 2. Generate visual thumbnails
python scripts/thumbnail.py lecture-slides.pptx

# 3. If deeper XML inspection needed
python scripts/office/unpack.py lecture-slides.pptx unpacked/
# Then inspect unpacked/ppt/slides/ for individual slide XML
```

**For creating academic presentations:**

Follow the design principles in SKILL.md Phase 2B. Key academic-specific tips:

- Use **Midnight Executive** or **Charcoal Minimal** palettes for formal academic talks
- Use **Ocean Gradient** or **Serene Sage** for research presentations
- Include source citations on every data slide
- Use large data callouts (60-72pt numbers) for key statistics

---

## 3. Learning Plan Design (ship-learn-next)

### Quest Design Template

```markdown
# Ship-Learn-Next Plan - [Quest Title]

## Quest Overview
- **Goal**: [Specific, measurable outcome]
- **Source**: [Material being learned from]
- **Timeline**: [4-8 weeks]
- **Core Lessons**: [3-5 key actionable insights]

## Rep 1: [Smallest Deliverable]
- **Ship Goal**: [What to create]
- **Success Criteria**: [How to know it's done]
- **What You'll Learn**: [Skill being built]
- **Resources Needed**: [Minimum materials]
- **Timeline**: [1-7 days]
- **Action Steps**:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
- **Reflection Questions**:
  - What worked well?
  - What was harder than expected?
  - What would you change next time?

## Rep 2-5: [Progressive iterations]
[Each rep adds ONE new element, increasing difficulty]
```

### Academic Application Examples

**Example: "Master film analysis in 3 months"**

| Rep | Ship Goal | Timeline |
|:---|:---|:---|
| Rep 1 | Write a 500-word shot analysis of one scene from Citizen Kane | Week 1 |
| Rep 2 | Compare editing techniques in two French New Wave films (1500 words) | Week 2-3 |
| Rep 3 | Create a 10-slide presentation on Italian Neorealism's visual language | Week 4-5 |
| Rep 4 | Write a 3000-word essay analyzing a modern film using classical film theory | Week 6-8 |
| Rep 5 | Deliver a 15-minute academic presentation with Q&A defense | Week 9-12 |

---

## 4. Progress Tracking Integration

### Connecting ship-learn-next with personal-assistant

After creating a learning plan, automatically set up tracking:

```python
from assistant_db import add_task, add_context

# Create tasks for each Rep
add_task({
    "title": "Rep 1: Shot analysis of Citizen Kane",
    "priority": "high",
    "category": "academic",
    "due_date": "2025-12-07",
    "estimated_time": "4 hours"
})

# Track progress context
add_context("note", "Started film history learning plan: 5 reps over 12 weeks", "high")
```

### Weekly Check-in Protocol

1. Load profile and tasks: `python3 scripts/assistant_db.py summary`
2. Compare current progress against ship-learn-next plan
3. If behind schedule, propose adjusted timeline
4. Update context with weekly status
5. Set reminders for upcoming rep deadlines

---

## 5. Text Humanization Checklist

### Quick Pre-Submission Scan

Before finalizing any academic output, run through this checklist:

**Pass 1: Kill AI Vocabulary**
- [ ] Remove: 此外、至关重要、深入探讨、增强、培养、格局、强调
- [ ] Replace "作为……的证明" with direct statements
- [ ] Remove "不仅仅是……而是……" constructions

**Pass 2: Fix Structure**
- [ ] Break up any three-item lists (use two or four instead)
- [ ] Vary sentence lengths (mix short punchy with longer ones)
- [ ] Remove formulaic "challenges and future outlook" sections
- [ ] Delete generic positive conclusions

**Pass 3: Add Humanity**
- [ ] Include specific examples, dates, numbers instead of vague claims
- [ ] Express an opinion or observation where appropriate
- [ ] Use first person ("我认为", "据我观察") when natural
- [ ] Allow imperfect structure — not every paragraph needs perfect symmetry

**Pass 4: Quality Score** (target: 35+ out of 50)
- Directness: /10
- Rhythm: /10
- Trust: /10
- Authenticity: /10
- Conciseness: /10

---

## 6. Emergency Workflows

### "I have a deadline tomorrow"

1. Skip Phase 1 (use whatever materials are available)
2. Phase 2A: Quick mind map for structure → 15 min
3. Phase 3: Design single-rep "ship now" plan → 10 min
4. Write draft using the structure → main time allocation
5. Phase 5: Humanize the output → 20 min
6. Phase 2B: Generate presentation if needed → 30 min

### "I need to prepare for an oral exam"

1. Phase 2A: Generate comprehensive mind maps of all topics
2. Phase 3: Create rapid-fire Q&A rep plan (Rep 1: answer 10 questions, Rep 2: explain 5 concepts without notes)
3. Phase 4: Track which topics are weak, prioritize review
