import { Injectable, Inject } from '@angular/core';
import { MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalAngularConfiguration } from '@azure/msal-angular';
import { Configuration } from 'msal';


@Injectable()
export class MsalConfigService {
    constructor(
        @Inject(MSAL_CONFIG) private config: Configuration,
        @Inject(MSAL_CONFIG_ANGULAR) private angularConfig: MsalAngularConfiguration,
    ) {}

    getConfig(): Configuration {
        return this.config;
    }

    getAngularConfig(): MsalAngularConfiguration {
        return this.angularConfig;
    }

    addProtectedResourceMap(addConfigs: [string, string[]][] | Map<string, string[]>) {
        addConfigs.forEach((f: any) => {
            const m = (this.angularConfig.protectedResourceMap  as Array<[string, string[]]>).some(item => {
                return item[0] === f[0];
            });
            if (!m) {
                (this.angularConfig.protectedResourceMap as Array<[string, string[]]>).push(f);
            }
        });
    }

}
