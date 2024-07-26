import Image from "next/image";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";
import BrochurePage from "@/components/brochurepage";



export default function valuation() {
  return (
    <div className="">
      <Header/>
     <BrochurePage/>
     <Chat/>
    </div>
  );
}
