"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChartState } from "../Redux/Slice/Charts.slice";
import { RootState } from "../Redux/store";
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  LabelList,
  Line,
} from "recharts";

const WalletDistributionChart = () => {
  const dispatch = useDispatch();
  const chartState = useSelector((state: RootState) => state.chart);

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl w-full mx-4 p-4">
      {/* Left Section */}
      <div className="w-full md:w-auto mb-4 md:mb-0">
        <select className="w-full md:w-auto rounded-[20px] bg-[#f9f9f9] p-2 px-4">
          <option value="all">All Chains</option>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="bsc">BSC</option>
          <option value="avalanche">Avalanche</option>
        </select>
        <div className="flex flex-col justify-between bg-gray-100 w-full md:w-44 rounded-xl p-4 mt-4 h-[88%]">
          <div className="w-14 h-14 justify-center items-center flex bg-white rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#7d7d7d"
                d="M928 160H96c-17.7 0-32 14.3-32 32v160h896V192c0-17.7-14.3-32-32-32M64 832c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V440H64zm579-184c0-4.4 3.6-8 8-8h165c4.4 0 8 3.6 8 8v72c0 4.4-3.6 8-8 8H651c-4.4 0-8-3.6-8-8z"
              />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-500">Wallets</div>
            <div className="text-3xl text-[#7d7d7d] font-bold">7000</div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 rounded-2xl md:ml-4">
        <div className="flex justify-end mb-4 overflow-x-auto">
          {["Overview", "Liquidations", "Loan_Sizes"].map((type) => (
            <button
              key={type}
              className={`text-gray-500 text-sm mr-4 ${
                chartState.state === type ? "bg-[#f7f7f7] rounded-2xl p-4" : ""
              }`}
              onClick={() => dispatch(setChartState(type))}
            >
              {type.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Chart Section */}
        <div
          style={{ backgroundColor: chartState.bgColor }}
          className="relative h-96 mt-7 rounded-2xl"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartState.data}>
              <XAxis dataKey="name" axisLine={false} tick={{ fill: "#000000" }} />
              <Tooltip cursor={{ fill: "#ffecfe" }}  />
              <Bar
                barSize={120}
                dataKey="pv"
                fill={chartState.color}
                radius={[25, 25, 25, 25]}
                style={{ marginBottom: "20px" }}
              >
                <LabelList
                  dataKey="pv"
                  position="insideBottom"
                  fill="white"
                  fontSize={12}
                  formatter={(value: number) => `$${value}`}
                />
              </Bar>
              <Line
                type="monotone"
                dataKey="uv"
                stroke={chartState.color}
                style={{ marginTop: "20px" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WalletDistributionChart;
