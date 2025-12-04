# Transpiler Playground

このリポジトリについて、BabelとSWCのトランスパイラプラグインを作成・動作検証するためのplaygroundです。

## リポジトリ構成

```
transpiler-playground/
├── babel-plugin/          # Babelプラグインの実装と検証環境
│   ├── input/            # 変換前のソースコード
│   ├── output/           # 変換後のコードとAST出力
│   ├── plugin.js         # 関数名にプレフィックスを付けるプラグイン
│   ├── ast-dump.js       # ASTをJSONで出力するプラグイン
│   ├── babel.config.json # Babel設定
│   └── package.json      # 依存関係とスクリプト
└── (swc-plugin/)         # SWCプラグイン用ディレクトリ（将来追加予定）
```

## 主要ファイル

### Babelプラグイン

- **babel-plugin/plugin.js** (babel-plugin/plugin.js:1): すべての関数宣言の名前に`prefix_`を付与するシンプルなBabelプラグイン
- **babel-plugin/ast-dump.js** (babel-plugin/ast-dump.js:1): ASTを`output/ast-output.json`にダンプするプラグイン
- **babel-plugin/babel.config.json** (babel-plugin/babel.config.json:1): 使用するプラグインを指定するBabel設定ファイル

### サンプル入力

- **babel-plugin/input/input.js** (babel-plugin/input/input.js:1): 変換対象のサンプルJavaScriptコード

## セットアップと実行

### Babelプラグインの実行

```bash
cd babel-plugin
npm install
npm run transpile
```

実行結果:
- `output/output.js`: 変換後のJavaScriptコード
- `output/ast-output.json`: AST構造のJSON出力

## プラグイン開発のワークフロー

1. `babel-plugin/plugin.js`または新しいプラグインファイルを作成・編集
2. `babel-plugin/babel.config.json`にプラグインを追加
3. `babel-plugin/input/`にテスト用のソースコードを配置
4. `npm run transpile`で変換を実行
5. `output/`ディレクトリで結果を確認

## 注意事項

- `output/`ディレクトリはGit管理対象外です
- `node_modules/`もGit管理対象外です
- 各プラグインディレクトリは独立した環境として動作します

## SWCプラグインについて

現在はBabelプラグインのみ実装されています。SWCプラグインは将来追加予定です。

## 技術スタック

- **Babel**: JavaScript transpiler with plugin API
- **@babel/core**: ^7.28.0
- **@babel/cli**: ^7.28.0

## 参考リンク

- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
- [Babel AST Explorer](https://astexplorer.net/)
