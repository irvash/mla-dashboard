import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ContentWithLangComponent} from './content-with-lang/content-with-lang.component';


const COMPONENT = [
  MainLayoutComponent,
  HeaderComponent,
  FooterComponent,
  ContentWithLangComponent
]

@NgModule({
  declarations: [
    ...COMPONENT,

  ],
  exports: [
    ...COMPONENT
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
  ]
})
export class LayoutModule {
}
