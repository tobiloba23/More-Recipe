module.exports = (sequelize, DataTypes) => {
  const UserFavourite = sequelize.define('UserFavourite', {
    userFavouriteId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });

  UserFavourite.associate = (models) => {
    UserFavourite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    UserFavourite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };

  return UserFavourite;
};
