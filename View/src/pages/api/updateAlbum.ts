import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../dbConnection"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, titulo, genero, urlImagem, artistId } = req.body;

    console.log("Dados recebidos:", req.body);

    if (!id || !titulo || !genero || !urlImagem || !artistId) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const query = `
      UPDATE album
      SET titulo = ?, genero = ?, url_da_imagem = ?, artistId = ?
      WHERE id = ?;
    `;

    db.query(query, [titulo, genero, urlImagem, artistId, id], (error, results) => {
      if (error) {
        console.error("Erro ao atualizar álbum:", error);
        return res.status(500).json({ message: "Erro ao atualizar álbum", error: error.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Álbum não encontrado" });
      }

      res.status(200).json({ message: "Álbum atualizado com sucesso!" });
    });
  } else {
 
    res.status(405).json({ message: "Método não permitido" });
  }
}
