import Image from "next/image";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";
import NFTItem from "@/components/NFTItem";


export default function valuation() {
  return (
    <div className="">
      <Header/>
     <NFTItem />
     <Chat/>
    </div>
  );
}
