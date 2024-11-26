import { Album } from "../types";

const addAlbum = (newAlbum: Album) => {
  const storedAlbums = localStorage.getItem("albums");
  const albums = storedAlbums ? JSON.parse(storedAlbums) : [];
  albums.push(newAlbum);
  localStorage.setItem("albums", JSON.stringify(albums));
};

const getAlbums = () => {
  const storedAlbums = localStorage.getItem("albums");
  return storedAlbums ? JSON.parse(storedAlbums) : [];
};

export { addAlbum, getAlbums };
