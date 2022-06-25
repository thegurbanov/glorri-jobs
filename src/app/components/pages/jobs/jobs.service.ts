import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDto } from 'src/model/job.dto';
import { BaseService } from 'src/app/services/base/base.sevice';

@Injectable({
  providedIn: 'root'
})
export class JobsService extends BaseService {


  public getAllJobs(request: any): Observable<any> {
    return this.post<any>('/job-service/jobs/search', request)
  }
  public getJobDescription(request: any,slug:string): Observable<any> {
    return this.get<any>(`/job-service/job-external/${slug}/slug`, request)
  }
  public getJobTypes(request: any): Observable<any> {
    return this.get<any>('/translation-service/job-types', request)
  }
  public getJobFunctions(request: any): Observable<any> {
    return this.get<any>('/translation-service/job-functions', request)
  }
  public getCareerLevels(request: any): Observable<any> {
    return this.get<any>('/translation-service/career-levels', request)
  }

}
