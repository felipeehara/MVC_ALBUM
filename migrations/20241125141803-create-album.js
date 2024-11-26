// migrations/YYYYMMDDHHMMSS-create-album.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Albums", {
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
    await queryInterface.dropTable("Albums");
  },
};
