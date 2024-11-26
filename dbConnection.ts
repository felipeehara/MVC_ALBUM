import mysql from "mysql2";

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "", 
  port: 3307, 
  database: "album_db",
});

// Conectando ao banco
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    return;
  }
  console.log("Conexão bem-sucedida ao banco de dados");
});

export default db;
