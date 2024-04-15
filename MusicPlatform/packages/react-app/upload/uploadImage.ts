import { imgKey } from "@/constant/keys/imgg";
export const uploadImage =(file:any)=>{



}
export const  uploadImageAndGetUrl=async(imageFile:any)=> {
    const url = `https://api.imgbb.com/1/upload?key=${imgKey}`;
    
    // const formData = new FormData();
    // formData.append('image', imageFile);

    try {
        const response = await fetch("/api/imageUploader", {
            method: 'POST',
            body: imageFile
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.data.url;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}
