// migrations/YYYYMMDDHHMMSS-add-artistId-to-album.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('album', 'artistId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'artistas',  // nome da tabela de artistas
        key: 'id',          // chave primária na tabela artistas
      },
      onUpdate: 'CASCADE',   // Atualiza quando a chave primária em artistas for atualizada
      onDelete: 'SET NULL',  // Define como NULL se o artista for deletado
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('album', 'artistId');
  },
};
