"use client";
import React, { useEffect } from "react";
import feather from "feather-icons";

// Define types for props
interface WalletScoreCardProps {
  icon: string;
  amount: string | number;
  text: string;
  bgColor: string;
  textoriconcolor: string;
}

const WalletScoreCard: React.FC<WalletScoreCardProps> = ({
  icon,
  amount,
  text,
  bgColor,
  textoriconcolor,
}) => {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <div 
      className="grid grid-rows-2 m-auto w-full sm:w-64 h-auto min-h-[10rem] rounded-2xl shadow-md p-4"
      style={{ backgroundColor: bgColor }}
    >
      {/* Icon Section */}
      <div className="flex items-start">
        <div className="w-8 h-8 sm:w-11 sm:h-11 bg-white p-1.5 sm:p-2 rounded-full flex items-center justify-center">
          {!icon.startsWith("/") ? (
            <i
              data-feather={icon}
              style={{ color: textoriconcolor }}
              className="w-4 h-4 sm:w-6 sm:h-6 font-extrabold"
            />
          ) : (
            <img 
              src={icon}
              alt="icon" 
              className="w-6 h-6 sm:w-8 sm:h-8" 
            />
          )}
        </div>
      </div>

      {/* Text Section */}
      <div>
        <p className="text-xl sm:text-3xl font-bold" style={{ color: textoriconcolor }}>
          {amount}
        </p>
        <p className="text-xs sm:text-sm" style={{ color: textoriconcolor }}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default WalletScoreCard;
