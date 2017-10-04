module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('RecipeCatalogues', {
      catalogueId: {
        type: Sequelize.UUID
      },
      recipeId: {
        type: Sequelize.UUID
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.dropTable('RecipeCatalogues');
  }
};
