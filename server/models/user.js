module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  User.associate = (models) => {
    User.hasMany(models.RecipeReview, {
      foreignKey: 'userId',
      as: 'recipeReviews',
    });
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'recipes',
    });
    User.hasMany(models.Catalogue, {
      foreignKey: 'userId',
      as: 'recipeCatalogues',
    });
    User.hasMany(models.CatalogueReview, {
      foreignKey: 'userId',
      as: 'catalogueReviews',
    });
    User.hasMany(models.UserFavourite, {
      foreignKey: 'userId',
      as: 'userFavourites',
    });
    User.hasMany(models.UserRole, {
      foreignKey: 'userId',
      as: 'userRoles',
    });
  };

  return User;
};
