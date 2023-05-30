import React from 'react';

export interface Props {
    className?: string;
    src: string;
    alt?: string;
}

export default function Img({className, src, alt = ''}: Props): JSX.Element {
    const classNames = `Img ${className ?? ''}`.trim();

    return (
        <img className={classNames} src={src} alt={alt} />
    );
}
