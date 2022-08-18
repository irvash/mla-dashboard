import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {EqualValidatorDirective} from "../../models/directives/equal-validator.directive";
import {HasAuthUserViewPermissionDirective} from "../../models/directives/has-auth-user-view-permission.directive";
import {IsVisibleForAuthUserDirective} from "../../models/directives/is-visible-for-auth-user.directive";
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  DropdownModule,
  ListGroupModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import {CardModule} from "@coreui/angular";
import {DocsComponentsModule} from "@docs-components/docs-components.module";
import {ReactiveFormsModule} from '@angular/forms';
import {CustomInputComponent} from './custom-components/custom-input/custom-input.component';
import {FileUploadComponent} from './custom-components/file-upload/file-upload.component';
import {ShowErrorListComponent} from './custom-components/show-error-list/show-error-list.component';
import {SelectLanguageComponent} from './custom-components/select-language/select-language.component';
import {CustomInputLangComponent} from "./custom-components/custom-input-lang/custom-input-lang.component";
// import {ModalModule} from "ngx-bootstrap/modal";

const MODULE = [
  DocsComponentsModule,
  CardModule,
  FormModule,
  GridModule,
  ButtonModule,
  FormsModule,
  ReactiveFormsModule,
  FormModule,
  ButtonModule,
  ButtonGroupModule,
  DropdownModule,
  ListGroupModule,

];

const COMPONENT = [
  IsVisibleForAuthUserDirective,
  HasAuthUserViewPermissionDirective,
  EqualValidatorDirective,
  CustomInputComponent,
  CustomInputComponent,
  FileUploadComponent,
  ShowErrorListComponent,
  SelectLanguageComponent,
  CustomInputLangComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ...MODULE,
    HttpClientModule
  ],
  entryComponents: [
    // All components about to be loaded "dynamically" need to be declared in the entryComponents section.
  ],
  declarations: [
    // common and shared components/directives/pipes between more than one module and components will be listed here.
    ...COMPONENT,

  ],
  exports: [
    // common and shared components/directives/pipes between more than one module and components will be listed here.
    CommonModule,
    FormsModule,
    ...MODULE,
    HttpClientModule,
    ...COMPONENT,
    ShowErrorListComponent
  ]
  /* No providers here! Since they’ll be already provided in AppModule. */
})
export class SharedMainModule {
  static forRoot(): ModuleWithProviders<any> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedMainModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}
