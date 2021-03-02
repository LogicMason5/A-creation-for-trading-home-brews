import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setOfferUploadUrl } from '../Display/displaySlice';

const ImageUploader = () => {
  const dispatch = useDispatch();

  const widget = window.cloudinary.createUploadWidget({
    cloudName: 'www-homebrewswap-app',
    uploadPreset: 'n9czjyqn',
    sources: ['local', 'camera', 'url', 'facebook', 'instagram', 'google_drive'],
    multiple: false,
    cropping: true,
    showSkipCropButton: false,
    cropping_aspect_ratio: 1,
    croppingShowDimensions: true,
    croppingValidateDimensions: true,
  },
  (error: Error, result: { event: string; info: { secure_url: string; }; }) => {
    if (!error && result && result.event === 'success') {
      dispatch(setOfferUploadUrl(result.info.secure_url));
    }
  });

  const showWidget = () => {
    widget.open();
  };

  return (
    <div id="photo-form-container">
      <Button onClick={showWidget} variant="outlined" color="primary">
        Upload an image
      </Button>
    </div>
  );
};

export default ImageUploader;
