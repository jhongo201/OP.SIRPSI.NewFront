import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkCentersComponent } from './work-centers.component';

const routes: Routes = [
  // { path: '', component: WorkCentersComponent, canActivate: [AuthGuard] },
  { path: '', component: WorkCentersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkCentersRoutingModule {}
