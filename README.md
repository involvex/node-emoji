# node-emoji

[![npm version](https://img.shields.io/npm/v/@involvex/emoji-cli.svg)](https://www.npmjs.com/package/@involvex/emoji-cli)
[![CI Status](https://github.com/omnidan/node-emoji/workflows/CI/badge.svg)](https://github.com/omnidan/node-emoji/actions)
[![Code Coverage](https://img.shields.io/codecov/c/github/omnidan/node-emoji.svg)](https://codecov.io/gh/omnidan/node-emoji)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/@involvex/emoji-cli.svg)](https://libraries.io/npm/@involvex/emoji-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/node/v/@involvex/emoji-cli.svg)](https://nodejs.org/)

> Friendly emoji lookups and parsing utilities for Node.js. 💖

A comprehensive emoji library for Node.js that provides utilities for parsing, searching, and working with emojis. Features both a JavaScript API and a command-line interface.

## 📦 Installation

### For Global CLI Usage

#### npm

```bash
npm install -g @involvex/emoji-cli
```

#### yarn

```bash
yarn global add @involvex/emoji-cli
```

#### pnpm

```bash
pnpm add -g @involvex/emoji-cli
```

#### bun

```bash
bun add -g @involvex/emoji-cli
```

### Without Installation (npx/bunx)

You can also use the CLI without installing it globally:

#### Using npx (npm)

```bash
npx @involvex/emoji-cli --search "heart"
npx @involvex/emoji-cli --get "heart"
npx @involvex/emoji-cli --random
```

#### Using bunx (bun)

```bash
bunx @involvex/emoji-cli --search "heart"
bunx @involvex/emoji-cli --get "heart"
bunx @involvex/emoji-cli --random
```

**Requirements:** Node.js >= 18

## 🚀 Quick Start

### JavaScript API

```javascript
import { emojify, search, random, get } from '@involvex/emoji-cli'

// Convert text with emoji codes to actual emojis
const text = emojify('I :heart: JavaScript! :tada:')
console.log(text)
// Output: "I ❤️ JavaScript! 🎉"

// Search for emojis by name
const heartEmojis = search('heart')
console.log(heartEmojis)
// Output: [{ emoji: '❤️', name: 'heart' }, { emoji: '💔', name: 'broken_heart' }, ...]

// Get a specific emoji
const heart = get('heart')
console.log(heart)
// Output: '❤️'

// Get a random emoji
const randomEmoji = random()
console.log(randomEmoji)
// Output: { emoji: '🌈', name: 'rainbow' }
```

### Command Line Interface

After installation, you can use the `emoji-cli` command:

```bash
# Search for emojis
emoji-cli --search "heart"

# Get a specific emoji
emoji-cli --get "heart"

# Convert text to emojis
emoji-cli --emojify "I love JavaScript!"

# Convert emojis back to text
emoji-cli --unemojify "I ❤️ JavaScript!"

# Get a random emoji
emoji-cli --random

# Check if an emoji exists
emoji-cli --has "heart"
```

## ✨ Features

- **🔍 Powerful Search**: Search emojis by name, keyword, or pattern matching
- **📝 Text Conversion**: Convert between text with emoji codes and actual emojis
- **🎲 Random Selection**: Get random emojis for variety and fun
- **🔧 Utility Functions**: Comprehensive set of emoji manipulation utilities
- **🖥️ CLI Interface**: Command-line tool for emoji operations
- **📦 Tree Shaking**: Modern ESM module support for better bundling
- **🧪 Well Tested**: Comprehensive test coverage with Vitest
- **⚡ TypeScript**: Full TypeScript support with proper type definitions

## 📖 API Documentation

### Core Functions

#### `emojify(input, options)`

Parse markdown-encoded emojis in a string and convert them to actual emoji characters.

**Parameters:**

- `input` (string): The text containing emoji codes like `:heart:`
- `options` (object, optional):
  - `fallback` (string | function): Fallback for unknown emoji codes
  - `format` (function): Custom formatting function for matched emojis

**Returns:** string

**Examples:**

```javascript
import { emojify } from '@involvex/emoji-cli'

emojify('Hello :world:!')
// Output: "Hello 🌍!"

// With custom fallback
emojify('I :unknown: this', { fallback: '❓' })
// Output: "I ❓ this"

// With custom format function
emojify('I :heart: this', {
  format: (emoji, code) => `${emoji} (${code})`,
})
// Output: "I ❤️ (:heart:) this"
```

#### `search(keyword)`

Search for emojis by name or pattern.

**Parameters:**

- `keyword` (string | RegExp): Search term or regular expression

**Returns:** Array of `{ emoji, name }` objects

**Examples:**

```javascript
import { search } from '@involvex/emoji-cli'

search('heart')
// Output: [{ emoji: '❤️', name: 'heart' }, { emoji: '💔', name: 'broken_heart' }]

search(/^heart/)
// Output: All emojis starting with "heart"

search('face')
// Output: All emojis containing "face" in their name
```

#### `get(codeOrName)`

Get an emoji by its code or name.

**Parameters:**

- `codeOrName` (string): Emoji code (e.g., 'heart') or emoji character

**Returns:** string | undefined

**Examples:**

```javascript
import { get } from '@involvex/emoji-cli'

get('heart')
// Output: '❤️'

get('❤️')
// Output: '❤️'

get('non-existent')
// Output: undefined
```

#### `random()`

Get a random emoji.

**Returns:** `{ emoji, name }` object

**Examples:**

```javascript
import { random } from '@involvex/emoji-cli'

random()
// Output: { emoji: '🌈', name: 'rainbow' }
```

#### `replace(input, replacement, options)`

Replace emojis in a string with custom replacements.

**Parameters:**

- `input` (string): Input text containing emojis
- `replacement` (string | function): Replacement text or function
- `options` (object, optional):
  - `preserveSpaces` (boolean): Whether to preserve spaces after emojis

**Returns:** string

**Examples:**

```javascript
import { replace } from '@involvex/emoji-cli'

replace('I ❤️ JavaScript!', '[EMOJI]')
// Output: "I [EMOJI] JavaScript!"

replace('I ❤️ JavaScript!', (emoji, index) => `[${emoji.name}]`)
// Output: "I [heart] JavaScript!"
```

#### `strip(input)`

Remove all emojis from a string.

**Parameters:**

- `input` (string): Input text

**Returns:** string

**Examples:**

```javascript
import { strip } from '@involvex/emoji-cli'

strip('I ❤️ JavaScript! 🎉')
// Output: "I JavaScript!"
```

#### `unemojify(input)`

Convert emojis back to their markdown codes.

**Parameters:**

- `input` (string): Input text containing emojis

**Returns:** string

**Examples:**

```javascript
import { unemojify } from '@involvex/emoji-cli'

unemojify('I ❤️ JavaScript!')
// Output: "I :heart: JavaScript!"
```

#### `which(emoji, options)`

Get the name/code of an emoji.

**Parameters:**

- `emoji` (string): The emoji character
- `options` (object, optional):
  - `markdown` (boolean): Return in markdown format

**Returns:** string | undefined

**Examples:**

```javascript
import { which } from '@involvex/emoji-cli'

which('❤️')
// Output: 'heart'

which('❤️', { markdown: true })
// Output: ':heart:'
```

#### `find(codeOrName)`

Find an emoji by code or name, returning both emoji and name.

**Parameters:**

- `codeOrName` (string): Emoji code or name

**Returns:** `{ emoji, name } | undefined`

**Examples:**

```javascript
import { find } from '@involvex/emoji-cli'

find('heart')
// Output: { emoji: '❤️', name: 'heart' }

find('❤️')
// Output: { emoji: '❤️', name: 'heart' }
```

#### `has(codeOrName)`

Check if an emoji exists.

**Parameters:**

- `codeOrName` (string): Emoji code or name

**Returns:** boolean

**Examples:**

```javascript
import { has } from '@involvex/emoji-cli'

has('heart')
// Output: true

has('non-existent')
// Output: false
```

## 🛠️ Configuration

### Node.js Requirements

- **Node.js**: >= 18.0.0
- **Package Manager**: npm, yarn, pnpm, or bun

### TypeScript Support

The package includes full TypeScript definitions. No additional types package needed:

```typescript
import { emojify, search, type EmojifyOptions } from '@involvex/emoji-cli'

const options: EmojifyOptions = {
  fallback: '❓',
  format: (emoji, name) => `${emoji} (${name})`,
}

const result = emojify('Hello :world:!', options)
```

## 🐛 Troubleshooting

### Common Issues

**"Cannot find module '@involvex/emoji-cli'"**

- Ensure you have Node.js >= 18 installed
- Try reinstalling: `npm install @involvex/emoji-cli`
- Check that your package manager is up to date

**"Unknown command" in CLI**

- For global CLI usage: Ensure you've installed the package globally with your package manager
- Try without installation: `npx @involvex/emoji-cli --help` or `bunx @involvex/emoji-cli --help`
- For npm global install: `npm install -g @involvex/emoji-cli`
- For yarn global install: `yarn global add @involvex/emoji-cli`
- For pnpm global install: `pnpm add -g @involvex/emoji-cli`
- For bun global install: `bun add -g @involvex/emoji-cli`
- Check that the emoji name/code exists using `search()`

**"Emoji not found"**

- Verify the emoji name using `search()` function
- Some emojis may not be available in all fonts/platforms
- Check for typos in emoji names

### Getting Help

- 📋 **Issues**: [GitHub Issues](https://github.com/omnidan/node-emoji/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/omnidan/node-emoji/discussions)
- 📖 **Documentation**: This README and inline code documentation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/involvex/node-emoji.git
   cd node-emoji
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run tests**

   ```bash
   npm test
   ```

4. **Build the project**

   ```bash
   npm run build
   ```

5. **Run linting**
   ```bash
   npm run lint
   ```

### Contribution Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PRs
- Use conventional commit messages

### Adding New Emojis

Emojis are sourced from the [emojilib](https://github.com/muan/emojilib) package. To request new emojis, please contribute to that project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Emoji Data**: [emojilib](https://github.com/muan/emojilib) - Comprehensive emoji database
- **Inspiration**: Built upon the original [node-emoji](https://github.com/omnidan/node-emoji) by Daniel Biedermann
- **Community**: Thanks to all contributors and users who make this project better

## 📊 Package Information

### Keywords

`emoji`, `simple`, `emoticons`, `emoticon`, `emojis`, `smiley`, `smileys`, `smilies`, `ideogram`, `ideograms`

### Engines

- **Node.js**: >= 18

### Dependencies

- **@sindresorhus/is**: Type checking and validation utilities
- **char-regex**: Character matching utilities
- **emojilib**: Emoji database and utilities
- **jiti**: JavaScript Runtime detection
- **skin-tone**: Skin tone variation support

### Dev Dependencies

- **TypeScript**: Static type checking
- **Vitest**: Testing framework
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **tsup**: Build tooling

---

<div align="center">

**Made with 💖 by [Involvex](https://github.com/involvex)**

[⭐ Star this project on GitHub](https://github.com/omnidan/node-emoji) if you find it helpful!

</div>
