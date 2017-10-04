module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    roleName: {
      type: DataTypes.STRING,
      required: true
    }
  }, {
    underscored: true
  });

  Role.associate = (models) => {
    Role.hasMany(models.UserRole, {
      foreignKey: 'roleId',
      as: 'userRoles',
    });
  };

  return Role;
};
