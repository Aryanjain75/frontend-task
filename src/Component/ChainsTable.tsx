// src/components/ChainsTable.tsx
'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/Redux/store';
import {
  setSearch,
  setCurrentPage,
  setItemsPerPage,
} from '@/Redux/Slice/Chains.slice';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination/Pagination';
import { logos } from '../Data/dummyData';

const ChainsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // State from Redux
  const { search, filteredChains, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.chains
  );

  const pageCount = Math.ceil(filteredChains.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedChains = filteredChains.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    dispatch(setCurrentPage(1)); // Reset to page 1 when search changes
  }, [search, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <div className="p-2 sm:p-4 w-full max-w-[1200px]">
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Chains</h3>
      <div className="relative w-fit sm:w-1/2 mb-4">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search chain"
          className="border-[0.00001rem] border-gray-300 rounded-md p-2 pl-10 w-fit"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="text-left border-collapse w-full my-[17px] min-w-[600px]">
          <thead>
            <tr className="text-[#a4a4a4]" style={{ fontWeight: '500' }}>
              <th className="p-2" style={{ fontWeight: '500' }}>Chain</th>
              <th className="p-2" style={{ fontWeight: '500' }}>Volume</th>
              <th className="p-2" style={{ fontWeight: '500' }}>UAW</th>
              <th className="p-2" style={{ fontWeight: '500' }}>Transactions</th>
            </tr>
          </thead>
          <tbody>
            {displayedChains.map((chain, idx) => (
              <tr key={idx}>
                <td className="p-2 flex items-center gap-2">
                <img src={logos[chain.name]} alt={chain.name} className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-sm sm:text-base">{chain.name}</span>
                </td>
                <td className="p-2 text-sm sm:text-base">{chain.volume}</td>
                <td className="p-2 text-sm sm:text-base">{chain.uaw}</td>
                <td className="p-2 text-sm sm:text-base">{chain.transactions}</td>
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
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: '#9f62ff',
              color: 'white',
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChainsTable;
