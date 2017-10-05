import models from '../../../models/';

const { UserFavourite } = models;

export default {
  list(req, res) {
    // let returnData;
    // let offset = 0;
    // let count = 500;

    // if (req.query && req.query.offset) {
    //   offset = parseInt(req.query.offset, 10);
    // }

    // if (req.query && req.query.count) {
    //   count = parseInt(req.query.count, 10);
    // }

    // if (UserFavourite) returnData = UserFavourite.slice(offset, offset + count);

    // if (req.query && req.query.sort) {
    //   if (req.query.order && req.query.order === 'asc') {
    //     returnData.sort((a, b) => a.upvotes - b.upvotes);
    //   } else if (req.query.order && req.query.order === 'desc') {
    //     returnData.sort((a, b) => b.upvotes - a.upvotes);
    //   } else {
    //     res.status(404).send('Not Found: Order of sorting does not exist.');
    //   }
    // }


    // return UserFavourite
    //   .all({
    //     include: [{
    //       model: UserFavouriteReview,
    //       as: 'UserFavouriteReviews',
    //     }, {
    //       model: UserFavourite,
    //       as: 'UserFavourites',
    //     }, {
    //       model: UserFavouriteCatalogue,
    //       as: 'UserFavouriteCatalogues',
    //     }, {
    //       model: CatalogueReview,
    //       as: 'catalogueReviews',
    //     }, {
    //       model: UserFavouriteFavourites,
    //       as: 'UserFavouriteFavourites',
    //     }, {
    //       model: UserFavouriteRoles,
    //       as: 'UserFavouriteRoles',
    //     }, {

    //     }]
    //   })

    return UserFavourite
      // .all()
      .sequelize.query('SELECT "userId", "recipeId", "created_at", "updated_at" FROM "UserFavourites" AS "UserFavourite";')
      .then((userFavourite) => {
        if (!userFavourite) {
          return res.status(404).send({
            message: 'UserFavourite Not Found',
          });
        }
        return res.status(200).send(userFavourite);
      })
      .catch(error => res.status(400).send(error));
  }
};
