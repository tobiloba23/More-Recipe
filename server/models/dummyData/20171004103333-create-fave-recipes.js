module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('faveRecipes', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING
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
    queryInterface.dropTable('faveRecipes');
  }
};
