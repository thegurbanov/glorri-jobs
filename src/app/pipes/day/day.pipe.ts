import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: string): unknown {
    if (value !== null && value !== undefined) {
      const date = moment(value);
      const diff = moment.duration(moment().diff(date));
      let result;
      if (diff.asSeconds() < 60) {
        return result = 'dates.now';
      } else if (diff.asMinutes() < 60) {
        if (Math.floor(diff.asMinutes()) == 1) {
          return result = 'dates.now';
        } 
          return result = 'dates.minshort';
      } else if (diff.asHours() < 24) {
        if (Math.floor(diff.asHours()) == 1) {
          return result = 'dates.hourshort';
        } 
          return result = 'dates.mon';
      } else if (diff.asDays() < 7) {
        if (Math.floor(diff.asDays()) == 1) {
          result = 'dates.mon';
        } 
          return result = 'dates.week';
      } else if (diff.asMonths() < 12) {
        if (Math.floor(diff.asMonths()) == 1) {
          return result = 'dates.month';
        } 
          return result = 'dates.month';
      } else {
        if (Math.floor(Math.round(diff.asYears())) == 1) {
          return result = 'dates.year';
        } 
          return result = 'dates.year';

      }
    }
    return ` gün`;
  }

}
