const multer = require("multer");
const path = require("path");
const crypto = require("crypto"); // Gera hash de criptografia

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      //onde os arquivos serao armazenados
      cb(null, path.resolve(__dirname, "..", "..", "tmp"));
    },
    filename: (req, file, cb) => {
      //gera um nome p/ evitar ambiguidade
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        // console.log(`Nome original: ${file.originalname}`);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        // console.log(`Nome modificado: ${file.key}`);
        cb(null, file.key);
      });
    }
  })
};
