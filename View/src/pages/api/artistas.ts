// pages/api/artists.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../dbConnection"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = "SELECT id, nome FROM artistas"; 

    db.query(query, (error, results) => {
      if (error) {
        console.error("Erro ao buscar artistas:", error);
        return res.status(500).json({ message: "Erro ao buscar artistas", error: error.message });
      }

      res.status(200).json(results);
    });
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
