* devContainerを持っている
* Angularのライブラリ群である
* 依存関係をもつライブラリのビルドとPublishができる
* Storybookを持ちStorybookはすべてのライブラリのStoryを網羅する一つである
* CIのパイプラインを一つ持ち、Lint、Test、Buildを実行する
* Publishでプライベートリポジトリにライブラリをアップする
* 故あってAzure DevOps CI/CD。Artifactsも同様

``` mermaid
flowchart TD
  u[Utility]
  c1["Control One(my-Controls)"]
  c2["Control Two(my-Controls-two)"]
  b[Base]
  u --> b
  c1 --> b
  c2 --> b
  u --> c1
```

上記構成をUtilityを作ってからモノレポ構成を構築。

その構成にあとづけてライブラリを組み込んでいく方式で試してみる。

## Nx

* 最終的にコマンドで全部完結するからスマートではあるのかもしれんが構成がガッツリ変わるのがなんとも言い難い
  * Nxの文脈の中でAngularのCoponentやLibなどを任意のプロジェクトに生やせるのは大きいかも
  * テストはJest以外を選択していた場合プロジェクト生やすたびに大変になりそう
* Storybookの構築はめっちゃ苦労した。@types/node由来でエラーがわんさか出る
  * 現時点でこれだからメンテするとなるとめっちゃ大変かもなぁ…
  * 分離して管理したほうが幾ぶんか楽だな…これ。
* 設定とちった瞬間に超絶面倒くさいことになるな。。。
  * Angularでライブラリの大枠作ったあとにnxに変換するのが楽そう…
  * ライブラリ後から追加しようとするとやっぱ面倒くさいことになりそうだけど…
* めんどうくさくなって途中で投げた

## Turborepo

* 超楽だけどへいしゃでは使いづらいな！
  * Azureべったり

## Lege
