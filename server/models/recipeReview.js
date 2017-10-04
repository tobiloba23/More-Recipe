module.exports = (sequelize, DataTypes) => {
  const RecipeReview = sequelize.define('RecipeReview', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    recipe_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    vote: {
      type: DataTypes.BOOLEAN
    },
    comment: {
      type: DataTypes.STRING
    },
    // commenter_email: {
    //   type: DataTypes.STRING,
    //   required: true
    // },
    // status: {
    //   type: DataTypes.ENUM,
    //   values: ['approved', 'rejected', 'in review']

    // }
  }, {
    underscored: true
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
