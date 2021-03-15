const commander = require("commander");
const program = new commander.Command();
const fs = require("fs").promises;
const { applyPatch } = require("fast-json-patch");

program
  .name("jsonpatch apply")
  .usage("[options] <sourceFile> <patchFile>")
  .arguments("<source> <patch>")
  .option("-o --out <filename>", "filename to write patched file to")
  .action((source, target, options, command) => {
    Promise.all([
      fs.readFile(source, { encoding: "utf-8" }),
      fs.readFile(target, { encoding: "utf-8" }),
    ])
      .then(([sourceFileContents, patchFileContents]) => {
        const sourceObj = JSON.parse(sourceFileContents);
        const patchObj = JSON.parse(patchFileContents);

        const patched = JSON.stringify(
          applyPatch(sourceObj, patchObj).newDocument,
          null,
          2
        );

        if (options && options.out) {
          fs.writeFile(options.out, patched);
        } else {
          console.log(patched);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .parse(process.argv);
