import { PumakatariProjectPage } from './app.po';

describe('pumakatari-project App', function() {
  let page: PumakatariProjectPage;

  beforeEach(() => {
    page = new PumakatariProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
