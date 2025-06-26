import { getServerSession } from "next-auth";
import dbConnect from "../../../../lib/dbConnect";
import { authOptions } from "../../../..//lib/authOptions";
import Vendor from "../../../../models/Vendor";


export async function GET(request, { params }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }
        const vendor = await Vendor.findById(params.id)
        if (!vendor) {
            return new Response(JSON.stringify({ error: "Vendor not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify(vendor), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching vendor by ID:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }
        const data = await request.json();
        const updateVendor = await Vendor.findByIdAndUpdate(
            params.id,
            data,
            {
                new: true
            }
        )
        return new Response(
            JSON.stringify({ updateVendor }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );



    } catch (error) {
        let status = 500;
        let message = error.message;

        if (error.name === "ValidationError") {
            status = 400;
            message = Object.values(error.errors).map(err => err.message).join(", ");
        }
        else if (error.code === 11000) {
            status = 409;
            message = "Bank account number already exists";
        }

        return new Response(JSON.stringify({ error: message }), {
            status,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }
        await Vendor.findByIdAndDelete(
            params.id
        )
        return new Response(
            JSON.stringify({ message: "Vendor Deleted Successfully" }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );



    } catch (error) {
        let status = 500;
        let message = error.message;

        if (error.name === "ValidationError") {
            status = 400;
            message = Object.values(error.errors).map(err => err.message).join(", ");
        }
        else if (error.code === 11000) {
            status = 409;
            message = "Bank account number already exists";
        }

        return new Response(JSON.stringify({ error: message }), {
            status,
            headers: { "Content-Type": "application/json" }
        });
    }
}