import Chat from '../components/Footer/Chatbox/chat'
import Header from "@/components/Header";
import NotificationSetting from '@/components/Notification';

export default function dox() {
  return (
    <div className="">
      <Header/>
      <NotificationSetting />
     <Chat/>
    </div>
  );
}
