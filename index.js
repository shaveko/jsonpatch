#!/usr/bin/env node
const fs = require("fs").promises;
const commander = require("commander");
const program = new commander.Command();

const pkg = require("./package.json");

program
  .version(pkg.version)
  .name("jsonpatch")
  .usage("command [options]")
  .command("diff", "create the json patch based on source and target files", {
    executableFile: "./src/commands/diff",
  })
  .command("apply", "apply json patch to source file", {
    executableFile: "./src/commands/apply",
  })
  .parse(process.argv);
