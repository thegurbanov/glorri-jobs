import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { count, lastValueFrom } from 'rxjs';
import { BaseResponse } from 'src/model/base.dto';
import { careerLevelDto } from 'src/model/careerLevel';
import { JobDto } from 'src/model/job.dto';
import { jobFunctionDto } from 'src/model/jobFunction.dto';
import { JobTypeDto } from 'src/model/jobType.dto';
import { JobsService } from './jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: any = [];
  allJobs!: any[];
  job!: JobDto | any;
  jobDescription!: JobDto | any;
  total: number = 0;

  showingJob: number = this.total

  activePage: number = 0;
  searchText: string = '';
  jobFunctions: jobFunctionDto[]  = [];
  jobFunction: string = '';
  location: string = '';
  activeJobId: string = '';
  jobDates = [{
    name: 'Day',
    translation: 'filter-elements.today',
    value: 1,
    count: 0,
    checked: false
  },
  {
    name: 'ThreeDays',
    translation: 'filter-elements.lastthree',
    value: 2,
    count: 0,
    checked: false
  },
  {
    name: 'Week',
    translation: 'filter-elements.lastseven',
    value: 3,
    count: 0,
    checked: false
  },
  {
    name: 'TwoWeeks',
    translation: 'filter-elements.lastfifteen',
    value: 4,
    count: 0,
    checked: false
  },
  {
    name: 'Month',
    translation: 'filter-elements.lastthirty',
    value: 5,
    count: 0,
    checked: false
  }];
  jobDateCount: [] = [];
  activeJobDate = this.jobDates.find(j => j.checked === true)?.value ?? null
  submitted: boolean = true

  jobTypes!: JobTypeDto[];
  careerLevels!: careerLevelDto[];

  constructor(
    private Service: JobsService,
    private sanitized: DomSanitizer,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllJobs()
    .then(() => {
      // this.getJobTypes();
      // this.getCareerlevels();
      this.getJobfunctions();
    });
  }

  public async getAllJobs() {

    let data = {
      page: this.activePage,
      searchText: this.searchText,
      type: this.getJobTypesCheckeds(this.jobTypes) ?? [],
      location: this.location,
      jobFunction: this.jobFunction,
      careerLevel: this.getCareerLevelsCheckeds(this.careerLevels) ?? [],
      date: this.activeJobDate
    }
    const result$ = this.Service.getAllJobs(data);

    if (this.submitted) {
      this.submitted = false;

      this.activePage++;
      await lastValueFrom(result$).then((response: any) => {
        if (response) {

          if (response.jobs.length > 0) {
            this.jobs.push(...response.jobs);
            this.job = this.jobs[0] ?? [];
            this.submitted = true

            if (this.job && !this.activeJobId) {
              this.activeJobId = this.job._id;
              this.getJobDescription(this.job.companyProfile?.companyId, this.job.slug,)
            }
            this.jobTypes = response.jobTypes.sort((a:any,b:any)=>b.count - a.count);
            console.log(   this.jobTypes )
      

            this.careerLevels = response.careerLevels;
            this.careerLevels.map(x => x.checked = false);


            this.jobDates.map(x => {
              x.count = response.dates[x.value];
            })

            this.total = response.totalCount;
          }
        }
      });
    }




  }
  public async getJobDescription(companyId: string, slug: string) {
    let param = {
      companyId: companyId
    };
    const result$ = this.Service.getJobDescription(param, slug);
    await lastValueFrom(result$).then((response: JobDto) => {
      if (response) {
        this.jobDescription = response;
        this.activeJobId = response.id
      }
    })
  }

  public async getJobTypes() {
    const result$ = this.Service.getJobTypes('');
    await lastValueFrom(result$).then((response: JobTypeDto[]) => {
      this.jobTypes = response;
      this.jobTypes.map((jobType: JobTypeDto) => {
        jobType.checked = false;
      })
    })
  }

  public async getCareerlevels() {
    const result$ = this.Service.getCareerLevels('');
    await lastValueFrom(result$).then((response: careerLevelDto[]) => {
      this.careerLevels = response;
      this.careerLevels.map((careerLevel: careerLevelDto) => {
        careerLevel.checked = false;
      })
    })
  }


  public async  getJobfunctions(){
    const result$ = this.Service.getJobFunctions('');
    await lastValueFrom(result$).then((response: jobFunctionDto[]) => {
      this.jobFunctions = response;
     
    })
  }



  getJobTypesCheckeds(datas: any) {
    let data: any = [];
    if(datas && datas.length>0){
      datas?.filter((j: any) => {
        if (j.checked == true) {
          data.push(j.type)
        }
      })
    }
    
    return data
  }

  getCareerLevelsCheckeds(datas: any) {
    let data: any = [];
    if(datas && datas.length>0){

      datas?.filter((j: any) => {
        if (j.careerLevel == true) {
          data.push(j.type)
        }
      })
    }
    return data
  }


  scrollingStop: boolean = false;
  filtered:boolean = false;

  filter() {
    this.filtered = true
    this.jobs = [];
    this.submitted == true;
    this.activePage = 0;
    this.scrollingStop = true;
    this.showButtonID = '';
    this.job=[];
    this.activeJobId=''; 
    this.getAllJobs().then(()=>{
      this.jobTypes.forEach((x:JobTypeDto)=> x.checked = true); 
    })
  }
  resetFilters(){
    this.filtered = false
    this.activePage=0;
    this.searchText='';
    this.jobTypes=[];
    this.careerLevels=[];
    this.activeJobId='';
    this.job=[];
    this.location='';
    this.jobFunction='';
    this.activeJobDate=null;
    this.getAllJobs();
   
  }


  showButtonID: string = '';
  count(data: any) {
    this.showButtonID = data._id;
    console.log(data)
    this.jobTypes.filter((jobType: JobTypeDto) => {
      this.showingJob += jobType.count
    }
    )
  }


  setJobDate(jobDate: any) {
    this.activeJobDate = jobDate.value;
    this.filter();
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= (event.target.scrollHeight * 99 / 100)) {
      if(!this.scrollingStop){
        this.getAllJobs()
      }
    }
  }


}
