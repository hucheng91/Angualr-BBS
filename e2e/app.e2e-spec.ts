import { Test1Page } from './app.po';

describe('AdminUi App', function() {
  let page: Test1Page;

  beforeEach(() => {
    page = new Test1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
