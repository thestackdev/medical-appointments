import db from "@/database/index";
import { users } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
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
      return NextResponse.json(
        { error: "Unable to create doctor at the moment" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Doctor id is required" },
        { status: 400 }
      );
    }

    const [response] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!response) {
      return NextResponse.json(
        { error: "Unable to delete doctor at the moment" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
