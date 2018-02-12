module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Recipes',
      'imageUrl',
      Sequelize.STRING
    );
  },

  down: (queryInterface/* , Sequelize */) => {
    queryInterface.removeColumn(
      'Recipes',
      'imageUrl'
    );
  }
};
