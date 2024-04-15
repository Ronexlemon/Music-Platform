import cloudinary from "./cloudinary";

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: 'auto' as const, // Set resource_type to 'auto' as a constant value
};

const uploadImage = async (image: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, opts, (error: any, result: any) => {
      if (result && result.secure_url) {
        resolve(result.secure_url);
      } else {
        reject({ message: error.message });
      }
    });
  });
};

export default uploadImage;