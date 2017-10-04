module.exports = (sequelize, DataTypes) => {
  const FaveRecipe = sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      required: true,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      required: true
    }
  });

  FaveRecipe.associate = (models) => {
    FaveRecipe.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    FaveRecipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return FaveRecipe;
};
