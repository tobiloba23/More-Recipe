module.exports = (sequelize, DataTypes) => {
  const CatalogueReview = sequelize.define('CatalogueReview', {
    catalogueReviewId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    catalogueId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    vote: {
      type: DataTypes.BOOLEAN
    },
    comment: {
      type: DataTypes.STRING
    },
    // commenter_email: {
    //   type: DataTypes.STRING,
    //   required: true
    // },
    // status: {
    //   type: DataTypes.ENUM,
    //   values: ['approved', 'rejected', 'in review']

    // }
  // }, {
  //   underscored: true
  });

  CatalogueReview.associate = (models) => {
    CatalogueReview.belongsTo(models.Catalogue, {
      foreignKey: 'catalogueId',
      onDelete: 'CASCADE',
    });
    CatalogueReview.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return CatalogueReview;
};
