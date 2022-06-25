import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doEscape'
})
export class DoEscapePipe implements PipeTransform {

  constructor() { }

  transform(safe: string) {
    return safe?.replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
}
