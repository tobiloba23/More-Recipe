/**
 * Defines a recipe item.
 */
export default class User {
/**
 * @param {int} sequelize Defines an ORM link from the Recipe class to the PosgreSQL table.
 * @param {int} DataTypes Holds an array of Datatypes for all the fields in the db table.
 */
  constructor(sequelize, DataTypes) {
    sequelize.define(
      'Recipe',
      {
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        eMail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      }
    );

    this.associate = (models) => {
      this.hasMany(models.RecipeReview, {
        foreignKey: 'reviewId',
        as: 'recipeReviews',
      });
      this.hasMany(models.Recipe, {
        foreignKey: 'recipeId',
        as: 'recipes',
      });
      this.hasMany(models.Catalogue, {
        foreignKey: 'catalogueId',
        as: 'recipeCatalogues',
      });
    };
  }
}
