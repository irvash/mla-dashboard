import {Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AppComponentBase} from "../../../app-component-base";

@Component({
  selector: 'app-custom-input-lang',
  templateUrl: './custom-input-lang.component.html'
})
export class CustomInputLangComponent extends AppComponentBase implements OnInit {

  @Input() lang: number = 0;



  @Input() typeInput: string = '';

  @Input() isRequired: boolean = false;
  @Input() styleValue: string = '';
  @Input() titleName: string = '';

  @Input() modelName!: any;
  @Output() modelNameChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() titleNameEn: string = '';


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
    this.modelNameChange.emit(value)
  }

  changeEventEn(value: string) {
    this.modelNameChange.emit(value)
  }

  ngModelChangeEventEn(value: string) {
    this.modelNameChange.emit(value)
  }

}
