import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button, Input, Container } from "reactstrap";
import { getCroppedImg } from "../components/ImageUpload/canvasUtils";
import "../styles/imageUpload.css";

const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [aspect, setAspect] = useState(1 / 1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onAspectChange = (e) => {
    const value = e.target.value;
    const ratio = aspectRatios.find((ratio) => ratio.value == value);
    setAspect(ratio.value);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

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

  const aspectRatios = [
    { value: 4 / 3, text: "4/3" },
    { value: 16 / 9, text: "16/9" },
    { value: 1 / 2, text: "1/2" },
  ];

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
      {imageSrc ? (
        <React.Fragment>
          <div className="cropContainer">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
              //   onCropSizeChange={""}
            />
          </div>
          <div className="controls">
            <div className="sliderContainer">
              <label className="sliderLabel">Zoom</label>
              <Input
                id="exampleRange"
                name="range"
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(e.target.value)}
              />
            </div>
            <div>
              {" "}
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                onChange={onAspectChange}
              >
                {aspectRatios.map((ratio) => (
                  <option
                    key={ratio.text}
                    value={ratio.value}
                    defaultValue={ratio.value === aspect}
                  >
                    {ratio.text}
                  </option>
                ))}
              </Input>
            </div>
            <Button
              onClick={showCroppedImage}
              color="primary"
              className="cropButton"
            >
              Crop
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
    </Container>
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
