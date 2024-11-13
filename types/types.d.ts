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

declare interface TemplateApplication {
    key: string;
    config: string;
}

declare interface ConfigFile {
    name: string;
    folder: string;
    path: string;
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

declare interface ApiDescriptor {
    descriptor: string;
    application: string;
    name: string;
    mount: boolean;
    allowedPrincipals: string[];
    displayName?: string;
    description?: string;
    documentationUrl?: string;
}
