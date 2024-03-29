const { Op } = require("sequelize");
const remove = require('remove');
const path = require("path");
const { imageCompresHandler } = require("../../helpers/imageCompressor");
const { Product } = require('../models')

exports.createProduct = async function createProduct(req, res, next) {
  const { files, body } = req

  const createdProduct = await Product.create(body).catch(err => next(err))

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

  await Product.update({ images: filteredUrlArr }, {
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

exports.getOneProduct = async function getOneProduct(req, res, next) {
  const { id } = req.params
  const { viewed } = req.query

  const foundProduct = await Product.scope(['withAssociatedData']).findOne({
    where: {
      id
    }
  })
    .then(res => res)
    .catch(err => next(err))

  const { views } = foundProduct

  if (viewed === 'false') {
    await Product.update({
      views: views + 1,
      allviews: views + 1,
    }, {
      where: {
        id
      }
    });
  }

  if (foundProduct) {
    res.status(200).send(foundProduct)
  }
  if (!foundProduct) {
    res.status(401).send({ message: 'Product is not found' })
  }
};

exports.listAllProducts = async function listAllProducts(req, res, next) {
  const { page, limit } = req.query

  const allProducts = await Product.findAndCountAll({
    order: [['id', 'DESC']],
    offset: page * limit || null,
    limit: +limit || null,
  }).catch(err => next(err))

  res.status(200).send(allProducts)
};

exports.listPopularProducts = async function listPopularProducts(req, res, next) {
  const { limit } = req.query

  const popularProducts = await Product.findAll({
    order: [['views', 'DESC']],
    limit: +limit,
  }).catch(err => next(err))

  res.status(200).send(popularProducts)
};

exports.listDiscountProducts = async function listDiscountProducts(req, res, next) {
  const { limit } = req.query

  const discountProducts = await Product.findAll({
    order: [['price', 'ASC']],
    limit: +limit,
  }).catch(err => next(err))

  res.status(200).send(discountProducts)
};

exports.listNewProducts = async function listNewProducts(req, res, next) {
  const { limit } = req.query

  const newProducts = await Product.findAll({
    order: [['createdAt', 'DESC']],
    limit: +limit,
  }).catch(err => next(err))

  res.status(200).send(newProducts)
};

exports.listProductsByIds = async function listProductsByIds(req, res, next) {
  const { query } = req

  const idsArr = Object.values(query).map(item => +item)

  const findedProducts = await Product.findAll({
    where: {
      id: {
        [Op.in]: idsArr
      }
    }
  }).catch(err => next(err))

  res.status(200).send(findedProducts)
};

exports.deleteOneProduct = async function deleteOneProduct(req, res, next) {
  const { id } = req.params

  remove.removeSync(path.join(__dirname + `../../../public/products/${id}`), {
    ignoreMissing: true
  })

  await Product.destroy({
    where: {
      id
    }
  }).catch(err => next(err))

  res.status(200).send({ status: true })
};