## 表示後にHTML要素に対してEventを付け加えるには

RendererでHTML要素に対してEventを追加します。
HTML要素はComponent内から、ElementRefを使用します。

コンストラクタ
``` typescript
constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer
){}
```

イベントの追加
``` typescript
private eventOneFunc: Function;
this.eventOneFunc = this._renderer.listen(this._elementRef.nativeElement.querySelector(TARGET_HTML_ELEMENT), "click", (event) => {
    alert("AAA");
});
```

イベントの破棄
``` typescript
this.eventOneFunc();
```

* START
```
npm i
npm start
```