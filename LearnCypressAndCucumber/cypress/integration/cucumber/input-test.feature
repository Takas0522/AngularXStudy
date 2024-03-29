Feature: ユーザーは入力画面からデータの入力を行うことができる
    Scenario: 普通にデータ入力した場合登録後Listページに遷移しデータが追加される
    Given トップページを表示
    Given 一番最初は該当データがない
    Given データ入力画面に移動
    Given データ入力
    Given 確定
    Then 入力したデータがリストに追加されていること

    Scenario: エラーが発生するようなデータを入力した場合エラーとなりページ遷移されない
    Given データ入力画面に移動
    Given 不備のあるデータ入力
    Given 確定
    Then エラーが発生しページ遷移が行えない
