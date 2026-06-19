/* ==========================================================================
   DOTBASHRC - BASHRC BUILDER & VISUALIZER APPLICATION SCRIPT
   ========================================================================== */

// Predefined Prompt Catalog
const TEMPLATES = [
  {
    id: 'ubuntu-default',
    name: 'Ubuntu Classic',
    description: 'The standard Ubuntu prompt. Safe, familiar, and colored green/blue.',
    ps1: '\\[\\e[01;32m\\]\\u@\\h\\[\\e[00m\\]:\\[\\e[01;34m\\]\\w\\[\\e[00m\\]\\$ ',
    tags: ['classic', 'minimal']
  },
  {
    id: 'minimal-arrow',
    name: 'Minimal Chevron',
    description: 'Sleek path-only layout with a neon green arrow. Perfect for modern workspaces.',
    ps1: '\\[\\e[01;34m\\]\\W\\[\\e[00m\\] \\[\\e[01;32m\\]❯\\[\\e[00m\\] ',
    tags: ['minimal']
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Gold/Cyan',
    description: 'High contrast aesthetic combining neon yellow warnings, cyan hosts, and magenta paths.',
    ps1: '\\[\\e[01;33m\\]⚡ \\[\\e[01;31m\\]\\u\\[\\e[90m\\]@\\[\\e[01;36m\\]\\h \\[\\e[01;35m\\]\\W\\[\\e[00m\\] \\[\\e[01;33m\\]$ \\[\\e[00m\\]',
    tags: ['colorful']
  },
  {
    id: 'git-focused',
    name: 'Git-Ready Prompt',
    description: 'Designed for developers. Shows username, path, and automatically queries git branch name.',
    ps1: '\\[\\e[01;36m\\]\\u\\[\\e[00m\\] at \\[\\e[01;33m\\]\\w\\[\\e[01;35m\\]\\$(__git_ps1)\\[\\e[01;32m\\]\\$ \\[\\e[00m\\]',
    tags: ['git', 'colorful']
  },
  {
    id: 'dracula-theme',
    name: 'Dracula Segment',
    description: 'Beautiful Dracula palette colors: purple user, pink host, and cyan directory.',
    ps1: '\\[\\e[01;35m\\]\\u\\[\\e[38;5;141m\\]@\\h \\[\\e[01;36m\\]\\w\\[\\e[01;32m\\] \\$ \\[\\e[00m\\]',
    tags: ['colorful', 'classic']
  },
  {
    id: 'powerline-block',
    name: 'Powerline Segment',
    description: 'Uses glyphs to separate blocks. Requires a Powerline-compatible font to render correctly.',
    ps1: '\\[\\e[30;42m\\] \\u \\[\\e[30;44m\\]\\[\\e[37;44m\\] \\W \\[\\e[0m\\e[34m\\]\\[\\e[0m\\] \\$ ',
    tags: ['powerline', 'colorful']
  },
  {
    id: 'two-line-node',
    name: 'Two-Line Architect',
    description: 'Structured multi-line prompt with line connectors. Great for long paths.',
    ps1: '\\[\\e[36m\\]┌─ \\[\\e[32m\\]\\u\\[\\e[37m\\]@\\[\\e[32m\\]\\h \\[\\e[90m\\][\\[\\e[33m\\]\\t\\[\\e[90m\\]] \\[\\e[34m\\]\\w\\n\\[\\e[36m\\]└─\\[\\e[35m\\]\\$ \\[\\e[0m\\]',
    tags: ['classic', 'git']
  },
  {
    id: 'monochrome-bold',
    name: 'Nordic Clean',
    description: 'Muted Nord theme style using whites, greys, and icy blues.',
    ps1: '\\[\\e[38;5;244m\\]\\u\\[\\e[38;5;239m\\]::\\[\\e[38;5;110m\\]\\h \\[\\e[38;5;250m\\]\\W \\[\\e[38;5;110m\\]$ \\[\\e[0m\\]',
    tags: ['minimal']
  },
  {
    id: 'toxic-wasteland',
    name: 'Toxic Wasteland',
    description: 'Biohazard warning theme featuring glowing radioactive green highlights and red skull warnings.',
    ps1: '\\[\\e[95m\\]☣ \\[\\e[01;92m\\]\\u\\[\\e[90m\\]@\\[\\e[01;32m\\]\\h \\[\\e[5;91m\\]☠\\[\\e[00m\\] \\[\\e[36m\\]\\W\\[\\e[00m\\] \\$ ',
    tags: ['colorful']
  },
  {
    id: 'ide-statusbar',
    name: 'IDE Statusbar',
    description: 'Uses inverted colors and chevrons to replicate a Vim or Tmux powerline status indicator line.',
    ps1: '\\[\\e[38;5;232;48;5;117m\\] BASH \\[\\e[0;38;5;117;48;5;238m\\]\\[\\e[38;5;253;48;5;238m\\] \\w \\[\\e[0;38;5;238m\\]\\[\\e[0m\\] \\$ ',
    tags: ['powerline', 'colorful']
  },
  {
    id: 'emoji-minimal',
    name: 'Emoji Minimalist',
    description: 'Uses graphic icons (folder, lightning bolt) for structured navigation.',
    ps1: '\\[\\e[0m\\]📂 \\[\\e[01;34m\\]\\W\\[\\e[00m\\] \\[\\e[33m\\]⚡\\[\\e[00m\\] \\[\\e[01;36m\\]❯\\[\\e[00m\\] ',
    tags: ['minimal']
  },
  {
    id: 'starship-rust',
    name: 'Starship Style',
    description: 'Modern prompt layout heavily inspired by the Rust Starship shell decorator prompt.',
    ps1: '\\[\\e[01;32m\\]🚀 \\[\\e[38;5;45m\\]\\u\\[\\e[00m\\] in \\[\\e[01;34m\\]\\W\\[\\e[38;5;125m\\]\\$(__git_ps1)\\[\\e[00m\\]\\n\\[\\e[01;32m\\]❯\\[\\e[00m\\] ',
    tags: ['git', 'minimal']
  },
  {
    id: 'ssh-cloud',
    name: 'Cloud Instance (SSH)',
    description: 'Clean light-blue environment prompt resembling a cloud server console.',
    ps1: '\\[\\e[38;5;111m\\]☁  \\[\\e[38;5;117m\\]\\u@\\h \\[\\e[38;5;153m\\]\\W \\[\\e[38;5;111m\\]☁ \\[\\e[0m\\] \\$ ',
    tags: ['classic']
  },
  {
    id: 'glitch-retro',
    name: 'Glitch Retro Terminal',
    description: 'Imitates a decaying CRT phosphor display with custom glitch characters and alerts.',
    ps1: '\\[\\e[31m\\]\\u\\[\\e[33m\\]@\\[\\e[36m\\]\\h\\[\\e[32m\\] \\W \\[\\e[5;31m\\]■\\[\\e[0m\\] ',
    tags: ['colorful']
  },
  {
    id: 'elegant-line',
    name: 'Timeline Double',
    description: 'Double-row prompt tracking execution timestamps above commands.',
    ps1: '\\[\\e[90m\\]\\t \\[\\e[34m\\]\\w\\[\\e[0m\\]\\n\\[\\e[32m\\]❯\\[\\e[0m\\] ',
    tags: ['classic', 'minimal']
  },
  {
    id: 'matrix-rain',
    name: 'Matrix Falling Rain',
    description: 'Phosphor green theme with glowing highlights. Emulates the Matrix code interface.',
    ps1: '\\[\\e[32m\\]$ \\[\\e[1;32m\\]\\u\\[\\e[0;32m\\]@\\[\\e[1;32m\\]\\h\\[\\e[0;32m\\]:\\w\\$ \\[\\e[0m\\]',
    tags: ['colorful', 'minimal']
  }
];

// Predefined branch names for simulation
const RANDOM_BRANCHES = [
  'main',
  'dev',
  'feature/auth-bypass',
  'feature/login-ui',
  'bugfix/db-leak-fix',
  'release-v2.3.0',
  'hotfix-patch-5'
];

const getRandomBranch = () => RANDOM_BRANCHES[Math.floor(Math.random() * RANDOM_BRANCHES.length)];

// App State
const state = {
  config: {
    username: 'guest',
    hostname: 'linux',
    directory: '~/projects/dotbashrc',
    gitBranch: getRandomBranch(),
    gitEnabled: true,
    isRoot: false,
    exitStatusFailed: false
  },
  ps1: TEMPLATES[0].ps1,
  terminalTheme: 'dracula',
  activeCategory: 'all',
  searchQuery: '',
  
  // Extended state for bashrc generator
  aliases: {
    git: true,
    nav: true,
    safe: false,
    custom: [
      { name: 'c', value: 'clear' }
    ]
  },
  functions: {
    mkcd: true,
    extract: true,
    weather: false,
    todo: false
  },
  options: {
    autocd: true,
    cdspell: true,
    globstar: true,
    histsize: 10000,
    histfilesize: 20000,
    ignoredups: true,
    ignorespace: true,
    timestamp: true
  },
  
  // Active simulated todo checklist tasks
  todoList: [
    '[ ] Learn advanced bash scripting configurations',
    '[ ] Customize my prompt theme in dotbashrc dashboard'
  ]
};

// ==========================================================================
// COLOR HELPER
// ==========================================================================
function get256RGB(n) {
  if (n < 8) {
    const standardColors = [
      'var(--term-black)', 'var(--term-red)', 'var(--term-green)', 'var(--term-yellow)',
      'var(--term-blue)', 'var(--term-magenta)', 'var(--term-cyan)', 'var(--term-white)'
    ];
    return standardColors[n];
  }
  if (n < 16) {
    const brightColors = [
      'var(--term-bright-black)', 'var(--term-bright-red)', 'var(--term-bright-green)', 'var(--term-bright-yellow)',
      'var(--term-bright-blue)', 'var(--term-bright-magenta)', 'var(--term-bright-cyan)', 'var(--term-bright-white)'
    ];
    return brightColors[n - 8];
  }
  if (n >= 16 && n <= 231) {
    const r = Math.floor((n - 16) / 36);
    const g = Math.floor(((n - 16) % 36) / 6);
    const b = (n - 16) % 6;
    const val = [0, 95, 135, 175, 215, 255];
    return `rgb(${val[r]}, ${val[g]}, ${val[b]})`;
  }
  if (n >= 232 && n <= 255) {
    const gray = 8 + (n - 232) * 10;
    return `rgb(${gray}, ${gray}, ${gray})`;
  }
  return 'initial';
}

// ==========================================================================
// PS1 PARSER ENGINE
// ==========================================================================
function parsePS1(ps1Str, config) {
  const username = config.username || 'guest';
  const hostname = config.hostname || 'localhost';
  const shortHost = hostname.split('.')[0];
  const directory = config.directory || '~';
  
  // Calculate short directory base name
  let shortDir = directory;
  if (directory === '/') {
    shortDir = '/';
  } else {
    const parts = directory.replace(/\/$/, '').split('/');
    shortDir = parts[parts.length - 1] || '/';
  }

  // Git integration
  const gitBranchText = config.gitEnabled && config.gitBranch ? ` (${config.gitBranch})` : '';

  // Time & Date strings
  const pad = (n) => String(n).padStart(2, '0');
  const now = new Date();
  
  const dateStr = now.toDateString().substring(0, 10);
  
  const time24 = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  
  let hours12 = now.getHours() % 12;
  hours12 = hours12 ? hours12 : 12;
  const time12 = `${pad(hours12)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const timeAmpm = `${pad(hours12)}:${pad(now.getMinutes())} ${ampm}`;
  
  const time24Short = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  // Exit status indicator
  const shellSymbol = config.isRoot ? '#' : '$';

  const segments = [];
  
  // Active formatting state variables
  let bold = false;
  let underline = false;
  let blink = false;
  let fg = null;
  let bg = null;
  let inlineStyles = {};

  // Tokenizer pattern matches: ANSI codes, escaped brackets, macros, and plain strings
  const tokenRegex = /(\\e\[[0-9;]*m|\\033\[[0-9;]*m|\\x1b\[[0-9;]*m|\\\[|\\\]|\\u|\\h|\\H|\\w|\\W|\\d|\\t|\\T|\\@|\\A|\\s|\\v|\\V|\\\$|\\n|\\r|\\\\|\\?\\$\\(__git_ps1\\)|[^\$\\\x1b\[\]]+|.)/g;
  const matches = ps1Str.match(tokenRegex) || [];

  for (let token of matches) {
    if (token.startsWith('\\e[') || token.startsWith('\\033[') || token.startsWith('\\x1b[')) {
      const paramMatch = token.match(/\[([0-9;]*)m/);
      if (paramMatch) {
        const paramStr = paramMatch[1];
        const codes = paramStr ? paramStr.split(';').map(Number) : [0];
        
        for (let i = 0; i < codes.length; i++) {
          const code = codes[i];
          if (code === 0) {
            bold = false;
            underline = false;
            blink = false;
            fg = null;
            bg = null;
            inlineStyles = {};
          } else if (code === 1) {
            bold = true;
          } else if (code === 4) {
            underline = true;
          } else if (code === 5) {
            blink = true;
          } else if (code >= 30 && code <= 37) {
            fg = (code - 30).toString();
          } else if (code === 38) {
            // Extended 256 or RGB color mode for foreground
            if (codes[i + 1] === 5 && i + 2 < codes.length) {
              const colorNum = codes[i + 2];
              fg = `color256-${colorNum}`;
              inlineStyles.color = get256RGB(colorNum);
              i += 2;
            } else if (codes[i + 1] === 2 && i + 4 < codes.length) {
              const r = codes[i + 2];
              const g = codes[i + 3];
              const b = codes[i + 4];
              fg = 'color-rgb';
              inlineStyles.color = `rgb(${r},${g},${b})`;
              i += 4;
            }
          } else if (code === 39) {
            fg = null;
            delete inlineStyles.color;
          } else if (code >= 40 && code <= 47) {
            bg = (code - 40).toString();
          } else if (code === 48) {
            // Extended 256 or RGB color mode for background
            if (codes[i + 1] === 5 && i + 2 < codes.length) {
              const colorNum = codes[i + 2];
              bg = `color256-${colorNum}`;
              inlineStyles.backgroundColor = get256RGB(colorNum);
              i += 2;
            } else if (codes[i + 1] === 2 && i + 4 < codes.length) {
              const r = codes[i + 2];
              const g = codes[i + 3];
              const b = codes[i + 4];
              bg = 'color-rgb';
              inlineStyles.backgroundColor = `rgb(${r},${g},${b})`;
              i += 4;
            }
          } else if (code === 49) {
            bg = null;
            delete inlineStyles.backgroundColor;
          } else if (code >= 90 && code <= 97) {
            fg = `bright-${code - 90}`;
          } else if (code >= 100 && code <= 107) {
            bg = `bright-${code - 100}`;
          }
        }
      }
    } else if (token === '\\[' || token === '\\]') {
      // Ignored non-printing character wrappers
      continue;
    } else {
      let segmentText = '';
      let isSpecial = false;
      let type = '';

      switch (token) {
        case '\\u':
          segmentText = username;
          isSpecial = true;
          type = 'username';
          break;
        case '\\h':
          segmentText = shortHost;
          isSpecial = true;
          type = 'hostname';
          break;
        case '\\H':
          segmentText = hostname;
          isSpecial = true;
          type = 'hostname-full';
          break;
        case '\\w':
          segmentText = directory;
          isSpecial = true;
          type = 'directory';
          break;
        case '\\W':
          segmentText = shortDir;
          isSpecial = true;
          type = 'directory-base';
          break;
        case '\\d':
          segmentText = dateStr;
          isSpecial = true;
          type = 'date';
          break;
        case '\\t':
          segmentText = time24;
          isSpecial = true;
          type = 'time-24';
          break;
        case '\\T':
          segmentText = time12;
          isSpecial = true;
          type = 'time-12';
          break;
        case '\\@':
          segmentText = timeAmpm;
          isSpecial = true;
          type = 'time-ampm';
          break;
        case '\\A':
          segmentText = time24Short;
          isSpecial = true;
          type = 'time-24-short';
          break;
        case '\\s':
          segmentText = 'bash';
          isSpecial = true;
          type = 'shell';
          break;
        case '\\v':
          segmentText = '5.0';
          isSpecial = true;
          type = 'version';
          break;
        case '\\V':
          segmentText = '5.0.17';
          isSpecial = true;
          type = 'release';
          break;
        case '\\$':
          segmentText = shellSymbol;
          isSpecial = true;
          type = 'symbol';
          break;
        case '\\n':
          segmentText = '\n';
          isSpecial = true;
          type = 'newline';
          break;
        case '\\r':
          segmentText = '\r';
          isSpecial = true;
          type = 'carriage-return';
          break;
        case '\\\\':
          segmentText = '\\';
          break;
        case '$(__git_ps1)':
        case '\\$(__git_ps1)':
          segmentText = gitBranchText;
          isSpecial = true;
          type = 'git-branch';
          break;
        default:
          segmentText = token;
      }

      segments.push({
        text: segmentText,
        rawToken: token,
        bold,
        underline,
        blink,
        fg,
        bg,
        inlineStyles: { ...inlineStyles },
        isSpecial,
        type
      });
    }
  }

  return segments;
}

// Safe renderer that protects against XSS
function renderPS1ToElement(segments, container) {
  if (!container) return;
  container.replaceChildren();

  segments.forEach(seg => {
    if (seg.text === '\n') {
      container.appendChild(document.createElement('br'));
      return;
    }
    if (seg.text === '\r') {
      return;
    }

    const span = document.createElement('span');
    span.textContent = seg.text; // Safe text insertion prevents XSS

    if (seg.bold) span.classList.add('ansi-bold');
    if (seg.underline) span.classList.add('ansi-underline');
    if (seg.blink) span.classList.add('ansi-blink');

    // Mapped class colors
    if (seg.fg) {
      if (seg.fg.startsWith('color256-') || seg.fg === 'color-rgb') {
        span.style.color = seg.inlineStyles.color;
      } else {
        span.classList.add(`ansi-fg-${seg.fg}`);
      }
    }
    if (seg.bg) {
      if (seg.bg.startsWith('color256-') || seg.bg === 'color-rgb') {
        span.style.backgroundColor = seg.inlineStyles.backgroundColor;
      } else {
        span.classList.add(`ansi-bg-${seg.bg}`);
      }
    }

    container.appendChild(span);
  });
}

// Update both Terminal Prompts, Exports, and Breakdowns
function updateAllPreviews() {
  const segments = parsePS1(state.ps1, state.config);
  
  // Render main active terminal prompt
  const activePromptContainer = document.getElementById('terminal-prompt-preview');
  if (activePromptContainer) {
    renderPS1ToElement(segments, activePromptContainer);
  }

  // Update exports
  updateExportOutput();

  // Render PS1 Syntax inspector breakdown
  updateSyntaxBreakdown(segments);
}

// ==========================================================================
// EXPORTS DYNAMIC ~/.BASHRC COMPILER
// ==========================================================================
function updateExportOutput() {
  const codeOutput = document.getElementById('code-export-output');
  if (!codeOutput) return;

  let exportBlock = `# ==========================================================================\n`;
  exportBlock += `# CUSTOM BASHRC CONFIGURATION\n`;
  exportBlock += `# Generated dynamically via dotbashrc — https://deep5050.github.io/dotbashrc/\n`;
  exportBlock += `# ==========================================================================\n\n`;

  // 1. History Settings
  exportBlock += `# --- Terminal History Rules ---\n`;
  exportBlock += `export HISTSIZE=${state.options.histsize}\n`;
  exportBlock += `export HISTFILESIZE=${state.options.histfilesize}\n`;
  
  let histcontrol = [];
  if (state.options.ignoredups) histcontrol.push('ignoredups');
  if (state.options.ignorespace) histcontrol.push('ignorespace');
  if (histcontrol.length > 0) {
    exportBlock += `export HISTCONTROL=${histcontrol.join(':')}\n`;
  }
  if (state.options.timestamp) {
    exportBlock += `export HISTTIMEFORMAT="%Y-%m-%d %H:%M:%S "\n`;
  }
  exportBlock += `\n`;

  // 2. Shell Toggles (shopt)
  exportBlock += `# --- Shell Options (shopt) ---\n`;
  if (state.options.autocd) exportBlock += `shopt -s autocd 2>/dev/null\n`;
  if (state.options.cdspell) exportBlock += `shopt -s cdspell 2>/dev/null\n`;
  if (state.options.globstar) exportBlock += `shopt -s globstar 2>/dev/null\n`;
  exportBlock += `\n`;

  // 3. Git prompt helper
  if (state.config.gitEnabled) {
    exportBlock += `# --- Git Prompt Integration Helper ---\n`;
    exportBlock += `# Source git-sh-prompt to automatically extract active repository branches.\n`;
    exportBlock += `if [ -f /usr/lib/git-core/git-sh-prompt ]; then\n`;
    exportBlock += `  . /usr/lib/git-core/git-sh-prompt\n`;
    exportBlock += `elif [ -f /etc/bash_completion.d/git-prompt ]; then\n`;
    exportBlock += `  . /etc/bash_completion.d/git-prompt\n`;
    exportBlock += `fi\n\n`;
  }

  // 4. Prompt configuration (PS1)
  exportBlock += `# --- Terminal Prompt (PS1) ---\n`;
  exportBlock += `export PS1="${state.ps1}"\n\n`;

  // 5. Aliases
  exportBlock += `# --- Command Aliases ---\n`;
  
  if (state.aliases.git) {
    exportBlock += `# Git shortcuts\n`;
    exportBlock += `alias g='git'\n`;
    exportBlock += `alias gs='git status'\n`;
    exportBlock += `alias gp='git push'\n`;
    exportBlock += `alias gd='git diff'\n`;
    exportBlock += `alias gcm='git commit -m'\n`;
  }
  
  if (state.aliases.nav) {
    if (!exportBlock.endsWith('\n\n')) exportBlock += `\n`;
    exportBlock += `# Directory navigation\n`;
    exportBlock += `alias ..='cd ..'\n`;
    exportBlock += `alias ...='cd ../..'\n`;
    exportBlock += `alias ll='ls -laF --color=auto'\n`;
    exportBlock += `alias la='ls -A --color=auto'\n`;
  }
  
  if (state.aliases.safe) {
    if (!exportBlock.endsWith('\n\n')) exportBlock += `\n`;
    exportBlock += `# Interactive safeguards\n`;
    exportBlock += `alias rm='rm -i'\n`;
    exportBlock += `alias cp='cp -i'\n`;
    exportBlock += `alias mv='mv -i'\n`;
  }

  if (state.aliases.custom.length > 0) {
    if (!exportBlock.endsWith('\n\n')) exportBlock += `\n`;
    exportBlock += `# User custom aliases\n`;
    state.aliases.custom.forEach(item => {
      const escapedValue = item.value.replace(/'/g, "'\\''");
      exportBlock += `alias ${item.name}='${escapedValue}'\n`;
    });
  }
  exportBlock += `\n`;

  // 6. Functions
  if (state.functions.mkcd) {
    exportBlock += `# Create directory and navigate into it\n`;
    exportBlock += `function mkcd() {\n`;
    exportBlock += `  mkdir -p "$1" && cd "$1"\n`;
    exportBlock += `}\n\n`;
  }

  if (state.functions.extract) {
    exportBlock += `# Smart universal archive extractor\n`;
    exportBlock += `function extract() {\n`;
    exportBlock += `  if [ -f "$1" ] ; then\n`;
    exportBlock += `    case "$1" in\n`;
    exportBlock += `      *.tar.bz2)   tar xjf "$1"     ;;\n`;
    exportBlock += `      *.tar.gz)    tar xzf "$1"     ;;\n`;
    exportBlock += `      *.bz2)       bunzip2 "$1"     ;;\n`;
    exportBlock += `      *.rar)       unrar x "$1"     ;;\n`;
    exportBlock += `      *.gz)        gunzip "$1"      ;;\n`;
    exportBlock += `      *.tar)       tar xf "$1"      ;;\n`;
    exportBlock += `      *.tbz2)      tar xjf "$1"     ;;\n`;
    exportBlock += `      *.tgz)       tar xzf "$1"     ;;\n`;
    exportBlock += `      *.zip)       unzip "$1"       ;;\n`;
    exportBlock += `      *.Z)         uncompress "$1"  ;;\n`;
    exportBlock += `      *.7z)        7z x "$1"        ;;\n`;
    exportBlock += `      *)           echo "'$1' cannot be extracted via extract()" ;;\n`;
    exportBlock += `    esac\n`;
    exportBlock += `  else\n`;
    exportBlock += `    echo "'$1' is not a valid file"\n`;
    exportBlock += `  fi\n`;
    exportBlock += `}\n\n`;
  }

  if (state.functions.weather) {
    exportBlock += `# Fetch command-line weather forecast summary\n`;
    exportBlock += `function weather() {\n`;
    exportBlock += `  curl -s "https://wttr.in/\${1:-London}?1m" || echo "Failed to fetch weather data"\n`;
    exportBlock += `}\n\n`;
  }

  if (state.functions.todo) {
    exportBlock += `# Simple file-based todo manager\n`;
    exportBlock += `function todo() {\n`;
    exportBlock += `  local TODO_FILE="$HOME/.todo.txt"\n`;
    exportBlock += `  if [ "$1" = "add" ]; then\n`;
    exportBlock += `    shift\n`;
    exportBlock += `    echo "[ ] $*" >> "$TODO_FILE"\n`;
    exportBlock += `    echo "Task added."\n`;
    exportBlock += `  elif [ "$1" = "done" ]; then\n`;
    exportBlock += `    sed -i "\${2}s/\\[ \\]/\\[x\\]/" "$TODO_FILE"\n`;
    exportBlock += `    echo "Task marked as done."\n`;
    exportBlock += `  elif [ "$1" = "clear" ]; then\n`;
    exportBlock += `    > "$TODO_FILE"\n`;
    exportBlock += `    echo "Todo list cleared."\n`;
    exportBlock += `  else\n`;
    exportBlock += `    if [ -f "$TODO_FILE" ]; then\n`;
    exportBlock += `      nl -w2 -s'. ' "$TODO_FILE"\n`;
    exportBlock += `    else\n`;
    exportBlock += `      echo "No tasks. Run 'todo add <task>' to get started!"\n`;
    exportBlock += `    fi\n`;
    exportBlock += `  fi\n`;
    exportBlock += `}\n\n`;
  }

  codeOutput.textContent = exportBlock.trim() + '\n';
}

// ==========================================================================
// SYNTAX BREAKDOWN GENERATOR
// ==========================================================================
function updateSyntaxBreakdown(segments) {
  const breakdownContainer = document.getElementById('ps1-breakdown');
  if (!breakdownContainer) return;
  breakdownContainer.replaceChildren();

  segments.forEach(seg => {
    const tokenDiv = document.createElement('div');
    tokenDiv.className = 'inspector-token';
    
    const tokenTag = document.createElement('span');
    tokenTag.className = 'token-tag';
    tokenTag.textContent = seg.rawToken;
    tokenDiv.appendChild(tokenTag);

    const tokenDesc = document.createElement('span');
    tokenDesc.className = 'token-desc';
    
    let description = '';
    if (seg.isSpecial) {
      switch (seg.type) {
        case 'username': description = 'Username (reads variable)'; break;
        case 'hostname': description = 'Short Hostname (reads variable)'; break;
        case 'hostname-full': description = 'Full Hostname'; break;
        case 'directory': description = 'Full Working Directory Path'; break;
        case 'directory-base': description = 'Base Directory Name Only'; break;
        case 'date': description = 'Formatted Date'; break;
        case 'time-24': description = '24-hour Time (HH:MM:SS)'; break;
        case 'time-12': description = '12-hour Time (HH:MM:SS)'; break;
        case 'time-ampm': description = '12-hour Time with AM/PM'; break;
        case 'time-24-short': description = '24-hour Time short (HH:MM)'; break;
        case 'shell': description = 'Shell Program Name'; break;
        case 'version': description = 'Shell major version'; break;
        case 'release': description = 'Shell release version'; break;
        case 'symbol': description = 'Prompt indicator ($ or #)'; break;
        case 'newline': description = 'Line break (splits prompt)'; break;
        case 'git-branch': description = 'Git Branch indicator'; break;
        default: description = 'Special Macro';
      }
    } else if (seg.rawToken.startsWith('\\e[') || seg.rawToken.startsWith('\\033[')) {
      description = 'Color/style formatting';
    } else {
      description = `Literal Text "${seg.text}"`;
    }

    tokenDesc.textContent = `→ ${description}`;
    tokenDiv.appendChild(tokenDesc);

    if (seg.fg) {
      if (seg.fg.startsWith('color256-') || seg.fg === 'color-rgb') {
        tokenTag.style.color = seg.inlineStyles.color;
      } else {
        tokenTag.classList.add(`ansi-fg-${seg.fg}`);
      }
    }
    if (seg.bg) {
      if (seg.bg.startsWith('color256-') || seg.bg === 'color-rgb') {
        tokenTag.style.backgroundColor = seg.inlineStyles.backgroundColor;
      } else {
        tokenTag.classList.add(`ansi-bg-${seg.bg}`);
      }
    }

    breakdownContainer.appendChild(tokenDiv);
  });
}

// ==========================================================================
// CUSTOM ALIAS BUILDER VIEW RENDERER
// ==========================================================================
function renderCustomAliasesList() {
  const container = document.getElementById('custom-aliases-list');
  if (!container) return;
  
  container.replaceChildren();
  
  if (state.aliases.custom.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'text-muted';
    emptyMsg.style.fontSize = '12px';
    emptyMsg.textContent = 'No custom aliases configured yet.';
    container.appendChild(emptyMsg);
    return;
  }
  
  state.aliases.custom.forEach((item, idx) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'alias-item';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'alias-item-text';
    textSpan.textContent = `alias ${item.name}='${item.value}'`;
    itemDiv.appendChild(textSpan);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'alias-delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.title = 'Remove alias';
    deleteBtn.addEventListener('click', () => {
      state.aliases.custom.splice(idx, 1);
      renderCustomAliasesList();
      updateExportOutput();
    });
    itemDiv.appendChild(deleteBtn);
    
    container.appendChild(itemDiv);
  });
}

// Safe error helper to prevent alert dialogue blocking
function showAliasError(msg) {
  let errSpan = document.getElementById('alias-error');
  if (!errSpan) {
    errSpan = document.createElement('span');
    errSpan.id = 'alias-error';
    errSpan.style.color = '#ff5f56';
    errSpan.style.fontSize = '11px';
    errSpan.style.marginTop = '4px';
    errSpan.style.display = 'none';
    const form = document.querySelector('.custom-alias-form');
    if (form) form.appendChild(errSpan);
  }
  
  if (msg) {
    errSpan.textContent = msg;
    errSpan.style.display = 'block';
  } else {
    errSpan.style.display = 'none';
  }
}

// ==========================================================================
// INTERACTIVE CONSOLE SYSTEM (TERMINAL PREVIEW)
// ==========================================================================
function getMockFileList(isLong) {
  const currentDir = state.config.directory;
  let files = ['LICENSE', 'README.md', 'app.js', 'index.html', 'style.css'];
  
  if (currentDir === '~') {
    files = ['projects'];
  } else if (currentDir === '~/projects') {
    files = ['dotbashrc', 'another-app'];
  } else if (currentDir.startsWith('~/projects/dotbashrc/')) {
    files = ['src', 'assets', 'package.json'];
  }
  
  if (isLong) {
    const pre = document.createElement('pre');
    pre.style.fontFamily = 'var(--font-mono)';
    pre.style.fontSize = '13px';
    pre.style.lineHeight = '1.4';
    
    let totalSize = files.length * 4;
    
    // Header total line
    const totalDiv = document.createElement('div');
    totalDiv.textContent = `total ${totalSize}`;
    pre.appendChild(totalDiv);
    
    files.forEach(f => {
      const isDir = (f === 'projects' || f === 'dotbashrc' || f === 'another-app' || f === 'src' || f === 'assets');
      const perm = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
      const links = isDir ? '3' : '1';
      const size = isDir ? '4096' : (f === 'app.js' ? '40354' : (f === 'style.css' ? '28217' : '13251'));
      const colorClass = isDir ? 'color: var(--term-blue); font-weight: bold;' : (f.endsWith('.js') ? 'color: var(--term-green); font-weight: bold;' : 'color: var(--term-fg);');
      
      const spanLine = document.createElement('div');
      spanLine.style.display = 'flex';
      spanLine.style.gap = '14px';
      
      const metaSpan = document.createElement('span');
      metaSpan.style.color = 'var(--term-dim)';
      metaSpan.textContent = `${perm}  ${links} guest  linux  ${String(size).padStart(5)} Jun 20 01:10`;
      
      const nameSpan = document.createElement('span');
      nameSpan.textContent = f;
      nameSpan.setAttribute('style', colorClass);
      
      spanLine.appendChild(metaSpan);
      spanLine.appendChild(nameSpan);
      pre.appendChild(spanLine);
    });
    return pre;
  } else {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexWrap = 'wrap';
    div.style.gap = '16px';
    div.style.fontFamily = 'var(--font-mono)';
    
    files.forEach(f => {
      const span = document.createElement('span');
      span.textContent = f;
      const isDir = (f === 'projects' || f === 'dotbashrc' || f === 'another-app' || f === 'src' || f === 'assets');
      if (isDir) {
        span.style.color = 'var(--term-blue)';
        span.style.fontWeight = 'bold';
      } else if (f.endsWith('.js')) {
        span.style.color = 'var(--term-green)';
        span.style.fontWeight = 'bold';
      } else {
        span.style.color = 'var(--term-fg)';
      }
      div.appendChild(span);
    });
    return div;
  }
}

function getMockWeather() {
  const pre = document.createElement('pre');
  pre.style.color = 'var(--term-yellow)';
  pre.style.fontFamily = 'var(--font-mono)';
  pre.style.lineHeight = '1.3';
  pre.textContent = 
`Weather report: ${state.config.hostname} (Simulated Location)

      \\   /      
       .-.       Sunny & Warm
    ― (   ) ―    Temp: 26°C / 79°F
       \`-\`       Wind: NNE at 8 mph
      /   \\      Humidity: 45%
                 UV Index: 6 (High)
                 
Forecast: Clear skies with cooling terminal breeze tonight.`;
  return pre;
}

function getMockTodo(args) {
  const sub = args[0] ? args[0].toLowerCase() : '';
  const taskText = args.slice(1).join(' ');
  const output = document.createElement('div');
  output.style.fontFamily = 'var(--font-mono)';
  
  if (sub === 'add') {
    if (!taskText) {
      output.style.color = 'var(--term-red)';
      output.textContent = 'Usage: todo add <task description>';
    } else {
      state.todoList.push(`[ ] ${taskText}`);
      output.textContent = `Task added: "${taskText}"`;
    }
  } else if (sub === 'done') {
    const idx = parseInt(args[1], 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= state.todoList.length) {
      output.style.color = 'var(--term-red)';
      output.textContent = 'Usage: todo done <task_number>';
    } else {
      state.todoList[idx] = state.todoList[idx].replace('[ ]', '[x]');
      output.textContent = `Task ${idx + 1} marked as completed!`;
    }
  } else if (sub === 'clear') {
    state.todoList = [];
    output.textContent = 'Todo checklist cleared successfully.';
  } else {
    if (state.todoList.length === 0) {
      output.textContent = 'No active tasks found. Type "todo add <task>" to write a checklist item!';
    } else {
      const pre = document.createElement('pre');
      pre.style.lineHeight = '1.4';
      let content = 'My Todo Checklist:\n';
      state.todoList.forEach((t, i) => {
        content += `  ${i + 1}. ${t}\n`;
      });
      pre.textContent = content;
      output.appendChild(pre);
    }
  }
  return output;
}

function handleCdCommand(targetDir) {
  let currentDir = state.config.directory;
  if (!targetDir || targetDir === '~') {
    state.config.directory = '~';
  } else if (targetDir === '..') {
    if (currentDir === '~/projects/dotbashrc') {
      state.config.directory = '~/projects';
    } else if (currentDir === '~/projects') {
      state.config.directory = '~';
    } else if (currentDir.startsWith('~/projects/dotbashrc/')) {
      state.config.directory = '~/projects/dotbashrc';
    }
  } else if (targetDir === '../..') {
    state.config.directory = '~';
  } else {
    let matchedDir = targetDir;
    if (state.options.cdspell) {
      if (targetDir === 'prjects') matchedDir = 'projects';
      if (targetDir === 'dotbashr') matchedDir = 'dotbashrc';
    }
    
    if (currentDir === '~' && matchedDir === 'projects') {
      state.config.directory = '~/projects';
    } else if (currentDir === '~/projects' && matchedDir === 'dotbashrc') {
      state.config.directory = '~/projects/dotbashrc';
    } else {
      // Allow dynamic folders
      state.config.directory = currentDir + '/' + targetDir;
    }
    
    if (state.options.cdspell && matchedDir !== targetDir) {
      return `${matchedDir}/ (spelling corrected from ${targetDir}/)`;
    }
  }
  return '';
}

function syncStateToDOMInputs() {
  const dirInput = document.getElementById('input-directory');
  if (dirInput) {
    dirInput.value = state.config.directory;
  }
  const titleBar = document.getElementById('terminal-window-title');
  if (titleBar) {
    titleBar.textContent = `bash — ${state.config.username}@${state.config.hostname}: ${state.config.directory}`;
  }
}

function setupTerminalSimulator() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalInputDisplay = document.getElementById('terminal-input-display');
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalHistory = document.getElementById('terminal-history');

  if (!terminalInput || !terminalScreen || !terminalHistory) return;

  // Sync cursor inline position on input typing
  terminalInput.addEventListener('input', () => {
    if (terminalInputDisplay) {
      terminalInputDisplay.textContent = terminalInput.value;
    }
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const commandLine = terminalInput.value.trim();
      terminalInput.value = ''; // Reset input immediately
      if (terminalInputDisplay) {
        terminalInputDisplay.textContent = ''; // Reset display immediately
      }
      
      // 1. Snapshot prompt and command
      const promptSnapshotDiv = document.createElement('div');
      promptSnapshotDiv.className = 'history-line';
      
      const promptSpan = document.createElement('span');
      promptSpan.className = 'prompt-container';
      const promptSegs = parsePS1(state.ps1, state.config);
      renderPS1ToElement(promptSegs, promptSpan);
      promptSnapshotDiv.appendChild(promptSpan);

      const commandSpan = document.createElement('span');
      commandSpan.style.marginLeft = '8px';
      commandSpan.textContent = commandLine;
      promptSnapshotDiv.appendChild(commandSpan);

      terminalHistory.appendChild(promptSnapshotDiv);

      // 2. Process command outputs
      if (commandLine) {
        const parts = commandLine.split(' ');
        let cmd = parts[0].toLowerCase();
        let args = parts.slice(1);
        
        // --- Alias Evaluation Logic ---
        const gitAliases = {
          'g': 'git',
          'gs': 'git status',
          'gp': 'git push',
          'gd': 'git diff',
          'gcm': 'git commit -m'
        };
        const navAliases = {
          '..': 'cd ..',
          '...': 'cd ../..',
          'll': 'ls -la',
          'la': 'ls -A'
        };
        const safeAliases = {
          'rm': 'rm -i',
          'cp': 'cp -i',
          'mv': 'mv -i'
        };
        
        let resolvedCommand = commandLine;
        let aliasTriggered = false;
        
        if (state.aliases.git && gitAliases[cmd]) {
          resolvedCommand = gitAliases[cmd] + ' ' + args.join(' ');
          aliasTriggered = true;
        } else if (state.aliases.nav && navAliases[cmd]) {
          resolvedCommand = navAliases[cmd] + ' ' + args.join(' ');
          aliasTriggered = true;
        } else if (state.aliases.safe && safeAliases[cmd]) {
          resolvedCommand = safeAliases[cmd] + ' ' + args.join(' ');
          aliasTriggered = true;
        } else {
          const foundCustom = state.aliases.custom.find(item => item.name.toLowerCase() === cmd);
          if (foundCustom) {
            resolvedCommand = foundCustom.value + ' ' + args.join(' ');
            aliasTriggered = true;
          }
        }
        
        // Re-evaluate parts if alias was triggered
        if (aliasTriggered) {
          const reParts = resolvedCommand.trim().split(' ');
          cmd = reParts[0].toLowerCase();
          args = reParts.slice(1);
        }
        
        // Check for autocd (typing a directory name directly)
        let isAutoCd = false;
        if (state.options.autocd && cmd !== 'cd' && cmd !== 'ls' && cmd !== 'help' && cmd !== 'clear') {
          const currentDir = state.config.directory;
          if ((currentDir === '~' && cmd === 'projects') || (currentDir === '~/projects' && cmd === 'dotbashrc')) {
            isAutoCd = true;
            args = [cmd];
            cmd = 'cd';
          }
        }

        const outputDiv = document.createElement('div');
        outputDiv.className = 'history-line';

        switch (cmd) {
          case 'help':
            const helpPre = document.createElement('pre');
            helpPre.textContent = 
`Available simulated commands:
  help          Display this menu
  ls            List directory files (supports alias ll, la)
  cd <dir>      Change simulated directory path (supports autocd, cdspell, ..)
  mkcd <dir>    Make directory & cd in one command (if shell function toggle is active)
  todo          Checklist tool (if active): todo [add <task>|done <num>|clear]
  weather       Retreive simulated weather summary (if active)
  whoami        Display current terminal user
  date          Display current date/time info
  git status    Show git branch information (if git is active)
  cowsay <msg>  Simulate the cowsay command
  clear         Reset terminal logs
  theme <name>  Change terminal color palette (dracula, nord, etc)`;
            outputDiv.appendChild(helpPre);
            terminalHistory.appendChild(outputDiv);
            break;
            
          case 'ls':
            const isLong = args.includes('-la') || args.includes('-l') || args.includes('-a');
            const fileList = getMockFileList(isLong);
            outputDiv.appendChild(fileList);
            terminalHistory.appendChild(outputDiv);
            break;
            
          case 'cd':
            if (isAutoCd) {
              const cdMsg = document.createElement('div');
              cdMsg.style.color = 'var(--term-dim)';
              cdMsg.textContent = `autocd: cd ${args[0]}`;
              terminalHistory.appendChild(cdMsg);
            }
            
            const spellMsg = handleCdCommand(args[0]);
            if (spellMsg) {
              const correctionDiv = document.createElement('div');
              correctionDiv.style.color = 'var(--term-dim)';
              correctionDiv.textContent = spellMsg;
              terminalHistory.appendChild(correctionDiv);
            }
            syncStateToDOMInputs();
            updateAllPreviews();
            break;
            
          case 'mkcd':
            if (state.functions.mkcd) {
              const folder = args[0] || 'new-folder';
              const cdOutput = handleCdCommand(folder);
              const mkcdDiv = document.createElement('div');
              mkcdDiv.textContent = `mkdir: created directory '${folder}'\ncd: changing to '${state.config.directory}'`;
              outputDiv.appendChild(mkcdDiv);
              terminalHistory.appendChild(outputDiv);
              syncStateToDOMInputs();
              updateAllPreviews();
            } else {
              outputDiv.style.color = 'var(--term-red)';
              outputDiv.textContent = `bash: mkcd: command not found (activate shell function on the left dashboard)`;
              terminalHistory.appendChild(outputDiv);
            }
            break;
            
          case 'weather':
            if (state.functions.weather) {
              const weatherBanner = getMockWeather();
              outputDiv.appendChild(weatherBanner);
            } else {
              outputDiv.style.color = 'var(--term-red)';
              outputDiv.textContent = `bash: weather: command not found (activate shell function on the left dashboard)`;
            }
            terminalHistory.appendChild(outputDiv);
            break;
            
          case 'todo':
            if (state.functions.todo) {
              const todoView = getMockTodo(args);
              outputDiv.appendChild(todoView);
            } else {
              outputDiv.style.color = 'var(--term-red)';
              outputDiv.textContent = `bash: todo: command not found (activate shell function on the left dashboard)`;
            }
            terminalHistory.appendChild(outputDiv);
            break;
            
          case 'whoami':
            outputDiv.textContent = state.config.username;
            terminalHistory.appendChild(outputDiv);
            break;
            
          case 'date':
            outputDiv.textContent = new Date().toString();
            terminalHistory.appendChild(outputDiv);
            break;
            
          case 'git':
            if (args[0] === 'status') {
              const gitPre = document.createElement('pre');
              if (state.config.gitEnabled) {
                gitPre.textContent = 
`On branch ${state.config.gitBranch}
Your branch is up to date with 'origin/${state.config.gitBranch}'.

nothing to commit, working tree clean`;
              } else {
                gitPre.style.color = 'var(--term-red)';
                gitPre.textContent = `fatal: not a git repository (or any of the parent directories): .git`;
              }
              outputDiv.appendChild(gitPre);
            } else {
              outputDiv.textContent = `git: simulated command only supports "git status"`;
            }
            terminalHistory.appendChild(outputDiv);
            break;
            
          case 'cowsay':
            const cowsayMsg = args.join(' ') || 'Mooo!';
            const cowPre = document.createElement('pre');
            const borderLen = cowsayMsg.length + 2;
            const topBorder = ` _` + `_`.repeat(borderLen) + `_`;
            const bottomBorder = ` -` + `-`.repeat(borderLen) + `-`;
            
            cowPre.textContent = 
`${topBorder}
< ${cowsayMsg} >
${bottomBorder}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
            outputDiv.appendChild(cowPre);
            terminalHistory.appendChild(outputDiv);
            break;
            
          case 'clear':
            terminalHistory.replaceChildren();
            break;
            
          case 'theme':
            const reqTheme = args[0] ? args[0].toLowerCase() : '';
            const validThemes = ['dracula', 'onedark', 'nord', 'retro-green', 'solarized-light', 'github-light'];
            if (validThemes.includes(reqTheme)) {
              state.terminalTheme = reqTheme;
              const termWin = document.getElementById('terminal-window');
              const selectTheme = document.getElementById('select-terminal-theme');
              if (termWin) termWin.setAttribute('data-theme', reqTheme);
              if (selectTheme) selectTheme.value = reqTheme;
              outputDiv.textContent = `Terminal theme switched to "${reqTheme}".`;
            } else {
              outputDiv.style.color = 'var(--term-red)';
              outputDiv.textContent = `Theme "${reqTheme}" not found. Try: ${validThemes.join(', ')}`;
            }
            terminalHistory.appendChild(outputDiv);
            break;
            
          default:
            outputDiv.style.color = 'var(--term-red)';
            outputDiv.textContent = `bash: command not found: ${cmd}`;
            terminalHistory.appendChild(outputDiv);
        }
      }

      // Auto scroll terminal screen to bottom
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }
  });

  terminalScreen.addEventListener('click', () => {
    terminalInput.focus();
  });

  const btnClear = document.getElementById('btn-clear-terminal');
  if (btnClear) {
    btnClear.addEventListener('click', (e) => {
      e.stopPropagation();
      terminalHistory.replaceChildren();
      terminalInput.focus();
    });
  }
}

// ==========================================================================
// CONFIGURATION CONTROLS & EVENT BINDINGS
// ==========================================================================
function setupConfigControls() {
  // Variables setup inputs
  const inputs = {
    username: document.getElementById('input-username'),
    hostname: document.getElementById('input-hostname'),
    directory: document.getElementById('input-directory'),
    gitBranch: document.getElementById('input-git-branch'),
    gitEnabled: document.getElementById('toggle-git'),
    isRoot: document.getElementById('toggle-root'),
    exitStatusFailed: document.getElementById('toggle-exit-code'),
    ps1Textarea: document.getElementById('input-ps1'),
    
    // New left dashboard bindings
    aliasGit: document.getElementById('alias-group-git'),
    aliasNav: document.getElementById('alias-group-nav'),
    aliasSafe: document.getElementById('alias-group-safe'),
    fnMkcd: document.getElementById('fn-toggle-mkcd'),
    fnExtract: document.getElementById('fn-toggle-extract'),
    fnWeather: document.getElementById('fn-toggle-weather'),
    fnTodo: document.getElementById('fn-toggle-todo'),
    optAutocd: document.getElementById('opt-shopt-autocd'),
    optCdspell: document.getElementById('opt-shopt-cdspell'),
    optGlobstar: document.getElementById('opt-shopt-globstar'),
    histsize: document.getElementById('input-histsize'),
    histfilesize: document.getElementById('input-histfilesize'),
    histIgnoredups: document.getElementById('opt-hist-ignoredups'),
    histIgnorespace: document.getElementById('opt-hist-ignorespace'),
    histTimestamp: document.getElementById('opt-hist-timestamp')
  };

  const updateStateConfig = () => {
    if (inputs.username) state.config.username = inputs.username.value || 'guest';
    if (inputs.hostname) {
      state.config.hostname = inputs.hostname.value || 'linux';
      const titleBar = document.getElementById('terminal-window-title');
      if (titleBar) {
        titleBar.textContent = `bash — ${state.config.username}@${state.config.hostname}: ${state.config.directory}`;
      }
    }
    if (inputs.directory) {
      state.config.directory = inputs.directory.value || '~';
      const titleBar = document.getElementById('terminal-window-title');
      if (titleBar) {
        titleBar.textContent = `bash — ${state.config.username}@${state.config.hostname}: ${state.config.directory}`;
      }
    }
    if (inputs.gitBranch) state.config.gitBranch = inputs.gitBranch.value || 'main';
    if (inputs.gitEnabled) state.config.gitEnabled = inputs.gitEnabled.checked;
    if (inputs.isRoot) state.config.isRoot = inputs.isRoot.checked;
    if (inputs.exitStatusFailed) state.config.exitStatusFailed = inputs.exitStatusFailed.checked;

    // Aliases checkboxes
    if (inputs.aliasGit) state.aliases.git = inputs.aliasGit.checked;
    if (inputs.aliasNav) state.aliases.nav = inputs.aliasNav.checked;
    if (inputs.aliasSafe) state.aliases.safe = inputs.aliasSafe.checked;

    // Functions checkboxes
    if (inputs.fnMkcd) state.functions.mkcd = inputs.fnMkcd.checked;
    if (inputs.fnExtract) state.functions.extract = inputs.fnExtract.checked;
    if (inputs.fnWeather) state.functions.weather = inputs.fnWeather.checked;
    if (inputs.fnTodo) state.functions.todo = inputs.fnTodo.checked;

    // Options shopt checkboxes
    if (inputs.optAutocd) state.options.autocd = inputs.optAutocd.checked;
    if (inputs.optCdspell) state.options.cdspell = inputs.optCdspell.checked;
    if (inputs.optGlobstar) state.options.globstar = inputs.optGlobstar.checked;

    // History rules
    if (inputs.histsize) state.options.histsize = parseInt(inputs.histsize.value, 10) || 10000;
    if (inputs.histfilesize) state.options.histfilesize = parseInt(inputs.histfilesize.value, 10) || 20000;
    if (inputs.histIgnoredups) state.options.ignoredups = inputs.histIgnoredups.checked;
    if (inputs.histIgnorespace) state.options.ignorespace = inputs.histIgnorespace.checked;
    if (inputs.histTimestamp) state.options.timestamp = inputs.histTimestamp.checked;

    updateAllPreviews();
    renderTemplatesCatalog();
  };

  Object.values(inputs).forEach(inputEl => {
    if (!inputEl) return;
    const eventType = (inputEl.type === 'checkbox' || inputEl.tagName === 'SELECT') ? 'change' : 'input';
    inputEl.addEventListener(eventType, updateStateConfig);
  });

  if (inputs.ps1Textarea) {
    inputs.ps1Textarea.addEventListener('input', () => {
      state.ps1 = inputs.ps1Textarea.value;
      updateAllPreviews();
    });
  }

  // Insert buttons in PS1 Editor
  const insertButtons = document.querySelectorAll('.btn-insert');
  insertButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const valToInsert = btn.getAttribute('data-value');
      if (inputs.ps1Textarea && valToInsert) {
        const textarea = inputs.ps1Textarea;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        textarea.value = textarea.value.substring(0, start) + valToInsert + textarea.value.substring(end);
        textarea.focus();
        
        textarea.selectionStart = textarea.selectionEnd = start + valToInsert.length;
        
        state.ps1 = textarea.value;
        updateAllPreviews();
      }
    });
  });

  // Search templates input
  const searchInput = document.getElementById('search-templates');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.searchQuery = searchInput.value;
      renderTemplatesCatalog();
    });
  }

  // Categories filter click handlers
  const filterButtons = document.querySelectorAll('#category-filters .filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.getAttribute('data-category');
      renderTemplatesCatalog();
    });
  });

  // Clipboard copy exports handler
  const copyExportBtn = document.getElementById('btn-copy-export');
  if (copyExportBtn) {
    copyExportBtn.addEventListener('click', () => {
      const codeOutput = document.getElementById('code-export-output');
      if (codeOutput) {
        navigator.clipboard.writeText(codeOutput.textContent).then(() => {
          copyExportBtn.textContent = 'Copied!';
          setTimeout(() => { copyExportBtn.textContent = 'Copy to Clipboard'; }, 2000);
        });
      }
    });
  }

  // Custom Alias adding form handler
  const btnAddAlias = document.getElementById('btn-add-alias');
  const inputName = document.getElementById('custom-alias-name');
  const inputValue = document.getElementById('custom-alias-value');
  
  if (btnAddAlias && inputName && inputValue) {
    btnAddAlias.addEventListener('click', () => {
      showAliasError(''); // Reset
      const name = inputName.value.trim();
      const value = inputValue.value.trim();
      
      if (!name || !value) {
        showAliasError('Both Name and Command fields are required.');
        return;
      }
      
      const aliasNamePattern = /^[a-zA-Z0-9_\-]+$/;
      if (!aliasNamePattern.test(name)) {
        showAliasError('Name must be alphanumeric and contain no spaces.');
        return;
      }
      
      const exists = state.aliases.custom.some(item => item.name === name);
      if (exists) {
        showAliasError(`Alias "${name}" already exists!`);
        return;
      }
      
      state.aliases.custom.push({ name, value });
      inputName.value = '';
      inputValue.value = '';
      
      renderCustomAliasesList();
      updateExportOutput();
    });
  }
}

// ==========================================================================
// TABS & THEMES TOGGLES
// ==========================================================================
function setupCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanelId = btn.getAttribute('data-target');
      
      tabs.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      
      const panels = document.querySelectorAll('.category-panel-view');
      panels.forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
      });
      
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.style.display = 'flex';
        targetPanel.classList.add('active');
      }
    });
  });
}

function setupTabToggles() {
  const tabs = [
    { buttonId: 'btn-tab-instructions', panelId: 'tab-instructions' },
    { buttonId: 'btn-tab-editor', panelId: 'tab-editor' }
  ];

  tabs.forEach(tab => {
    const btn = document.getElementById(tab.buttonId);
    const panel = document.getElementById(tab.panelId);
    
    if (btn && panel) {
      btn.addEventListener('click', () => {
        tabs.forEach(t => {
          const b = document.getElementById(t.buttonId);
          const p = document.getElementById(t.panelId);
          if (b && p) {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            p.style.display = 'none';
          }
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        panel.style.display = 'flex';
      });
    }
  });
}

function setupThemeToggles() {
  // Global Light/Dark Theme Mode Toggle
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const sunIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon-light') : null;
  const moonIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon-dark') : null;
  
  if (themeToggleBtn && sunIcon && moonIcon) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      document.body.classList.toggle('dark-mode', !isLight);
      
      if (isLight) {
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
      }
    });
  }

  // Terminal Theme Select Handler
  const selectTerminalTheme = document.getElementById('select-terminal-theme');
  const terminalWindow = document.getElementById('terminal-window');
  
  if (selectTerminalTheme && terminalWindow) {
    selectTerminalTheme.addEventListener('change', () => {
      const selected = selectTerminalTheme.value;
      state.terminalTheme = selected;
      terminalWindow.setAttribute('data-theme', selected);
    });
  }
}

// Rendering left catalog prompt templates
function renderTemplatesCatalog() {
  const container = document.getElementById('templates-list');
  if (!container) return;

  container.replaceChildren();

  const filtered = TEMPLATES.filter(tpl => {
    const matchesSearch = tpl.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                          tpl.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          tpl.ps1.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchesCategory = state.activeCategory === 'all' || tpl.tags.includes(state.activeCategory);
    return matchesSearch && matchesCategory;
  });

  const countBadge = document.getElementById('catalog-count');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Theme${filtered.length === 1 ? '' : 's'}`;
  }

  filtered.forEach(tpl => {
    const card = document.createElement('div');
    card.className = `template-card ${state.ps1 === tpl.ps1 ? 'active' : ''}`;
    
    // Header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'template-header';
    
    const cardTitle = document.createElement('span');
    cardTitle.className = 'template-title';
    cardTitle.textContent = tpl.name;
    cardHeader.appendChild(cardTitle);

    const tagsRow = document.createElement('div');
    tagsRow.className = 'template-tags';
    tpl.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tag-badge';
      tagSpan.textContent = tag;
      tagsRow.appendChild(tagSpan);
    });
    cardHeader.appendChild(tagsRow);
    card.appendChild(cardHeader);

    // Description
    const cardDesc = document.createElement('p');
    cardDesc.className = 'template-description';
    cardDesc.textContent = tpl.description;
    card.appendChild(cardDesc);

    // Static Preview Panel
    const previewBar = document.createElement('div');
    previewBar.className = 'template-preview-bar';
    const mockSegs = parsePS1(tpl.ps1, state.config);
    renderPS1ToElement(mockSegs, previewBar);
    card.appendChild(previewBar);

    // Actions
    const actionRow = document.createElement('div');
    actionRow.className = 'template-actions-row';
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'card-btn';
    copyBtn.textContent = 'Copy Code';
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(`export PS1="${tpl.ps1}"`).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy Code'; }, 1500);
      });
    });
    actionRow.appendChild(copyBtn);

    const applyBtn = document.createElement('button');
    applyBtn.className = 'card-btn primary-btn';
    applyBtn.textContent = 'Load Theme';
    applyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.ps1 = tpl.ps1;
      const editorTextarea = document.getElementById('input-ps1');
      if (editorTextarea) {
        editorTextarea.value = tpl.ps1;
      }
      updateAllPreviews();
      renderTemplatesCatalog();
    });
    actionRow.appendChild(applyBtn);

    card.appendChild(actionRow);

    card.addEventListener('click', () => {
      state.ps1 = tpl.ps1;
      const editorTextarea = document.getElementById('input-ps1');
      if (editorTextarea) {
        editorTextarea.value = tpl.ps1;
      }
      updateAllPreviews();
      renderTemplatesCatalog();
    });

    container.appendChild(card);
  });

  if (filtered.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'text-muted';
    emptyState.style.padding = '40px 0';
    emptyState.style.textAlign = 'center';
    emptyState.textContent = 'No matching templates found.';
    container.appendChild(emptyState);
  }
}

// ==========================================================================
// INITIALIZATION ENTRYPOINT
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Theme selectors and Dark/Light Mode state triggers
  setupThemeToggles();

  // 2. Setup interactive variables controls & aliases/functions toggles
  setupConfigControls();

  // 3. Setup left panel category switching tabs
  setupCategoryTabs();

  // 4. Setup right panel tabs
  setupTabToggles();

  // 5. Setup mock CLI inputs and handlers
  setupTerminalSimulator();

  // Render initial lists
  renderCustomAliasesList();
  renderTemplatesCatalog();

  // Set initial random branch in input field
  const gitBranchInput = document.getElementById('input-git-branch');
  if (gitBranchInput) {
    gitBranchInput.value = state.config.gitBranch;
  }

  // 6. Draw the initial previews and exports
  updateAllPreviews();
});
