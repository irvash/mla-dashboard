import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from "./layout/layout.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

const MODULE = [
  CommonModule,
  FormsModule,
  // TranslateModule,
  HttpClientModule,
  LayoutModule,
  RouterModule,
];


@NgModule({
  imports: [...MODULE],
  declarations: [],
  exports: [
    ...MODULE,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedModule,
      providers: [
        /* All of your services here. It will hold the services needed by `itself`. */
      ]
    };
  }
}
