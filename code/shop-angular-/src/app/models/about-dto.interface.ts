export interface FileDataWithName {
  file: FileList | null;
  name: string;
}

export interface AboutDto {
  id: number;
  nameSite: string;
  nameSiteEn: string;

  address: string;
  addressEn: string;

  tell: string;
  tellEn: string;

  email: string;
  emailEn: string;

  descriptionSite: string;
  descriptionSiteEn: string;


  instagram: string;
  instagramEn: string;


  facebook: string;
  facebookEn: string;


  telegram: string;
  telegramEn: string;


  twitter: string;
  twitterEn: string;


  youtube: string;
  youtubeEn: string;

  linkedIn: string;
  linkedInEn: string;


  whatsApp: string;
  whatsAppEn: string;


  googleMap: string;
  googleMapEn: string;

  logoTop: string | null;
  logoDown: string | null;
}
