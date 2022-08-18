import {Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppComponentBase} from "../../../app-component-base";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent extends AppComponentBase implements OnInit {

  @Input() readOnly: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() fileName: string | null = '';
  @Output() fileNameOut: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() fileListOut: EventEmitter<FileList | null> = new EventEmitter<FileList | null>();

  @Output() fileBaseListOut: EventEmitter<any> = new EventEmitter<any>();

  fileList: FileList | undefined;
  @ViewChild("fileInputTechnical", {static: false}) fileInputTechnical: ElementRef | null = null;

  constructor(
    injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  removeFile() {
    // @ts-ignore
    this.fileInputTechnical.nativeElement.value = '';
    this.fileNameOut.emit(null);
    this.fileListOut.emit(null);
  }


  // تغییر فایل
  fileChange(event: any) {
    this.fileBaseListOut.emit(event);
    const filesList: FileList = event.target.files;
    this.fileList = event.target.files;
    this.fileListOut.emit(this.fileList);

    this.fileNameOut.emit(filesList[0].name);
    // console.log("fileChange() -> filesList", filesList);
  }

  // انتخاب فایل
  openFile(fileName: any) {
    // debugger
    if (this.isNullOrEmpty(fileName)) {
      return;
    }

    try {
      window.open(fileName, '_blank');
    } catch (e) {
      alert('خطا در نمایش فایل');
    }
  }

}
