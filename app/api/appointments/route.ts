import db from "@/database";
import { doctorAppointments } from "@/database/schema";
import { checkSignedIn } from "@/helpers/session";
import { log } from "console";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await checkSignedIn();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.doctorId || !body.appointmentDate) {
      return NextResponse.json(
        { error: "doctorId and appointmentDate are required" },
        { status: 400 },
      );
    }

    const appointmentDate = new Date(body.appointmentDate);

    const userAvailable = await db.query.doctorAppointments.findFirst({
      where: and(
        eq(doctorAppointments.patientId, session.id),
        sql`
            appointment_date >= ${appointmentDate.toISOString()}::timestamptz - interval '1 hour' AND
            appointment_date <= ${appointmentDate.toISOString()}::timestamptz + interval '1 hour'
          `,
      ),
    });

    if (userAvailable) {
      return NextResponse.json(
        { error: "You already have an appointment at this time" },
        { status: 400 },
      );
    }

    const isAvailable = await db.query.doctorAppointments.findFirst({
      where: and(
        eq(doctorAppointments.doctorId, body.doctorId),
        sql`
            appointment_date >= ${appointmentDate.toISOString()}::timestamptz - interval '1 hour' AND
            appointment_date <= ${appointmentDate.toISOString()}::timestamptz + interval '1 hour'
          `,
      ),
    });

    if (isAvailable) {
      return NextResponse.json(
        { error: "Doctor is not available at this time" },
        { status: 400 },
      );
    }

    const [respose] = await db
      .insert(doctorAppointments)
      .values({
        doctorId: body.doctorId,
        patientId: session.id,
        appointmentDate: appointmentDate,
      })
      .returning();

    return NextResponse.json({ message: respose });
  } catch (error) {
    const e = error as Error;
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await checkSignedIn();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.id || !body.prescription) {
      return NextResponse.json(
        { error: "id and prescription are required" },
        { status: 400 },
      );
    }

    const response = await db
      .update(doctorAppointments)
      .set({ prescription: body.prescription })
      .where(eq(doctorAppointments.id, body.id))
      .returning();

    return NextResponse.json({ message: response });
  } catch (error) {
    const e = error as Error;
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await checkSignedIn();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const response = await db
      .delete(doctorAppointments)
      .where(eq(doctorAppointments.id, id))
      .returning();

    return NextResponse.json({ message: response });
  } catch (error) {
    const e = error as Error;
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
