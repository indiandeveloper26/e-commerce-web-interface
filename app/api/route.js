import { NextResponse } from "next/server";
import Usercrate from "../models/User";
import Order from "../models/order";




export async function GET() {

    try {
        let data = await Order.find()
        return NextResponse.json({ "data": data })
    } catch (error) {
        return NextResponse.json({ "error": "api v-1" })
    }


}
