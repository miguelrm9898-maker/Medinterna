import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [html, css, clinical, protocols, app] = await Promise.all(
  ['index.html', 'styles.css', 'clinical.js', 'protocols.js', 'app.js'].map(file => readFile(path.join(root, file), 'utf8'))
);
// These modules contain named declarations only. Fail rather than emit a partial bundle
// if that changes: the portable version must not depend on fetch or file:// imports.
const unexport = text => text.replace(/^export (?=(?:const|function) )/gm, '');
const js = [unexport(clinical), unexport(protocols), app.replace(/^import .*;\r?\n/gm, '')].join('\n\n');
if (/^\s*(?:import|export)\s/m.test(js)) throw new Error('Unsupported module syntax in portable export.');
if (/<\/script/i.test(js) || /<\/style/i.test(css)) throw new Error('Unsafe embedded closing tag in export.');
new vm.Script(js, { filename: 'medinterna-portable.js' });
const styleTag = '<link rel="stylesheet" href="/styles.css">';
const scriptTag = '<script type="module" src="/app.js"></script>';
if (!html.includes(styleTag) || !html.includes(scriptTag)) throw new Error('Entry tags changed; update the export.');
const bundled = html
  .replace(styleTag, () => `<style>\n${css}\n</style>`)
  .replace(scriptTag, () => `<script type="module">\n${js}\n</script>`);
const dest = path.join(root, 'dist', 'Medinterna.html');
await mkdir(path.dirname(dest), { recursive: true });
await writeFile(dest, bundled, 'utf8');
console.log(`Versión independiente: ${dest} (${Buffer.byteLength(bundled)} bytes).`);
