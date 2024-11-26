"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddArtistPage = () => {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const router = useRouter();

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addArtist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          genero,
        }),
      });

      if (response.ok) {
        alert("Artista adicionado com sucesso!");
        router.push("/"); // Redireciona para a página principal
      } else {
        alert("Erro ao adicionar artista.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao adicionar artista.");
    }
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Adicionar Artista</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label htmlFor="nome" className="block text-sm font-semibold">
            Nome do Artista
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
        >
          Adicionar Artista
        </button>
      </form>
    </div>
  );
};

export default AddArtistPage;
