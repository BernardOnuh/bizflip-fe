import Image from "next/image";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";
import HowToUsePage from "@/components/HowToUse";



export default function valuation() {
  return (
    <div className="">
      <Header/>
     <HowToUsePage/>
     <Chat/>
    </div>
  );
}
