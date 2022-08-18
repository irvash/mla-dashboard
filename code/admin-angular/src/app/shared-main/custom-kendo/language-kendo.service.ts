import {Injectable} from '@angular/core';
import {MessageService} from '@progress/kendo-angular-l10n';

const data = {
  he: {
    rtl: true,
    messages: {
      'kendo.grid.noRecords': 'אין רשומות זמינות.'
    }
  },
  es: {
    rtl: true,
    messages: {
      'kendo.grid.noRecords': 'اطلاعاتی برای نمایش وجود ندارد',
      'kendo.grid.pagerItems': 'آیتم',
      'kendo.grid.pagerOf': 'از',
      'kendo.grid.pagerPage': 'صفحه',
      'kendo.grid.pagerLastPage': 'برو به آخرین صفحه',
      'kendo.grid.pagerFirstPage': 'برو به اولین صفحه',
      'kendo.grid.pagerPreviousPage': 'صفحه قبلی',
      'kendo.grid.pagerNextPage': 'صفحه بعدی',
      'kendo.grid.pagerItemsPerPage': 'آیتم در صفحه',
      'kendo.grid.filter': 'فیلتر',
      'kendo.grid.loading': 'منتظر بمانید',
      'kendo.grid.sort': 'مرتب',
      'kendo.grid.lock': 'قفل',
      'kendo.grid.unlock': 'باز',
      'kendo.grid.sortAscending': 'صعودی',
      'kendo.grid.sortDescending': 'نزولی',
    }
  }
};

@Injectable()
export class LanguageKendoService extends MessageService {
  private localeId = 'es';

  public set language(value: string) {
    // @ts-ignore
    const lang = data[value];
    if (lang) {
      this.localeId = value;
      this.notify(lang.rtl);
    }
  }

  public get language(): string {
    return this.localeId;
  }


  private get messages(): any {
    // @ts-ignore
    const lang = data[this.localeId];

    if (lang) {
      return lang.messages;
    }
  }

  // @ts-ignore
  public get(key: string): string {
    return this.messages[key];
  }
}
