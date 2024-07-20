import Image from "next/image";
import { Inter } from "next/font/google";
import AboutPage from "@/components/About";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";


export default function dox() {
  return (
    <div className="">
      <Header/>
     <AboutPage/>
     <Chat/>
    </div>
  );
}
