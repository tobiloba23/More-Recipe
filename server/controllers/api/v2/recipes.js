import validator from 'validatorjs';
import path from 'path';
import fs from 'fs';
import S3FS from 's3fs';
import dotenv from 'dotenv';

import models from '../../../models/';
import reqQueryUtility from '../../utility/reqQuery';

dotenv.config();

const { Recipe } = models;
const dberror = process.env.DB_ERROR;
const s3Bucket = process.env.S3_BUCKET;
const s3fsImpl = new S3FS(s3Bucket, {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default {
  list(req, res) {
    let returnData, promisedData = null;

    promisedData = req.params.userId ?
      Recipe.find({
        where: {
          userName: req.params.userName,
        }
      }) : Recipe.findAll();

    promisedData
      .then(async (recipes) => {
        if (!recipes) {
          res.status(204).json({
            message: 'No Recipe Found, why don\'t you be the first to explore our wonderful world. Thank you.',
          });
        } else {
          returnData = reqQueryUtility(
            res, recipes, req.query.sort, req.query.order,
            req.query.offset, req.query.count
          );
          if (returnData) {
            await Promise.all(returnData.map(async (element) => {
              await models.User.findById(element.userId)
                .then((owner) => {
                  element.dataValues.owner = owner.userName;
                  element.dataValues.ownerImage = owner.imageUrl;
                })
                .catch(() => {
                  res.status(500).json({
                    error: {
                      message: `${dberror} the image url for one of the recipes`
                    }
                  });
                });
              if (req.decoded) {
                await models.RecipeReview.find({
                  where: {
                    recipeId: element.dataValues.recipeId,
                    userId: req.decoded.id,
                    vote: {
                      $ne: null
                    }
                  }
                })
                  .then((userHasOpinion) => {
                    if (userHasOpinion) {
                      element.dataValues.currentUserHasUpVoted =
                      userHasOpinion.vote ? userHasOpinion.vote : null;
                      element.dataValues.currentUserHasDownVoted =
                        userHasOpinion.vote === false ? !userHasOpinion.vote : null;
                    } else {
                      element.dataValues.currentUserHasUpVoted = null;
                      element.dataValues.currentUserHasDownVoted = null;
                    }
                  })
                  .catch(() => {
                    res.status(500).json({
                      error: {
                        message: `${dberror} check if current user has voted on one of the recipes`
                      }
                    });
                  });
              }
            }));
            res.status(200).json({
              data: returnData
            });
          }
        }
      })
      .catch(() => res.status(500).json({
        error: {
          message: `${dberror} fetch the recipes from the database`
        }
      }));
  },

  listOne(req, res) {
    Recipe
      .findById(req.params.recipeId)
      .then(recipe => res.status(200).json({
        data: recipe
      }))
      .catch(() => res.status(500).json({
        error: {
          message: `${dberror} fetch the recipe from the database`
        }
      }));
  },

  create(req, res) {
    const rules = {
      title: 'required|string',
      description: 'required|string'
    };
    const isValid = new validator(req.body, rules);

    if (isValid.fails()) {
      res.status(400).json({
        error: {
          message: isValid.errors.all()
        }
      });
    } else {
      let imageUrl, keyName;
      const s3error = [];

      if (req.files.recipeImage) {
        const file = req.files.recipeImage;
        const stream = fs.createReadStream(file.path);
        keyName = `${req.decoded.id}/Recipes/${req.body.title}/${file.fieldName}${path.extname(file.originalFilename)}`;
        const s3Params = {
          ContentType: file.type,
          ACL: 'public-read'
        };

        s3fsImpl.writeFile(keyName, stream, s3Params)
          .catch((error) => {
            s3error[0] = error;
          });
        imageUrl = `https://${s3Bucket}.s3.amazonaws.com/${keyName}`.replace(/ /g, '+');
      }
      Recipe
        .create({
          title: req.body.title,
          description: req.body.description,
          imageUrl,
          instructions: req.body.instructions,
          userId: req.decoded.id,
        })
        .then(recipe => res.status(201).json({
          message: `The ${recipe.title} recipe has successfully been uploaded.`,
          data: recipe,
          s3error
        }))
        .catch(() => {
          const params = {
            Bucket: s3Bucket,
            Key: keyName
          };

          s3fsImpl.s3.deleteObject(params, (err) => {
            if (err) s3error[1] = err;
          });
          res.status(500).json({
            error: {
              message: {
                dbError: `${dberror} create the recipe on the database`,
                s3error
              }
            }
          });
        });
    }
  },

  update(req, res) {
    const rules = {
      title: 'required|string'
    };
    const isValid = new validator(req.body, rules);

    if (isValid.fails()) {
      res.status(400).json({
        error: {
          message: isValid.errors.all()
        }
      });
    } else {
      Recipe
        .findById(req.params.recipeId)
        .then((recipe) => {
          if (!recipe) {
            res.status(404).json({
              error: {
                message: 'Recipe Not Found',
              }
            });
          } else if (recipe.userId !== req.decoded.id) {
            res.status(403).json({
              error: {
                message: 'You are not authorized to edit this recipe',
              }
            });
          } else {
            recipe
              .update(req.body, { fields: Object.keys(req.body) })
              .then(updatedRecipe => res.status(202).json({
                data: updatedRecipe
              }))
              .catch(() => res.status(500).json({
                error: {
                  message: `${dberror} update the recipe on the datadase`
                }
              }));
          }
        })
        .catch(() => res.status(500).json({
          error: {
            message: `${dberror} find the recipe on the datadase`
          }
        }));
    }
  },

  delete(req, res) {
    Recipe
      .find({
        where: {
          recipeId: req.params.recipeId,
        }
      })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            error: {
              message: 'Recipe Not Found',
            }
          });
        } else if (recipe.userId !== req.decoded.id) {
          res.status(403).json({
            error: {
              message: 'You are not authorized to delete this recipe',
            }
          });
        } else {
          const deletedRecipe = recipe;

          recipe
            .destroy()
            .then(() => res.status(200).json({
              message: 'The recipe listed below has just been deleted',
              data: deletedRecipe
            }))
            .catch(() => res.status(500).json({
              error: {
                message: `${dberror} delete the recipe from the datadase`
              }
            }));
        }
      })
      .catch(() => res.status(500).json({
        error: {
          message: `${dberror} find the recipe on the datadase`
        }
      }));
  }
};
