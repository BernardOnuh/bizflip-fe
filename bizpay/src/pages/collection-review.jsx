import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";
import AccountDetails from "@/components/AccountDetails";
import CollectionCreate from '@/components/Review';

export default function dox() {
  return (
    <div className="">
      <Header/>
      <CollectionCreate/>
     <Chat/>
    </div>
  );
}
