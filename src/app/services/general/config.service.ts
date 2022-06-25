import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public Categories = new BehaviorSubject<any>([]);

  constructor() { }


}
