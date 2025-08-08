"use client";
import { SessionProvider } from "next-auth/react";

// This component wraps the application with the NextAuth session provider to access session

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}