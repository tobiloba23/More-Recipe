module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      required: true
    },
    description: {
      type: DataTypes.TEXT,
      required: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instructions: {
      type: DataTypes.TEXT,
      required: true
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  // }, {
  //   underscored: true
  });

  Recipe.associate = (models) => {
    Recipe.hasMany(models.RecipeReview, {
      foreignKey: 'recipeId',
      as: 'recipeReviews',
    });
    Recipe.hasMany(models.UserFavourite, {
      foreignKey: 'recipeId',
      as: 'userFavourites',
    });
    Recipe.hasMany(models.RecipeCatalogue, {
      foreignKey: 'recipeId',
      as: 'recipeCatalogues',
    });

    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Recipe;
};
