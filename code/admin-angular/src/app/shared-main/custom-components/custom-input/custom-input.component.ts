import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {EnumTypeInput} from "../../../../models/enum-type-input.enum";
import {AppComponentBase} from "../../../app-component-base";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html'
})
export class CustomInputComponent extends AppComponentBase implements OnInit {

  @Input() typeInput: string = '';

  @Input() isRequired: boolean = false;
  @Input() styleValue: string = '';
  @Input() titleName: string = '';
  @Input() modelName!: any;
  @Output() modelNameChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() isRequiredEn: boolean = false;
  @Input() titleNameEn: string = '';
  @Input() modelNameEn!: any;
  @Output() modelNameEnChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    injector: Injector) {
    super(injector);
  }


  ngOnInit(): void {
  }

  inputEvent(value: string) {
    this.modelNameChange.emit(value)
  }

  changeEvent(value: string) {
    this.modelNameChange.emit(value)
  }

  ngModelChangeEvent(value: string) {
    this.modelNameChange.emit(value)
  }


  inputEventEn(value: string) {
    this.modelNameEnChange.emit(value)
  }

  changeEventEn(value: string) {
    this.modelNameEnChange.emit(value)
  }

  ngModelChangeEventEn(value: string) {
    this.modelNameEnChange.emit(value)
  }

}
