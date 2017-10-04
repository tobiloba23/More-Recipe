module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recipes', {
      id: {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      catalogueId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Catalogues',
          key: 'id',
          as: 'catalogueId',
        }
      },
    }),
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.dropTable('Recipes');
  }
};
