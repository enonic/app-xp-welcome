import React from 'react';

import {kebab} from '../../../common/utils/array';
import {NavigationSegment} from '../../../stores/data/NavigationSegment';
import {segments, setNavigationState} from '../../../stores/navigation';
import Button, {ButtonType} from '../../core/Button/Button';
import Separator from '../../core/Separator/Separator';

import './Navigator.css';

export interface Props {
    className?: string;
}

function createSegment({name, state}: NavigationSegment, key: number): JSX.Element {
    return <Button
        className='Navigator-Segment'
        key={key}
        type={ButtonType.LINK}
        label={name}
        action={{handler: () => state && setNavigationState(state)}}
        disabled={!state}
    />;
}

function createSegments(segments: NavigationSegment[]): JSX.Element[] {
    return kebab(segments.map((segment, index) => createSegment(segment, index)), (index: number) => <Separator key={`s${index}`} />);
}

export default function Navigator({className}: Props): JSX.Element {
    const classNames = `Navigator ${className ?? ''}`.trim();

    return (
        <nav className={classNames}>
            {createSegments(segments.get())}
        </nav>
    );
}
