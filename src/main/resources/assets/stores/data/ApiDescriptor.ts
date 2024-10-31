export interface ApiDescriptor {
    descriptor: string;
    application: string;
    name: string;
    slashApi: boolean;
    displayName?: string;
    description?: string;
    documentationUrl?: string;
    allowedPrincipals?: string[];
}
