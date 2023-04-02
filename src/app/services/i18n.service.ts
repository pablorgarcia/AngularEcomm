import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

const LANGS = ['es', 'en'];

@Injectable({
  providedIn: 'root'
})
export class i18nService {

  constructor(
    private readonly translate: TranslateService
  ) { }

  getLang(): void {
    console.log(this.translate.currentLang)
  }

  getLangs(): string[] {
    return LANGS;
  }

  setLang(lang: string): void {
    this.translate.use(lang)
    this.getLang();
  }

}
