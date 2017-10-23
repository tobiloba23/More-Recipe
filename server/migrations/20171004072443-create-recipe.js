module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recipes', {
      recipeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      instructions: {
        type: Sequelize.TEXT
      },
      upvotes: {
        type: Sequelize.INTEGER
      },
      downvotes: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'userId',
          as: 'userId',
        }
      },
      catalogueId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Catalogues',
          key: 'catalogueId',
          as: 'catalogueId',
        }
      },
    }),
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.dropTable('Recipes');
  }
};
