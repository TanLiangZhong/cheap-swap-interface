import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { history } from 'umi';
import HeaderContent from '@/components/HeaderContent';
import RightContent from '@/components/RightContent';

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    // footerRender: () => <Footer />,
    headerContentRender: () => <HeaderContent />,
    headerHeight: 72,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

export function render(oldRender: Function) {
  if (!/windows phone|iphone|android/gi.test(window.navigator.userAgent)) {
    // PC
    history.push(location.pathname.replace(/\/m/gi, ''));
    oldRender();
  } else {
    // 移动
    history.push(
      location.pathname.includes('/m')
        ? location.pathname
        : location.pathname + 'm',
    );
    oldRender();
  }
}
