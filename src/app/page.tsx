"use client";
import React, { useEffect } from "react";
import WalletScoreCard from "../Component/StatsCard";
import AssetsTable from "@/Component/AssetsTable";
import ChainsTable from "@/Component/ChainsTable";
import WalletDistributionChart from "@/Component/Chart";
import { useSelector, useDispatch } from 'react-redux'
import { updateStats } from '../Redux/Slice/Stats.slice'
import {setChartData} from '../Redux/Slice/Charts.slice';
import {setCurrentPage} from '../Redux/Slice/Asset.slice';
import {setChains} from '../Redux/Slice/Chains.slice';
// Define the type for card data
interface CardData {
  id: number;
  icons: string;
  amount: string | number;
  text: string;
  bgColor: string;
  textoriconcolor: string;
}



const Home: React.FC = () => {
  const count = useSelector((state:any) => state.Stats.value)
  const dispatch = useDispatch()
  const chartdata=useSelector((state:any)=>state.chains);
  function updateStatsData() {
    const data={"Global Stats": { wallets: 12750, transactions: 40120, chains: 110, zkScores: 8654 },
    "Wallet Distribution": { "0-200": 1500, "200-400": 1200, "400-600": 900, "600-800": 600, "800-1000": 100 },
     "Assets": [
      { name: "USDC", borrowVolume: "$20B", collateralVolume: "100M", totalVolume: "1B" },
      { name: "USDT", borrowVolume: "$18B", collateralVolume: "150M", totalVolume: "1.5B" },
      { name: "ETH", borrowVolume: "$12B", collateralVolume: "200M", totalVolume: "2B" },
      { name: "BASE", borrowVolume: "$10B", collateralVolume: "10M", totalVolume: "100M" },
      { name: "ARB", borrowVolume: "$8B", collateralVolume: "50M", totalVolume: "500M" }
    ],

    "Chains": [
      { name: "Ethereum", volume: "$20B", uaw: "100M", transactions: "1B" },
      { name: "Base", volume: "$18B", uaw: "150M", transactions: "1.5B" },
      { name: "Bera", volume: "$12B", uaw: "200M", transactions: "2B" },
      { name: "Polygon", volume: "$10B", uaw: "10M", transactions: "100M" },
      { name: "Arbitrum", volume: "$8B", uaw: "50M", transactions: "500M" }
    ]}
    dispatch(updateStats(data["Global Stats"]))
    dispatch(setChartData(data["Wallet Distribution"]))
    dispatch(setCurrentPage(data["Assets"]))
    dispatch(setChains(data["Chains"]))
    console.log(data["Chains"]);
  }
  useEffect(() => {
    updateStatsData()
  },[]);
  return (
    <>
      <div className="container mx-auto px-4" suppressHydrationWarning={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
          {count.map((card:CardData) => (
            <WalletScoreCard
              key={card.id}
              icon={card.icons}
              amount={card.amount}
              text={card.text}
              bgColor={card.bgColor}
              textoriconcolor={card.textoriconcolor}
            />
          ))}
        </div>
        <div className="w-full">
          <WalletDistributionChart/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ">
  <div className="w-full overflow-scroll  bg-white border-2 border-[#ededed] rounded-2xl max-w-full md:max-w-2xl lg:max-w-4xl mx-auto">
    <AssetsTable />
  </div>
  <div className="w-full  bg-white border-2 border-[#ededed] rounded-2xl max-w-full md:max-w-2xl lg:max-w-4xl mx-auto">
    <ChainsTable />
  </div>
</div>

      </div>
    </>
  );
};

export default Home;
