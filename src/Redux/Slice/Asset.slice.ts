import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Asset {
  name: string;
  borrowVolume: string;
  collateralVolume: string;
  totalVolume: string;
  chain: string; // New field for chain
}

interface AssetsState {
  assets: Asset[];
  search: string;
  chainFilter: string;
  currentPage: number;
  itemsPerPage: number;
  filteredAssets: Asset[];
}

// Initial asset data
const Assets: Asset[] = [
  { name: 'USDC', borrowVolume: '$20B', collateralVolume: '100M', totalVolume: '1B', chain: 'ethereum' },
  { name: 'USDT', borrowVolume: '$18B', collateralVolume: '150M', totalVolume: '1.5B', chain: 'polygon' },
  { name: 'ETH', borrowVolume: '$12B', collateralVolume: '200M', totalVolume: '2B', chain: 'ethereum' },
  { name: 'BASE', borrowVolume: '$10B', collateralVolume: '10M', totalVolume: '100M', chain: 'bsc' },
  { name: 'ARB', borrowVolume: '$8B', collateralVolume: '50M', totalVolume: '500M', chain: 'avalanche' },
];

const initialState: AssetsState = {
  assets: Assets,
  search: '',
  chainFilter: 'all',
  currentPage: 1,
  itemsPerPage: 5,
  filteredAssets: Assets,
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.filteredAssets = state.assets.filter((asset) =>
        asset.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.currentPage = 1; // Reset to first page after search
    },
    setChainFilter(state, action: PayloadAction<string>) {
      state.chainFilter = action.payload;
      state.filteredAssets =
        action.payload === 'all'
          ? state.assets
          : state.assets.filter((asset) => asset.name === action.payload);
      state.currentPage = 1; // Reset to first page after filter
    },
    setCurrentPage(state, action) {
      state.filteredAssets = action.payload.map((asset: { name: string;borrowVolume: string;
        collateralVolume: string;
        totalVolume: string; }) => ({
        ...asset,
        chain: state.assets.find(a => a.name === asset.name)?.chain || ''
      }));
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    resetAssets(state) {
      state.search = '';
      state.chainFilter = 'all';
      state.filteredAssets = state.assets;
      state.currentPage = 1;
    },
  },
});

export const { setSearch, setChainFilter, setCurrentPage, setItemsPerPage, resetAssets } =
  assetsSlice.actions;
export default assetsSlice.reducer;
