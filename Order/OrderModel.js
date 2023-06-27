const { default: mongoose } = require("mongoose");

class OrderModel{
    constructor(){
        this.schema = new mongoose.Schema({
            user:{type:Object, require:true},
            shippingAddress:{type:Object,require:true},
            products:{type:Array, require:true},
            paymentMethod:{type:String, require:true, default:"cod"},
            paymentStatus:{type:String, require:true, default:"pending"},
            delivaryStatus:{type:String, require:true, default:"pending"},
            totalPrice:{type:Number, require:true},
            deliverdIn:{type:Date, require:true}
        })
    }
}

const Order = new OrderModel()
const orderModel = mongoose.model("tbl_orders", Order.schema)
module.exports = orderModel