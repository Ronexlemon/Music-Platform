// import { imgKey } from '@/constant/keys/imgg';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextRequest, NextResponse } from 'next/server'

// export default async function POST(req: NextRequest) {
//  const {imageFile} = await req.json()
//  try {
//     const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgKey}`,{
//       method:"POST",     
//       body: imageFile
//     });
//     console.log("the res is resing",res)
//     return res;
//  }catch(error){
//     console.log("error",error)
//  }

    
 
// }

import { imgKey } from '@/constant/keys/imgg';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { imageFile } = req.body;

    try {
      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgKey}`, {
        method: 'POST',
        body: imageFile
      });

      const data = await imgbbResponse.json();
      console.log("data dta",data)

      return  imgbbResponse
   // res.status(200).json(data)
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}