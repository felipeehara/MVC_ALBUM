import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditAlbumPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID do álbum da URL
  const [album, setAlbum] = useState<any>(null); // Define o tipo correto para o estado do álbum

  useEffect(() => {
    if (id) {
      // Chama a API para buscar o álbum pelo ID
      const fetchAlbum = async () => {
        try {
          const response = await fetch(`/api/albums/${id}`);
          if (!response.ok) {
            throw new Error('Erro ao carregar o álbum');
          }
          const data = await response.json();
          setAlbum(data);
        } catch (error) {
          console.error('Erro ao carregar o álbum:', error);
        }
      };

      fetchAlbum();
    }
  }, [id]);

  if (!album) {
    return <div>Carregando...</div>;
  }

  const handleSave = async () => {
    try {
      const updatedAlbum = { ...album };

      const response = await fetch(`/api/albums/${id}`, {
        method: 'PUT', // Método de atualização
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAlbum), // Envia os dados atualizados
      });

      if (response.ok) {
        alert('Álbum atualizado com sucesso!');
        router.push('/'); // Redireciona para a página principal após salvar
      } else {
        alert('Erro ao atualizar o álbum.');
      }
    } catch (error) {
      console.error('Erro ao salvar o álbum:', error);
    }
  };

  return (
    <div>
      <h1>Editar Álbum</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Título:
          <input
            type="text"
            value={album.titulo}
            onChange={(e) => setAlbum({ ...album, titulo: e.target.value })}
          />
        </label>
        <br />
        <label>
          Gênero:
          <input
            type="text"
            value={album.genero}
            onChange={(e) => setAlbum({ ...album, genero: e.target.value })}
          />
        </label>
        <br />
        <label>
          Link da Imagem:
          <input
            type="text"
            value={album.imagem || ''}
            onChange={(e) => setAlbum({ ...album, imagem: e.target.value })}
            placeholder="Insira o link da imagem"
          />
        </label>
        <br />
        <button type="button" onClick={handleSave}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditAlbumPage;
