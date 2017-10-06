/**
 * Defines a recipe item.
 */
export default class Catalogue {
/**
 * @param {int} sequelize Defines an ORM link from the Recipe class to the PosgreSQL table.
 * @param {int} DataTypes Holds an array of Datatypes for all the fields in the db table.
 */
  constructor(sequelize, DataTypes) {
    sequelize.define(
      'Recipe',
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
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
      }
    );

    this.associate = (models) => {
      this.hasMany(models.Recipe, {
        foreignKey: 'recipeId',
        as: 'recipeReviews',
      });
      this.hasOne(models.User, {
        foreignKey: 'userId',
        as: 'author',
      });
      this.hasMany(models.Review, {
        foreignKey: 'reviewId',
        as: 'catalogueReviews',
      });
    };
  }
}
