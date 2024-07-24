import Image from "next/image";
import ValuationPage from "@/components/valuationpage";
import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";
//import NFTSwipe from "@/components/nftswipe";
//import NFTSwipe from "@/components/nftswipes";
import NFTSwipe from "@/components/TinderSwipe";



export default function valuation() {
  return (
    <div className="">
      <Header/>
     <NFTSwipe />
     <Chat/>
    </div>
  );
}
