# Agent Browser

Browser automation CLI for AI agents. By Vercel Labs.

Full source code is included as a git submodule at `vendor/agent-browser/`.

## Installation

```bash
# Global install (recommended)
npm install -g agent-browser
agent-browser install  # Downloads Chrome for Testing

# Or install from source (vendor/agent-browser/)
cd vendor/agent-browser
pnpm install
pnpm build
pnpm build:native   # Requires Rust (https://rustup.rs)
pnpm link --global
agent-browser install
```

## Key Commands

```bash
# Navigate
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

## Academic Use Cases

- Search academic databases for papers and textbooks
- Navigate publisher sites and download resources
- Capture web-based course materials as PDF
- Automate multi-page resource collection

## Source

- GitHub: https://github.com/vercel-labs/agent-browser
- License: See vendor/agent-browser/LICENSE
