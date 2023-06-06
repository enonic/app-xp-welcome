declare interface WebApplication {
    applicationKey: string;
    deploymentUrl: string;
    url: string;
    displayName: string;
    description: string;
    icon: string;
    version: string;
}

declare interface Site {
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
