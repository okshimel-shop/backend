const { Type, Category } = require('../models')

const createCategory = async (req, res, next) => {
  const { body } = req

  await Category.create(body).catch(err => next(err))

  const findedType = await Type.scope(['withAssociatedData']).findOne({
    where: {
      id: body.typeId
    }
  }).catch(err => next(err))

  res.status(200).send(findedType)
}

const listAllCategories = async function listAllCategories(req, res, next) {
  const allCategories = await Category.findAll().catch(err => next(err))

  res.status(200).send(allCategories)
};

const deleteCategory = async function deleteOneCategory(req, res, next) {
  // const { id } = req.params

  // remove.removeSync(path.join(__dirname + `../../../public/products/${id}`), {
  //   ignoreMissing: true
  // })

  // await Products.destroy({
  //   where: {
  //     id
  //   }
  // })
  //   .then(res => res)
  //   .catch(err => next(err))

  // res.status(200).send({ status: true })
};

module.exports = {
  createCategory,
  listAllCategories,
  deleteCategory,
}