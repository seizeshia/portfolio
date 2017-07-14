import { GeneralexamPage } from './app.po';

describe('generalexam App', () => {
  let page: GeneralexamPage;

  beforeEach(() => {
    page = new GeneralexamPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
