import React from 'react';

import {useI18n} from '../../../hooks/useI18n';
import Icomoon from '../Icomoon/Icomoon';

import './EmptyHint.css';

export interface Props {
    className?: string;
}

export default function EmptyHint({className}: Props): JSX.Element {
    const classNames = `EmptyHint ${className ?? ''}`.trim();

    return (
        <section className={classNames}>
            <Icomoon className='EmptyHint-Icon' icon='drawer' />
            <h2 className='EmptyHint-Title'>{useI18n('field.noItems.title')}</h2>
            <h4 className='EmptyHint-Description'>{useI18n('field.noItems.description')}</h4>
        </section>
    );
}
