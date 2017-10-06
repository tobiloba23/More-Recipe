module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Catalogues', {
      catalogueId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING
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
    }),
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.dropTable('Catalogues');
  }
};
