export interface ApiDescriptor {
    descriptor: string;
    application: string;
    name: string;
    mount: string[];
    title?: string;
    description?: string;
    documentationUrl?: string;
    allowedPrincipals?: string[];
}
