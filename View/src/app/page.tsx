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
      fetchAlbums(searchQuery); // Atualiza a lista de álbuns após exclusão
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
                    className="w-full h-48 object-cover rounded-lg mb-4 transition-transform transform group-hover:scale-105"
                  />
                  <h2 className="text-2xl font-semibold truncate">{album.titulo}</h2>
                  <p className="text-gray-400">{album.genero}</p>
                </div>
              </Link>
              <button
                onClick={() => deleteAlbum(album.id)}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition"
                title="Excluir Álbum"
              >
                🗑️
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            Nenhum disco encontrado.
          </p>
        )}
      </div>

      {/* Botão de Adicionar Álbum fixo no rodapé, no centro */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
      {/* Botão Adicionar Álbum */}
      <Link href="/AddAlbumPage">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
          + Adicionar Álbum
        </button>
      </Link>

      {/* Botão Adicionar Artista */}
      <Link href="/AddArtistPage">
        <button className="px-6 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition">
          + Adicionar Artista
        </button>
      </Link>
</div>

      
    </div>
  );
};

export default HomePage;
