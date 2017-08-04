import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewRequestListPage } from './view-request-list';

@NgModule({
  declarations: [
    ViewRequestListPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewRequestListPage),
  ],
  exports: [
    ViewRequestListPage
  ]
})
export class ViewRequestListPageModule {}
