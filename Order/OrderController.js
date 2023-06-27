const DeliveryDay = require("../Contents")
const productModel = require("../Product/ProductModel")
const orderModel = require("./OrderModel")
const Razorpay = require("razorpay")
const bcrypt = require("bcrypt")


function CreateRozorPayORder(options) {
    return new Promise((resolve, reject) => {

        var instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        });
        instance.orders.create(options, (err, order) => {
            if (err) return reject(err)
            resolve(order)
        })
    })
}



class OrderController {
    constructor() {

    }



    async CreateOrder(req, res) {
        try {
            const { products, paymentMethod, shippingAddress, userInfo, totalPrice } = req.body
            if (!products) {
                return res.status(400).send({ message: "Somthing went wrong" })
            }
            if (!paymentMethod) return res.status(500).send({ message: "Somthing went wrong" })
            if (!shippingAddress) return res.status(500).send({ message: "Somthing went wrong" })
            if (!userInfo) return res.status(500).send({ message: "Somthing went wrong" })
            const deliveryDate = new Date()
            deliveryDate.setDate(deliveryDate.getDate() + DeliveryDay)
            const orderDetails = {
                products,
                paymentMethod,
                shippingAddress,
                user: userInfo,
                deliverdIn: deliveryDate,
                totalPrice: totalPrice
            }
            let order = await orderModel.create(orderDetails)
            order = { ...order._doc, RazorpayDetails: null }
            if (paymentMethod === "cod") {
                if (!order) return res.status(500).send({ message: "Somthing went wrong", order })
                return res.status(200).send({ message: "Success" })
            } else {
                const options = {
                    amount: totalPrice * 100,
                    currency: "INR",
                    receipt: "rcpt_id_" + order._id
                }
                const RozorpayResult = await CreateRozorPayORder(options)
                if (!RozorpayResult) return res.status(500).send({ message: "Somthing went wrong" })
                order = {
                    ...order,
                    RazorpayDetails: { ...RozorpayResult, apikey: process.env.API_KEY }
                }
                return res.status(200).send({ message: "Success", order })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async paymentVerify(req, res) {
        const { razorpayOrderId,orderId,response } = req.body
        console.log(response)
        const instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        })
        try {
            const res = await instance.orders.fetchPayments(razorpayOrderId)
            console.log(razorpayOrderId)
            console.log(res)
        } catch (error) {
            
        }

    }
}

const orderCotroller = new OrderController()
module.exports = orderCotroller