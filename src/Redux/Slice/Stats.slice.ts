"use client"

import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'Stats',
  initialState: {
    value: [
        {
          id: 1,
          icons: "/Rupee.png", 
          amount: "12,750",
          text: "Total Wallets Scored",
          bgColor: "rgb(245,241,251)",
          textoriconcolor: "rgb(159,99,255)",
        },
        {
          id: 2,
          icons: "/image.png",
          amount: "40.12K", 
          text: "Total Transactions Tracked",
          bgColor: "rgb(255,236,254)",
          textoriconcolor: "rgb(253,133,255)",
        },
        {
          id: 3,
          icons: "link",
          amount: "110",
          text: "Total Chains Scored",
          bgColor: "rgb(246,247,254)", 
          textoriconcolor: "rgb(42,189,255)",
        },
        {
          id: 4,
          icons: "globe",
          amount: 8654,
          text: "zkTLS Real world scores generated",
          bgColor: "rgb(242,249,247)",
          textoriconcolor: "rgb(47,204,173)",
        },
      ],
  },
  reducers: {
    updateStats: (state: any, action) => {
      state.value = [
        {
          ...state.value[0],
          amount: action.payload.wallets.toLocaleString()
        },
        {
          ...state.value[1],
          amount: `${(action.payload.transactions/1000).toFixed(2)}K`
        },
        {
          ...state.value[2],
          amount: action.payload.chains.toString()
        },
        {
          ...state.value[3],
          amount: action.payload.zkScores
        }
      ]
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateStats } = counterSlice.actions

export default counterSlice.reducer
