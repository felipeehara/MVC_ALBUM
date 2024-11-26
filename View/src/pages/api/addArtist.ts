// pages/api/addArtist.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../dbConnection"; // Certifique-se de que o caminho para dbConnection está correto

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { nome, genero } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !genero) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const query = `INSERT INTO artistas (nome, genero) VALUES (?, ?)`;

    db.query(query, [nome, genero], (error, results) => {
      if (error) {
        console.error("Erro ao inserir artista:", error);
        return res.status(500).json({ message: "Erro ao adicionar artista", error: error.message });
      }

      // Acessar o insertId do resultado
      const insertId = (results as any).insertId;

      res.status(201).json({ message: "Artista adicionado com sucesso!", id: insertId });
    });
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
