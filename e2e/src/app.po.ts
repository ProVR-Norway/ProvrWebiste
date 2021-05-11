import { browser, by, element } from 'protractor';
/*
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
*/

export class AppPage {

  //private http: HttpClient

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToPath(endpoint: string): Promise<unknown> {
    return browser.get(browser.baseUrl + '/' + endpoint) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  /*
  de_register(username: string) {
    return this.http.delete(`${environment.apiUrl}/auth/` + username);
  }
  */

}
