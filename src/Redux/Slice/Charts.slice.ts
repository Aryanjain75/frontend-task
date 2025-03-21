"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChartData {
  name: string;
  pv: number;
}

interface ChartState {
  state: string;
  bgColor: string;
  color: string;
  data: ChartData[];
}

const Overviewdata: ChartData[] = [
  { name: "0-200", pv: 1500 },
  { name: "200-400", pv: 1200 },
  { name: "400-600", pv: 900 },
  { name: "600-800", pv: 600 },
  { name: "800-1000", pv: 100 },
];

const Liquidations: ChartData[] = [
  { name: "0-200", pv: 1500 },
  { name: "200-400", pv: 1200 },
  { name: "400-600", pv: 900 },
  { name: "600-800", pv: 600 },
  { name: "800-1000", pv: 100 },
];

const Loan_Sizes: ChartData[] = [
  { name: "0-200", pv: 15 },
  { name: "200-400", pv: 135 },
  { name: "400-600", pv: 695 },
  { name: "600-800", pv: 9564 },
  { name: "800-1000", pv: 50000 },
];

const initialState: ChartState = {
  state: "Overview",
  bgColor: "#f5f1fb",
  color: "#9f62ff",
  data: Overviewdata.map((item) => ({ ...item, uv: item.pv + 200 })),
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartData: (state: ChartState, action: PayloadAction<Record<string, unknown>>) => {
        state.bgColor = "#f5f1fb";
        state.color = "#9f62ff";
        state.data = Object.entries(action.payload).map(([name, pv]) => ({ name, pv: Number(pv), uv: Number(pv) + 200 }));
    },
    setChartState: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "Overview":
          state.bgColor = "#f5f1fb";
          state.color = "#9f62ff";
          state.data = Overviewdata.map((item) => ({
            ...item,
            uv: item.pv + 200,
          }));
          break;
        case "Liquidations":
          state.bgColor = "#ffecfe";
          state.color = "#e960ec";
          state.data = Liquidations.map((item) => ({
            ...item,
            uv: item.pv + 200,
          }));
          break;
        case "Loan_Sizes":
          state.bgColor = "#f2f9f7";
          state.color = "#2cc7a9";
          state.data = Loan_Sizes.map((item) => ({
            ...item,
            uv: item.pv + 200,
          }));
          break;
        default:
          break;
      }
      state.state = action.payload;
    },
  },
});

export const { setChartState, setChartData } = chartSlice.actions;
export default chartSlice.reducer;
