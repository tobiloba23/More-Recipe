module.exports = (sequelize, DataTypes) => {
  const UserFavourite = sequelize.define('UserFavourite', {
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
