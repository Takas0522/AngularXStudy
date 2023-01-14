``` mermaid
sequenceDiagram
  participant Component
  participant Guard
  participant Service
  participant WebAPI
  Component->>Guard: ページ遷移開始
  activate Component
  Guard->>Service: データ取得待機
  Service->>WebAPI: データ取得
  WebAPI->>Service: 取得データ返却
  Service->>Guard: データ取得処理終了
  Guard->>Service: 判定
  Service->>Guard: 判定結果返却
  Guard->>Component: 遷移処理終了
  deactivate Component
  Component->>Guard: ページ遷移開始
  activate Component
  Guard->>Service: データ取得待機
  Service->>Guard: 取得済みの場合すぐデータ取得処理終了
  Guard->>Service: 判定
  Service->>Guard: 判定結果返却
  Guard->>Component: 遷移処理終了
  deactivate Component
```
