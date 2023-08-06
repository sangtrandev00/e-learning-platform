import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import React from 'react';
import MediaItem from './MediaItem';

const acitivityItems: TabsProps['items'] = [
  {
    key: 'media',
    label: `Media`,
    children: <MediaItem />
  },
  {
    key: 'contents',
    label: `Contents`,
    children: <MediaItem />
  },
  {
    key: 'access',
    label: `Access`,
    children: <MediaItem />
  },
  {
    key: 'pricing',
    label: `Pricing`,
    children: <MediaItem />
  },
  {
    key: 'settings',
    label: `Settings`,
    children: <MediaItem />
  },
  {
    key: 'dashboard',
    label: `Dashboard`,
    children: <MediaItem />
  }
];
const ActivitiesTab: React.FC = () => {
  //   const [tabPosition, setTabPosition] = useState<TabPosition>('left');

  //   const changeTabPosition = (e: RadioChangeEvent) => {
  //     // setTabPosition(e.target.value);
  //   };

  return <Tabs tabPosition={'left'} items={acitivityItems} />;
};

export default ActivitiesTab;
