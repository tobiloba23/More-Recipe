module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('CatalogueReviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Catalogues',
          key: 'id',
          as: 'catalogueId',
        }
      },
      userId: {
        type: Sequelize.INTEGER,
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
