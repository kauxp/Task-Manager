"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/utils/isAuthenticates";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = isAuthenticated;

    useEffect(() => {
      if (!auth) {
        redirect("/login");
      }
    }, [auth]);  

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
