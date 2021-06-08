// describe(テストのグループ)、it(実行するテスト)みたいな感じ。

import { dateFormat } from './date-format';

// describeでネスト掘っていって…みたいな構成も可能
describe('static test:dateFormat', () => {
  describe('年表示', () => {
      /*
      多少長くなってもどのようなテストを行い結果がどうなるのか明記したほうが良い。
      「正常に動作」は曖昧な状態なので望ましくない。なにをもって「正常」とするのかがわからないため
       (ソースコード見ればわかるといえばわかるんだけど、テストは一覧でみる事が多いのでコードみないとわからないってのは健全とは言えない)
      */
      it('yyyy指定で西暦年が表示されること', () => {
          /*
          テストで揺れる値を使用してはいけない。テスト結果も揺れるので。
          例えば現在日時、DBに格納された値、WebAPIから取得する値など
          関数はなるたけin/outが明確になっていることが望ましい。
          */
          const targetDate = new Date(2021, 0, 1, 2, 3, 4, 5);
          // expect(期待値)
          const res = dateFormat(targetDate, 'yyyy');
          expect('2021').toEqual(res);
      });
      describe('和暦', () => {
        it('ggg指定で和暦の元号が表示されること(令和)', () => {
            const targetDate = new Date(2021, 0, 1, 2, 3, 4, 5);
            const res = dateFormat(targetDate, 'ggg');
            expect('令和').toEqual(res);
        });
        // しきい値のテストなんかも行うと良し
        it('2019/5/1以降は令和となること', () => {
            const targetDate = new Date(2019, 4, 1, 0, 0, 0, 0);
            const res = dateFormat(targetDate, 'ggg');
            expect('令和').toEqual(res);
        });
        it('ggg指定で和暦の元号が表示されること(平成)', () => {
            const targetDate = new Date(2019, 0, 1, 2, 3, 4, 5);
            const res = dateFormat(targetDate, 'ggg');
            expect('平成').toEqual(res);
        });
        it('1989/1/8以降は平成となること', () => {
            const targetDate = new Date(1989, 0, 8, 0, 0, 0, 0);
            const res = dateFormat(targetDate, 'ggg')
            expect('平成').toEqual(res);
        });
      });

  });
  describe('月表示', () => {});
  describe('日表示', () => {});
  describe('曜日表示', () => {});
  describe('時間表示', () => {});
  describe('分表示', () => {});
  describe('秒表示', () => {});
  describe('組み合わせ表示', () => {
      // 正常系だけでなく異常系のテストがあるとなお良い
      it ('フォーマットで使用される文字以外が指定された場合はそのまま出力されること', () => {

      })
  });
});