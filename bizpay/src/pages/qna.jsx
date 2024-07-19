import Image from "next/image";
import { Inter } from "next/font/google";
import Qna from "@/components/Qna";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });

export default function qna() {
  return (
    <div className="">
      <Header/>
     <Qna/>
     <Chat/>
    </div>
  );
}
