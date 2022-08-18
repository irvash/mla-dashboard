export interface SliderDto {
  id: number;
  name: string;
  // nameEn: string;
  picName: string;
  link: string;
  typeRoute: EnumTypeRoute;
  order: number;
  altAttribute: string;
  // altAttributeEn: string;
  picNameEn: string;
  // linkEn: string;
  lang: number;
}

export enum EnumTypeRoute {
  NewTab = 1,
  OnPage = 2
}
