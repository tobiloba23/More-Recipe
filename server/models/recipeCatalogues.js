module.exports = (sequelize, DataTypes) => {
  const RecipeCatalogue = sequelize.define('RecipeCatalogue', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });

  RecipeCatalogue.associate = (models) => {
    RecipeCatalogue.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    RecipeCatalogue.belongsTo(models.Catalogue, {
      foreignKey: 'catalogueId',
      onDelete: 'CASCADE',
    });
  };

  return RecipeCatalogue;
};
