import { NextResponse } from "next/server";
import Usercrate from "../models/User";
import Order from "../models/order";
import Product from "../models/itemlist";




export async function GET() {
    // let id = '6969fe24d89ea1e812f79e33'

    try {
        const userId = '6969fe24d89ea1e812f79e33'

        const user = await Usercrate.findById("6960b6746358147923ff52a0")
        return NextResponse.json({ "data": user })
    } catch (error) {
        return NextResponse.json({ "error": "api v-1tt" })
    }


}
