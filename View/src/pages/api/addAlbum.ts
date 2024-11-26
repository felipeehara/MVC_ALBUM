// pages/api/addAlbum.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../dbConnection"; // Certifique-se de que o caminho para dbConnection está correto

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { titulo, genero, urlImagem } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!titulo || !genero || !urlImagem) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const query = `INSERT INTO album (titulo, genero, url_da_imagem) VALUES (?, ?, ?)`;

    db.query(query, [titulo, genero, urlImagem], (error, results) => {
      if (error) {
        console.error("Erro ao inserir álbum:", error);
        return res.status(500).json({ message: "Erro ao adicionar álbum", error: error.message });
      }

      // Acessar o insertId do resultado
      const insertId = (results as any).insertId;  // Isso é necessário para que TypeScript não reclame

      res.status(201).json({ message: "Álbum adicionado com sucesso!", id: insertId });
    });
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
