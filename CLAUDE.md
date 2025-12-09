# Transpiler Playground

このリポジトリは、BabelとSWCのトランスパイラプラグインを作成・動作検証するためのplaygroundです。

## リポジトリ構成

```
transpiler-playground/
├── babel-plugin/          # Babelプラグインの実装と検証環境
│   ├── input/            # 変換前のソースコード
│   ├── output/           # 変換後のコードとAST出力
│   ├── plugin.js         # console.logを削除するプラグイン
│   ├── ast-dump.js       # ASTをJSONで出力するプラグイン
│   ├── babel.config.json # Babel設定
│   └── package.json      # 依存関係とスクリプト
└── swc-plugin/           # SWCプラグインの実装と検証環境
    ├── src/
    │   └── lib.rs        # Rustで実装されたSWCプラグイン
    ├── input/            # 変換前のソースコード
    ├── output/           # 変換後のコード出力
    ├── target/           # Rustビルド成果物（.wasmファイル）
    ├── run-transpile.js  # トランスパイル実行スクリプト
    ├── ast-dump.js       # ASTをJSONで出力するスクリプト
    ├── run-with-ast-dump.js # AST出力付きトランスパイル
    ├── Cargo.toml        # Rust依存関係
    ├── .swcrc            # SWC設定
    └── package.json      # 依存関係とスクリプト
```

## 主要ファイル

### Babelプラグイン

- [babel-plugin/plugin.js](babel-plugin/plugin.js:1): `console.log()`を削除するBabelプラグイン
- [babel-plugin/ast-dump.js](babel-plugin/ast-dump.js:1): ASTを`output/ast-output.json`にダンプするプラグイン
- [babel-plugin/babel.config.json](babel-plugin/babel.config.json:1): 使用するプラグインを指定するBabel設定ファイル
- [babel-plugin/input/input.js](babel-plugin/input/input.js:1): 変換対象のサンプルJavaScriptコード

### SWCプラグイン

- [swc-plugin/src/lib.rs](swc-plugin/src/lib.rs:1): `console.log()`を削除するSWCプラグイン（Rust実装）
- [swc-plugin/run-transpile.js](swc-plugin/run-transpile.js:1): WASMプラグインを使ったトランスパイル実行スクリプト
- [swc-plugin/ast-dump.js](swc-plugin/ast-dump.js:1): ASTをJSONで出力するスクリプト
- [swc-plugin/run-with-ast-dump.js](swc-plugin/run-with-ast-dump.js:1): AST出力付きトランスパイル実行スクリプト
- [swc-plugin/Cargo.toml](swc-plugin/Cargo.toml:1): Rust依存関係設定
- [swc-plugin/.swcrc](swc-plugin/.swcrc:1): SWC設定ファイル
- [swc-plugin/input/input.js](swc-plugin/input/input.js:1): 変換対象のサンプルJavaScriptコード

## セットアップと実行

### Babelプラグインの実行

```bash
cd babel-plugin
npm install
npm run transpile
```

実行結果:
- `output/output.js`: 変換後のJavaScriptコード（`console.log()`が削除される）

### SWCプラグインの実行

前提条件:
- Rustのインストールが必要
- `wasm32-wasip1`ターゲットの追加: `rustup target add wasm32-wasip1`

```bash
cd swc-plugin
npm install
npm run transpile  # ビルド + トランスパイル実行
```

個別コマンド:
- `npm run build`: WASMプラグインのビルドのみ
- `npm run transpile:only`: ビルド済みプラグインでトランスパイルのみ

実行結果:
- `output/output.js`: 変換後のJavaScriptコード（`console.log()`が削除される）
- `target/wasm32-wasip1/release/swc_plugin_remove_console.wasm`: ビルドされたWASMプラグイン

## プラグイン開発のワークフロー

### Babelプラグイン

1. [babel-plugin/plugin.js](babel-plugin/plugin.js)を編集してプラグインロジックを変更
2. [babel-plugin/babel.config.json](babel-plugin/babel.config.json)で使用するプラグインを設定
3. [babel-plugin/input/](babel-plugin/input/)にテスト用のソースコードを配置
4. `npm run transpile`で変換を実行
5. [babel-plugin/output/](babel-plugin/output/)ディレクトリで結果を確認

### SWCプラグイン

1. [swc-plugin/src/lib.rs](swc-plugin/src/lib.rs)を編集してプラグインロジックを変更
2. [swc-plugin/input/](swc-plugin/input/)にテスト用のソースコードを配置
3. `npm run transpile`でビルド + 変換を実行
4. [swc-plugin/output/](swc-plugin/output/)ディレクトリで結果を確認

## 注意事項

- `output/`ディレクトリはGit管理対象外です
- `node_modules/`もGit管理対象外です
- `target/`ディレクトリ（SWCのビルド成果物）もGit管理対象外です
- 各プラグインディレクトリは独立した環境として動作します

## 技術スタック

### Babel
- **@babel/core**: ^7.28.0
- **@babel/cli**: ^7.28.0
- **@babel/helper-plugin-utils**: ^7.27.1
- **@babel/types**: ^7.28.5

### SWC
- **@swc/core**: ^1.4.17
- **@swc/cli**: ^0.3.14
- **swc_core**: 50 (Rust crate)
- **Rust edition**: 2021

## 参考リンク

### Babel
- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
- [Babel AST Explorer](https://astexplorer.net/)

### SWC
- [SWC Plugin Documentation](https://swc.rs/docs/plugin/ecmascript/getting-started)
- [swc_core Documentation](https://rustdoc.swc.rs/swc_core/)
- [SWC Playground](https://play.swc.rs/)
