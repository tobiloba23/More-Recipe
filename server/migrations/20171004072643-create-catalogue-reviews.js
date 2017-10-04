module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('CatalogueReviews', {
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
      catalogueId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Catalogues',
          key: 'id',
          as: 'catalogueId',
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
    queryInterface.dropTable('CatalogueReviews');
  }
};
