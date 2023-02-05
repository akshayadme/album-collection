import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AlbumCard = ({ data, setAlbumList, albumList }) => {
  const [editEnabled, setEditEnabled] = useState(true);
  const [albumText, setAlbumText] = useState(data.title);

  //   Function to edit particular album using its id

  const handleEditAlbum = async (e) => {
    e.preventDefault();

    const updatedData = {
      userId: Date.now(),
      id: data.id,
      title: albumText,
    };

    // dummy api call put request
    await axios.put(
      `https://jsonplaceholder.typicode.com/albums/${data.id}`,
      updatedData
    );

    const albums = albumList;

    albums.map((el) => {
      if (el.id === data.id) {
        el.title = albumText;
      }
      return el;
    });

    setAlbumList(albums);
    setEditEnabled(!editEnabled);

    toast.success("Album Updated !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //   Function to delete particular album using its id

  const handleDeleteAlbum = async (e) => {
    e.preventDefault();

    // dummy api call delete request
    await axios.delete(
      `https://jsonplaceholder.typicode.com/albums/${data.id}`
    );

    const albums = albumList;

    const newAlbums = albums.filter((el) => el.id !== data.id);

    setAlbumList(newAlbums);
    toast.success("Album Deleted !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className="card">
      <div className="title">
        <textarea
          readOnly={editEnabled}
          name="albumText"
          onChange={(e) => setAlbumText(e.target.value)}
          value={albumText}
          style={{ backgroundColor: `${editEnabled ? "#e7e6f7" : "#fff"}` }}
          rows={5}
          cols={5}
        />
      </div>

      <div className="album-button">
        {editEnabled ? (
          <button
            style={{
              backgroundColor: "#deb841",
              color: "#fff",
            }}
            onClick={(e) => setEditEnabled(!editEnabled)}
          >
            Edit
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "#016fb9",
              color: "#fff",
            }}
            onClick={handleEditAlbum}
          >
            Save
          </button>
        )}
        <button
          style={{ backgroundColor: "#d52941", color: "#fff" }}
          onClick={handleDeleteAlbum}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
