// components/AlbumCard.tsx
import { Album } from "../types";

interface AlbumCardProps {
  album: Album;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <img src={album.coverImage} alt={album.title} className="w-full h-48 object-cover rounded-lg" />
      <h2 className="mt-2 text-xl font-semibold">{album.title}</h2>
      <p className="text-gray-400">{album.genres.join(", ")}</p>
    </div>
  );
};

export default AlbumCard;
