import {useStore} from '@nanostores/react';
import React, {useRef} from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import {ConfigFile} from '../../../../stores/data/ConfigFile';
import {CopyIcon} from '../../../core/CopyIcon/CopyIcon';
import Panel from '../../Panel/Panel';

import './ConfigsArea.css';

export interface Props {
    className?: string;
}

const mod = (modifier: string, on = true): string => on ? `ConfigsArea_${modifier}` : '';

export default function ConfigsArea({className}: Props): JSX.Element {
    const {configs} = useStore(config, {keys: ['configs']});
    const hasConfigs = configs.length > 0;
    const aggregations = aggregateByPath(configs);
    const classNames = `ConfigsArea ${mod('hidden', !hasConfigs)} ${className ?? ''}`.trim();
    const configsTitle = useI18n('configs.title');

    return (<Panel className={classNames}>
        <h2 className='ConfigsArea-Title'>{configsTitle}</h2>
        {Object.entries(aggregations).map(([path, files]) => (<>
            <div className='ConfigsArea-Subtitle'>
                <span>{path}</span>
                <CopyIcon text={path} />
            </div>
            <ul className='ConfigsArea-List'>
                {files.map((file, index) => <ConfigItem file={file} index={index} />)}
            </ul>
        </>))}
    </Panel>);
}

function ConfigItem({file, index}: { file: ConfigFile, index: number }): JSX.Element {
    const copyIconRef = useRef<HTMLDivElement>(null);

    function clickHandler(): void {
        copyIconRef.current?.click();
    }

    return (<li key={index} role="presentation" className='ListItem' onClick={clickHandler}>
        <span className='ListItem-Text' title={useI18n('configs.copyHint')}>{file.name}</span>
        <CopyIcon text={file.path} ref={copyIconRef} />
    </li>);
}

function aggregateByPath(configs: ConfigFile[]): Record<string, ConfigFile[]> {
    return configs.reduce<Record<string, ConfigFile[]>>((acc, config) => {
        if (!acc[config.folder]) {
            acc[config.folder] = [];
        }
        acc[config.folder].push(config);
        return acc;
    }, {});
}
