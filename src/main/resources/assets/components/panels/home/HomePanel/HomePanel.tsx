import React, {ReactNode} from 'react';

import {ScreenType} from '../../../../stores/data/ScreenType';
import {goToScreen} from '../../../../stores/navigation';
import Button from '../../../core/Button/Button';
import Panel from '../../Panel/Panel';

export interface Props {
    className?: string;
}

export default function HomePanel({className}: Props): JSX.Element {
    const classNames = `HomePanel ${className ?? ''}`.trim();

    return (
        <Panel className={classNames}>
            <Button label='Webapps' action={{handler: () => goToScreen(ScreenType.WEBAPPS)}} />
        </Panel>
    );
}
