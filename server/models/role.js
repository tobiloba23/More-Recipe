module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    roleName: {
      type: DataTypes.STRING,
      required: true
    }
  });

  Role.associate = (models) => {
    Role.hasMany(models.UserRole, {
      foreignKey: 'roleId',
      as: 'userRoles',
    });
  };

  return Role;
};
