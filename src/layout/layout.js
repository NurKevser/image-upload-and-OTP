import { Route, Routes } from "react-router-dom";
import Email from "../pages/Email";
import ImageUpload from "../pages/ImageUpload";

const layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Email />}></Route>
      <Route path="/image" element={<ImageUpload />}></Route>
    </Routes>
  );
};

export default layout;
