import userModel from "../models/userModel.js"

// add item to user cart

// const addToCart = async (req,res) => {

//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         // let cartData = userData.cartData || {};
//         if(!cartData[req.body.itemId]){

//             cartData[req.body.itemId] = 1;
            
//         }
//         else{
//             cartData[req.body.itemId] += 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        
//         res.json({success:true,message:"Added To Cart at userId "+req.body.userId});

//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error to add"})
//     }

// }

//   -------- NEW -----

const addToCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user.id; // Retrieved from authMiddleware
        console.log("Received userId:", userId);
        // Check if user exists
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if not present
        let cartData = userData.cartData || {};

        // Update cart
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        // Save updated cart
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: `Added to cart for userId ${userId} ${itemId}` });

    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

// remove items from user cart

const removeFromCart = async (req,res) => {

    try {
        const { itemId } = req.body;
        const userId = req.user.id;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if (cartData[itemId]>0) {
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Removed From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

// fetch user cart data

const getCart = async (req,res) => {

    try {
        const { itemId } = req.body;
        const userId = req.user.id;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

export {addToCart,removeFromCart,getCart}