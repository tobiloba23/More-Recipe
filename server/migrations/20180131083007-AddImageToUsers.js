module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Users',
      'imageUrl',
      Sequelize.STRING
    );
  },

  down: (queryInterface/* , Sequelize */) => {
    queryInterface.removeColumn(
      'Users',
      'imageUrl'
    );
  }
};
