declare type FnVoid = () => void;

declare interface WelcomeApplication {
    key: string;
    version: string;
    displayName: string;
    url: string;
    iconAsBase64: string;
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
