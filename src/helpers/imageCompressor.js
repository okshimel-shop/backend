const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");

exports.imageCompresHandler = async (fileName, productId, next) => {
  try {
    await Jimp.read(path.join(__dirname + `../../../tmp/${fileName}`))
      .then(img => {
        img
          .cover(800, 600)
          .quality(90)
          .write(path.join(__dirname + `../../../public/products/${productId}/${fileName}`))
      }
      ).catch(async () => {
        await fs.unlink(
          path.join(__dirname + `../../../tmp/${fileName}`), (err) => {
            if (err) throw err;
          }
        )
      })

    fs.unlink(
      path.join(__dirname + `../../../tmp/${fileName}`), (err) => {
        if (err) throw err;
      }
    )

    return true
  } catch (err) {
    return false
  }
};
