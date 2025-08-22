import { db } from "@/config/db";
import { coursesTable, enrollToCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { courseid } = await req.json()
    const user = await currentUser();

    const enrollCourse = await db.select().from(enrollToCourseTable).where(and(eq(enrollToCourseTable.email, user?.primaryEmailAddress?.emailAddress), eq(enrollToCourseTable.cid, courseid)))
    if (enrollCourse?.length == 0) {
        const result = await db.insert(enrollToCourseTable).values({
            cid: courseid,
            email: user?.primaryEmailAddress?.emailAddress
        }).returning(enrollToCourseTable)
        return NextResponse.json(result);
    }
    return NextResponse.json({ massage: "already enrolled" })
}
export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const courseid = searchParams.get("courseid")
    if (courseid) {
        const user = await currentUser();
        const result = await db.select().from(coursesTable).innerJoin(enrollToCourseTable, eq(coursesTable.cid, enrollToCourseTable.cid)).where(and(eq(enrollToCourseTable.email, user?.primaryEmailAddress?.emailAddress), eq(enrollToCourseTable.cid, courseid)))
        console.log(result[0])
        return NextResponse.json(result[0]);
    } else {
        const user = await currentUser();
        const result = await db.select().from(coursesTable).innerJoin(enrollToCourseTable, eq(coursesTable.cid, enrollToCourseTable.cid)).where(eq(enrollToCourseTable.email, user?.primaryEmailAddress?.emailAddress))
        return NextResponse.json(result);
    }
}