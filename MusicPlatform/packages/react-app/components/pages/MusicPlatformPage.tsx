import React, { useEffect, useState } from "react";
import { useAccount,useReadContract,useWriteContract } from "wagmi";
import { useForm } from "react-hook-form";
import { data } from "@/constant/data";
import MarketCard, { CardData, CardProps } from "@/components/Card";
import musicABI from "../../constant/abi/music.json"
import { MusicContractAddress } from "@/constant/address";

import { uploadImage, uploadImageAndGetUrl } from "@/upload/uploadImage";
import cloudinary from "@/utils/cloudinary";
import { convertBase64 } from "@/utils/converttobase64";

import { ethers } from "ethers";
import SportCardCard from "../MusicCenterCard";

// uint  playerId;
// address playerOwner;
// string playerUrl;
// string playerYears;
// string sportsType;
// uint playerPrice;
// uint playerExperienceRate;
// bool  isBid;

export interface MusicDetail {
  artistId: number;
  artistName: string; 
  artistSongName: string;
  artistOwner: string;
  artistUrl: string;
  artistYears: string;
  artistPrice: number; // Changed from uint to number
  songType: string;
  artistSongRate: string;
  isReleased: boolean;
}

const musicData: MusicDetail[] = [
  {
    artistId: 1,
    artistName: "Artist 1",
    artistSongName: "Song 1",
    artistOwner: "Owner 1",
    artistUrl: "https://example.com/artist1",
    artistYears: "3 years",
    artistPrice: 10000, // Example price in wei
    songType: "Pop",
    artistSongRate: "4.5",
    isReleased: true
  },
  {
    artistId: 2,
    artistName: "Artist 2",
    artistSongName: "Song 2",
    artistOwner: "Owner 2",
    artistUrl: "https://example.com/artist2",
    artistYears: "5 years",
    artistPrice: 80000, // Example price in wei
    songType: "Rock",
    artistSongRate: "4.2",
    isReleased: false
  },
  // Add more music data objects as needed
];

const SportCenter = () => {
  const { address, isConnected } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isSubmit, setSubmit] = useState(true);


  const { register, handleSubmit } = useForm();
  const { data: hash, writeContract } = useWriteContract() 
  

  const itemdata = useReadContract({
    abi:musicABI,
    address: MusicContractAddress,
    functionName: 'allArtists',
    

  })
  
  

  const dataArray:MusicDetail[] = Array.isArray(itemdata.data) ? itemdata.data : [];
  console.log("the data is data data array contract",dataArray)

  const testIt =()=>{
    console.log("yes")
  }

  
  const handleBid = (itemId: number) => {
    // Call your function here
    console.log("Removing item with ID:", itemId);
    writeContract({
      address: MusicContractAddress,
      abi:musicABI,
      functionName: 'bidPlayer',
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
            <SportCardCard data={dataArray}  onRemove={handleBid}/>
          </div>
    </div>
  );
};

export default SportCenter;