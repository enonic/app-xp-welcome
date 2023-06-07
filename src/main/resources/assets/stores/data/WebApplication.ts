import {Application} from './Application';

export interface WebApplication extends Application {
    deploymentUrl: string;
}
