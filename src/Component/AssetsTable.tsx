"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/Redux/store";
import {
  setSearch,
  setCurrentPage,
  setItemsPerPage,
} from "@/Redux/Slice/Asset.slice";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import { setChainFilter } from '@/Redux/Slice/Asset.slice';

const AssetsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chainFilter = useSelector((state: RootState) => state.assets.chainFilter);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setChainFilter(e.target.value));
  };
  const { search, currentPage, itemsPerPage, filteredAssets } = useSelector(
    (state: RootState) => state.assets
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredAssets.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setCurrentPage(value));
  };

  useEffect(() => {
    dispatch(setItemsPerPage(5)); // Default items per page
  }, [dispatch]);
  const logos: Record<string, string> = {
    Ethereum: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    Base: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png',
    Bera: 'https://s2.coinmarketcap.com/static/img/coins/64x64/24647.png',
    Polygon: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=040',
    Arbitrum: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=040',
    USDC: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    ARB: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=040',
    USDT: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    ETH: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    BASE: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png',
  };
  return (
    <div className="p-2 sm:p-4 w-full max-w-[1200px]">
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Assets</h3>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-2 sm:mb-4">
        <div className="relative w-full sm:w-1/2">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search asset"
            className="border border-gray-300 rounded-md p-2 pl-10 w-full"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <select className="rounded-[20px] bg-[#f9f9f9] p-2 px-4 w-full sm:w-auto">
          <option value="all">All Chains</option>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="bsc">BSC</option>
          <option value="avalanche">Avalanche</option>
        </select>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="text-left border-collapse w-full my-[17px] min-w-[600px]">
          <thead>
            <tr className="text-[#a4a4a4]">
              <th className="p-2" style={{ fontWeight: "500" }}>
                Assets
              </th>
              <th className="p-2" style={{ fontWeight: "500" }}>
                Borrow Volume
              </th>
              <th className="p-2" style={{ fontWeight: "500" }}>
                Collateral Volume
              </th>
              <th className="p-2" style={{ fontWeight: "500" }}>
                Total Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAssets.map((asset, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 flex items-center gap-2">
                <img src={logos[asset.name]} alt={asset.name} className="h-6 w-6" />
                  {asset.name}
                </td>
                <td className="p-2">{asset.borrowVolume}</td>
                <td className="p-2">{asset.collateralVolume}</td>
                <td className="p-2">{asset.totalVolume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="items-end flex justify-end mt-2 sm:mt-4">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          size="small"
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#9f62ff",
              color: "white",
            },
          }}
        />
      </div>
    </div>
  );
};

export default AssetsTable;
