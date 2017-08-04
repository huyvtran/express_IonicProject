import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewRequestedAllPage } from './view-requested-all';

@NgModule({
  declarations: [
    ViewRequestedAllPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewRequestedAllPage),
  ],
  exports: [
    ViewRequestedAllPage
  ]
})
export class ViewRequestedAllPageModule {}
