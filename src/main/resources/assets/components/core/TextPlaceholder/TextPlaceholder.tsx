import React from 'react';

import {useI18n} from '../../../hooks/useI18n';

import './TextPlaceholder.css';

export interface Props {
    className?: string;
    text?: string;
}

export default function TextPlaceholder({className, text}: Props): JSX.Element {
    const defaultText = useI18n('field.empty');

    const classNames = `TextPlaceholder ${className ?? ''}`.trim();

    return (
        <span className={classNames}>{text ?? defaultText}</span>
    );
}
