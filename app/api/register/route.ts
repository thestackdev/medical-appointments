import db from "@/database/index";
import { users } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const [response] = await db
      .insert(users)
      .values({
        ...json,
        password: sql`crypt(${json.password}, gen_salt('bf'))`,
      })
      .returning();

    if (!response) {
      return new Response(
        JSON.stringify({ error: "Unable to register at the moment" }),
        {
          status: 401,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT(response)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setSubject(response.id)
      .sign(secret);

    return new Response(JSON.stringify({ success: true, token: token }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Set-Cookie": `token=${token};Path=/`,
      },
    });
  } catch (e) {
    console.log(e);
    const error = e as Error;
    return new Response(error.message, {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
