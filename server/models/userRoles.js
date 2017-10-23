module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userRoleId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
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
