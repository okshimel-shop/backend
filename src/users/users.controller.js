const { User } = require('./user.model');
const { Op } = require("sequelize");
const uuid = require("uuid").v4;

const fsPromises = require("fs").promises;
const path = require("path");

exports.getOneUser = async function getOneUser(req, res) {
  const { email, password } = req.body

  const findedUser = await User.findOne({
    where: {
      [Op.and]: [{ email }, { password }],
    }
  })
    .then(res => res)
    .catch(({ message }) => message)

  if (findedUser) {
    res.status(200).send({ token: uuid() })
  }
  if (!findedUser) {
    res.status(401).send({ message: 'Authorization failed' })
  }
};

// exports.listAllUsers = async function listAllUsers(req, res) {
//   await User.findAll({
//     order: [['id', 'DESC']],
//     offset: 3,
//     limit: 3
//   })
//     .then(result => res.status(200).send(result))
//     .catch(error => res.status(404).send(error.message))
// };

// const test = await User.create({
//   name: "Jane",
//   email: 'oscolok12@ukr.net',
//   password: '1234',
// }).then(res => res).catch(err => err)
// res.status(200).send(test)

// exports.updateAvatarUser = async (req, res, next) => {
//   const currentUser = req.user;
//   const fileName = req.file.filename;

//   if (req.file.mimetype.includes("image")) {
//     await avatarCompresHandler(fileName, next);

//     const user = await UserModel.findOne(currentUser._id);

//     const oldNameAvatar = user.avatarUrl.slice(-13);

//     if (oldNameAvatar) {
//       fsPromises.unlink(
//         path.join(__dirname + `../../../public/avatars/${oldNameAvatar}`)
//       );
//     }

//     const newUrl = `${process.env.BASE_URL}/avatars/${fileName}`;

//     await UserModel.findByIdAndUpdate(currentUser._id, {
//       avatarUrl: newUrl,
//     });

//     res.status(200).send({ avatarURL: newUrl });
//   } else {
//     res.status(400).json({ message: "Invalid file type" });
//   }
// };
