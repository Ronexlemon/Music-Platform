import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useWriteContract } from "wagmi";
import { MusicContractAddress } from "@/constant/address";
import MusicAbi from "../../constant/abi/music.json"
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
      //string memory _artistName,string memory _artistURL,string memory _artistYear,string memory _artistSongType,uint256 _artistPrice,string memory _artistSongRate,string memory _artistSongName
      writeContract({
        address: MusicContractAddress,
        abi:MusicAbi,
        functionName: 'createArtistCover',
        args: [formData.artistName,imageUrl.url, formData.artistYear, formData.artistSongType, ethers.utils.parseEther(formData.artistPrice),formData.artistSongRate,formData.artistSongName],
      });
  
      console.log("Image uploaded successfully. Image URL:", imageUrl.url);
      console.log(formData);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle any error scenarios during image conversion or upload
    }
  
    };
 
  return (
    <>
      <div className="h-screen  w-screen flex justify-center items-center relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 h-3/4 flex flex-col justify-around bg-hero  rounded-full  "
        >
            <div className="flex justify-around items-center mt-2">
            <label className="text-orange-500">Cover Image</label>
            <input type="file" className="w-1/2  h-10 rounded-2xl bg-slate-200" {...register("image", { required: true })} />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Artist Name</label>
            <input
              type="text"
              placeholder="Messi"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("artistName", { required: true })}
            />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Release Year</label>
            <input
              type="number"
              placeholder="2012"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("artistYear", { required: true })}
            />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Song Type</label>
            <input
              type="text"
              placeholder="Hip hop"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("artistSongType", { required: true })}
            />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Cover Price</label>
            <input
              type="number"
              placeholder="$1"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("artistPrice", { required: true })}
            />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Song Rate</label>
            <input
              type="number"
              placeholder="4"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("artistSongRate", { required: true })}
            />
          </div>
          <div className="flex justify-around items-center mt-2">
            <label className="text-white">Song Name</label>
            <input
              type="text"
              placeholder="Never"
              className="w-1/2 bg-slate-200 text-center h-10 rounded-2xl"
              {...register("artistSongName", { required: true })}
            />
          </div>
          
          
          
          <div className="flex justify-end mr-10 items-center mt-2 text-white">
            <button 
              type="submit"
              className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-16 h-10 rounded-xl "
            >
              Submit
            </button>
          </div>
        </form>
        
       
      </div>
    </>
  );
};

export default CreateForm;