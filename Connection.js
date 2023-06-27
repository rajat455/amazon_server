const { default: mongoose } = require("mongoose")

const ConnecDb = async() => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/amazon")
      console.log("Db Connected")
    } catch (error) {
        console.log("Db Connection Loss")
    }
}

module.exports = ConnecDb