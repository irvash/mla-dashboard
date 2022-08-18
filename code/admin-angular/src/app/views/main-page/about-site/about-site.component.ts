import {Component, OnInit} from '@angular/core';
import {AboutDto} from "../../../../models/about-dto.interface";
import {AppComponentBase} from "../../../app-component-base";
import {Injector} from "@angular/core";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-about-site',
  templateUrl: './about-site.component.html'
})
export class AboutSiteComponent extends AppComponentBase implements OnInit {

  public model: AboutDto = {} as any;


  public logoTopFileList: FileList | null = null;
  public logoDownFileList: FileList | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    injector: Injector) {
    super(injector);


  }

  cleanURL(oldURL: string): any {
    // return this.sanitizer.sanitize(SecurityContext.URL, oldURL);
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  ngOnInit(): void {
    this.getAbout();

    /*
    let div = document.getElementById('reza');
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26882.883135177803!2d51.66235505!3d32.62322485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc36698e7b48d5%3A0x4c615974859e13d0!2sFooladTechnic%20International%20Engineering%20Company!5e0!3m2!1sen!2s!4v1660289996918!5m2!1sen!2s";
    // @ts-ignore
    div.appendChild(iframe);*/
  }

  getAbout() {
    this.apiService.getAbout().subscribe(x => {
      console.log('getAbout', x);
      if (x.status) {
        this.model = {} as any;
        this.model = x.data;
      } else {
        this.sweetAlertService.callErrorType2(x);
      }
    })
  }

  editAbout() {
    console.log('model', this.logoTopFileList);

    this.apiService.editAbout(this.model, this.logoTopFileList, this.logoDownFileList).subscribe(data => {
      if (data.status) {
        this.getAbout();
        this.sweetAlertService.successfullAdd();
      } else {
        this.sweetAlertService.callErrorType2(data);
      }
    });
  }


}
