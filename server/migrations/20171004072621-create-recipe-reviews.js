module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('RecipeReviews', {
      recipeReviewId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      comment: {
        type: Sequelize.STRING
      },
      vote: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      recipeId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipes',
          key: 'recipeId',
          as: 'recipeId',
        }
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'userId',
          as: 'userId',
        }
      }
    }),
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.dropTable('recipe_reviews');
  }
};
