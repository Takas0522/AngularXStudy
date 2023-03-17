import { Component, ElementRef, forwardRef, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SampleService } from 'src/app/services/sample.service';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styleUrls: ['./zip-code.component.scss'],
  // providers: [
  //  サンプルソースとかでよく見るけどprovide書くのめんどいしConstructorでngControlつかって色々やるほうが好き
  //   {
  //     provide: NG_VALUE_ACCESSOR, // ControlValueAccesorで定義されたComponentに紐づくSingletonサービスを提供する https://angular.jp/api/forms/ControlValueAccessor
  //     useExisting: forwardRef(() => ZipCodeComponent),
  //     multi: true // 1つのトークン「NG_VALUE_ACCESSOR」に複数の依存関係を注入できる
  //   }
  // ]
})
export class ZipCodeComponent implements OnInit, ControlValueAccessor {

  /**
   * protectedはHtmlTemplateからしかアクセスされないようなメソッドやプロパティに有効。外部からアクセスできなくなる。
   * HtmlTemplateからすらアクセスしない変数についてはprivate指定を行い完全に外部から参照できないようにする工夫が必要
   * @ignore
   * ignoreつけるとJSDocの除外対象になるので、Storybookに表示する対象のプロパティから外れる。書くもの少なくなるので楽。
   */
  protected fg = new FormGroup({
    before: new FormControl<string>(''),
    after: new FormControl<string>('')
  })

  /**
   * @ignore
   * 変数に！をつけることで暗黙的に「初期化していないけどundefinedになることないよ」としている。
   * これがないと都度ElementRef | Undefinedな型になるので、利用の都度Undefinedチェックが必要になる。そのため常に値が入るという保証があるのであれば！をつける。
   * Constructorから呼び出すメソッドで初期化を行っている。とかViewChildでつねにComponent上に存在するエレメントをしていするなどのときは初期化が確実にされていると保証できる。
   * 逆に言うとUndefinedになる可能性があるのであれば！をつけないほうがよい。undefinedチェックが漏れる可能性がたかくなりバグのもとになる。
   * ngIfやngForを使っているときはControlがない可能性があるので undefinedになる可能性がある
  */
  @ViewChild('')
  private inputCtrl!: ElementRef;

  constructor(
    // コントロールの機能を提供するNgControlをDIするけど現在のホスト要素でのみ利用する(DigったところのComponentだったり親のComponentで提供されるNgControlと同一にならない)
    // https://angular.jp/guide/hierarchical-dependency-injection#self
    @Self()
    // @Optional指定するとOptionとしてDIできる。つまりDIの実態がなくても実行時エラーにならない
    // ライブラリのComponent作るときでDIサービスのProvideを任意にしているものがあれば使うことになりそう
    // ngControlの場合ngModelやReactiveFormをこのComponentで使用する場合親ComponentからDIされる。
    // 逆にそれらが指定されないとDIされないのでnullになり、ぬるぽエラーになる。
    @Optional()
    private ngControl: NgControl,

    // こちらのServiceは存在自体はするがprovideIn: 'root'がないためどこからもProvideされていないのでDIするインスタンスが存在しない
    // しかしOptional指定しているためエラーにならない（ただしnullなのでインスタンス使用コードは常にnullチェックする必要がある）
    @Optional()
    private sampleService: SampleService | null
  ) {
    // Angularの諸々の処理の前にControlの初期化は終わらせておきたい
    this.controlInit();
  }

  ngOnInit(): void {
    this.controlActionInit();
  }

  private controlInit() {
    if (this.ngControl == null) {
      return;
    }
    // Angularのコントロール提供サービスのValueAccessorにControlValueAccessorインターフェースをもつ自分自身を割り当てる
    // これはAngularの標準的なコントロールインターフェースと動作をするComponentだよ！という指定みたいなもの。
    this.ngControl.valueAccessor = this;
  }

  private controlActionInit() {
    // FormControlをつかって変更をsubscribeして反映するのが楽だと思っている。
    // 雑にできれば楽なので極力ReactiveForms構成にして内部の変更をトータルで引っ掛ける構成にしちゃうのが好き。
    // 変更内容にフィルタかけたり入力待機状態つくれたり自由度がたかいのもある（個人的趣向が強い
    this.fg.valueChanges.subscribe(x => {
      const a = x.after ? x.after : '';
      const b= x.before ? x.before : '';
      const val = b + '-' + a;
    // 値が確定したらonChangeイベントを通して上位ComponentのngModelやFormControlを通じて変更を伝播させる
    this.onChange(val);
    });
  }


  writeValue(obj: string): void {
    if (obj == null) {
      return;
    }
    // xxx-xxxx形式でデータ入力されるからパースしてそれぞれのコントロールに突っ込む
    const zips = obj.split('-');
    if (zips.length == 2) {
      const val = {
        before: zips[0],
        after: zips[1]
      }
      this.fg.patchValue(val);
    }
  }

  /**
   * 変更時のCallbackの登録。すげ替えられて使われる想定なので、基本的にまずは未定義(undefined)が意図としては正しいと思う。
   * ngModelとかReactiveFormsでこのコントロールが使用されるときに、利用しているComponentの変数にバインドするための関数がはいってくる模様。
   * (なのでngModelとかReaciteve Formsで使用されないときはすげ替えられる関数がない状態になる)
   * @ignore
   * @param obj こいつが実行される際の引数。想定とかできるなら型指定しててもいいとおもう。今回の場合テキストボックスだから文字列。ただしコントロールの状態によってはnullになる可能性もあり
   */
  private onChange = (obj: string | null) => undefined;
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * コントロールを触ったときなどのCallbackの登録。Changeと同様すげ替えられて使われる想定なので、基本的にまずは未定義(undefined)が意図としては正しいと思う。
   * ngModelとかReactiveFormsでこのコントロールが使用されるときに、利用しているComponentのTouchイベントが実行するための関数が入ってくる模様。
   * (なのでこいつもngModelとかReaciteve Formsで使用されないときはすげ替えられる関数がない状態になる)
   * @ignore
   */
  private onTouched = () => undefined;
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * 親ComponentからこのComponent事態のDisable/Enableを指定されたときの動作を実装する。
   * Component内部のコントロール群をReactiveFormsで実装したのはここの切り替えがFormGroup単位でできるから楽というのもある。
   * @param isDisabled 
   */
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.fg.disable();
    } else {
      this.fg.enable();
    }
  }

}
