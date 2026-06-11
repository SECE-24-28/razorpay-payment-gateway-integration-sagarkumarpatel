import crypto from 'crypto'
import dotenv from 'dotenv'
export async function POST(req: Request){
     //get the body of the request
    const body = await req.json();
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = body;

    console.log(razorpay_payment_id);
    console.log(razorpay_order_id);
    console.log(razorpay_signature);
    
    //create the generate signature
    const generateSignature=
    crypto
    .createHmac("sha256",process.env.KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
     .digest("hex");
    const isValid=razorpay_signature===generateSignature;
    if(isValid){
        return Response.json({
            success:true
        })
    }
    return Response.json({
        success: false
    });
}

// get payment_id, order_id, signature from request objext
// generate a signature
// match the signatire with the returned razorpay signature
// if (match) -> return Response as success otherwise fail