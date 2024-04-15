import React from "react";
import { ethers } from "ethers";
import { PlayerDetail } from "./pages/SportcenterPage";

export type CardData = {
  itemId: number;
  imageUrl: string;
  itemOwner: string;
  model: string;
  year: string;
  price: number;
  sold: boolean;
};

export type CardProps = {
  data: CardData[];
  onRemove: (itemId: number) => void;
};
export type CardProps2 = {
  data: PlayerDetail[];
  onRemove: (itemId: number) => void;
};

const SportCardCard: React.FC<CardProps2> = ({ data, onRemove }) => {
  return (
    <div className="card-container grid grid-cols-1 gap-8 w-full">
      {data.map((item, index) => (
        <div key={index} className="h-96 w-full bg-white rounded-xl shadow-md overflow-hidden flex">
          <img src={item.playerUrl} alt="" className="w-1/2 h-full object-cover" />
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h2 className="model text-xl font-semibold truncate">{item.sportsType}</h2>
              <p className="text-gray-600 mb-2">Year: {item.playerYears}</p>
              <p className="text-gray-600 mb-2">Years of Experience: {item.playerExperienceRate}</p>
              <p className="text-gray-600 mb-2">Player BID: {item.isBid ? "YES" : "NO"}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="price text-lg font-semibold">Price: ${ethers.utils.formatEther(item.playerPrice)}</p>
              <button className="px-4 py-2 text-white bg-gradient-to-r  from-violet-500 to-fuchsia-500 focus:outline-none focus:bg-red-600" onClick={() => onRemove(Number(index))}>BID</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SportCardCard;
