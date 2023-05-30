import React from 'react';

import {kebab} from '../../../common/utils/array';
import {NavigationSegment} from '../../../stores/data/NavigationSegment';
import {ScreenType} from '../../../stores/data/ScreenType';
import {goToScreen, segments, setNavigationState} from '../../../stores/navigation';
import Button, {ButtonType} from '../../core/Button/Button';
import Slash from '../../core/Slash/Slash';

import './Navigator.css';

export interface Props {
    className?: string;
}

function createSegment({name, state}: NavigationSegment): JSX.Element {
    return <Button
        className='Navigator-Segment'
        type={ButtonType.LINK}
        label={name}
        action={{handler: () => state && setNavigationState(state)}}
        disabled={!state}
    />;
}

function createSegments(segments: NavigationSegment[]): JSX.Element[] {
    return kebab(segments.map(segment => createSegment(segment)), <Slash />);
}

export default function Navigator({className}: Props): JSX.Element {
    const classNames = `Navigator ${className ?? ''}`.trim();

    return (
        <nav className={classNames}>
            {createSegments(segments.get())}
        </nav>
    );
}
