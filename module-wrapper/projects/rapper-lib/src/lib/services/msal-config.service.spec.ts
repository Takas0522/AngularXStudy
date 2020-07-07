import { TestBed } from '@angular/core/testing';
import { MsalConfigService } from './msal-config.service';
import { MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalAngularConfiguration } from '@azure/msal-angular';
import { Configuration } from 'msal';

function MSALConfigFactory(): Configuration {
    return {
      auth: {
        clientId: 'testclientid',
        authority: 'testautohority',
        validateAuthority: false,
      },
    };
  }
export const protectedResourceMap: [string, string[]][] = [
    ['/api', ['testscope']]
];

function MSALAngularConfigFactory(): MsalAngularConfiguration {
    return {
        consentScopes: [
            'testscope',
        ],
        protectedResourceMap,
    };
}

describe('Rapper機能のテスト', () => {

    let service: MsalConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                providers: [
                    {
                        provide: MSAL_CONFIG,
                        useFactory: MSALConfigFactory
                    },
                    {
                    provide: MSAL_CONFIG_ANGULAR,
                    useFactory: MSALAngularConfigFactory
                    },
                    MsalConfigService
                ]
            }
        );
        service = TestBed.inject(MsalConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('設定の追加', () => {
        const addConfig: [string, string[]][] = [['/addapi', ['addtestscope']]];
        service.addProtectedResourceMap(addConfig);
        const conf = service.getAngularConfig();
        expect((conf.protectedResourceMap as Array<any>).length).toEqual(2);
    });
});