import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app/services/translate/translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translate: TranslateService) { }

  transform(key: any): any {
    const translation = this.translate.data.find(t => t.key === key);
    return translation ? translation.value : key;
  }
}
