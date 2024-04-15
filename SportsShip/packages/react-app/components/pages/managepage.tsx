import React, { useEffect, useState } from "react";
import { useAccount,useReadContract,useWriteContract } from "wagmi";
import { useForm } from "react-hook-form";
import { data } from "@/constant/data";
import MarketCard, { CardData, CardProps } from "@/components/Card";
import sportAbi from "../../constant/abi/sport.json"
import { SportManshipContractAddress } from "@/constant/address";
import { uploadImage, uploadImageAndGetUrl } from "@/upload/uploadImage";
import cloudinary from "@/utils/cloudinary";
import { convertBase64 } from "@/utils/converttobase64";


import { ethers } from "ethers";
import SportCardCard from "../SportsCenterCard";
import ManageCard from "../ManageCard";

// uint  playerId;
// address playerOwner;
// string playerUrl;
// string playerYears;
// string sportsType;
// uint playerPrice;
// uint playerExperienceRate;
// bool  isBid;

export interface PlayerDetail {
    playerId: number;
    playerOwner: string; 
    playerUrl:string;
    playerName: string;
    playerYears: string;
    sportsType: string;
    playerPrice: number;
    playerExperienceRate: number;
    isBid: boolean;
    
}

const playerData: PlayerDetail[] = [
    {
        playerId: 1,
        playerOwner: "0x1234567890123456789012345678901234567890",
        playerUrl: "https://example.com/player1",
        playerName:"messsi",
        playerYears: "5 years",
        sportsType: "Football",
        playerPrice: 10000, // Assuming the price is in wei
        playerExperienceRate: 4.5,
        isBid: false
    },
    {
        playerId: 2,
        playerOwner: "0x0987654321098765432109876543210987654321",
        playerUrl: "https://example.com/player2",
        playerYears: "3 years",
        playerName:"messsi",
        sportsType: "Basketball",
        playerPrice: 80000, // Assuming the price is in wei
        playerExperienceRate: 3.8,
        isBid: true
    },
    // Add more player data objects as needed
];

const ManagePage = () => {
  const { address, isConnected } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isSubmit, setSubmit] = useState(true);


  const { register, handleSubmit } = useForm();
  const { data: hash, writeContract } = useWriteContract() 
  

  const itemdata = useReadContract({
    abi:sportAbi,
    address: SportManshipContractAddress,
    functionName: 'getUsePlayers',
    args: [address],

  })
  
  

  const dataArray:PlayerDetail[] = Array.isArray(itemdata.data) ? itemdata.data : [];
  console.log("the data is data data array contract",dataArray)

  const testIt =()=>{
    console.log("yes")
  }

  
  const handleRemove = (itemId: number) => {
    // Call your function here
    console.log("Removing item with ID:", itemId);
    writeContract({
      address: SportManshipContractAddress ,
      abi:sportAbi,
      functionName: 'removePlayer',
      args: [itemId],
    });
  };

  useEffect(() => {
    console.log("the data is data contract",itemdata)
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className="h-full max-w-full relative">
      <div className="w-full h-32 flex justify-end">
        
      </div>
      
        
      

      
      
      <div className="w-full">
            <ManageCard data={dataArray}  onRemove={handleRemove}/>
          </div>
    </div>
  );
};

export default ManagePage;