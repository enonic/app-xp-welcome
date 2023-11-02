import React, {ForwardedRef, forwardRef, useState} from 'react';

import {useI18n} from '../../../hooks/useI18n';
import Icomoon from '../Icomoon/Icomoon';

import './CopyIcon.css';

export const CopyIcon = forwardRef(({text}: { text: string }, ref: ForwardedRef<any>): JSX.Element => {

    const [isNotification, setNotification] = useState(false);

    function copyToClipboard(): void {
        if (isNotification) {
            return;
        }

        navigator.clipboard.writeText(text);

        setNotification(true);
        setTimeout(() => {
            setNotification(false);
        }, 1000);
    }

    const copyText = useI18n('configs.copyConfirmation');

    return (<span ref={ref} role='presentation' title={useI18n('configs.copyHint')} className='CopyIcon' onClick={copyToClipboard}>
        {isNotification ?
            <span className='CopyIcon-Text'>{copyText}</span> :
            <Icomoon className='CopyIcon-Icon' icon='copy' />
        }
    </span>);
});
