import db from "../../../../dbConnection";

export default function handler(req, res) {
  if (req.method === "GET") {
    db.query("SELECT * FROM artistas", (err, results) => {
      if (err) {
        res.status(500).json({ error: "Erro ao buscar artistas" });
      } else {
        res.status(200).json(results);
      }
    });
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
