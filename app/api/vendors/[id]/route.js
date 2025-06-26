import { getServerSession } from "next-auth";
import dbConnect from "../../../../lib/dbConnect";
import { authOptions } from "../../../..//lib/authOptions";

export async function POST(request, { params }) {
    try {
        await dbConnect();
        // const session = await getServerSession(authOptions);
        // if (!session) {
        //     return new Response(JSON.stringify({ error: "Unauthorized" }), {
        //         status: 401,
        //         headers: { "Content-Type": "application/json" }
        //     });
        // }
        const data=await request.json();
        return new Response(
            JSON.stringify({data}),
            {
                status: 200,
                headers:{
                    "Content-Type":"application/json"
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