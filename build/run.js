const esbuild = require('esbuild');
const execSh = require('exec-sh');
const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
  description: 'Argparse example'
});

parser.add_argument('fileName');

const fileName = parser.parse_args().fileName;

esbuild
  .build({
    entryPoints: [`src/${fileName}.ts`],
    bundle: true,
    outdir: 'dist',
    watch: {
      onRebuild(error) {
        console.clear();
        if (error) {
          console.error('watch build failed:', error);
        } else {
          execSh(`node dist/${fileName}.js`);
        }
      },
    },
  })
  .then(() => {
    console.clear();
    execSh(`node dist/${fileName}.js`);
  });
