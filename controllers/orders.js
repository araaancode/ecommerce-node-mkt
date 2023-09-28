let Order=require("../models/Order")

// get all orders
const getOrders=async(req,res)=>{
  try {
    let orders = await Order.find({})

    if (orders) {
      res.status(200).json({
        msg: 'orders fetched',
        orders,
      })
    } else {
      res.status(403).json({
        msg: 'can not fetch orders',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
    })
  }
}

// get single order
const getOrder=async(req,res)=>{
   try {
    let order = await Order.findById(req.params.orderId)

    if (order) {
      res.status(200).json({
        msg: 'order fetched',
        order,
      })
    } else {
      res.status(403).json({
        msg: 'can not fetch order',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: 'catch error',
      error,
    })
  }
}

// get single order
const getMyOrders=async(req,res)=>{
    try {
     let order = await Order.findById(req.user.id)
 
     if (order) {
       res.status(200).json({
         msg: 'order fetched',
         order,
       })
     } else {
       res.status(403).json({
         msg: 'can not fetch order',
       })
     }
   } catch (error) {
     console.log(error)
     res.status(403).json({
       msg: 'catch error',
       error,
     })
   }
 }

// create order
const createOrder=async(req,res)=>{
  console.log(req.body);
   try {
    await Order.create({
      user:req.body.user,
      orderItems:req.body.orderItems,
      totalPrice:req.body.totalPrice,
      paidAt:req.body.paidAt,
    }).then(order=>{
      if(order){
        res.status(201).json({
          msg:"create order",
          order
      })
      }
    }).catch((err)=>{
      res.status(403).json({
        msg:"سفارش ساخته نشد",
        err
      })
    })
     
   } catch (error) {
     console.log(error);
   }
}


module.exports={
    getOrders,
    getOrder,
    getMyOrders,
    createOrder,
}