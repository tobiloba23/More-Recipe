module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Catalogues', 'upvotes',
      {
        type: Sequelize.INTEGER
      }
    );
    queryInterface.addColumn(
      'Catalogues', 'downvotes',
      {
        type: Sequelize.INTEGER
      }
    );
  },
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.removeColumn('Catalogues', 'upvotes');
    queryInterface.removeColumn('Catalogues', 'downvotes');
  }
};
