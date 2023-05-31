import {useStore} from '@nanostores/react';
import React, {ReactNode} from 'react';

import {changeOriginPort} from '../../../../common/utils/url';
import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import {ScreenType} from '../../../../stores/data/ScreenType';
import {goToScreen} from '../../../../stores/navigation';
import CardWithButton from '../../../core/CardWithButton/CardWithButton';
import CardWithLink from '../../../core/CardWithLink/CardWithLink';
import Panel from '../../Panel/Panel';
import AdminCard from '../AdminCard/AdminCard';
import StatusInfo from '../StatusInfo/StatusInfo';

import './HomePanel.css';

export interface Props {
    className?: string;
}

export default function HomePanel({className}: Props): JSX.Element {
    const {vhostEnabled} = useStore(config, {keys: ['vhostEnabled']});

    const classNames = `HomePanel ${className ?? ''}`.trim();

    return (
        <Panel className={classNames}>
            <AdminCard />

            <CardWithButton
                title={useI18n('home.card.content.title')}
                subtitle=':8080/site'
                description={useI18n('home.card.content.description')}
                action={{label: useI18n('home.card.content.action'), handler: () => goToScreen(ScreenType.CONTENTS)}}
            />

            <CardWithButton
                title={useI18n('home.card.webapp.title')}
                subtitle=':8080/webapp'
                description={useI18n('home.card.webapp.description')}
                action={{label: useI18n('home.card.webapp.action'), handler: () => goToScreen(ScreenType.WEBAPPS)}}
            />

            <CardWithLink
                title={useI18n('home.card.metrics.title')}
                subtitle=':2606'
                description={useI18n('home.card.metrics.description')}
                link={{label: useI18n('home.card.metrics.action'), url: changeOriginPort(2606)}}
            />

            <CardWithLink
                title={useI18n('home.card.management.title')}
                subtitle=':4848'
                description={useI18n('home.card.management.description')}
                link={{label: useI18n('field.docs'), url: 'https://developer.enonic.com/docs/xp/stable/runtime/management'}}
            />

            <CardWithLink
                title={useI18n('home.card.vhost.title')}
                subtitle={<StatusInfo
                    name={useI18n('field.status')}
                    value={useI18n(vhostEnabled ? 'field.enabled' : 'field.disabled')}
                />}
                description={useI18n('home.card.vhost.description')}
                link={{label: useI18n('field.docs'), url: 'https://developer.enonic.com/docs/xp/stable/deployment/vhosts'}}
            />
        </Panel>
    );
}
