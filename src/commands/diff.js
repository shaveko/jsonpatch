const commander = require("commander");
const program = new commander.Command();
const fs = require("fs").promises;
const { compare } = require("fast-json-patch");

program
  .name("jsonpatch diff")
  .usage("[options] <sourceFile> <tagetFile>")
  .arguments("<source> <target>")
  .option("-o --out <filename>", "filename to write patch to")
  .action((source, target, options, command) => {
    Promise.all([
      fs.readFile(source, { encoding: "utf-8" }),
      fs.readFile(target, { encoding: "utf-8" }),
    ])
      .then(([sourceFileContents, targetFileContents]) => {
        const sourceObj = JSON.parse(sourceFileContents);
        const targetObj = JSON.parse(targetFileContents);

        const patch = JSON.stringify(compare(sourceObj, targetObj), null, 2);

        if (options && options.out) {
          fs.writeFile(options.out, patch);
        } else {
          console.log(patch);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .parse(process.argv);
