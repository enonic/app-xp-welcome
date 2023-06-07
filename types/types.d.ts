declare interface Application {
    applicationKey: string;
    version: string;
    displayName: string;
    description: string;
    url: string;
    deploymentUrl?: string;
    adminToolsUrls: string[];
    icon: string;
}

declare interface Site {
    id: string;
    name: string;
    displayName: string;
    projectName: string;
    repositoryName: string;
    path: string;
    language: string;
    hasDraft: boolean;
    hasMaster: boolean;
}

declare interface Project {
    name: string;
    displayName?: string;
    description?: string;
    parent?: string;
    icon: string;
}
