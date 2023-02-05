import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AlbumCard from "./AlbumCard";

const AlbumContainer = () => {
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumList, setAlbumList] = useState([]);

  // Function to fetch albums from server

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums`
      );

      if (response.status === 200) {
        setAlbumList(response.data);
      }
    } catch (error) {
      toast.error("Album Fetching Failed !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //   UseEffect to fetch albums at every rerender
  useEffect(() => {
    fetchAlbums();

    return () => {
      setAlbumList([]);
    };
  }, []);

  //   function to add new album

  const handleAddAlbum = async (e) => {
    e.preventDefault();

    const data = {
      userId: Date.now(),
      id: albumList.length + 1,
      title: albumTitle,
    };

    // dummy api call post request
    await axios.post(`https://jsonplaceholder.typicode.com/albums`, data);

    setAlbumList([data, ...albumList]);

    toast.success("Album Added !", {
      position: toast.POSITION.TOP_RIGHT,
    });

    setAlbumTitle("");
  };

  return (
    <div className="album-wrapper">
      {/* react toastify for displaying alert box  */}
      <ToastContainer />

      <div className="album-section">
        {/* album input section */}

        <div className="input-sec">
          <form autoComplete="off" onSubmit={handleAddAlbum}>
            <input
              type="text"
              onChange={(e) => setAlbumTitle(e.target.value)}
              placeholder="Add New Album..."
            />

            <button type="submit">
              <i className="fas fa-plus add-icon"></i>
            </button>
          </form>
        </div>

        {/* albums card section */}

        <div className="album-card">
          {albumList.map((el) => (
            <AlbumCard
              key={el.id}
              data={el}
              setAlbumList={setAlbumList}
              albumList={albumList}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumContainer;
