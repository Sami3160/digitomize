const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const express = require('express');
const router = express.Router();
cloudinary.config({
    cloud_name: 'drixlrait',
    api_key: '678145639584449',
    api_secret: 'd0KOadtoLkhLM3T4z4-ZA_kyNdg'
});

const uploadOnCloudinary = async (localFilePath, folder) => {
    try {
        if (!localFilePath) return null;
    
        const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto",
          folder,
          transformation: [{ width: 500, height: 500, crop: "fill" }],
        });
        fs.unlinkSync(localFilePath);
        return {
          public_id: response.public_id,
          url: response.url,
        };
      } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
      }
}

async function deleteOnCloudinary(public_id) {
    try {
        console.log("Deleting resource with public_id:", public_id);
        const response = await cloudinary.api.delete_resources([public_id]);
        console.log(response);
    } catch (error) {
        console.log("Error deleting resource:", error);
    }
}

module.exports = { uploadOnCloudinary, deleteOnCloudinary };