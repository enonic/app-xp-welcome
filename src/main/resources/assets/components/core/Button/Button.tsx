import React, {ReactNode} from 'react';

import {createMouseHandler} from '../../../common/utils/events';

import './Button.css';

export enum ButtonType {
    DEFAULT = 'default',
    LINK = 'link',
}

export interface Action {
    handler: FnVoid;
}

export interface Props {
    className?: string;
    children?: ReactNode;
    type?: ButtonType;
    label?: string;
    title?: string;
    disabled?: boolean;
    action?: Action;
}

const mod = (modifier: string): string => `Button_${modifier}`;

export default function Button({
    className,
    children,
    type = ButtonType.DEFAULT,
    label,
    title,
    disabled,
    action,
}: Props): JSX.Element {
    const classNames = `Button ${mod(type)} ${className ?? ''}`.trim();

    return (
        <button
            className={classNames}
            type='button'
            disabled={!!disabled}
            onClick={action && createMouseHandler(action.handler)}
            title={title}
        >
            {children}
            {label}
        </button>
    );
}
