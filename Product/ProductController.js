const productModel = require("./ProductModel")
class ProductController {
    async GetProducts(req, res) {
        try {
            const result = await productModel.find()
            if (result) {
                return res.status(200).send({ message: "Success", products: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })

        }
    }

    async GetProductById(req, res) {
        try {
            const { id } = req.params
            const result = await productModel.findOne({ _id: id })
            if (result) {
                return res.status(200).send({ message: "Success", product: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            if (error && error.kind && error.kind === "ObjectId") {
                return res.status(500).send({ message: "Somthing went wrong with" + " #" + req.params.id })
            }
            return res.status(500).send({ message: "Internal server error" })

        }
    }

    async Getcart(req, res) {
        try {
            const { products } = req.body
            if (!products) return res.status(400).send({ message: "Missing Depnedency products" })
            const cart = await productModel.find({ _id: products }).select(['name', 'price', 'category', 'brand', 'countInStock', "_id", "image"])
            if (!cart) return res.status(200).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success", cart: cart })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })
        }
    }
}

const productController = new ProductController()

module.exports = productController
