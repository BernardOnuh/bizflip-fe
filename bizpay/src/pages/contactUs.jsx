import Image from "next/image";
import { Inter } from "next/font/google";
import ContactUsPage from "@/components/contactus";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";


export default function dox() {
  return (
    <div className="">
      <Header/>
     <ContactUsPage/>
     <Chat/>
    </div>
  );
}
