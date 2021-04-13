import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      name: '空白页面',
      path: '/web3',
      component: './Web3',
    },
    {
      path: '/',
      component: '@/pages/index',
    },
  ],
  fastRefresh: {},
  mock: false,
});
