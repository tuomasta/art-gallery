import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/art-gallery');
  }

  getParagraphText() {
    return element(by.css('header .page-header')).getText();
  }
}
