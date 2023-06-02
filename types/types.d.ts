declare interface WelcomeApplication {
    applicationKey: string;
    deploymentUrl: string;
    url: string;
    displayName: string;
    description: string;
    icon: string;
    version: string;
}

declare interface WelcomeSite {
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
}
