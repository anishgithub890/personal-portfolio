import type { Metadata } from "next";
import SignIn from "@/app/auth/signin/page";

export const metadata: Metadata = {
  title: "Owner Access | Anish Mahato",
  robots: { index: false, follow: false },
};

export default function OwnerAccessPage() {
  return <SignIn />;
}
