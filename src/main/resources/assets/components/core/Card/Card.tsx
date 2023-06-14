import React, {ReactNode} from 'react';

import Icomoon from '../Icomoon/Icomoon';
import Img from '../Img/Img';

import './Card.css';

export interface Props {
    className?: string;
    children?: ReactNode;
    title: string | ReactNode;
    subtitle?: string | ReactNode;
    icon?: string;
    description?: string | ReactNode;
}

function createIcon(icon: string | undefined): JSX.Element | undefined {
    if (!icon) {
        return;
    }
    const isIcomoon = /^[\w\d-]+$/g.test(icon);
    return isIcomoon ?
        <Icomoon className='Card-Icon' icon={icon} /> :
        <Img className='Card-Icon' src={icon} alt='icon' />;
}

export default function Card({
    className,
    children,
    title,
    subtitle,
    icon,
    description,
}: Props): JSX.Element {
    const classNames = `Card ${className ?? ''}`.trim();

    return (
        <div className={classNames}>
            <header className='Card-Header'>
                {createIcon(icon)}
                <h2 className='Card-Title'>{title}</h2>
                <p className='Card-Subtitle'>{subtitle}</p>
            </header>
            <article className='Card-Description'>{description}</article>
            {children}
        </div>
    );
}
