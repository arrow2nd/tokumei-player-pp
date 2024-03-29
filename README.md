# 匿名 Player++

> **Warning**
>
> **開発は終了しました。**
> **今後は[非公式Podcastフィード](https://github.com/arrow2nd/omkr-radio#%E9%9D%9E%E5%85%AC%E5%BC%8F-podcast-%E3%83%95%E3%82%A3%E3%83%BC%E3%83%89)をご利用ください。**

[オモコロ](https://omocoro.jp/)で配信中の Web ラジオを再生する非公式のソフトウェア

[![release](https://github.com/arrow2nd/tokumei-player-pp/actions/workflows/release.yaml/badge.svg)](https://github.com/arrow2nd/tokumei-player-pp/actions/workflows/release.yaml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
![GitHub all releases](https://img.shields.io/github/downloads/arrow2nd/tokumei-player-pp/total)
[![GitHub license](https://img.shields.io/github/license/arrow2nd/tokumei-player-pp)](https://github.com/arrow2nd/tokumei-player-pp/blob/main/LICENSE)

![スクリーンショット](https://user-images.githubusercontent.com/44780846/136062174-050f204e-e18e-4573-88b9-2acc992195b2.png)

## 主な機能

### ラジオの再生・各種情報の自動取得

![ラジオの選択](https://user-images.githubusercontent.com/44780846/150052667-3362c9ee-5526-49be-9ace-b40eac69591c.gif)

オモコロで配信されているほぼ全てのラジオに対応しています。

各種情報は [omkr-radio](https://github.com/arrow2nd/omkr-radio) より取得しており、ほぼ自動で更新されています。

### 連続再生

![連続再生](https://user-images.githubusercontent.com/44780846/150052669-847c5828-5e0b-4377-bfea-c6f3a6c5f8c7.gif)

再生終了時に、自動で次のエピソードが再生されます。

### シャッフル再生

![シャッフル再生](https://user-images.githubusercontent.com/44780846/150052663-c6e8c4f0-422a-48ca-823d-bf6714134d07.gif)

再生終了時に、選択中のラジオ内のエピソードがランダムで再生されます。

### 記事へスムーズにアクセス

![記事](https://user-images.githubusercontent.com/44780846/161573238-06063063-0b2c-4ef2-83bd-3482a899ba29.gif)

ワンクリックで再生中のエピソードの記事へアクセスできます。

## ダウンロード

> ⚠️ ダウンロード前に **必ず** 免責事項をご覧ください

[Releases](https://github.com/arrow2nd/tokumei-player-pp/releases/latest) からお使いの環境にあったファイルをダウンロードしてください。

## 免責事項

当ソフトウェア、及びソースコードを使用したことによって発生したいかなる損害について、 arrow2nd 及び、コントリビュータは一切の責任を負いません。

予め、ご了承ください。

## プライバシーポリシー

[こちら](https://arrow2nd.github.io/tokumei-player-pp/) をご覧ください。

## ビルドと実行

```sh
# いつもの
yarn install

# ビルド & 実行
yarn start

# ビルドのみ
yarn build

# パッケージング
yarn pack:win
yarn pack:mac
yarn pack:linux
```
