"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "contexts/auth.context";
import { useRouter } from "next/navigation";

export default function Index() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    } else {
      router.push("/auth");
    }
  }, [user]);

  return null;
}
