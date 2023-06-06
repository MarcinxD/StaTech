import express from "express";
import AsyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import protectRoute from '../Middleware/authMiddleware.js';


const orderRoutes = express.Router();

const createOrder = AsyncHandler(async(req, res) => {
    const {orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, paymentDetails, userInfo} = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No hay datos en el pedido.')
    }else{
        const order = new Order({
            orderItems,
            user: userInfo._id,
            username: userInfo.name,
            email: userInfo.email,
            shippingAddress,
            paymentMethod,
            paymentDetails,
            shippingPrice,
            totalPrice,
        });

        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
})

orderRoutes.route('/').post(protectRoute, createOrder);

export default orderRoutes;







