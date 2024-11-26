import { DataTypes } from "sequelize";

export const Album = sequelize.define("Album", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // ou tipo adequado para a URL da imagem
  },
});
