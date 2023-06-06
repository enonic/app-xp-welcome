import {useStore} from '@nanostores/react';
import React, {ReactNode} from 'react';

import {changeOriginPort} from '../../../../common/utils/url';
import {useI18n} from '../../../../hooks/useI18n';
import app, {toggleEndpointsAreaState} from '../../../../stores/app';
import config from '../../../../stores/config';
import {AreaState} from '../../../../stores/data/AreaState';
import {ScreenType} from '../../../../stores/data/ScreenType';
import {goToScreen} from '../../../../stores/navigation';
import Button, {ButtonType} from '../../../core/Button/Button';
import CardWithButton from '../../../core/CardWithButton/CardWithButton';
import CardWithLink from '../../../core/CardWithLink/CardWithLink';
import Panel from '../../Panel/Panel';
import AdminCard from '../AdminCard/AdminCard';
import StatusInfo from '../StatusInfo/StatusInfo';

import './EndpointsArea.css';

export interface Props {
    className?: string;
}

const mod = (modifier: string): string => `EndpointsArea_${modifier}`;

export default function EndpointsArea({className}: Props): JSX.Element {
    const {vhostEnabled} = useStore(config, {keys: ['vhostEnabled']});
    const {endpointsAreaState} = useStore(app, {keys: ['endpointsAreaState']});
    const isExpanded = endpointsAreaState === AreaState.EXPANDED;
    const expandButtonLabel = useI18n(isExpanded ? 'home.endpoints.collapsed' : 'home.endpoints.expanded');

    const classNames = `EndpointsArea ${mod(endpointsAreaState)} ${className ?? ''}`.trim();

    return (
        <Panel className={classNames}>
            <AdminCard />

            <CardWithButton
                className='EndpointsArea-Card'
                title={useI18n('home.card.content.title')}
                subtitle=':8080/site'
                description={useI18n('home.card.content.description')}
                action={{label: useI18n('home.card.content.action'), handler: () => goToScreen(ScreenType.PROJECTS)}}
            />

            <CardWithButton
                className='EndpointsArea-Card'
                title={useI18n('home.card.webapp.title')}
                subtitle=':8080/webapp'
                description={useI18n('home.card.webapp.description')}
                action={{label: useI18n('home.card.webapp.action'), handler: () => goToScreen(ScreenType.WEBAPPS)}}
            />

            <CardWithLink
                className='EndpointsArea-Card'
                title={useI18n('home.card.metrics.title')}
                subtitle=':2609'
                description={useI18n('home.card.metrics.description')}
                link={{label: useI18n('home.card.metrics.action'), url: changeOriginPort(2609)}}
            />

            <CardWithLink
                className='EndpointsArea-Card'
                title={useI18n('home.card.management.title')}
                subtitle=':4848'
                description={useI18n('home.card.management.description')}
                link={{label: useI18n('field.docs'), url: 'https://developer.enonic.com/docs/xp/stable/runtime/management'}}
            />

            <CardWithLink
                className='EndpointsArea-Card'
                title={useI18n('home.card.vhost.title')}
                subtitle={<StatusInfo
                    name={useI18n('field.status')}
                    value={useI18n(vhostEnabled ? 'field.enabled' : 'field.disabled')}
                />}
                description={useI18n('home.card.vhost.description')}
                link={{label: useI18n('field.docs'), url: 'https://developer.enonic.com/docs/xp/stable/deployment/vhosts'}}
            />

            <Button
                className='EndpointsArea-ExpandButton'
                type={ButtonType.LINK}
                label={expandButtonLabel}
                action={{handler: () => toggleEndpointsAreaState()}}
            />
        </Panel>
    );
}
