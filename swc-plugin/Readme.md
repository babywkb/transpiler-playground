# SWC Plugin - Remove Console Log

Babelプラグインと同等の機能を持つSWCプラグインです。すべての`console.log()`呼び出しをコードから削除します。

## 機能

このプラグインは以下の処理を行います：

- すべての`console.log(...)`呼び出しを検出して削除
- Babelプラグイン（[../babel-plugin/plugin.js](../babel-plugin/plugin.js)）と同じ動作

## セットアップ

### 前提条件

- Rust（1.70以上）
- WASMターゲット: `rustup target add wasm32-wasip1`
- Node.js（npm）

### インストール

```bash
npm install
```

## 使い方

### プラグインのビルドとトランスパイル実行

```bash
npm run transpile
```

これにより以下の処理が行われます：

1. Rustプラグインをビルド（`cargo build --target wasm32-wasip1 --release`）
2. WASMファイル生成：`target/wasm32-wasip1/release/swc_plugin_remove_console.wasm`
3. [input/input.js](input/input.js)を変換
4. 結果を`output/output.js`に出力

### プラグインを使ったトランスパイル実行

```bash
npm run transpile
```

### プラグインのみビルド

```bash
npm run build
```

### ビルド済のプラグインでトランスパイル実行

```bash
npm run transpile:only
```

## ファイル構成

```
swc-plugin/
├── src/
│   └── lib.rs           # SWCプラグインのRust実装
├── input/
│   └── input.js         # 変換対象のサンプルコード
├── output/
│   └── output.js        # 変換後のコード（生成される）
├── Cargo.toml           # Rust依存関係の設定
├── .swcrc               # SWC設定ファイル
├── run-transpile.js     # トランスパイル実行スクリプト
├── package.json         # npmスクリプトと依存関係
└── Readme.md            # このファイル
```

## 実装の詳細

### Rustプラグイン（[src/lib.rs](src/lib.rs)）

- `VisitMut`トレイトを実装して、ASTを走査
- `console.log()`呼び出しを検出し、空文（EmptyStmt）に置き換え
- `#[plugin_transform]`マクロでSWCプラグインとしてエクスポート

### Babelプラグインとの比較

| 項目 | Babel | SWC |
|------|-------|-----|
| 言語 | JavaScript | Rust |
| 実行形式 | Node.js | WebAssembly (WASI) |
| AST操作 | Visitorパターン | VisitMutトレイト |
| パフォーマンス | 標準 | 高速（Rust + WASM） |

## 動作確認結果

### 入力ファイル（[input/input.js](input/input.js)）
```javascript
function calcArray() {
  const arr = [1, 2, 3];
  console.log("value", arr.map(x => x * 2).join(","));
  const result = arr.filter(n => n > 1);
  console.log("done", result);
}
```

### 出力ファイル（output/output.js）
```javascript
function calcArray() {
    var arr = [
        1,
        2,
        3
    ];
    ;  // console.log()が削除されました
    var result = arr.filter(function(n) {
        return n > 1;
    });
    ;  // console.log()が削除されました
}
```

2つの`console.log()`呼び出しが正常に削除されています。

## 参考リンク

- [SWC Plugin Documentation](https://swc.rs/docs/plugin/ecmascript/getting-started)
- [swc_core API Documentation](https://docs.rs/swc_core/)
