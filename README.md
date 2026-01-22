

# Dorkeysy 

**Advanced Google Dorking helper with customizable keybindings and templates.**

![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-purple.svg)
![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)
<img width="300" height="300" alt="dorkeysy" src="https://github.com/user-attachments/assets/23271e3a-4c6f-45bf-8b13-5ba1bc494ce2" />


Dorkeysy ( Dork easily with shortcut keys ) is a Chrome Extension designed for OSINT researchers, pentesters. It uses a sleek, keyboard-centric interface into your browser, allowing you to use complex Google Dorks and search queries without lifting your hands from the keyboard. (like a pro Vim user)

Featuring a modern UI inspired by Shadcn/Vercel design systems with automatic dark mode support.

## 📋 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Shortcut Keys Reference](#shortcut-keys-reference)
  - [General & UI](#general--ui)
  - [Search Operators](#search-operators)
  - [Logic & Modifiers](#logic--modifiers)
  - [Interactive Filetype Mode](#interactive-filetype-mode)
- [Contact](#-contact)
- [License](#-license)

## ✨ Features

*   **⚡ Keyboard-First Workflow:** Insert operators like `site:`, `inurl:`, and logic gates instantly via shortcuts.
*   **🎨 Modern UI:** Clean, unobtrusive overlay that blends with modern web aesthetics.
*   **bw/ Interactive Filetype Selector:** A dedicated mode to quickly filter by file extension (PDF, Excel, SQL, etc.).
*   **↩️ Smart Undo:** Built-in history tracking allows you to undo dork manipulations safely.
*   **🌙 Dark Mode:** Automatically detects system color preferences and adjusts the UI accordingly.
*   **📝 Text Manipulation:** Quickly quote selections or wrap every word in quotes for strict searching.
*   **🌐 Universal Compatibility:** Works on any website with an input field (Google, Shodan, Bing, etc.).

## 🚀 Installation

Since this is a developer extension, you can install it manually via Chrome's Developer Mode:

1.  **Download/Clone** this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** (toggle in the top right corner).
4.  Click **Load unpacked**.
5.  Select the folder containing the `manifest.json` file.

## 💡 Usage

1.  Navigate to Google or any website with a search bar.
2.  Click inside the input field or textarea.
3.  Use **Shortcuts** (listed below) to inject operators.
4.  Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> to view the on-screen help menu at any time.

## Shortcut Keys Reference

### General & UI
| Action | Shortcut | Description |
| :--- | :--- | :--- |
| **Toggle Helper Menu** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>H</kbd> | Show/Hide the visual cheat sheet |
| **Undo** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>Z</kbd> | Revert the last inserted operator |
| **Quote Selection** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>Q</kbd> | Wrap selected text in `" "` |
| **Quote Each Word** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>A</kbd> | Turn `foo bar` into `"foo" "bar"` |

### Search Operators
| Operator | Shortcut | Example Output |
| :--- | :--- | :--- |
| **site:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>S</kbd> | `site:example.com` |
| **inurl:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>U</kbd> | `inurl:admin` |
| **intitle:** | <kbd>Alt</kbd> + <kbd>⇧</kbd> + <kbd>T</kbd> | `intitle:"index of"` |
| **intext:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>X</kbd> | `intext:password` |
| **inanchor:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>N</kbd> | `inanchor:click` |
| **cache:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>C</kbd> | `cache:website.com` |
| **related:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>R</kbd> | `related:website.com` |
| **info:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>I</kbd> | `info:website.com` |
| **link:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>L</kbd> | `link:website.com` |
| **before:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>B</kbd> | `before:2023-01-01` |
| **after:** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>G</kbd> | `after:2023-01-01` |

### Logic & Modifiers
| Operator | Shortcut | Function |
| :--- | :--- | :--- |
| **OR** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>O</kbd> | Logical OR |
| **AND** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>&</kbd> | Logical AND |
| **Pipe (\|)** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>\|</kbd> | Pipe Operator |
| **Exclude (-)** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>-</kbd> | Exclude term |
| **Include (+)** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>+</kbd> | Force include |
| **Wildcard (*)** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>8</kbd> | Matches any word |
| **Range (..)** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>.</kbd> | Number range |
| **Synonym (~)** | <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>~</kbd> | Search synonyms |

### Interactive Filetype Mode
Press <kbd>Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>F</kbd> to enter Filetype mode, then press a single letter:

| Key | Filetype | Result |
| :--- | :--- | :--- |
| <kbd>P</kbd> | PDF | `filetype:pdf` |
| <kbd>X</kbd> | Excel (XLSX) | `filetype:xlsx` |
| <kbd>D</kbd> | Word (DOCX) | `filetype:docx` |
| <kbd>T</kbd> | Text | `filetype:txt` |
| <kbd>C</kbd> | CSV | `filetype:csv` |
| <kbd>J</kbd> | JSON | `filetype:json` |
| <kbd>Z</kbd> | ZIP | `filetype:zip` |
| <kbd>L</kbd> | LOG | `filetype:log` |
| <kbd>S</kbd> | SQL | `filetype:sql` |
| <kbd>M</kbd> | PPT | `filetype:ppt` |
| <kbd>H</kbd> | HTML | `filetype:html` |
| <kbd>ESC</kbd> | Cancel | Cancel selection |

## 📧 Contact

Created by **pookielinuxuser@tutamail.com**

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
