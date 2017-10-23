module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userName: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phoneNo: {
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
    }),
  down: (queryInterface/* , Sequelize */) => {
    queryInterface.dropTable('Users');
  }
};
