export interface Application {
    applicationKey: string;
    version: string;
    displayName: string;
    description: string;
    url: string;
    deploymentUrl?: string;
    adminToolsUrls: string[];
    icon: string;
    progress?: number;
}
