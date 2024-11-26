// migrations/YYYYMMDDHHMMSS-create-album.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("album", {  // nome correto da tabela (com "a" minúsculo)
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      genres: {
        type: Sequelize.STRING,
        allowNull: true, // Pode ser nulo
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      artistId: {  // Adicionando a chave estrangeira para artistas
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "artistas",  // nome da tabela dos artistas
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("album");
  },
};
