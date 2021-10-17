const { Type } = require('../models')

const createType = async (req, res, next) => {
  const { body } = req

  await Type.create(body).catch(err => next(err))

  const allTypes = await Type.scope(['withAssociatedData']).findAll().catch(err => next(err))

  res.status(200).send(allTypes)
}

const listAllTypes = async (req, res, next) => {
  const allTypes = await Type.scope(['withAssociatedData']).findAll().catch(err => next(err))

  res.status(200).send(allTypes)
};

const deleteTypes = async (req, res, next) => {
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
  createType,
  listAllTypes,
  deleteTypes,
}