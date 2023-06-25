import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "reactstrap";

import { getCroppedImg } from "../components/ImageUpload/canvasUtils";
import "../styles/imageUpload.css";

const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const hideCroppedImage = useCallback(async () => {
    try {
      console.log("Reset");
      setCroppedImage(null);
      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc]);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };

  return (
    <div className="">
      {imageSrc ? (
        <React.Fragment>
          <div className="cropContainer">
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="controls">
            <Button
              onClick={showCroppedImage}
              color="primary"
              className="cropButton"
            >
              Show Result
            </Button>
            <Button
              onClick={hideCroppedImage}
              color="primary"
              className="cropButton"
            >
              Reset
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
      {croppedImage && (
        <div>
          {" "}
          <img src={croppedImage} alt="Cropped" className="img-fluid" />
        </div>
      )}
    </div>
  );
};
export default ImageUpload;

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
