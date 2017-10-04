module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'RecipeReviews', 'vote',
      {
        type: Sequelize.BOOLEAN
      }
    ),
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.removeColumn('RecipeReviews', 'vote');
  }
};
