import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose, AiOutlineMessage } from 'react-icons/ai';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

Modal.setAppElement('#__next');

const Chat = () => {
  const [messagesList, setMessagesList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const tmp = messagesList[messagesList.length - 1];
      if (tmp && tmp.author === 'me') {
        let res = await simulateGetChats(tmp.message);
        _sendMessage(res.data);
      }
    }
    fetchData();
  }, [messagesList]);

  const simulateGetChats = async (text) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: `Response to "${text}"` });
      }, 1000);
    });
  };

  const _onMessageWasSent = (message) => {
    setMessagesList([...messagesList, { message, direction: 'outgoing', author: 'me' }]);
  };

  const _sendMessage = (text) => {
    if (text.length > 0) {
      setMessagesList([
        ...messagesList,
        { message: text, direction: 'incoming', author: 'them' },
      ]);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      {!modalIsOpen && (
        <div className="chat-icon" onClick={openModal}>
          <AiOutlineMessage size={30} />
        </div>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Chat Modal" className="chat-modal">
        <div className="chat-close-icon" onClick={closeModal}>
          <AiOutlineClose size={30} />
        </div>
        <div style={{ height: '500px', width: '400px', position: 'relative' }}>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messagesList.map((msg, i) => (
                  <Message
                    key={i}
                    model={{
                      message: msg.message,
                      sentTime: 'just now',
                      sender: msg.author,
                      direction: msg.direction,
                    }}
                  />
                ))}
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={_onMessageWasSent} />
            </ChatContainer>
          </MainContainer>
        </div>
      </Modal>
      <style jsx>{`
        .chat-icon {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          cursor: pointer;
          background-color: #007bff;
          color: #fff;
          border-radius: 50%;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-modal {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          background-color: white;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .chat-close-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          color: #000;
           z-index: 1001;
        }
      `}</style>
    </div>
  );
};

export default Chat;
