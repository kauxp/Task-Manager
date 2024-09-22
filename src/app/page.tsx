"use client"
import Link from "next/link";
import Login from "../app/pages/login"
import TaskModal from "@/components/modals/TaskModal";
import isAuth from "@/components/isAuth";
// import Auth from "../app/pages/login"
function Home() {
  return (
    <div>
      Home Page
    </div>
  );
}


export default isAuth(Home);