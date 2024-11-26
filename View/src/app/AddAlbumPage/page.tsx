"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddAlbumPage = () => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [urlImagem, setUrlImagem] = useState("");
  const router = useRouter();

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addAlbum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          genero,
          urlImagem,
        }),
      });

      if (response.ok) {
        alert("Álbum adicionado com sucesso!");
        router.push("/"); // Redireciona para a página principal
      } else {
        alert("Erro ao adicionar álbum.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao adicionar álbum.");
    }
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Adicionar Álbum</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label htmlFor="titulo" className="block text-sm font-semibold">
            Título do Álbum
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="p-2 w-full border border-gray-700 bg-gray-800 text-white rounded mt-2"
            required
          />
        </div>
        <div>
          <label htmlFor="genero" className="block text-sm font-semibold">
            Gênero
          </label>
          <input
            type="text"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="p-2 w-full border border-gray-700 bg-gray-800 text-white rounded mt-2"
            required
          />
        </div>
        <div>
          <label htmlFor="urlImagem" className="block text-sm font-semibold">
            URL da Imagem
          </label>
          <input
            type="text"
            id="urlImagem"
            value={urlImagem}
            onChange={(e) => setUrlImagem(e.target.value)}
            className="p-2 w-full border border-gray-700 bg-gray-800 text-white rounded mt-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
        >
          Adicionar Álbum
        </button>
      </form>
    </div>
  );
};

export default AddAlbumPage;
