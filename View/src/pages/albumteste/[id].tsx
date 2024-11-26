"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importação do hook useRouter

const AlbumDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Acesso ao id da URL com router.query
  const [album, setAlbum] = useState<any>(null); // Estado para armazenar os dados do álbum
  const [artistas, setArtistas] = useState<any[]>([]); // Estado para armazenar artistas

  // Verifique se o id está disponível antes de tentar buscar os dados do álbum
  useEffect(() => {
    if (!id) return; // Retorna se o id não estiver disponível ainda
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/albums?id=${id}`);
        const data = await response.json();
        setAlbum(data); // Atualiza o estado com oss dados do álbum
      } catch (error) {
        console.error("Erro ao carregar o álbum:", error);
      }
    };
    fetchAlbum();
  }, [id]); // A dependência é o 'id' para garantir que a requisição seja feita apenas quando o id estiver disponível

  // Carrega os artistas
  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const response = await fetch("/api/artistas");
        const data = await response.json();
        setArtistas(data); // Armazena os dados dos artistas
      } catch (error) {
        console.error("Erro ao carregar os artistas:", error);
      }
    };
    fetchArtistas();
  }, []); // Executa apenas uma vez, ao carregar o componente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (album) {
      setAlbum({
        ...album,
        [e.target.name]: e.target.value // Atualiza os dados do álbum no estado
      });
    }
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (album) {
      setAlbum({
        ...album,
        artistId: Number(e.target.value) // Atualiza o 'artistId' do álbum
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/updateAlbum", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(album),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Álbum atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar o álbum.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o álbum:", error);
      alert("Erro ao tentar atualizar o álbum.");
    }
  };

  // Enquanto o album ou artistas não estiverem carregados, mostramos uma mensagem
  if (!album || !artistas.length) {
    return <p className="text-center text-gray-400">Carregando...</p>;
  }

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Editar Álbum</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-xl mx-auto">
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-300 mb-2">Título</label>
          <input
            type="text"
            name="titulo"
            value={album.titulo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-300 mb-2">Gênero</label>
          <input
            type="text"
            name="genero"
            value={album.genero}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-300 mb-2">URL da Imagem</label>
          <input
            type="text"
            name="urlImagem"
            value={album.urlImagem}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-300 mb-2">Artista</label>
          <select
            name="artistId"
            value={album.artistId}
            onChange={handleArtistChange}
            className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione o artista</option>
            {artistas.map((artista) => (
              <option key={artista.id} value={artista.id}>
                {artista.nome}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Atualizar Álbum
        </button>
      </form>
    </div>
  );
};

export default AlbumDetails;
