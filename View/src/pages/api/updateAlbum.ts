// pages/api/updateAlbum.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../dbConnection"; // Certifique-se de que o caminho para dbConnection está correto

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    // Extrai os dados da requisição
    const { id, titulo, genero, urlImagem, artistId } = req.body;

    // Log para verificar os dados recebidos
    console.log("Dados recebidos:", req.body);

    // Verifica se todos os campos foram preenchidos
    if (!id || !titulo || !genero || !urlImagem || !artistId) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const query = `
      UPDATE album
      SET titulo = ?, genero = ?, url_da_imagem = ?, artistId = ?
      WHERE id = ?;
    `;

    // Realiza a consulta no banco de dados
    db.query(query, [titulo, genero, urlImagem, artistId, id], (error, results) => {
      if (error) {
        console.error("Erro ao atualizar álbum:", error);
        return res.status(500).json({ message: "Erro ao atualizar álbum", error: error.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Álbum não encontrado" });
      }

      // Retorna sucesso se o álbum for atualizado com sucesso
      res.status(200).json({ message: "Álbum atualizado com sucesso!" });
    });
  } else {
    // Retorna erro se o método não for o esperado (PUT)
    res.status(405).json({ message: "Método não permitido" });
  }
}
