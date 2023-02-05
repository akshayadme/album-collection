import React from "react";
import "react-toastify/dist/ReactToastify.css";
import AlbumContainer from "./components/AlbumContainer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />

      {/* Album Component */}
      <AlbumContainer />
    </>
  );
}

export default App;
