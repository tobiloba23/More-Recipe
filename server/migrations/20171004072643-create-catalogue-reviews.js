module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('CatalogueReviews', {
      catalogueReviewId: {
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
      catalogueId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Catalogues',
          key: 'catalogueId',
          as: 'catalogueId',
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
    queryInterface.dropTable('CatalogueReviews');
  }
};
