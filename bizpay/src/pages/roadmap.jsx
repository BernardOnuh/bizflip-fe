import Image from "next/image";
import RoadmapPage from "@/components/Roadmap";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";


export default function dox() {
  return (
    <div className="">
      <Header/>
     <RoadmapPage />
     <Chat/>
    </div>
  );
}
