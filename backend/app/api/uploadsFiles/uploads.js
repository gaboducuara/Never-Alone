import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

// Guarda la imagen temporalmente en el servidor para luego subirla a cloudinary
export const upload = multer({ dest: "temp/" });

// Sube la imagen a cloudinary y retorna la url de la imagen
export const uploadFiles = async (
  file,
  folder = "imagesUserNoa",
  type = "photo"
) => {
  const photoConfig = {
    folder,
    use_filename: true,
    unique_filename: false,
  };

  try {
    const result = await cloudinary.uploader.upload(file, photoConfig);
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};
