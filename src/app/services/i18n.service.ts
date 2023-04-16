import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(
    private readonly translateService: TranslateService
    ) { }

  public getLangs(): string[]{
    return ['es', 'en'];
  }

  public setLang(lang: string): void {
    this.translateService.use(lang);
  }

}
