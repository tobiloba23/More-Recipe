module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Recipes', 'upvotes',
      {
        type: Sequelize.INTEGER
      }
    );
    queryInterface.addColumn(
      'Recipes', 'downvotes',
      {
        type: Sequelize.INTEGER
      }
    );
  },
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.removeColumn('Recipes', 'upvotes');
    queryInterface.removeColumn('Recipes', 'downvotes');
  }
};
