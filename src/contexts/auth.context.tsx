"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { UserProps } from "interfaces/user.interfaces";
import {
  AuthContextProps,
  SignAuthProps,
} from "interfaces/contexts/auth-context.interfaces";

import api from "services/api";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: any) {
  const toast = useToast();
  const [user, setUser] = useState({} as UserProps);
  const router = useRouter();

  async function sign({ ...props }: SignAuthProps): Promise<undefined> {
    try {
      const { data } = await api.post("/auth", {
        ...props,
      });

      setCookie(
        "@user",
        {
          ...data,
        },
        { expires: dayjs().add(7, "days").toDate() }
      );

      api.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;

      router.push("/home");
    } catch (error: any) {
      toast({
        title: "Oops.",
        description:
          error.response?.data?.message || error.message || "Houve um problema",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  async function logout() {
    deleteCookie("@user");
    router.push("/auth");
  }

  async function me(): Promise<boolean> {
    let user = getCookie("@user")?.toString() as any;
    user = user ? (JSON.parse(user) as UserProps) : false;

    if (user) {
      setUser(user);
      if (true) {
        api.defaults.headers["Authorization"] = `Bearer ${user.access_token}`;
        return true;
      } else {
        logout();
      }
    } else {
      router.push("/auth");
    }

    return false;
  }

  return (
    <AuthContext.Provider value={{ user, sign, logout, me }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
