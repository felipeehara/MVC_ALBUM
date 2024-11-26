"use client";

import { useState, useEffect } from "react";

const AlbumDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Extrai o id dos parâmetros
  const [album, setAlbum] = useState<any>(null);
  const [artistas, setArtistas] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return; // Garante que o ID esteja disponível antes de buscar
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/albums?id=${id}`);
        const data = await response.json();
        setAlbum(data);
      } catch (error) {
        console.error("Erro ao carregar o álbum:", error);
      }
    };
    fetchAlbum();
  }, [id]);

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const response = await fetch("/api/artistas");
        const data = await response.json();
        setArtistas(data);
      } catch (error) {
        console.error("Erro ao carregar os artistas:", error);
      }
    };
    fetchArtistas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (album) {
      setAlbum({
        ...album,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (album) {
      setAlbum({
        ...album,
        artistId: Number(e.target.value),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/updateAlbum", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
      });

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
