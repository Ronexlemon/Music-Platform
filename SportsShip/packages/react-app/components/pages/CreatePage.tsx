import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useWriteContract } from "wagmi";
import { SportManshipContractAddress } from "@/constant/address";
import SportAbi from "../../constant/abi/sport.json"
import cloudinary from "@/utils/cloudinary";
import { convertBase64 } from "@/utils/converttobase64";
import { ethers } from "ethers";
const CreateForm = () => {
  const { register, handleSubmit } = useForm();
  const { data: hash, writeContract } = useWriteContract(); 
  
  const [openProgress,setOpenProgress] = useState<boolean>(false);

  const onSubmit = async (formData:any) => {
   
    try {
      const base64Image:any =  await convertBase64(formData.image[0]);
      const imageUrl =   await cloudinary.v2.uploader.upload(base64Image )
      if(!imageUrl || imageUrl == undefined){
        console.log("please upload image")
        return;
      }
      //string memory _playerName,string memory _playerURL,string memory _playerYear,string memory _playerSportsType,uint256 _playerPrice,uint _playerExperienceRate//
      writeContract({
        address: SportManshipContractAddress ,
        abi:SportAbi,
        functionName: 'createPlayer',
        args: [formData.playerName,imageUrl.url, formData.playerYears, formData.sportsType, ethers.utils.parseEther(formData.playerPrice),formData.playerExperienceRate],
      });
  
      console.log("Image uploaded successfully. Image URL:", imageUrl.url);
      console.log(formData);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle any error scenarios during image conversion or upload
    }
  
    };
  // uint  playerId;
// address playerOwner;
// string playerUrl;
//string playerName;
// string playerYears;
// string sportsType;
// uint playerPrice;
// uint playerExperienceRate;
// bool  isBid;

  return (
    <>
      <div className="h-screen  w-screen flex justify-center items-center relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 h-3/4 flex flex-col justify-around bg-hero rounded-2xl "
        >
            <div className="flex justify-around items-center mt-2">
            <label className="text-white">Upload Image</label>
            <input type="file" className="w-1/2  h-10 rounded-2xl bg-slate-200" {...register("image", { required: true })} />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Full Name</label>
            <input
              type="text"
              placeholder="Messi"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("playerName", { required: true })}
            />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Player Value</label>
            <input
              type="number"
              placeholder="$ 1"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("playerPrice", { required: true })}
            />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Sports Type</label>
            <input
              type="text"
              placeholder="Football"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("sportsType", { required: true })}
            />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Years of Exp</label>
            <input
              type="number"
              placeholder="4.5"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("playerExperienceRate", { required: true })}
            />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Age</label>
            <input
              type="number"
              placeholder="38"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("playerYears", { required: true })}
            />
          </div>
          
          
          
          <div className="flex justify-end mr-10 items-center mt-2 text-white">
            <button 
              type="submit"
              className="bg-green-500 w-16 h-10 rounded-xl "
            >
              Submit
            </button>
          </div>
        </form>
        {openProgress &&(
             <div className="flex justify-center items-center absolute top-1/2 bg-white h-1/4 w-1/4">
             <Box sx={{ display: 'flex' }}>
             <CircularProgress color="secondary" />
     <CircularProgress color="success" />
     <CircularProgress color="inherit" />
     <h1>Loading ...</h1>
         </Box>
     
             </div>

        )}
       
      </div>
    </>
  );
};

export default CreateForm;