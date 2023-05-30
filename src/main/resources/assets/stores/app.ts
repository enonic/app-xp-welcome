import {map} from 'nanostores';

export interface AppStore {
    application: WelcomeApplication[];
    sites: WelcomeSite[];
    urls: {
        xp: string;
        managementApi: string;
        statisticsApi: string;
        assets: string;
    };
    xpVersion: string;
    phrases: Record<string, string>;
}

const app = map<AppStore>({
  application: CONFIG.applications,
  sites: CONFIG.sites,
  urls: {
    xp: CONFIG.xpUrl,
    managementApi: CONFIG.managementApiUrl,
    statisticsApi: CONFIG.statisticsApiUrl,
    assets: CONFIG.assetsUri,
  },
  xpVersion: CONFIG.xpVersion,
  phrases: CONFIG.phrases,
});

export default app;

export function i18n(key: string, ...args: string[]): string {
    const message = app.get().phrases[key] ?? `#${key}#`;
    return message.replace(/{(\d+)}/g, (_substring: string, ...replaceArgs: number[]) => args[replaceArgs[0]]).trim();
}
