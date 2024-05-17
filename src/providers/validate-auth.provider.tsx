"use client";
// import { usePathname } from "next/navigation";
import { AuthContext } from "contexts/auth.context";
import { useContext, useEffect, useState } from "react";

export function ValidateAuth({ children }: any) {
  // const path = usePathname();

  const [render, setRender] = useState(false);
  const { me } = useContext(AuthContext);

  async function validateAccess() {
    let allowed = await me();

    setTimeout(() => {
      setRender(allowed);
    }, 0);
  }

  useEffect(() => {
    validateAccess();
  }, []);
  // }, [path]);

  return render ? children : <></>;
}
