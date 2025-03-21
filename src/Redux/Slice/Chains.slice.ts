import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Interface for chain data
interface Chain {
  name: string;
  volume: string;
  uaw: string; 
  transactions: string;
}

// Interface for state
interface ChainsState {
  chains: Chain[];
  filteredChains: Chain[];
  search: string;
  currentPage: number;
  itemsPerPage: number;
}

const chains: Chain[] = [
  { name: "Ethereum", volume: "$20B", uaw: "100M", transactions: "1B" },
  { name: "Base", volume: "$18B", uaw: "150M", transactions: "1.5B" },
  { name: "Bera", volume: "$12B", uaw: "200M", transactions: "2B" },
  { name: "Polygon", volume: "$10B", uaw: "10M", transactions: "100M" },
  { name: "Arbitrum", volume: "$8B", uaw: "50M", transactions: "500M" }
];

// Initial state
const initialState: ChainsState = {
  chains,
  filteredChains: chains,
  search: '',
  currentPage: 1,
  itemsPerPage: 5,
};

const chainsSlice = createSlice({
  name: 'chains',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.filteredChains = state.chains.filter((chain) =>
        chain.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.currentPage = 1; 
    },
    setChains(state, action: PayloadAction<Chain[]>) {
      state.chains = action.payload;
      state.filteredChains = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    resetChains(state) {
      state.search = '';
      state.filteredChains = state.chains;
      state.currentPage = 1;
    },
  },
});

export const { setSearch, setCurrentPage, setItemsPerPage, resetChains, setChains } = chainsSlice.actions;
export default chainsSlice.reducer;
