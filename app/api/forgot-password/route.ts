import db from "@/database/index";
import { users } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const [response] = await db
      .select()
      .from(users)
      .where(sql`email = ${email}`);

    if (!response) {
      return new Response(
        JSON.stringify({ error: "No user found with that email" }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }

    await db
      .update(users)
      .set({ password: sql`crypt(${password}, gen_salt('bf'))` })
      .where(eq(users.email, email))
      .returning();

    return NextResponse.json({
      success: true,
      message: "Password has been updated successfully",
    });
  } catch (e) {
    const error = e as Error;
    return new Response(error.message, {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
