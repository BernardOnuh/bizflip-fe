import Image from "next/image";
import { Inter } from "next/font/google";
import ExploreAllPage from "@/components/Explore";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";


export default function dox() {
  return (
    <div className="">
      <Header/>
     <ExploreAllPage/>
     <Chat/>
    </div>
  );
}
