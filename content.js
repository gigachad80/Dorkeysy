// ============================================================================
// DORKEYSY
// ============================================================================

class Dorkeysy {
    constructor() {
        this.history = [];
        this.maxHistory = 20;
        this.isVisible = false;

        // Define available shortcuts for the UI rendering
        this.shortcuts = [
            { keys: ['Ctrl', '⇧', 'H'], label: 'Toggle Helper' },
            { keys: ['Ctrl', '⇧', 'Q'], label: 'Quote Selection' },
            { keys: ['Ctrl', '⇧', 'A'], label: 'Quote Each Word' },
            { keys: ['Ctrl', '⇧', 'S'], label: 'site:' },
            { keys: ['Ctrl', '⇧', 'U'], label: 'inurl:' },
            { keys: ['Alt', '⇧', 'T'], label: 'intitle:' },
            { keys: ['Ctrl', '⇧', 'X'], label: 'intext:' },
            { keys: ['Ctrl', '⇧', 'C'], label: 'cache:' },
            { keys: ['Ctrl', '⇧', 'R'], label: 'related:' },
            { keys: ['Ctrl', '⇧', 'I'], label: 'info:' },
            { keys: ['Ctrl', '⇧', 'L'], label: 'link:' },
            { keys: ['Ctrl', '⇧', 'N'], label: 'inanchor:' },
            { keys: ['Ctrl', '⇧', 'B'], label: 'before:YYYY-MM-DD' },
            { keys: ['Ctrl', '⇧', 'G'], label: 'after:YYYY-MM-DD' },
            { keys: ['Ctrl', '⇧', '-'], label: 'Exclude (-)' },
            { keys: ['Ctrl', '⇧', '+'], label: 'Include (+)' },
            { keys: ['Ctrl', '⇧', 'O'], label: ' OR ' },
            { keys: ['Ctrl', '⇧', '&'], label: ' AND ' },
            { keys: ['Ctrl', '⇧', '|'], label: ' | ' },
            { keys: ['Ctrl', '⇧', '8'], label: 'Wildcard (*)' },
            { keys: ['Ctrl', '⇧', '.'], label: 'Range (..)' },
            { keys: ['Ctrl', '⇧', '~'], label: 'Synonym (~)' },
            { keys: ['Ctrl', '⇧', 'F'], label: 'Filetype (Interactive)' },
            { keys: ['Ctrl', '⇧', 'Z'], label: 'Undo' },
        ];

        this.init();
    }

    init() {
        this.createUI();
        this.attachKeyboardListeners();
        this.showToast('Dorkeysy Ready', 'Press Ctrl+Shift+H to view shortcuts');
    }

    createUI() {
        if (document.getElementById('dork-helper-root')) return;

        const container = document.createElement('div');
        container.id = 'dork-helper-root';

        // Shadcn/Vercel like Design System
        container.innerHTML = `
            <style>
                #dork-helper-root {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    --bg-primary: #ffffff;
                    --bg-secondary: #f4f4f5;
                    --fg-primary: #09090b;
                    --fg-secondary: #71717a;
                    --border: #e4e4e7;
                    --accent: #18181b;
                    --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    z-index: 999999;
                }

                /* Dark Mode Support via media query */
                @media (prefers-color-scheme: dark) {
                    #dork-helper-root {
                        --bg-primary: #09090b;
                        --bg-secondary: #27272a;
                        --fg-primary: #fafafa;
                        --fg-secondary: #a1a1aa;
                        --border: #27272a;
                        --accent: #fafafa;
                    }
                }

                /* TOAST */
                #dork-toast {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    background: var(--bg-primary);
                    color: var(--fg-primary);
                    border: 1px solid var(--border);
                    padding: 12px 16px;
                    border-radius: 8px;
                    box-shadow: var(--shadow);
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                    pointer-events: none;
                    z-index: 1000000;
                    max-width: 360px;
                }
                #dork-toast.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .toast-title { font-weight: 600; }
                .toast-desc { color: var(--fg-secondary); font-size: 12px; }

                /* SHORTCUT MENU (Card Style) */
                #dork-menu {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.95);
                    width: 460px;
                    max-height: 85vh;
                    background: var(--bg-primary);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    padding: 24px;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.15s ease;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    z-index: 999999;
                }
                #dork-menu.visible {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                    pointer-events: auto;
                }

                .menu-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--border);
                    padding-bottom: 12px;
                }
                .menu-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: var(--fg-primary);
                    letter-spacing: -0.025em;
                }
                .menu-badge {
                    font-size: 10px;
                    background: var(--bg-secondary);
                    color: var(--fg-secondary);
                    padding: 2px 8px;
                    border-radius: 99px;
                    font-weight: 500;
                }

                .shortcut-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4px;
                    max-height: calc(85vh - 100px);
                    overflow-y: auto;
                    padding-right: 4px;
                }

                /* Custom scrollbar */
                .shortcut-grid::-webkit-scrollbar {
                    width: 6px;
                }
                .shortcut-grid::-webkit-scrollbar-track {
                    background: var(--bg-secondary);
                    border-radius: 3px;
                }
                .shortcut-grid::-webkit-scrollbar-thumb {
                    background: var(--border);
                    border-radius: 3px;
                }
                .shortcut-grid::-webkit-scrollbar-thumb:hover {
                    background: var(--fg-secondary);
                }

                .shortcut-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px;
                    border-radius: 6px;
                    transition: background 0.1s;
                }
                .shortcut-row:hover {
                    background: var(--bg-secondary);
                }

                .shortcut-label {
                    font-size: 13px;
                    color: var(--fg-secondary);
                    font-weight: 500;
                }
                
                .kbd-group {
                    display: flex;
                    gap: 4px;
                    flex-shrink: 0;
                }
                .kbd {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    color: var(--fg-secondary);
                    border-radius: 4px;
                    padding: 2px 6px;
                    font-size: 11px;
                    font-family: monospace;
                    min-width: 16px;
                    text-align: center;
                    box-shadow: 0 1px 0 rgba(0,0,0,0.05);
                }

                /* BACKDROP */
                #dork-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.2);
                    backdrop-filter: blur(2px);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.2s;
                    z-index: 999998;
                }
                #dork-backdrop.visible {
                    opacity: 1;
                    pointer-events: auto;
                }
            </style>

            <div id="dork-toast">
                <span class="toast-title"></span>
                <span class="toast-desc"></span>
            </div>

            <div id="dork-backdrop"></div>

            <div id="dork-menu">
                <div class="menu-header">
                    <span class="menu-title">Google Dork Helper</span>
                    <span class="menu-badge">OSINT Pro</span>
                </div>
                <div class="shortcut-grid">
                    ${this.shortcuts.map(s => `
                        <div class="shortcut-row">
                            <span class="shortcut-label">${s.label}</span>
                            <div class="kbd-group">
                                ${s.keys.map(k => `<kbd class="kbd">${k}</kbd>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(container);

        // Click outside to close
        document.getElementById('dork-backdrop').addEventListener('click', () => this.toggleMenu(false));
    }

    attachKeyboardListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e), true);
    }

    handleKeyPress(e) {
        // Toggle Menu: Ctrl+Shift+H
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'h') {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
            return;
        }

        const target = e.target;
        // Only trigger manipulation on inputs/textareas
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') return;

        // Undo: Ctrl+Shift+Z
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') {
            e.preventDefault();
            e.stopPropagation();
            this.undo(target);
            return;
        }

        // Logic Router for Ctrl+Shift combinations
        if (e.ctrlKey && e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();

            switch (e.key.toLowerCase()) {
                case 'q': this.wrapInQuotes(target); return;
                case 'a': this.quoteEachWord(target); return;
                case 's': this.addOperator(target, 'site:'); return;
                case 'u': this.addOperator(target, 'inurl:'); return;
                case 'x': this.addOperator(target, 'intext:'); return;
                case 'o': this.addOperator(target, ' OR '); return;
                case 'f': this.waitForFileType(target); return;
                case 'c': this.addOperator(target, 'cache:'); return;
                case 'r': this.addOperator(target, 'related:'); return;
                case 'i': this.addOperator(target, 'info:'); return;
                case 'l': this.addOperator(target, 'link:'); return;
                case 'n': this.addOperator(target, 'inanchor:'); return;
                case 'b': this.addOperator(target, 'before:'); return;
                case 'g': this.addOperator(target, 'after:'); return;
            }

            // Special characters
            if (e.key === '-') { this.addOperator(target, '-'); return; }
            if (e.key === '+') { this.addOperator(target, '+'); return; }
            if (e.key === '*') { this.addOperator(target, '*'); return; }
            if (e.key === '&') { this.addOperator(target, ' AND '); return; }
            if (e.key === '|') { this.addOperator(target, ' | '); return; }
            if (e.key === '.') { this.addOperator(target, '..'); return; }
            if (e.key === '~') { this.addOperator(target, '~'); return; }
        }

        // Alt+Shift combinations
        if (e.altKey && e.shiftKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            e.stopPropagation();
            this.addOperator(target, 'intitle:');
        }
    }

    // --- Core Logic ---

    saveHistory(input, oldValue) {
        this.history.push({
            value: oldValue,
            selectionStart: input.selectionStart,
            selectionEnd: input.selectionEnd
        });
        if (this.history.length > this.maxHistory) this.history.shift();
    }

    undo(input) {
        if (this.history.length > 0) {
            const last = this.history.pop();
            input.value = last.value;
            input.setSelectionRange(last.selectionStart, last.selectionEnd);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            this.showToast('✓ Undo', 'Reverted last action');
        } else {
            this.showToast('⚠ Undo', 'No history available');
        }
    }

    addOperator(input, operator) {
        this.saveHistory(input, input.value);

        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;

        // If text is selected and operator is not a logical operator, wrap it
        if (start !== end && !operator.match(/^\s*(OR|AND|\|)\s*$/)) {
            const selected = text.substring(start, end);
            const newText = text.substring(0, start) + operator + selected + text.substring(end);
            input.value = newText;
            input.setSelectionRange(start + operator.length + selected.length, start + operator.length + selected.length);
        } else {
            const newText = text.substring(0, start) + operator + text.substring(end);
            input.value = newText;
            input.setSelectionRange(start + operator.length, start + operator.length);
        }

        input.dispatchEvent(new Event('input', { bubbles: true }));
        this.showToast('✓ Operator Added', operator.trim() || operator);
    }

    wrapInQuotes(input) {
        this.saveHistory(input, input.value);

        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;
        const selected = text.substring(start, end);

        let newText;
        let newCursor;

        if (start !== end) {
            // Quote selection
            newText = text.substring(0, start) + `"${selected}"` + text.substring(end);
            newCursor = end + 2;
            this.showToast('✓ Quoted Selection', `"${selected}"`);
        } else {
            // Quote current word or empty
            const wordInfo = this.getCurrentWord(input);
            if (wordInfo.text.trim()) {
                newText = text.substring(0, wordInfo.start) + `"${wordInfo.text}"` + text.substring(wordInfo.end);
                newCursor = wordInfo.start + wordInfo.text.length + 2;
                this.showToast('✓ Quoted Word', `"${wordInfo.text}"`);
            } else {
                newText = text.substring(0, start) + '""' + text.substring(end);
                newCursor = start + 1;
                this.showToast('✓ Empty Quotes', 'Inserted ""');
            }
        }

        input.value = newText;
        input.setSelectionRange(newCursor, newCursor);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    quoteEachWord(input) {
        this.saveHistory(input, input.value);

        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;

        let targetText = start !== end ? text.substring(start, end) : text;
        const words = targetText.split(/\s+/).filter(w => w.length > 0);
        const quoted = words.map(w => `"${w}"`).join(' ');

        if (start !== end) {
            input.value = text.substring(0, start) + quoted + text.substring(end);
            input.setSelectionRange(start + quoted.length, start + quoted.length);
        } else {
            input.value = quoted;
            input.setSelectionRange(quoted.length, quoted.length);
        }

        input.dispatchEvent(new Event('input', { bubbles: true }));
        this.showToast('✓ Batch Quote', `Quoted ${words.length} word(s)`);
    }

    waitForFileType(input) {
        this.showToast('📁 Filetype Select', 'P(pdf) X(xlsx) D(docx) W(doc) T(txt) C(csv) J(json) Z(zip) L(log) S(sql) M(ppt) V(mp4) A(mp3) I(jpg) G(png) H(html) R(rtf) ESC(cancel)');

        const handler = (ev) => {
            const map = {
                'p': 'pdf',
                'x': 'xlsx',
                'd': 'docx',
                'w': 'doc',
                't': 'txt',
                'c': 'csv',
                'j': 'json',
                'z': 'zip',
                'l': 'log',
                's': 'sql',
                'm': 'ppt',
                'v': 'mp4',
                'a': 'mp3',
                'i': 'jpg',
                'g': 'png',
                'h': 'html',
                'r': 'rtf'
            };
            const key = ev.key.toLowerCase();

            if (map[key]) {
                ev.preventDefault();
                ev.stopPropagation();
                document.removeEventListener('keydown', handler, true);
                this.addOperator(input, `filetype:${map[key]} `);
            } else if (ev.key === 'Escape') {
                ev.preventDefault();
                ev.stopPropagation();
                document.removeEventListener('keydown', handler, true);
                this.showToast('✕ Cancelled', 'Filetype selection aborted');
            }
        };

        document.addEventListener('keydown', handler, true);
    }

    // --- Utilities ---

    getCurrentWord(input) {
        const text = input.value;
        const pos = input.selectionStart;
        let start = pos;
        while (start > 0 && !/\s/.test(text[start - 1])) start--;
        let end = pos;
        while (end < text.length && !/\s/.test(text[end])) end++;
        return { start, end, text: text.substring(start, end) };
    }

    toggleMenu(forceState) {
        const menu = document.getElementById('dork-menu');
        const backdrop = document.getElementById('dork-backdrop');

        this.isVisible = forceState !== undefined ? forceState : !this.isVisible;

        if (this.isVisible) {
            menu.classList.add('visible');
            backdrop.classList.add('visible');
        } else {
            menu.classList.remove('visible');
            backdrop.classList.remove('visible');
        }
    }

    showToast(title, desc) {
        const toast = document.getElementById('dork-toast');
        const tTitle = toast.querySelector('.toast-title');
        const tDesc = toast.querySelector('.toast-desc');

        tTitle.textContent = title;
        tDesc.textContent = desc || '';

        toast.classList.add('visible');

        if (this.toastTimeout) clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            toast.classList.remove('visible');
        }, 3000);
    }
}

// Initialization
new Dorkeysy();
