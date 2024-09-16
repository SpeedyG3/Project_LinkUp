import { Input, InputGroup, InputRightElement, Toast } from '@chakra-ui/react';
import { useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import useShowToast from '../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedConversationAtom } from '../atoms/messagesAtom';

const MessageInput = ({setMessages}) => {
  const [messageText, setMessageText] = useState("");
  const toast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const setSelectedConversation = useRecoilState(selectedConversationAtom);

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if(!messageText){
      return;
    }

    try{
      const res = await fetch("api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
        }),
      });
      const data = res.json();

      if(data.error){
        toast("Error", data.error, "error");
        return;
      }
      setMessages((prevMessages) => [...prevMessages, data]);

      setSelectedConversation((prev) => {
        const updatedConversation = prev.map(conversation => {
          if(conversation._id === selectedConversation._id){
            return {
              ...conversation,
              lastMessage: messageText,
              sender: data.sender,
            }
          }
          return conversation; //else case return the conversation as it is
        })
        return updatedConversation;
      });
      setMessageText("");

    }catch(error){
      toast("Error", error.message, "error");
    }
  }
  return (
    <form onSubmit={handleSendMessage}>
        <InputGroup>
            <Input 
            w={"full"}
            placeholder='type a msg'
            onChange={(e) => setMessageText(e.target.value)} 
            value={messageText} />
            <InputRightElement onClick={handleSendMessage}
            cursor={"pointer"}>
                <IoSendSharp />
            </InputRightElement>
        </InputGroup>
    </form>
  )
}

export default MessageInput;