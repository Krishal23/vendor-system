import { stringify } from "querystring";
import { authOptions } from "../../../lib/authOptions";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Vendor from "../../../models/Vendor";
import { getServerSession } from "next-auth";

export async function POST(request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    try {
        const data = await request.json();
        if (!data.vendorName || !data.bankAccountNo || !data.bankName) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return new Response(JSON.stringify({
                error: "User Not Found"
            }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        const vendor = await Vendor.create({
            ...data,
            createdBy: user._id
        });

        user.vendors.push(vendor._id);
        await user.save();

        return new Response(JSON.stringify(vendor), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        })

    } catch (error) {
        let status = 500;
        let message = error.message;
        console.log(message)

        if (error.name === "ValidationError") {
            status = 400;
            message = Object.values(error.errors).map(err => err.message).join(", ");
        } else if (error.code === 11000) {
            status = 409;
            message = "Vendor with this bank account already exists for this user";
        }

        return new Response(JSON.stringify({ error: message }), {
            status,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function GET(request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }
    // const user=session.user;
    const user=await User.findOne({email:session.user.email}).populate('vendors')


    //query params
    const {searchParams}=new URL(request.url);
    console.log(searchParams)
    const page=parseInt(searchParams.get("page")|| "1");
    const limit=parseInt(searchParams.get("limit")|| "10");
    const sortBy=searchParams.get("sortBy")|| "createdAt";
    const order=searchParams.get("order")==="asc"?1:-1;

    const vendorName=searchParams.get("vendorName");
    const bankName=searchParams.get("bankName");

    //build query
    const query={createdBy:user._id}
    if(vendorName)query.vendorName=new RegExp(vendorName,"i")
    if(bankName)query.bankName=new RegExp(bankName,"i")
    
    const total= await Vendor.countDocuments(query);

    const vendors = await Vendor.find(query).sort({[sortBy]:order}).skip((page-1)*limit).limit(limit);

    return new Response(
        JSON.stringify({
            vendors,
            meta:{
                total,
                page,
                limit,
                totalPages:Math.ceil(total/limit)
            }
        }),{
            status:200,
            headers:{"Content-Type":"application/json"}
        }
    )
    

    




    return new Response(JSON.stringify({
        user,
        vendors:user.vendors
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

}