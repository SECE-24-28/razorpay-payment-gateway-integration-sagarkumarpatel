import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();
// create the Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

export async function POST(){
   try{
     const order=await razorpay.orders.create({
        amount:500*100,
        currency:"INR"
    });

    console.log("order",order);
     return Response.json({
        status: "success"
    })
   }catch(error:any){
    return Response.json({
        status: "false"
    })
}
}