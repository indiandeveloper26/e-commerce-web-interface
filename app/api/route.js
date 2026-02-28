import { NextResponse } from "next/server";
import Usercrate from "../models/User";
import Order from "../models/order";
import Product from "../models/itemlist";




export async function GET() {
    // let id = '6969fe24d89ea1e812f79e33'

    try {
        const userId = '6969fe24d89ea1e812f79e33'

        const user = await Usercrate.findById("697e0e5fa0d232f01b9c7ac2")
        return NextResponse.json({ "data": user })
    } catch (error) {
        return NextResponse.json({ "error": user })
    }


}
