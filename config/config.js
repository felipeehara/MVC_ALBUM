// config/config.js

module.exports = {
    development: {
      username: "root",  // Usuário do MySQL
      password: "",  // Senha do MySQL
      database: "album_db",  // Nome do banco de dados
      host: "localhost",  // Host (pode ser localhost se estiver rodando localmente)
      port:"3307",
      dialect: "mysql",  // Altere para "mysql"
    },
    // Se você tiver outras configurações para produção ou teste, adicione-as aqui.
  };
  