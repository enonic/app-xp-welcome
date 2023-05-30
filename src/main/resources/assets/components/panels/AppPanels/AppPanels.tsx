import {useStore} from '@nanostores/react';
import React from 'react';

import {ScreenType} from '../../../stores/data/ScreenType';
import navigation from '../../../stores/navigation';
import BranchesPanel from '../branches/BranchesPanel/BranchesPanel';
import ContentsPanel from '../contents/ContentsPanel/ContentsPanel';
import HomePanel from '../home/HomePanel/HomePanel';
import ProjectsPanel from '../projects/ProjectsPanel/ProjectsPanel';
import WebappsPanel from '../webapps/WebappsPanel/WebappsPanel';

export default function AppPanels(): JSX.Element {
  const {screen} = useStore(navigation, {keys: ['screen']});

  switch (screen) {
    case ScreenType.HOME:
      return <HomePanel />;
    case ScreenType.PROJECTS:
      return <ProjectsPanel />;
    case ScreenType.BRANCHES:
      return <BranchesPanel />;
    case ScreenType.CONTENTS:
      return <ContentsPanel />;
    case ScreenType.WEBAPPS:
      return <WebappsPanel />;
  }
}
