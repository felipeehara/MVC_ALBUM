"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Função para carregar álbuns do banco de dados (API)
  const fetchAlbums = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/albums?searchQuery=${searchQuery}`);
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error("Erro ao carregar os álbuns:", error);
    }
  };

  // Função para deletar um álbum
const deleteAlbum = async (id: number) => {
  const confirmed = window.confirm("Tem certeza de que deseja excluir este álbum?");
  if (!confirmed) return;

  try {
    const response = await fetch(`/api/albums/${id}`, { // A URL precisa estar correta
      method: "DELETE",
    });

    // Verificando a resposta do servidor
    if (response.ok) {
      setAlbums(albums.filter((album) => album.id !== id)); // Atualizando a lista após exclusão
    } else {
      const errorData = await response.json();
      console.error("Erro ao deletar o álbum:", errorData);
      alert("Erro ao deletar o álbum.");
    }
  } catch (error) {
    console.error("Erro ao deletar o álbum:", error);
    alert("Erro ao deletar o álbum.");
  }
};

  // Função para editar um álbum
  const editAlbum = (id: number) => {
    router.push(`/EditAlbumPage/${id}`);
  };

  useEffect(() => {
    fetchAlbums(searchQuery);
  }, [searchQuery]);

  const handleAddAlbum = () => {
    router.push("/AddAlbumPage");
  };

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
              <img
                src={album.url_da_imagem}
                alt={album.titulo}
                className="w-full h-48 object-cover rounded-lg mb-4 transition-transform transform group-hover:scale-105"
              />
              <h2 className="text-2xl font-semibold truncate">{album.titulo}</h2>
              <p className="text-gray-400">{album.genero}</p>

              {/* Ícone de lixeira para deletar */}
              <button
                onClick={() => deleteAlbum(album.id)}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                title="Deletar álbum"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-1 14H6L5 7m5-4h4m-2 0v4m-4 0h8"
                  />
                </svg>
              </button>

              {/* Ícone de lápis para editar */}
              <button
                onClick={() => editAlbum(album.id)}
                className="absolute top-4 right-16 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Editar álbum"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3h2v4h-2zm0 8h2v6h-2zm-6 2h4v4H5zm8 2h4v4h-4z"
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

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleAddAlbum}
          className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          + Adicionar Álbum
        </button>
      </div>
    </div>
  );
};

export default HomePage;
