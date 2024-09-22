"use client";
import isAuth from "@/components/isAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();
  useEffect(() => {
    
      router.push("/login"); 
    
  }, [router]);
  return (
    <div>
      
    </div>
  );
}
export default isAuth(Home);
