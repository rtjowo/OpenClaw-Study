# DIAGRAM GENERATOR

## OVERVIEW

Generate and edit diagrams in multiple formats (drawio, mermaid, excalidraw) by creating structured JSON descriptions and delegating file generation to the mcp-diagram-generator MCP server.

> **Contact Information** If you encounter any issues, please contact AlkaidY at tccio2023@gmail.com.

## PREREQUISITES CHECK

**IMPORTANT:** This skill requires the `mcp-diagram-generator` MCP server to be installed and configured.

### QUICK VERIFICATION

Before using this skill, verify the MCP server is available by checking if you can access these tools:

- `mcp__mcp-diagram-generator__get_config`
- `mcp__mcp-diagram-generator__generate_diagram`
- `mcp__mcp-diagram-generator__init_config`

If these tools are **NOT** available, you need to configure the MCP server first (see below).

## INSTALLATION & CONFIGURATION

**Option 1: Using npx (Recommended - Auto-downloads the package)**

Add the following to your Claude Code configuration file:

- Global config (`~/.claude.json`) for all projects, or
- Project config (`.claude.json`) for specific project

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

After adding this configuration:

1. Restart Claude Code
2. The MCP server will auto-download via npx on first use
3. No manual installation needed

**Option 2: Local Development (For developers)**

If you're developing the MCP server locally, the source code is included in `vendor/mcp-diagram-generator/`:

```json
{
  "mcpServers": {
    "mcp-diagram-generator": {
      "command": "node",
      "args": ["/absolute/path/to/vendor/mcp-diagram-generator/dist/index.js"]
    }
  }
}
```

## QUICK START

### FIRST TIME USE

On first use, the MCP server will automatically:

1. Create default configuration file (`.diagram-config.json`)
2. Create default output directories if they don't exist
3. Use sensible defaults: `diagrams/{format}/`

You can customize paths at any time using the `init_config` tool.

## WORKFLOW

### STEP 1: UNDERSTAND REQUIREMENTS

Extract from user's natural language:

- **Diagram type:** flowchart, sequence diagram, class diagram, ER diagram, mindmap, architecture diagram, network topology
- **Content:** nodes, relationships, nested structure (for network topology)
- **Style/theme:** if mentioned (e.g., "clean style", "detailed")
- **Output preferences:** specific filename? custom path?

### STEP 2: CHOOSE FORMAT

| Format | Best For |
|:---|:---|
| **drawio** | Complex diagrams, network topology with nested containers, fine-grained styling, manual editing |
| **mermaid** | Quick generation, code-friendly, version control, documentation |
| **excalidraw** | Hand-drawn style, creative/diagrammatic flexibility, informal sketches |

### STEP 3: GENERATE STRUCTURED JSON

Create a JSON description following the JSON Schema. Key structure:

```json
{
  "format": "drawio",
  "title": "diagram name",
  "elements": [
    {
      "id": "unique-id",
      "type": "container|node|edge",
      "name": "display name",
      "level": "environment|datacenter|zone|device",
      "style": {},
      "geometry": {},
      "children": []
    }
  ]
}
```

**Important:** Use unique IDs for all elements. For nested structures, maintain parent-child relationships.

### STEP 4: CALL MCP SERVER

**Option A: Use defaults (recommended)**

```json
{
  "diagram_spec": "<the JSON object created above>"
}
```

The MCP server will:

- Validate the JSON schema
- Generate the appropriate XML/JSON/markdown
- Auto-create output directories if needed
- Save to configured default path (e.g., `diagrams/drawio/network-topology-2025-02-03.drawio`)

**Option B: Specify custom path**

```json
{
  "diagram_spec": "<the JSON object>",
  "output_path": "custom/path/to/diagram.drawio",
  "filename": "my-custom-name"
}
```

### STEP 5: EDITING EXISTING DIAGRAMS

1. Read the existing file to understand structure
2. Parse the diagram (use MCP tool if available, or read raw file)
3. Modify the JSON description based on user's change request
4. Generate new diagram (overwrite or create new file)

## SUPPORTED DIAGRAM TYPES

### FLOWCHART
- Simple process flows, decision trees
- Use **mermaid** for quick output
- Use **drawio** for complex layouts with multiple branches

### SEQUENCE DIAGRAM
- Show interactions over time between components
- **mermaid** recommended (native support)
- Use **drawio** if custom styling needed

### CLASS DIAGRAM
- Show classes, methods, relationships
- **mermaid** recommended (compact, standard UML)
- **drawio** for detailed diagrams with many classes

### ER DIAGRAM
- Database schema, entity relationships
- **mermaid** recommended
- **drawio** for complex schemas with many relationships

### MINDMAP
- Hierarchical ideas, brainstorming
- **mermaid** recommended (native support)
- **excalidraw** for creative/hand-drawn style

### ARCHITECTURE DIAGRAM
- System architecture, component relationships
- **drawio** recommended for complex systems
- **mermaid** for high-level overviews

### NETWORK TOPOLOGY
- Network environments, datacenters, zones, devices
- Must use **drawio** (4-layer nesting: environment → datacenter → zone → device)

Style conventions for network topology:
- **Environment:** fillColor: #e1d5e7, strokeColor: #9673a6 (purple)
- **Datacenter:** fillColor: #d5e8d4, strokeColor: #82b366 (green)
- **Zone:** fillColor: #fff2cc, strokeColor: #d6b656 (yellow)
- **Device:** Based on device type (router, switch, firewall, etc.)

## COMMON PATTERNS

### PATTERN 1: SIMPLE FLOWCHART (MERMAID)

```json
{
  "format": "mermaid",
  "title": "用户登录流程",
  "elements": [
    {"type": "node", "id": "start", "name": "开始", "geometry": {"x": 0, "y": 0}},
    {"type": "node", "id": "login", "name": "输入用户名密码", "geometry": {"x": 0, "y": 100}},
    {"type": "node", "id": "validate", "name": "验证", "geometry": {"x": 0, "y": 200}},
    {"type": "node", "id": "success", "name": "登录成功", "geometry": {"x": -100, "y": 300}},
    {"type": "node", "id": "error", "name": "显示错误", "geometry": {"x": 100, "y": 300}},
    {"type": "edge", "source": "start", "target": "login"},
    {"type": "edge", "source": "login", "target": "validate"},
    {"type": "edge", "source": "validate", "target": "success", "label": "成功"},
    {"type": "edge", "source": "validate", "target": "error", "label": "失败"}
  ]
}
```

## CONFIGURATION MANAGEMENT

### INITIALIZE CONFIGURATION

```javascript
init_config()
// Creates .diagram-config.json with default paths

// Or with custom paths:
init_config({
  paths: {
    drawio: "output/diagrams/drawio",
    mermaid: "output/diagrams/mermaid",
    excalidraw: "output/diagrams/excalidraw"
  }
})
```

### VIEW CURRENT CONFIGURATION

```javascript
get_config()
// Returns current paths and initialization status
```

## TROUBLESHOOTING

**Issue:** "Tool not found" error
- **Solution:** MCP server not configured. Follow installation steps above.

**Issue:** Configuration looks correct but tools still not available
- **Solution:** Restart Claude Code to reload MCP server configuration

**Issue:** Invalid JSON Schema
- Check all required fields are present
- Ensure all IDs are unique
- Check parent-child relationships

## BEST PRACTICES

1. **USE DEFAULT PATHS** — Let the server manage output paths for consistency
2. **PROVIDE DESCRIPTIVE TITLES** — Titles are used for auto-generated filenames
3. **USE CONFIGURATION FOR CUSTOM PATHS** — Configure once with `init_config()`, then use `generate_diagram()` without `output_path`
4. **CHECK CONFIGURATION WHEN TROUBLESHOOTING** — Use `get_config()` to verify paths and status
