import { Effect, Reducer } from 'umi';

export interface Web3ModelState {
  address: string | null,
  balance: number,
  web3: any | null,
}

export interface Web3ModelType {
  namespace: 'web3';
  state: Web3ModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<Web3ModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<Web3ModelState>;
  };
}

const Web3Model: Web3ModelType = {
  namespace: 'web3',
  state: {
    address: null,
    balance: 0,
    web3: null,
  },

  effects: {
    * query({ payload }, { call, put }) {
      console.log('query --- ',payload, call, put);
    },
  },
  reducers: {
    save(state, action) {
      console.log('reducers --- ',state,action)
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
};

export default Web3Model;
