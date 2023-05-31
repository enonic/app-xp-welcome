import React, {ReactNode} from 'react';

import Button, {Action} from '../Button/Button';
import Card from '../Card/Card';

import './CardWithButton.css';

export interface CardButtonAction extends Action {
    label: string;
}

export interface Props {
    className?: string;
    title: string;
    subtitle: string | ReactNode;
    description: string | ReactNode;
    action: CardButtonAction;
}

export default function CardWithButton({
    className,
    title,
    subtitle,
    description,
    action,
}: Props): JSX.Element {
    const classNames = `CardWithButton ${className ?? ''}`.trim();

    return (
        <Card
            className={classNames}
            title={title}
            subtitle={subtitle}
            description={description}
        >
            <Button className='CardWithButton-Action' label={action.label} action={action} />
        </Card>
    );
}
