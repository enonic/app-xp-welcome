import React, {ReactNode} from 'react';

import {isInternalUrl} from '../../../common/utils/url';
import Card from '../Card/Card';
import Icomoon from '../Icomoon/Icomoon';
import Link from '../Link/Link';

import './CardWithLink.css';

export interface CardLinkData {
    label: string;
    url: string | undefined;
    internal?: boolean;
}

export interface Props {
    className?: string;
    title: string | ReactNode;
    subtitle: string | ReactNode;
    description?: string | ReactNode;
    icon?: string;
    link: CardLinkData;
}

export default function CardWithLink({
    className,
    title,
    subtitle,
    description,
    icon,
    link,
}: Props): JSX.Element {
    const external = !!link.url && !link.internal && !isInternalUrl(link.url);

    const classNames = `CardWithLink ${className ?? ''}`.trim();

    return (
        <Card
            className={classNames}
            title={title}
            subtitle={subtitle}
            description={description}
            icon={icon}
        >
            {link.url &&
            <Link className='CardWithLink-Link' url={link.url}>
                <span className='CardWithLink-LinkLabel'>{link.label}</span>
                {external && <Icomoon className='CardWithLink-LinkIcon' icon='newtab' />}
            </Link>
            }
        </Card>
    );
}
