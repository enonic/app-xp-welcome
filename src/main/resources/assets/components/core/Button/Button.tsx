import {Button as UiButton, ButtonVariant} from '@enonic/ui';
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
    variant?: ButtonVariant;
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
    variant = type === ButtonType.LINK ? 'text' : 'solid',
    label,
    title,
    disabled,
    action,
}: Props): JSX.Element {
    const classNames = `Button ${mod(type)} ${className ?? ''}`.trim();

    return (
        <UiButton
            className={classNames}
            variant={variant}
            label={label}
            disabled={!!disabled}
            onClick={action && createMouseHandler(action.handler)}
            title={title}
        >
            {children}
        </UiButton>
    );
}
