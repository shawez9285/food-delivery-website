import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// place user order for frontend
const placeOrder = async (req,res) => {

    const frontend_url = "https://food-delivery-frontend-j3g9.onrender.com";

    try {
        // const newOrder = new orderModel({
        //      userId:req.user.id,
        //     userId:req.body.userId,
        //     items:req.user.items,
        //     amount:req.user.amount,
        //     address:req.user.address
        // })
        const { items, amount, address } = req.body;
        const userId = req.user.id;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}});

        const line_items = items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*84
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*84
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
        console.log("Stripe session URL:", session.url);
        
        res.json({success:true,session_url:session.url})
        
    } catch (error) {
        console.log(error);
        console.error("Stripe/Order error:", error.message);
        res.json({success:false,message:"Error"})
        
    }

}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
            
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in verifyOrder in ordercontroller."})
        
    }
}

// user orders for frontend

const userOrders = async (req,res) => {
    const userId = req.user.id;
    try {
        const orders = await orderModel.find({userId:userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error,"Error in user order");
        res.json({success:false,message:"Error in user Orders"});
        
    }
}

// Listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error,"Error in list orders");
        res.json({success:false,message:"Error"})
        
    }
}

// api for updating order status

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error,"Error in update status");
        res.json({success:false,message:"Error in update status"})
        
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
