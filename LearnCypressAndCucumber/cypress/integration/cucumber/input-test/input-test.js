import { Given, And, Then } from 'cypress-cucumber-preprocessor/steps';



Given('トップページを表示', () => {
  cy.visit('http://localhost:4200');
});
Given('一番最初は該当データがない', () => {
  cy.contains('Hoge').should('not.exist');
  cy.contains('Fuga').should('not.exist');
});
Given('データ入力画面に移動', () => {
  cy.contains('Add New Data').click();
});
Given('データ入力', () => {
  cy.get('input[placeholder="Title"]').type('Hoge');
  cy.get('input[placeholder="Author"]').type('Fuga');
});
Given('確定', () => {
  cy.get('button').click();
});
Then('入力したデータがリストに追加されていること', () => {
  cy.contains('Hoge').should('exist');
  cy.contains('Fuga').should('exist');
});
Given('不備のあるデータ入力', () => {
  cy.get('input[placeholder="Title"]').type('Hoge');
});
Then('エラーが発生しページ遷移が行えない', () => {
  console.log(document.getElementsByTagName('span'))
  cy.get('span[name="author-error"]').should('be.visible');
  cy.url().should('not.eq', 'http://localhost:4200/');
});