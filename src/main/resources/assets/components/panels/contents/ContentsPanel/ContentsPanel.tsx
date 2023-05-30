import React, {ReactNode} from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import Panel from '../../Panel/Panel';

export interface Props {
    className?: string;
}

export default function ContentsPanel({className}: Props): JSX.Element {
    const description = useI18n('contents.description');

    const classNames = `ContentsPanel ${className ?? ''}`.trim();

    return (
        <Panel
            className={classNames}
            description={description}
        >
        </Panel>
    );
}
