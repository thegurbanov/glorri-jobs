import { CategoryDto } from "./category.dto";
import { CompanyDto } from "./company.dto";
import { JobTypeDto } from "./jobType.dto";

export interface JobDto {
    _id: string,
    id: string,
    title:string,
    location:string,
    jobFunction:string,
    isRemote:boolean,
    type:string,
    postedDate?:string;
    slug:string,
    careerLevel:string,
    category:CategoryDto,
    companyProfile:CompanyDto,
  }
  