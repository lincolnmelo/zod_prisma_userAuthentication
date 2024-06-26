import { PrismaClient } from "@prisma/client"

export const db = new PrismaClient()

export async function connectToDB() {
    try {
        await db.$connect()
        console.log("[DATABASE]: connected!")

    } catch (error) {
        console.log("[DATABASE]: connection error: ", error)
        await db.$disconnect()
    }
}