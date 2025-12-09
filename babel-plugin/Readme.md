# Babel Plugin Playground

このリポジトリは、トランパイラの動作を試すためのサンプルプロジェクトです。

## ディレクトリ構成

- `input/`  
  変換前のJavaScriptファイルを格納します（例: `input.js`）。
- `output/`  
  変換後のファイルやASTダンプを出力します。
- `plugin.js`  
  コード内から'`console.log(...)`を削除するBabelプラグインです。
- `ast-dump.js`  
  ASTを`output/ast-output.json`にダンプするBabelプラグインです。
- `babel.config.json`  
  Babelの設定ファイルです。
- `package.json`  
  スクリプトや依存パッケージの管理ファイルです。

## セットアップ

1. 依存パッケージのインストール

   ```sh
   npm install
   ```

2. トランスパイルの実行

   ```sh
   npm run transpile
   ```

   - `input/input.js`が変換され、`output/output.js`に出力されます。
   - ASTは`output/ast-output.json`にダンプされます。

## プラグインの説明

- [`plugin.js`](plugin.js):  
  すべての関数宣言の名前に`prefix_`を付与します。

- [`ast-dump.js`](ast-dump.js):  
  変換時のASTをJSON形式で`output/ast-output.json`に保存します。

## 注意事項

- `output/`ディレクトリはGit管理対象外です。
- Babelのバージョンは`package.json`で指定されています。
