const { default: mongoose } = require("mongoose");

class ProductModel {
    constructor() {
        this.shema = new mongoose.Schema({
            name: { type: String, require: true },
            image: { type: String, require: true },
            price: { type: Number, require: true },
            numReviews: { type: Number, require: true },
            countInStock: { type: Number, require: true },
            description: { type: String, require: true },
            brand: { type: String, require: true },
            category: { type: String, require: true },
            rating: { type: Number, require: true }
        })
    }

}

const productModel = mongoose.model("product", new ProductModel().shema)
module.exports = productModel