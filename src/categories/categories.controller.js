const { Category } = require('./category.model');

exports.createCategory = async function createCategory(req, res, next) {
  const { files, body } = req

  const createdProduct = await Products.create(body).then(({ dataValues }) => dataValues).catch(err => next(err))

  const imageUrlArr = await Promise.all(files.map(async (img) => {
    const productId = createdProduct.id
    const fileName = img.filename

    const generatedUrl = `${process.env.BASE_URL}/products/${productId}/${fileName}`;

    const isDone = await imageCompresHandler(fileName, createdProduct.id, next);

    if (isDone) {
      return generatedUrl
    }
  }))

  const filteredUrlArr = imageUrlArr.filter(url => !!url)

  await Products.update({ images: filteredUrlArr }, {
    where: {
      id: createdProduct.id
    }
  }).catch(err => next(err))

  if (createdProduct) {
    res.status(200).send({ id: createdProduct.id })
  }
  if (!createdProduct) {
    res.status(404).send({ message: 'Product was not be added' })
  }
}

exports.listAllCategories = async function listAllCategories(req, res, next) {
  const allCategories = await Category.findAll()
    .then(res => res)
    .catch(err => next(err))

  res.status(200).send(allCategories)
};

exports.deleteOneCategory = async function deleteOneCategory(req, res, next) {
  const { id } = req.params

  remove.removeSync(path.join(__dirname + `../../../public/products/${id}`), {
    ignoreMissing: true
  })

  await Products.destroy({
    where: {
      id
    }
  })
    .then(res => res)
    .catch(err => next(err))

  res.status(200).send({ status: true })
};