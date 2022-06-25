import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './components/pages/jobs/jobs.component';

const routes: Routes = [
  { path: '', component: JobsComponent, loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
