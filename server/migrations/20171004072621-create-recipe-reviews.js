module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('RecipeReviews', {
      id: {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      recipeId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipes',
          key: 'id',
          as: 'recipeId',
        }
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      }
    }),
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.dropTable('recipe_reviews');
  }
};
