import { Injectable, SecurityContext } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import { Translation } from 'src/model/translation.dto';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslateService {

    data: Translation[];
    lang!: string;
    languages: any;

    constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {
        this.data = [];
        this.languages = {};
    }



  
    use(lang: string): Promise<Translation[]> {
        localStorage.setItem('language', lang);

        const result$ = this.http.get(`https://atsapp.glorri.com/translation-service/translations/${lang}`)
        return  lastValueFrom(result$).then((response: any) => {
            this.data = response;
            this.lang = lang;
            
            if(!this.languages[lang]){
                this.languages[lang] = [];
                this.languages[lang].push(...this.data);
            }
             
            return Promise.resolve(this.data);
        }).catch(err => {
            this.lang = lang;
            return Promise.resolve(this.data);
        });
    }


  

    translate(key: any): any {
        const translation = this.data.find(t => t.key === key);
        return translation ? translation.value : key;
    }

   
}


export function setupTranslateFactory(translateService: TranslateService): Function {
    return () => translateService.use('az');
}

