export interface ApiDescriptor {
    descriptor: string;
    application: string;
    name: string;
    mount: string[];
    displayName?: string;
    description?: string;
    documentationUrl?: string;
    allowedPrincipals?: string[];
}
