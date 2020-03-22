import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlsComponent } from 'src/app/controls/controls.component';
import { HandComponent } from 'src/app/hand/hand.component';

const routes: Routes = [
  {
    path: '',
    component: ControlsComponent,
  },
  {
    path: 'hand/:hand',
    component: HandComponent,
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
