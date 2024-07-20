import Image from "next/image";
import ValuationPage from "@/components/valuationpage";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";


export default function valuation() {
  return (
    <div className="">
      <Header/>
     <ValuationPage/>
     <Chat/>
    </div>
  );
}
