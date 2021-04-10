import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopNavigationComponent} from './top-navigation.component';
import { AppUiModule} from './../app-ui.module';
import { from } from 'rxjs';



@NgModule({
  declarations: [TopNavigationComponent],
  imports: [
    CommonModule,
    AppUiModule
  ],
  exports: [
    TopNavigationModule
  ]
})
export class TopNavigationModule { }
