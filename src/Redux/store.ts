import { configureStore } from '@reduxjs/toolkit'
import statsReducer from '../Redux/Slice/Stats.slice'
import chartReducer from "./Slice/Charts.slice";
import assetsReducer from "./Slice/Asset.slice";
import chainsReducer from "./Slice/Chains.slice";
const store = configureStore({
    reducer: {
    Stats: statsReducer,
    chart: chartReducer,
    assets: assetsReducer,
    chains: chainsReducer,
  },
})
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
