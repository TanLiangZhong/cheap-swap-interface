import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
    },
    {
      name: '空白页面',
      path: '/web3',
      component: '@/pages/Web3',
    },
    {
      name: '移动端',
      path: '/m',
      component: '@/pages/m',
    },
  ],
  fastRefresh: {},
  mock: false,
});
