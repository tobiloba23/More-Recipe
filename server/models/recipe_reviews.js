/**
 * Defines a recipe item.
 */
export default class RecipeReview {
/**
 * @param {int} sequelize Defines an ORM link from the Recipe class to the PosgreSQL table.
 * @param {int} DataTypes Holds an array of Datatypes for all the fields in the db table.
 */
  constructor(sequelize, DataTypes) {
    sequelize.define(
      'RecipeReview',
      {
        comment: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        vote: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        }
      }
    );

    this.associate = (models) => {
      this.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
        onDelete: 'CASCADE',
      });
      this.hasOne(models.User, {
        foreignKey: 'userId',
        as: 'reviewer',
        onDelete: 'CASCADE',
      });
    };
  }
}
