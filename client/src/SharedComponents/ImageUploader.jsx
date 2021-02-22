/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setOfferUploadUrl } from '../Navigation/displaySlice';




const ImageUploader = () => {

  const dispatch = useDispatch();

  const widget = window.cloudinary.createUploadWidget({
    cloudName: "www-homebrewswap-app",
    uploadPreset: "n9czjyqn",
    sources: ["local", "camera","url", "facebook", "instagram", "google_drive"],
    multiple: false,
    cropping: true,
    showSkipCropButton: false,
    cropping_aspect_ratio: 1,
    croppingShowDimensions: true,
    croppingValidateDimensions: true,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        dispatch(setOfferUploadUrl(result.info.secure_url));
      } 
  });

  const showWidget = () => {
    widget.open();
  };

  return (
    <div id='photo-form-container'>
      <Button onClick={showWidget} variant="outlined" color="primary">
        Upload an image
      </Button>
    </div>
  );




};

export default ImageUploader;