module.exports = (sequelize, DataTypes) => {
  const RecipeReview = sequelize.define('RecipeReview', {
    recipeReviewId: {
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
    },
    vote: {
      type: DataTypes.BOOLEAN
    },
    comment: {
      type: DataTypes.STRING
    }
  // }, {
  //   underscored: true
  });

  RecipeReview.associate = (models) => {
    RecipeReview.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    RecipeReview.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return RecipeReview;
};
