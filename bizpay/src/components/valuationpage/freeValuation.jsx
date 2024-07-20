import React, { useState, useRef, useMemo, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { GrAttachment, GrRefresh } from 'react-icons/gr';
import { io } from 'socket.io-client';

import { formatDate, getLastElementBySelector } from '../utils';
import styles from './styles.module.scss';

const FreeValuation = () => {
  const socket = useMemo(
    () =>
      io(process.env.NEXT_PUBLIC_SERVER, {
        transports: ['websocket'],
      }),
    []
  );

  const startChatOptions = useMemo(() => [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ]);

  const [botStartTime, setBotTime] = useState(new Date());
  const [chatStarted, setChatStarted] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  const [questionId, setQuestionId] = useState(0);
  const [isInputDisabled, setInputDisabled] = useState(true);
  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const formatQuestionMessage = (data, prevMessages) => {
    switch (data.type) {
      case 'text':
        setOptions([]);
        setInputDisabled(false);
        break;
      case 'option':
        setInputDisabled(true);
        setOptions(data.options);
        break;
      case 'failed':
        let lastMsg = prevMessages.findLast((msg) => msg.from === 'bot');
        return lastMsg
          ? [
              {
                from: 'bot',
                questionId: data.questionId,
                message: data.message,
                createdAt: new Date(),
              },
              { ...lastMsg, createdAt: new Date() },
            ]
          : {
              from: 'bot',
              questionId: data.questionId,
              message: data.message,
              createdAt: new Date(),
            };
      case 'start-valuation':
        let email;
        if (email) {
          socket.emit('initValuationProcess', { email });
          setInputDisabled(true);
          setOptions([]);
          setChatEnded(true);
          return {
            from: 'bot',
            questionId: data.questionId,
            message: data.message,
            createdAt: new Date(),
          };
        } else {
          setOptions([]);
          setInputDisabled(false);
          setQuestionId(998);
          return [
            {
              from: 'bot',
              questionId: data.questionId,
              message: data.message,
              createdAt: new Date(),
            },
            {
              from: 'bot',
              questionId: 998,
              message:
                'Your valuation is ready...!! Please enter your email address to complete your valuation.',
              createdAt: new Date(),
            },
          ];
        }
      case 'end':
        setInputDisabled(true);
        setOptions([]);
        setChatEnded(true);
    }
    setQuestionId(data.questionId);
    return {
      from: 'bot',
      questionId: data.questionId,
      message: data.message,
      createdAt: new Date(),
    };
  };

  const handleStartChat = (option) => {
    setChatStarted(true);
    if (option.value === 'yes') {
      setMessages((prev) =>
        [].concat(prev, {
          from: 'user',
          questionId: 0,
          value: option.value,
          message: option.label,
          createdAt: new Date(),
        })
      );
      socket.emit('joinValuation', {}, (data) => {
        setMessages((prev) => [].concat(prev, formatQuestionMessage(data)));
      });
    } else {
      setMessages((prev) =>
        [].concat(
          prev,
          {
            from: 'user',
            questionId: 0,
            index: 0,
            value: option.value,
            message: option.label,
            createdAt: new Date(),
          },
          {
            from: 'bot',
            questionId: 0,
            index: 0,
            value: 'end',
            message:
              'No problems. Feel free to come back at another time. Take care.',
            createdAt: new Date(),
          }
        )
      );
    }
  };

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    getLastElementBySelector(`#last-bubble`)?.blur();
    getLastElementBySelector(`#last-bubble`)?.focus({
      focusVisible: true,
    });
    getLastElementBySelector(`#user-input-field`)?.focus({
      focusVisible: true,
    });
  }, [options, messages]);

  const userFeedback = (value) => {
    setTextMessage('');
    value = value ?? '';
    if (questionId === 998) {
      setMessages((prev) => {
        return [].concat(prev, {
          from: 'user',
          questionId,
          message: value,
          createdAt: new Date(),
        });
      });
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
          value
        )
      )
        socket.emit('initValuationProcess', { email: value }, () => {
          setInputDisabled(true);
          setOptions([]);
          setChatEnded(true);
        });
      else
        setMessages((prev) =>
          [].concat(prev, {
            from: 'bot',
            questionId,
            message:
              "Please enter a valid email address. Let's try that again...",
            createdAt: new Date(),
          })
        );
    } else {
      socket.emit('answer', { value, questionId }, (data) => {
        if (data?.type !== 'failed')
          setAnswers((prev) => [...prev, { questionId, value }]);
        setMessages((prev) =>
          [].concat(
            prev,
            {
              from: 'user',
              questionId,
              message: value,
              createdAt: new Date(),
            },
            formatQuestionMessage(data, prev)
          )
        );
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      userFeedback(e.target.value);
    }
  };

  const onResetChatButtonClick = () => {
    socket.emit('endValuation', {}, (data) => {
      if (data.done) {
        setBotTime(new Date());
        setMessages([]);
        setAnswers([]);
        setOptions([]);
        setChatStarted(false);
      }
    });
  };

  useEffect(() => {
    socket.on('valuationMessage', (data) => {
      setMessages((prev) =>
        [].concat(
          prev,
          data.messages?.map?.((msg) => ({
            from: 'bot',
            questionId: null,
            message: msg.message,
            createdAt: new Date(),
          })) || []
        )
      );
      setQuestionId(null);
      setOptions([]);
    });
    return () => {
      socket.off('valuationMessage');
    };
  }, []);

  return (
    <div className={styles.webMessenger}>
      <div className={styles.webMessengerHeader}>
        <div className={styles.title}>Get a FREE Online Asset Valuation</div>
        <div className={styles.button}>
          <div
            className={styles.refresh}
            title="Reset conversation"
            onClick={onResetChatButtonClick}
          >
            <GrRefresh />
          </div>
          <div className={styles.close} title="Close conversation">
            <AiOutlineClose />
          </div>
        </div>
      </div>
      <div className={styles.webMessengerMessages}>
        <ul className={styles.messages}>
          <li className={styles.bot} key={`question-${0}`}>
            <div className={styles.timestamp}>{formatDate(botStartTime)}</div>
            <div className={styles.main}>
              <img
                src="https://widget.flowxo.com/icons/vspq2"
                className={styles.icon}
              />
              <div className={styles.bubble}>
                Welcome. To provide an accurate valuation of your asset we need
                to ask you some questions about your asset? Are you ready?
              </div>
            </div>
            {!chatStarted && (
              <div className={styles.choices}>
                {startChatOptions.map((option, _index) => (
                  <div
                    className={styles.choice}
                    key={`option-${_index}`}
                    onClick={() => handleStartChat(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </li>
          {messages.map((message, _index) => {
            return (
              <li
                className={message.from === 'bot' ? styles.bot : styles.user}
                key={`message-${_index}`}
              >
                <div className={styles.timestamp}>
                  {formatDate(message.createdAt)}
                </div>
                <div className={styles.main}>
                  {message.from === 'bot' && (
                    <img
                      src="https://widget.flowxo.com/icons/vspq2"
                      className={styles.icon}
                    />
                  )}
                  <div className={styles.bubble} tabIndex={-1}>
                    {message.message}
                  </div>
                </div>
              </li>
            );
          })}
          {options.length ? (
            <li className={styles.bot}>
              <div className={styles.choices}>
                {options.map((option, _index) => (
                  <div
                    className={styles.choice}
                    key={`option-${_index}`}
                    onClick={() => userFeedback(option.value)}
                    tabIndex={-1}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </li>
          ) : (
            ''
          )}
          {/* {responseTimeout ? "You didn't answer, so I'll go away for now." : ""} */}
        </ul>
        <div tabIndex={-1} id="last-bubble"></div>
      </div>
      <div className={styles.webMessengerFooter}>
        <input
          id="user-input-field"
          type="text"
          disabled={isInputDisabled}
          className={styles.textField}
          placeholder="Type your message..."
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value || '')}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.button}>
          <div
            className={styles.attachment}
            title="Attachment"
            onClick={onButtonClick}
          >
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: 'none' }}
            />
            <GrAttachment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeValuation;
