module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });

  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    UserRole.belongsTo(models.Role, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
    });
  };

  return UserRole;
};
