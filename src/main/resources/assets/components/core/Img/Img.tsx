import React, {useMemo} from 'react';

import {isColorableIcon} from '../../../common/utils/icon';

export interface Props {
    className?: string;
    src: string;
    alt?: string;
}

export default function Img({className, src, alt = ''}: Props): JSX.Element {
    const classNames = `Img ${className ?? ''}`.trim();
    const isColorable = useMemo(() => isColorableIcon(src), [src]);

    if (isColorable) {
        const style = {
            display: 'inline-block',
            backgroundColor: 'currentColor',
            mask: `url("${src}") center / contain no-repeat`,
        };

        return <span className={classNames} role='img' aria-label={alt} style={style} />;
    }

    return (
        <img className={classNames} src={src} alt={alt} />
    );
}
