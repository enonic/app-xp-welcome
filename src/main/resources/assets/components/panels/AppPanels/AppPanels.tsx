import {useStore} from '@nanostores/react';
import React from 'react';

import {ScreenType} from '../../../stores/data/ScreenType';
import navigation from '../../../stores/navigation';
import HomePanel from '../home/HomePanel/HomePanel';
import ProjectsPanel from '../projects/ProjectsPanel/ProjectsPanel';
import SitesPanel from '../sites/SitesPanel/SitesPanel';
import WebappsPanel from '../webapps/WebappsPanel/WebappsPanel';

export default function AppPanels(): JSX.Element {
  const {screen} = useStore(navigation, {keys: ['screen']});

  switch (screen) {
    case ScreenType.HOME:
      return <HomePanel />;
    case ScreenType.PROJECTS:
      return <ProjectsPanel />;
    case ScreenType.WEBAPPS:
      return <WebappsPanel />;
    case ScreenType.SITES:
      return <SitesPanel />;
  }
}
