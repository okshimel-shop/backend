const fs = require('fs')
const path = require('path')
const modelsDir = '../services/models'
const Sequelize = require('sequelize')
const sequelize = require('./config').sequelize

let models = {
}

const loadModels = () => {
  const startedLoading = {}

  const loadModelFromFile = (modelFileName, dir) => {
    if (startedLoading[modelFileName]) {
      console.log('\x1b[31m[ERROR]\x1b[0m', `Error while loading models. Cyclic model loading ${modelFileName}`)
      return
    }

    startedLoading[modelFileName] = true

    const fullpath = path.join(dir, modelFileName)

    let modelFile

    try {
      modelFile = require(fullpath)
    } catch (e) {
      console.error(`Failed to require module ${modelFileName} from ${fullpath} \n`, e)
      return
    }

    const model = modelFile(sequelize, Sequelize.DataTypes)

    if (model.name + '.model.js' != modelFileName) {
      console.log('\x1b[33m[WARN]\x1b[0m', `Model filename mismatch: ${model.name}.js != ${modelFileName}`)
    }

    const response = {}
    response[model.name] = model

    return response
  }

  const dir = path.resolve(__dirname, modelsDir)
  fs
    .readdirSync(path.resolve(dir))
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      models = { ...models, ...loadModelFromFile(file, dir) }
    })

  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models)
    }
  })
  
  return models
}

module.exports = loadModels()