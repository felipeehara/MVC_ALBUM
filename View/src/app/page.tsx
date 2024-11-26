"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const fetchAlbums = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/albums?searchQuery=${searchQuery}`);
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error("Erro ao carregar os álbuns:", error);
    }
  };

  const deleteAlbum = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este álbum?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/albums?id=${id}`, { method: "DELETE" });
      if (!response.ok) {
        const error = await response.json();
        console.error("Erro ao excluir álbum:", error.error);
        alert("Erro ao excluir álbum. Tente novamente mais tarde.");
        return;
      }

      alert("Álbum excluído com sucesso!");
      fetchAlbums(searchQuery); 
    } catch (error) {
      console.error("Erro ao excluir álbum:", error);
      alert("Erro ao excluir álbum. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchAlbums(searchQuery);
  }, [searchQuery]);

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">🎵 Catálogo de Discos 🎶</h1>

      <input
        type="text"
        placeholder="Buscar por título ou gênero..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-3 border border-gray-600 bg-gray-900 text-white rounded-lg w-full mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album.id} className="bg-gray-800 p-4 rounded-lg shadow-lg relative group">
              <Link href={`/Album/${album.id}`}>
                <div className="cursor-pointer">
                <img
  src={album.url_da_imagem}
  alt={album.titulo}
  className="w-full h-60 object-cover rounded-xl mb-6 shadow-lg transition-transform transform hover:scale-105 hover:rotate-1"
/>
                  <h2 className="text-2xl font-semibold truncate">{album.titulo}</h2>
                  <p className="text-gray-400">{album.genero}</p>
                </div>
              </Link>
              <button
                onClick={() => deleteAlbum(album.id)}
                className="absolute top-4 right-4 bg-gray-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition"
                title="Excluir Álbum"
              >
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-3 0h12"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            Nenhum disco encontrado.
          </p>
        )}
      </div>

      <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-4 ">
      {/* Botão Adicionar Álbum */}
      <Link href="/AddAlbumPage">
    <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
      + Adicionar Álbum
    </button>
  </Link>

       {/* Botão Adicionar Artista */}
  <Link href="/AddArtistPage">
    <button className="px-6 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 ">
      + Adicionar Artista
    </button>
  </Link>
</div>

      
    </div>
  );
};

export default HomePage;
