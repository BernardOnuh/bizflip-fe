import Image from "next/image";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";
import BrokerPage from "@/components/Broker-Page";



export default function valuation() {
  return (
    <div className="">
      <Header/>
     <BrokerPage/>
     <Chat/>
    </div>
  );
}
