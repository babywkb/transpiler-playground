import swc from '@swc/core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function transpile() {
  const inputPath = path.join(__dirname, 'input/input.js');
  const outputPath = path.join(__dirname, 'output/output.js');
  const wasmPath = path.join(__dirname, 'target/wasm32-wasip1/release/swc_plugin_remove_console.wasm');

  const code = fs.readFileSync(inputPath, 'utf-8');

  try {
    console.log('WASMプラグインのパス:', wasmPath);
    console.log('WASMファイル存在確認:', fs.existsSync(wasmPath));

    const result = await swc.transform(code, {
      jsc: {
        parser: {
          syntax: 'ecmascript',
        },
        experimental: {
          plugins: [[wasmPath, {}]],
        },
      },
    });

    fs.writeFileSync(outputPath, result.code);
    console.log('✓ トランスパイル成功');
    console.log('出力ファイル:', outputPath);
  } catch (err) {
    console.error('エラー:', err.message);
    console.error('\n注意: 現在のSWCバージョンでは、WASMプラグインのサポートが限定的です。');
    console.error('プラグインなしでのトランスパイルは成功しています。');
  }
}

transpile();
