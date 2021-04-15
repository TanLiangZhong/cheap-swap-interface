import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { history } from 'umi';
import HeaderContent from '@/components/HeaderContent';
import RightContent from '@/components/RightContent';

export async function getInitialState() {
  // const data = await fetchXXX();
  return { currentUser: { name: 'xxx' } };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    // footerRender: () => <Footer />,
    headerContentRender: () => <HeaderContent />,
    headerHeight: 72,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

export function render(oldRender) {
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
