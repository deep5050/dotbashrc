/* ==========================================================================
   BASHRC PS1 VISUALIZER - APPLICATION SCRIPT
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
  activeTab: 'variables',
  activeCategory: 'all',
  searchQuery: ''
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
  
  const dateStr = now.toDateString().substring(0, 10); // e.g. "Sat Jun 20"
  
  const time24 = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  
  let hours12 = now.getHours() % 12;
  hours12 = hours12 ? hours12 : 12;
  const time12 = `${pad(hours12)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const timeAmpm = `${pad(hours12)}:${pad(now.getMinutes())} ${ampm}`;
  
  const time24Short = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  // Exit status indicator - bash users sometimes embed logic like `$(if [ $? -eq 0 ]; then echo green; else echo red;)`
  // For standard rendering: \$ will show # for root, $ for normal.
  const shellSymbol = config.isRoot ? '#' : '$';

  const segments = [];
  
  // Active formatting state variables
  let bold = false;
  let underline = false;
  let blink = false;
  let fg = null;
  let bg = null;
  let inlineStyles = {};

  // Tokenizer pattern
  // Matches: ANSI codes, escaped brackets, macros, and plain strings
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
          } else if (code === 22) {
            bold = false;
          } else if (code === 24) {
            underline = false;
          } else if (code === 25) {
            blink = false;
          } else if (code >= 30 && code <= 37) {
            const colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
            fg = colors[code - 30];
          } else if (code === 39) {
            fg = null;
          } else if (code >= 40 && code <= 47) {
            const colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
            bg = colors[code - 40];
          } else if (code === 49) {
            bg = null;
          } else if (code >= 90 && code <= 97) {
            const colors = ['bright-black', 'bright-red', 'bright-green', 'bright-yellow', 'bright-blue', 'bright-magenta', 'bright-cyan', 'bright-white'];
            fg = colors[code - 90];
          } else if (code >= 100 && code <= 107) {
            const colors = ['bright-black', 'bright-red', 'bright-green', 'bright-yellow', 'bright-blue', 'bright-magenta', 'bright-cyan', 'bright-white'];
            bg = colors[code - 100];
          } else if (code === 38) {
            // 256 colors or RGB
            if (codes[i+1] === 5 && codes[i+2] !== undefined) {
              fg = `color256-${codes[i+2]}`;
              inlineStyles.color = get256RGB(codes[i+2]);
              i += 2;
            } else if (codes[i+1] === 2 && codes[i+2] !== undefined && codes[i+3] !== undefined && codes[i+4] !== undefined) {
              fg = `color-rgb`;
              inlineStyles.color = `rgb(${codes[i+2]},${codes[i+3]},${codes[i+4]})`;
              i += 4;
            }
          } else if (code === 48) {
            if (codes[i+1] === 5 && codes[i+2] !== undefined) {
              bg = `bg256-${codes[i+2]}`;
              inlineStyles.backgroundColor = get256RGB(codes[i+2]);
              i += 2;
            } else if (codes[i+1] === 2 && codes[i+2] !== undefined && codes[i+3] !== undefined && codes[i+4] !== undefined) {
              bg = `bg-rgb`;
              inlineStyles.backgroundColor = `rgb(${codes[i+2]},${codes[i+3]},${codes[i+4]})`;
              i += 4;
            }
          }
        }
      }
    } else if (token === '\\[' || token === '\\]') {
      // Skip non-printing delimiters
      continue;
    } else {
      let resolvedText = '';
      let isSpecial = false;
      let type = 'text';

      if (token === '\\u') { resolvedText = username; isSpecial = true; type = 'username'; }
      else if (token === '\\h') { resolvedText = shortHost; isSpecial = true; type = 'hostname'; }
      else if (token === '\\H') { resolvedText = hostname; isSpecial = true; type = 'hostname-full'; }
      else if (token === '\\w') { resolvedText = directory; isSpecial = true; type = 'directory'; }
      else if (token === '\\W') { resolvedText = shortDir; isSpecial = true; type = 'directory-base'; }
      else if (token === '\\d') { resolvedText = dateStr; isSpecial = true; type = 'date'; }
      else if (token === '\\t') { resolvedText = time24; isSpecial = true; type = 'time-24'; }
      else if (token === '\\T') { resolvedText = time12; isSpecial = true; type = 'time-12'; }
      else if (token === '\\@') { resolvedText = timeAmpm; isSpecial = true; type = 'time-ampm'; }
      else if (token === '\\A') { resolvedText = time24Short; isSpecial = true; type = 'time-24-short'; }
      else if (token === '\\s') { resolvedText = 'bash'; isSpecial = true; type = 'shell'; }
      else if (token === '\\v') { resolvedText = '5.2'; isSpecial = true; type = 'version'; }
      else if (token === '\\V') { resolvedText = '5.2.15'; isSpecial = true; type = 'release'; }
      else if (token === '\\$') { 
        // Color fail symbol red if exits status failed
        resolvedText = shellSymbol; 
        isSpecial = true; 
        type = 'symbol'; 
      }
      else if (token === '\\n') { resolvedText = '\n'; isSpecial = true; type = 'newline'; }
      else if (token === '\\r') { resolvedText = ''; isSpecial = true; type = 'carriage-return'; }
      else if (token === '\\\\') { resolvedText = '\\'; }
      else if (token === '$(__git_ps1)' || token === '\\$(__git_ps1)') { resolvedText = gitBranchText; isSpecial = true; type = 'git-branch'; }
      else {
        resolvedText = token;
      }

      if (resolvedText !== '') {
        // Special custom logic: if exitStatusFailed is active and this token is a prompt symbol, apply a red color override
        let finalFg = fg;
        let finalStyles = { ...inlineStyles };
        if (type === 'symbol' && config.exitStatusFailed) {
          finalFg = 'red';
          finalStyles.color = 'var(--term-red)';
        }

        segments.push({
          text: resolvedText,
          bold,
          underline,
          blink,
          fg: finalFg,
          bg,
          inlineStyles: finalStyles,
          rawToken: token,
          isSpecial,
          type
        });
      }
    }
  }

  return segments;
}

// ==========================================================================
// RENDERERS (XSS-FREE VIA textContent)
// ==========================================================================
function renderPS1ToElement(segments, element) {
  element.replaceChildren(); // Safe clearance of existing items (no innerHTML)

  for (let seg of segments) {
    if (seg.text === '\n') {
      element.appendChild(document.createElement('br'));
      continue;
    }

    const span = document.createElement('span');
    span.textContent = seg.text;

    // Apply formatting classes
    if (seg.bold) span.classList.add('ansi-bold');
    if (seg.underline) span.classList.add('ansi-underline');
    if (seg.blink) span.classList.add('ansi-blink');

    // Foreground style/class
    if (seg.fg) {
      if (seg.fg.startsWith('color256-') || seg.fg === 'color-rgb') {
        if (seg.inlineStyles && seg.inlineStyles.color) {
          span.style.color = seg.inlineStyles.color;
        }
      } else {
        span.classList.add(`ansi-fg-${seg.fg}`);
      }
    }

    // Background style/class
    if (seg.bg) {
      if (seg.bg.startsWith('bg256-') || seg.bg === 'bg-rgb') {
        if (seg.inlineStyles && seg.inlineStyles.backgroundColor) {
          span.style.backgroundColor = seg.inlineStyles.backgroundColor;
        }
      } else {
        span.classList.add(`ansi-bg-${seg.bg}`);
      }
    }

    element.appendChild(span);
  }
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
// EXPORTS WIDGET BUILDER
// ==========================================================================
function updateExportOutput() {
  const codeOutput = document.getElementById('code-export-output');
  if (!codeOutput) return;

  let exportBlock = '';
  
  if (state.config.gitEnabled) {
    exportBlock += `# --- Git Prompt Integration ---\n`;
    exportBlock += `# Make sure git-sh-prompt is sourced in your system. For Ubuntu/Debian:\n`;
    exportBlock += `# if [ -f /usr/lib/git-core/git-sh-prompt ]; then\n`;
    exportBlock += `#   . /usr/lib/git-core/git-sh-prompt\n`;
    exportBlock += `# fi\n\n`;
  }
  
  exportBlock += `export PS1="${state.ps1}"`;
  
  codeOutput.textContent = exportBlock; // Safely set text content
}

// ==========================================================================
// SYNTAX BREAKDOWN GENERATOR
// ==========================================================================
function updateSyntaxBreakdown(segments) {
  const breakdownContainer = document.getElementById('ps1-breakdown');
  if (!breakdownContainer) return;

  breakdownContainer.replaceChildren();

  // Group text segments that represent literals together for a cleaner breakdown,
  // but keep macros and formatting changes separate.
  segments.forEach((seg, idx) => {
    const tokenDiv = document.createElement('div');
    tokenDiv.className = 'inspector-token';
    
    // Add raw representation
    const tokenTag = document.createElement('span');
    tokenTag.className = 'token-tag';
    tokenTag.textContent = seg.rawToken;
    tokenDiv.appendChild(tokenTag);

    // Add description text
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

    // Apply color styling inside inspector tooltip if available
    if (seg.fg) {
      if (seg.fg.startsWith('color256-') || seg.fg === 'color-rgb') {
        tokenTag.style.color = seg.inlineStyles.color;
      } else {
        tokenTag.classList.add(`ansi-fg-${seg.fg}`);
      }
    }
    if (seg.bg) {
      if (seg.bg.startsWith('bg256-') || seg.bg === 'bg-rgb') {
        tokenTag.style.backgroundColor = seg.inlineStyles.backgroundColor;
      } else {
        tokenTag.classList.add(`ansi-bg-${seg.bg}`);
      }
    }
    
    breakdownContainer.appendChild(tokenDiv);
  });

  if (segments.length === 0) {
    const emptySpan = document.createElement('span');
    emptySpan.className = 'text-muted';
    emptySpan.textContent = 'Write a prompt configuration above to see the breakdown.';
    breakdownContainer.appendChild(emptySpan);
  }
}

// ==========================================================================
// PREDEFINED TEMPLATES CATALOG RENDERER
// ==========================================================================
function renderTemplatesCatalog() {
  const container = document.getElementById('templates-list');
  if (!container) return;

  container.replaceChildren();

  // Filter templates based on query and active filter tag
  const filtered = TEMPLATES.filter(tpl => {
    const matchesSearch = tpl.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                          tpl.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          tpl.ps1.toLowerCase().includes(state.searchQuery.toLowerCase());
    
    const matchesCategory = state.activeCategory === 'all' || tpl.tags.includes(state.activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Update counts badge
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
      renderTemplatesCatalog(); // Refresh active states
    });
    actionRow.appendChild(applyBtn);

    card.appendChild(actionRow);

    // Clicking card loads the prompt
    card.addEventListener('click', () => {
      state.ps1 = tpl.ps1;
      const editorTextarea = document.getElementById('input-ps1');
      if (editorTextarea) {
        editorTextarea.value = tpl.ps1;
      }
      updateAllPreviews();
      renderTemplatesCatalog(); // Refresh active states
    });

    container.appendChild(card);
  });

  if (filtered.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'text-muted';
    emptyState.style.textAlign = 'center';
    emptyState.style.padding = '40px 0';
    emptyState.textContent = 'No matching prompt layouts found.';
    container.appendChild(emptyState);
  }
}

// ==========================================================================
// INTERACTIVE CLI SIMULATOR ENGINE
// ==========================================================================
function setupTerminalSimulator() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalInputDisplay = document.getElementById('terminal-input-display');
  
  if (!terminalInput || !terminalHistory || !terminalScreen) return;

  // Synchronize dynamic input typing to span display
  terminalInput.addEventListener('input', () => {
    if (terminalInputDisplay) {
      terminalInputDisplay.textContent = terminalInput.value;
    }
  });

  // Handle command submissions
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const commandLine = terminalInput.value.trim();
      terminalInput.value = ''; // Reset input immediately
      if (terminalInputDisplay) {
        terminalInputDisplay.textContent = ''; // Reset display immediately
      }
      
      // 1. Snapshot the current prompt and add to history
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
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        const outputDiv = document.createElement('div');
        outputDiv.className = 'history-line';

        switch (cmd) {
          case 'help':
            const helpPre = document.createElement('pre');
            helpPre.textContent = 
`Available simulated commands:
  help          Display this menu
  ls            List files in active folder
  whoami        Display current terminal user
  date          Display current date/time info
  git status    Show git branch information (if git is active)
  cowsay <msg>  Simulate the famous retro cowsay command
  clear         Reset terminal logs
  theme <name>  Change terminal color palette (dracula, nord, etc)`;
            outputDiv.appendChild(helpPre);
            terminalHistory.appendChild(outputDiv);
            break;
            
          case 'ls':
            const lsPre = document.createElement('pre');
            lsPre.style.color = 'var(--term-blue)';
            lsPre.textContent = `LICENSE   README.md   app.js   index.html   style.css`;
            outputDiv.appendChild(lsPre);
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
            
            // Build ASCII speech box
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

  // Keep focus on terminal input when clicking the terminal screen body
  terminalScreen.addEventListener('click', () => {
    terminalInput.focus();
  });

  // Clear button handler
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
// CONFIGURATION CONTROLS & TAB EVENT HANDLERS
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
    ps1Textarea: document.getElementById('input-ps1')
  };

  // Attach change listeners to variables
  const updateStateConfig = () => {
    if (inputs.username) state.config.username = inputs.username.value || 'guest';
    if (inputs.hostname) {
      state.config.hostname = inputs.hostname.value || 'linux';
      // Sync terminal title bar title
      const titleBar = document.getElementById('terminal-window-title');
      if (titleBar) {
        titleBar.textContent = `bash — ${state.config.username}@${state.config.hostname}: ${state.config.directory}`;
      }
    }
    if (inputs.directory) {
      state.config.directory = inputs.directory.value || '~';
      // Sync terminal title bar title
      const titleBar = document.getElementById('terminal-window-title');
      if (titleBar) {
        titleBar.textContent = `bash — ${state.config.username}@${state.config.hostname}: ${state.config.directory}`;
      }
    }
    if (inputs.gitBranch) state.config.gitBranch = inputs.gitBranch.value || 'main';
    if (inputs.gitEnabled) state.config.gitEnabled = inputs.gitEnabled.checked;
    if (inputs.isRoot) state.config.isRoot = inputs.isRoot.checked;
    if (inputs.exitStatusFailed) state.config.exitStatusFailed = inputs.exitStatusFailed.checked;

    updateAllPreviews();
    renderTemplatesCatalog(); // Refresh card render templates with updated parameters
  };

  Object.values(inputs).forEach(inputEl => {
    if (!inputEl) return;
    const eventType = inputEl.type === 'checkbox' ? 'change' : 'input';
    inputEl.addEventListener(eventType, updateStateConfig);
  });

  // Raw PS1 editor textarea input handler
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
        
        // Put cursor after inserted string
        textarea.selectionStart = textarea.selectionEnd = start + valToInsert.length;
        
        // Update state & previews
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
}

// ==========================================================================
// TABS & THEMES TOGGLES
// ==========================================================================
function setupTabToggles() {
  const tabs = [
    { buttonId: 'btn-tab-variables', panelId: 'tab-variables' },
    { buttonId: 'btn-tab-editor', panelId: 'tab-editor' },
    { buttonId: 'btn-tab-instructions', panelId: 'tab-instructions' }
  ];

  tabs.forEach(tab => {
    const btn = document.getElementById(tab.buttonId);
    const panel = document.getElementById(tab.panelId);
    
    if (btn && panel) {
      btn.addEventListener('click', () => {
        // Deactivate all
        tabs.forEach(t => {
          const b = document.getElementById(t.buttonId);
          const p = document.getElementById(t.panelId);
          if (b && p) {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            p.style.display = 'none';
          }
        });

        // Activate clicked
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
      
      // Update toggle icon visibility
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

// ==========================================================================
// INITIALIZATION ENTRYPOINT
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Theme selectors and Dark/Light Mode state triggers
  setupThemeToggles();

  // 2. Setup interactive variables controls & PS1 editor shortcuts
  setupConfigControls();

  // 3. Setup tabs layout switching
  setupTabToggles();

  // 4. Setup mock CLI inputs and handlers
  setupTerminalSimulator();

  // Set initial random branch in input field
  const gitBranchInput = document.getElementById('input-git-branch');
  if (gitBranchInput) {
    gitBranchInput.value = state.config.gitBranch;
  }

  // 5. Draw the left column prompts library
  renderTemplatesCatalog();

  // 6. Draw the initial active rendering for the default Ubuntu prompt
  updateAllPreviews();
});
