import Image from "next/image";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";
import PaintBoard from "@/components/PaintBoard";


export default function sell() {
  return (
    <div className="">
      <Header/>
     <PaintBoard/>
     <Chat/>
    </div>
  );
}
