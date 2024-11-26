import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../dbConnection"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { titulo, genero, urlImagem } = req.body;

    if (!titulo || !genero || !urlImagem) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const query = `INSERT INTO album (titulo, genero, url_da_imagem) VALUES (?, ?, ?)`;

    db.query(query, [titulo, genero, urlImagem], (error, results) => {
      if (error) {
        console.error("Erro ao inserir álbum:", error);
        return res.status(500).json({ message: "Erro ao adicionar álbum", error: error.message });
      }

      const insertId = (results as any).insertId; 

      res.status(201).json({ message: "Álbum adicionado com sucesso!", id: insertId });
    });
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
