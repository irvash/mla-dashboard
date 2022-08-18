import {Component, Injector, OnInit} from '@angular/core';

import {ApiService} from "../../../core/services/api.service";
import {AppComponentBase} from "../../../app-component-base";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends AppComponentBase implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    injector: Injector) {
    super(injector);
  }

  cleanURL(oldURL: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  ngOnInit(): void {
  }

}
