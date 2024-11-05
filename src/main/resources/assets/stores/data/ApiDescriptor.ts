export interface ApiDescriptor {
    descriptor: string;
    application: string;
    name: string;
    mount: boolean;
    displayName?: string;
    description?: string;
    documentationUrl?: string;
    allowedPrincipals?: string[];
}
