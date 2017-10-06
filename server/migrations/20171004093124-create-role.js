module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Roles', {
      roleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.dropTable('Roles');
  }
};
