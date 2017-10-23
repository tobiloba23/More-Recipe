module.exports = (sequelize, DataTypes) => {
  const Catalogue = sequelize.define('Catalogue', {
    catalogueId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      required: true
    },
    dscription: {
      type: DataTypes.TEXT,
      required: true
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

  Catalogue.associate = (models) => {
    Catalogue.hasOne(models.User, {
      foreignKey: 'userId',
      as: 'author',
    });
    Catalogue.hasMany(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'recipes',
    });
    Catalogue.hasMany(models.CatalogueReview, {
      foreignKey: 'reviewId',
      as: 'catalogueReviews',
    });
  };

  return Catalogue;
};
