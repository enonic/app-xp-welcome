import {Project} from '../../stores/data/Project';
import {URLS} from './url';

function getDefaultProjectIcon({parent}: Pick<Project, 'parent'>): string {
    return parent ? 'layer' : 'tree-2';
}

function getProjectIcon({name}: Pick<Project, 'name'>): string {
    return `${URLS.projectIcon}/${name}`;
}
