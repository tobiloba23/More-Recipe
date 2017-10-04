module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserRoles', {
      userId: {
        type: Sequelize.UUID
      },
      roleId: {
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
    queryInterface.dropTable('UserRoles');
  }
};
