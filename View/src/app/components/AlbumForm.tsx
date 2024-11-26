// src/components/AlbumForm.tsx
import { useState } from "react";
import { Album } from "../types";

interface AlbumFormProps {
  onSubmit: (album: Album) => void;
}

const AlbumForm: React.FC<AlbumFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(2020);
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = () => {
    onSubmit({
      id: crypto.randomUUID(),
      title,
      releaseYear,
      coverImage,
      tracks: [],
      genres: [],
      artistId: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="number" placeholder="Release Year" value={releaseYear} onChange={(e) => setReleaseYear(Number(e.target.value))} />
      <input type="text" placeholder="Cover Image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
    </form>
  );
};

export default AlbumForm;
