import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExcelModule, GridModule, PDFModule} from "@progress/kendo-angular-grid";
import {
  InputsModule,
  MaskedTextBoxModule,
  NumericTextBoxModule,
  SliderModule,
  SwitchModule,
  TextBoxModule
} from "@progress/kendo-angular-inputs";
import {ButtonsModule} from "@progress/kendo-angular-buttons";
//import {ChartsModule} from "@progress/kendo-angular-charts";
// import {DialogModule} from "@progress/kendo-angular-dialog";
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import {ExcelExportModule} from "@progress/kendo-angular-excel-export";
// import {LayoutModule} from "@progress/kendo-angular-layout";
// import {MenusModule} from "@progress/kendo-angular-menu";
import {PDFExportModule} from "@progress/kendo-angular-pdf-export";
import {PopupModule} from "@progress/kendo-angular-popup";
import {RTL} from "@progress/kendo-angular-l10n";
// import {TooltipModule} from "@progress/kendo-angular-tooltip";
import {TreeViewModule} from "@progress/kendo-angular-treeview";
// import {ScrollViewModule} from '@progress/kendo-angular-scrollview';
// import {EditorModule} from "@progress/kendo-angular-editor";
// import {IndicatorsModule} from "@progress/kendo-angular-indicators";
import {FormsModule} from '@angular/forms';


const MODULES = [
  CommonModule,
  FormsModule,
  InputsModule,
  MaskedTextBoxModule,
  NumericTextBoxModule,
  ButtonsModule,
  // DialogModule,
  DropDownsModule,
  GridModule,
  SliderModule,
  SwitchModule,
  // TooltipModule,
  // ChartsModule,
  // EditorModule,
  TreeViewModule,
  TextBoxModule,
  // MenusModule,
  ExcelModule,
  PDFModule,
  // LayoutModule,
  ExcelExportModule,
  PDFExportModule,
  PopupModule,
  // ScrollViewModule,
  // IndicatorsModule,

];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ], exports: [...MODULES],
  providers: [{provide: RTL, useValue: true}],

})
export class CustomKendoModule {
  static forRoot(): ModuleWithProviders<CustomKendoModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: CustomKendoModule,
      providers: [
        /* All of your services here. It will hold the services needed by `itself`. */
      ]
    };
  }
}
