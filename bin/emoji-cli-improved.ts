#!/usr/bin/env node

import * as cli from '../src/index'
import pkg from '../package.json'
// Type definitions for better type safety
interface CLIConfig {
  name: string
  description: string
  version: string
}

interface Command {
  name: string
  aliases: string[]
  description: string
  handler: (args?: string) => void | Promise<void>
  requiresArgs: boolean
}

interface ParsedArgs {
  command: string
  args: string[]
  help: boolean
}

// Configuration
const CONFIG: CLIConfig = {
  name: 'emoji-cli',
  description: 'Friendly emoji lookups and parsing utilities for Node.js',
  version: pkg.version as string, // TODO: Get version from package.json dynamically
}

// Available commands
const COMMANDS: Command[] = [
  {
    name: 'search',
    aliases: ['--search'],
    description: 'Search for emojis by name or pattern',
    handler: runSearch,
    requiresArgs: true,
  },
  {
    name: 'emojify',
    aliases: ['--emojify'],
    description: 'Convert text to emojis',
    handler: runEmojify,
    requiresArgs: true,
  },
  {
    name: 'unemojify',
    aliases: ['--unemojify'],
    description: 'Convert emojis back to text',
    handler: runUnemojify,
    requiresArgs: true,
  },
  {
    name: 'get',
    aliases: ['--get'],
    description: 'Get a specific emoji by name',
    handler: runGet,
    requiresArgs: true,
  },
  {
    name: 'has',
    aliases: ['--has'],
    description: 'Check if an emoji exists',
    handler: runHas,
    requiresArgs: true,
  },
  {
    name: 'find',
    aliases: ['--find', '-f'],
    description: 'Find emojis by name',
    handler: runFind,
    requiresArgs: true,
  },
  {
    name: 'random',
    aliases: ['--random', '--rnd', '-r'],
    description: 'Get a random emoji',
    handler: runRandom,
    requiresArgs: false,
  },
]

// Error handling
class CLIError extends Error {
  code: number

  constructor(message: string, code: number) {
    super(message)
    this.code = code
    this.name = 'CLIError'
  }
}

class ValidationError extends CLIError {
  constructor(message: string) {
    super(message, 2)
    this.name = 'ValidationError'
  }
}

// Utility functions
function createOutputFormatter() {
  return {
    success: (
      data:
        | never
        | string
        | {
            emoji: string
            name?: string
            key?: string
          }
        | (
            | string
            | {
                emoji: string
                name?: string
                key?: string
              }
          )[],
    ) => {
      if (Array.isArray(data)) {
        if (data.length === 0) {
          console.log('No results found')
          return
        }

        data.forEach((item, index) => {
          if (typeof item === 'string') {
            console.log(`${item}`)
          } else if (item && typeof item === 'object') {
            const displayName = item.name || item.key || 'unknown'
            console.log(`${index + 1}. ${item.emoji} ${displayName}`)
          } else {
            console.log(`${index + 1}. ${item}`)
          }
        })
      } else if (data && typeof data === 'object') {
        const displayName = data.name || data.key || 'unknown'
        console.log(`${data.emoji} ${displayName}`)
      } else if (data !== undefined && data !== null) {
        console.log(data)
      } else {
        console.log('No result found')
      }
    },
    error: (message: string) => {
      console.error(`❌ Error: ${message}`)
    },
    warning: (message: string) => {
      console.warn(`⚠️  Warning: ${message}`)
    },
    info: (message: string) => {
      console.log(`ℹ️  ${message}`)
    },
  }
}

const output = createOutputFormatter()

// Argument parsing
function parseArgs(args: string[]): ParsedArgs {
  if (args.length === 0) {
    return { command: '', args: [], help: true }
  }

  const [first, ...rest] = args

  // Check for help flags
  if (first === '--help' || first === '-h') {
    return { command: '', args: [], help: true }
  }

  return {
    command: first,
    args: rest,
    help: false,
  }
}

// Command resolution
function resolveCommand(input: string): Command | null {
  if (!input) {
    return null
  }

  return (
    COMMANDS.find(cmd => cmd.name === input || cmd.aliases.includes(input)) ||
    null
  )
}

// Validation
function validateArgs(command: Command, args: string[]): void {
  if (command.requiresArgs && args.length === 0) {
    throw new ValidationError(`Command "${command.name}" requires arguments`)
  }

  if (!command.requiresArgs && args.length > 0) {
    throw new ValidationError(
      `Command "${command.name}" does not accept arguments`,
    )
  }
}

// Command handlers
async function runSearch(query?: string): Promise<void> {
  if (!query) {
    throw new ValidationError('Search query is required')
  }

  try {
    const results = cli.search(query)
    output.success(results)
  } catch (error) {
    output.error(
      `Failed to search for "${query}": ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
  }
}

async function runEmojify(text?: string): Promise<void> {
  if (!text) {
    throw new ValidationError('Text to emojify is required')
  }

  try {
    const result = cli.emojify(text)
    output.success(result)
  } catch (error) {
    output.error(
      `Failed to emojify text: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
  }
}

async function runUnemojify(text?: string): Promise<void> {
  if (!text) {
    throw new ValidationError('Text to unemojify is required')
  }

  try {
    const result = cli.unemojify(text)
    output.success(result)
  } catch (error) {
    output.error(
      `Failed to unemojify text: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
  }
}

async function runGet(name?: string): Promise<void> {
  if (!name) {
    throw new ValidationError('Emoji name is required')
  }

  try {
    const result = cli.get(name)
    if (result) {
      output.success(result)
    } else {
      output.warning(`Emoji "${name}" not found`)
    }
  } catch (error) {
    output.error(
      `Failed to get emoji "${name}": ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
  }
}

async function runHas(name?: string): Promise<void> {
  if (!name) {
    throw new ValidationError('Emoji name is required')
  }

  try {
    const result = cli.has(name)
    output.success(
      result ? `✅ Emoji "${name}" exists` : `❌ Emoji "${name}" not found`,
    )
  } catch (error) {
    output.error(
      `Failed to check emoji "${name}": ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
  }
}

async function runFind(name?: string): Promise<void> {
  if (!name) {
    throw new ValidationError('Search term is required')
  }

  try {
    const result = cli.find(name)
    if (result) {
      output.success(result)
    } else {
      output.warning(`No emojis found for "${name}"`)
    }
  } catch (error) {
    output.error(
      `Failed to find emojis for "${name}": ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
  }
}

async function runRandom(): Promise<void> {
  try {
    const result = cli.random()
    output.success(result)
  } catch (error) {
    output.error(
      `Failed to get random emoji: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
  }
}

// Help and usage information
function showHelp(): void {
  console.log(`${CONFIG.name} v${CONFIG.version}`)
  console.log(`${CONFIG.description} 💖`)
  console.log('\nUsage:')
  console.log(`  ${CONFIG.name} <command> [arguments]`)
  console.log('\nCommands:')

  COMMANDS.forEach(cmd => {
    const aliasesText =
      cmd.aliases.length > 1 ? ` (${cmd.aliases.join(', ')})` : ''
    console.log(`  ${cmd.name}${aliasesText}  ${cmd.description}`)
  })

  console.log('\nExamples:')
  console.log(`  ${CONFIG.name} --search "heart"`)
  console.log(`  ${CONFIG.name} --get "heart"`)
  console.log(`  ${CONFIG.name} --emojify "I love you"`)
  console.log(`  ${CONFIG.name} --random`)
}

function showVersion(): void {
  console.log(`${CONFIG.name} v${CONFIG.version}`)
}

// Main execution
async function run(): Promise<void> {
  try {
    const args = process.argv.slice(2)
    const { command: commandInput, args: commandArgs, help } = parseArgs(args)

    // Handle global flags
    if (help || !commandInput) {
      showHelp()
      return
    }

    if (commandInput === '--version' || commandInput === '-v') {
      showVersion()
      return
    }

    // Resolve and execute command
    const command = resolveCommand(commandInput)
    if (!command) {
      throw new CLIError(
        `Unknown command: ${commandInput}. Use --help for available commands.`,
        1,
      )
    }

    // Validate arguments
    validateArgs(command, commandArgs)

    // Execute command
    await command.handler(commandArgs[0])
  } catch (error) {
    if (error instanceof CLIError) {
      output.error(error.message)
      process.exit(error.code)
    } else if (error instanceof ValidationError) {
      output.error(error.message)
      output.info('Use --help for usage information')
      process.exit(error.code)
    } else {
      output.error(
        `Unexpected error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      )
      process.exit(1)
    }
  }
}

// Execute if this file is run directly
// if (import.meta.url === `file://${process.argv[1]}`) {
//   run().catch(error => {
//     output.error(
//       `Failed to run CLI: ${
//         error instanceof Error ? error.message : 'Unknown error'
//       }`,
//     )
//     process.exit(1)
//   })
// }
run()
export default run
