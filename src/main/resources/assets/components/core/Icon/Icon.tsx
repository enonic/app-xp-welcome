import React from 'react';
import {AppWindow, ChevronLeft, Copy, ExternalLink, FolderTree, Globe, Inbox, Layers, LoaderCircle, LucideIcon} from 'lucide-react';

import './Icon.css';

const ICONS: Record<string, LucideIcon> = {
    'copy': Copy,
    'tree-2': FolderTree,
    'keyboard_arrow_left': ChevronLeft,
    'application': AppWindow,
    'newtab': ExternalLink,
    'earth': Globe,
    'layer': Layers,
    'drawer': Inbox,
    'spinner': LoaderCircle,
};

export interface Props {
    className?: string;
    icon: string;
    size?: string;
    title?: string;
}

export default function Icon({className, icon, size = '1em', title}: Props): JSX.Element {
    const LucideIcon = ICONS[icon] ?? AppWindow;

    const classNames = `Icon ${className ?? ''}`.trim();

    return (
        <LucideIcon className={classNames} size={size} strokeWidth={1.5} aria-label={title} />
    );
}
