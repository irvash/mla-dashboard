import {InjectionToken} from "@angular/core";
import {AboutDto} from "../../models/about-dto.interface";

export let APP_CONFIG = new InjectionToken<string>("app.config");

export interface IAppConfig {
  apiEndpoint: string;
  apiSettingsPath: string;
  aboutDto: AboutDto
}

export const AppConfig: IAppConfig = {
  apiEndpoint: "https://localhost:5001/api",
  apiSettingsPath: "ApiSettings",
  aboutDto: {} as any
};
