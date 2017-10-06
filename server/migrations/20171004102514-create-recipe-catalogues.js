module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('RecipeCatalogues', {
      recipeCatalogueId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      catalogueId: {
        type: Sequelize.UUID
      },
      recipeId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.dropTable('RecipeCatalogues');
  }
};
