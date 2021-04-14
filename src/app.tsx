import { history } from 'umi';

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
