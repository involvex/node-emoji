#!/usr/bin/env node

import * as cli from '../src/index.js'
export default function run() {
  console.log('Emoji cli')
  const args = process.argv.slice(2)
  const command = args[0]

  if (!command || command === '--help' || command === '-h') {
    showhelp()
    return
  }

  switch (command) {
    case '--help':
    case '-h':
      showhelp()
      break
    case '--search':
      runsearch(args[1])
      break
    case '--emojify':
      runemojify(args[1])
      break
    case '--unemojify':
      rununemojify(args[1])
      break
    case '--get':
      runget(args[1])
      break
    case '--has':
      runhas(args[1])
      break
    case '--find':
    case '-f':
      runfind(args[1])
      break
    case '--random':
    case '--rnd':
    case '-r':
      runrandom()
      break
    default:
      showhelp()
      break
  }

  function showhelp() {
    console.log('Help:')
    console.log(
      'Commands: --search --emojify --unemojify --get --has --random --find',
    )
  }
}

function runsearch(args: string) {
  console.log('searching for: ', args)
  cli.search(args)
  console.log(cli.search(args))
}

function runemojify(args: string) {
  console.log(cli.emojify(args))
}

function rununemojify(args: string) {
  console.log(cli.unemojify(args))
}

function runget(args: string) {
  console.log(cli.get(args))
}

function runhas(args: string) {
  console.log(cli.has(args))
}

function runfind(args: string) {
  console.log(cli.find(args))
}

function runrandom() {
  console.log(cli.random())
}

run()
