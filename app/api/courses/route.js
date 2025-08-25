import { db } from "@/config/db"
import { coursesTable } from "@/config/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { currentUser } from '@clerk/nextjs/server';
export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const user = await currentUser()
    const coursid = searchParams.get("coursid")
    if (coursid) {
        const result = await db.select().from(coursesTable).where(eq(coursesTable.cid, coursid))
        return NextResponse.json(result[0])
    }
    else {
        const result = await db.select().from(coursesTable).where(eq(coursesTable.email, user?.primaryEmailAddress?.emailAddress))
        return NextResponse.json(result)
    }
}