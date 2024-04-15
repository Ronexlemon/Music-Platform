import { ethers } from "ethers";
import React from "react";

export type CardData = {
  itemId: number;
  imageUrl: string;
  itemOwner:string,
  model: string;
  year: string;
  price: number;
  sold: boolean;
};

export type CardProps = {
  data: CardData[];
  onBuy: (itemValue:number,itemId: number) => void;
};

const MarketCard: React.FC<CardProps> = ({ data,onBuy }) => {
  
  return (
    <div className="card-container grid grid-cols-3 gap-8 w-full">
      {data.map((item, index) => (
        
        <div key={index} className="h-80 w-80 bg-white rounded-xl flex flex-col overflow-hidden">
          <img src={item.imageUrl} alt="" className="w-full h-48 object-cover" />
          <div className="p-1">
            <h2 className="model text-xl font-semibold mb-2 truncate">{item.model}</h2>
            <div className="flex justify-between">
            <p className="year">Year: {item.year}</p>
            <p className="price">Price: ${(ethers.utils.formatEther(item.price))}</p>
            

            <div className=" flex justify-center items-center w-12 h-10 bg-black rounded-xl ">
            <button className=" text-white  " onClick={() => onBuy(Number(ethers.utils.formatEther(item.price)),Number(item.itemId))}>BUY</button>
          </div>
          
            </div>
            <p className="price">Sold : {(item.sold?<span className="text-green-600">True</span>:<span className="text-red-400">False</span>)}</p>
          </div>
         
        </div>
      ))}
    </div>
  );
};

export default MarketCard;
