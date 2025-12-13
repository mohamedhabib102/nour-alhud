"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import req from "@/lib/axios";
import { useAuth } from "@/lib/contextapi";

export default function GoogleLogin() {
  const { data: session } = useSession();
  const { login } = useAuth();

  useEffect(() => {
    if (session?.user) {
      const data = {
        personName: session.user.name,
        email: session.user.email,
        gender: "M", 
        password: "123456GFGF5445",
        role: "string",
      };

      req.post("/api/Alhoda_Alnabawya/Login", data)
        .then(res => {
          login(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [session, login]);

  return (
    <button onClick={() => signIn("google")}>
      تسجيل باستخدام Google
    </button>
  );
}
