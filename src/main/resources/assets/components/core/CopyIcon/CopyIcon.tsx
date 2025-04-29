import React, {ForwardedRef, forwardRef, useState} from 'react';

import {useI18n} from '../../../hooks/useI18n';
import Icomoon from '../Icomoon/Icomoon';

import './CopyIcon.css';

export const CopyIcon = forwardRef(({text}: { text: string }, ref: ForwardedRef<HTMLSpanElement>): JSX.Element => {

    const [isNotification, setNotification] = useState(false);

    const copyToClipboard = async (text: string): Promise<void> => {
        if (isNotification) {
            return;
        }

        await navigator.clipboard.writeText(text);

        setNotification(true);
        setTimeout(() => {
            setNotification(false);
        }, 1000);
    };

    const copyText = useI18n('configs.copyConfirmation');
    const handleClick = () => void copyToClipboard(text);


    return (<span ref={ref} role='presentation' title={useI18n('configs.copyHint')} className='CopyIcon' onClick={handleClick}>
        {isNotification ?
            <span className='CopyIcon-Text'>{copyText}</span> :
            <Icomoon className='CopyIcon-Icon' icon='copy' />
        }
    </span>);
});
