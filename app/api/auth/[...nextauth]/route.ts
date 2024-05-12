import NextAuth from "next-auth";
import { auhtOptions } from "@/app/_lib/auth";

const handler = NextAuth(auhtOptions);

export { handler as GET, handler as POST };
