const { Type, Subcategory } = require('../models')

const createSubcategory = async (req, res, next) => {
  const { body } = req

  await Subcategory.create(body).catch(err => next(err))

  const findedType = await Type.scope(['withAssociatedData']).findOne({
    where: {
      id: body.typeId
    }
  }).catch(err => next(err))

  res.status(200).send(findedType)
}

const listAllSubcategories = async function listAllSubcategories(req, res, next) {
  const allSubcategories = await Subcategory.findAll().catch(err => next(err))

  res.status(200).send(allSubcategories)
};

const deleteSubcategory = async function deleteOneCategory(req, res, next) {
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
  createSubcategory,
  listAllSubcategories,
  deleteSubcategory,
}