import { NgExamplePage } from './app.po';

describe('ng-example App', () => {
  let page: NgExamplePage;

  beforeEach(() => {
    page = new NgExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
