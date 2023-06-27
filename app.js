const express = require("express")
const productController = require("./Product/ProductController")
const cors = require("cors")
const ConnecDb = require("./Connection")
const userConroller = require("./User/UserController")
const Authentication = require("./Auth/Auth")
const orderCotroller = require("./Order/OrderController")
require("dotenv/config")

const app = express()
ConnecDb()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    return res.status(200).send({ message: "Success" })
})
app.get("/product", productController.GetProducts)
app.get("/product/:id", productController.GetProductById)
app.post("/cart", productController.Getcart)
app.post("/user/register", userConroller.RegiseterUser)
app.post("/user/login", userConroller.LoginUser)
app.post("/order", Authentication.CreateOrderAuth , orderCotroller.CreateOrder)
app.post("/payment/verify", Authentication.CreateOrderAuth, orderCotroller.paymentVerify)


app.listen(process.env.PORT || 5000, () => {
    console.log("server ready for serving")
})
