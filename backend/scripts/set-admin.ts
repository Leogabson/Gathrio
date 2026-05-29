import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    });
    console.log(`User ${user.email} is now an admin`);
  } catch (error) {
    console.error("User not found or error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];
if (!email) {
  console.log("Usage: npx ts-node scripts/set-admin.ts <email>");
  process.exit(1);
}

setAdmin(email);