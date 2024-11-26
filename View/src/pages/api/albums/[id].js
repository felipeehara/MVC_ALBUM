import db from "../../../../../dbConnection"; // Verifique se o caminho está correto para sua conexão com o DB

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    if (!id) {
      console.error("ID do álbum não fornecido");
      return res.status(400).json({ error: "ID do álbum não fornecido." });
    }

    try {
      const query = "DELETE FROM album WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error("Erro ao excluir álbum:", err); // Log detalhado
          return res.status(500).json({ error: `Erro ao excluir álbum: ${err.message}` });
        }

        if (results.affectedRows === 0) {
          console.error("Álbum não encontrado:", id);
          return res.status(404).json({ error: "Álbum não encontrado." });
        }

        console.log("Álbum excluído com sucesso:", id);
        return res.status(200).json({ message: "Álbum excluído com sucesso." });
      });
    } catch (error) {
      console.error("Erro interno ao processar requisição:", error); // Log detalhado
      return res.status(500).json({ error: `Erro interno do servidor: ${error.message}` });
    }
  } else if (req.method === "GET") {
    const query = "SELECT * FROM album";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao buscar álbuns:", err);
        return res.status(500).json({ error: "Erro ao buscar álbuns." });
      }
      return res.status(200).json(results);
    });
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    return res.status(405).json({ error: `Método ${req.method} não permitido.` });
  }
}
