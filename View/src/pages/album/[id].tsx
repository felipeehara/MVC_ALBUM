import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AlbumDetails() {
  const router = useRouter();
  const { id } = router.query; // Captura o ID da rota
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    if (id) {
      // Busca os dados do álbum somente quando o ID estiver definido
      const fetchAlbum = async () => {
        try {
          const response = await fetch(`/api/albums?id=${id}`);
          const data = await response.json();
          setAlbum(data);
        } catch (error) {
          console.error("Erro ao buscar álbum:", error);
        }
      };

      fetchAlbum();
    }
  }, [id]); // Atualiza quando o ID mudar

  if (!album) {
    return <p className="text-white">Carregando...</p>;
  }

  return (
    <div className="text-white">
      <h1>Detalhes do Álbum</h1>
      <p><strong>Título:</strong> {album.titulo}</p>
      <p><strong>Gênero:</strong> {album.genero}</p>
      <p><strong>Descrição:</strong> {album.descricao}</p>
    </div>
  );
}
