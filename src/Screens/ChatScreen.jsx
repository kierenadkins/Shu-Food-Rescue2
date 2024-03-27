import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { getFirestore, collection, addDoc, orderBy, query, onSnapshot, where } from "firebase/firestore";
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { useRoute } from '@react-navigation/native';
import { list } from 'firebase/storage';

export default function ChatScreen () {
  const [messages, setMessages] = useState([]);
  const { user: userAccount, isLoading } = useUser(); // Renamed user to userAccount to avoid confusion
  const { params } = useRoute();
  const listingId = params.listingId;

  const db = getFirestore(app);

  useEffect(() => {
    if (!isLoading && userAccount) {
      fetchMessages();
      console.log(listingId);
    }
  }, [userAccount, isLoading]);

  const fetchMessages = async () => {
    try {
      const collectionRef = collection(db, 'chats');
      const q = query(collectionRef, orderBy('createdAt', 'desc'), where("listingId", "==", listingId ));

      const unsubscribe = onSnapshot(q, querySnapshot => {
        const fetchedMessages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          if (data && typeof data === 'object') {
            return {
              _id: doc.id,
              createdAt: data.createdAt.toDate(),
              text: data.text,
              user: data.user
            };
          } else {
            console.error("Invalid data format:", data);
            return null;
          }
        }).filter(message => message !== null);

        setMessages(fetchedMessages);
      });

      return unsubscribe; // Return unsubscribe function for cleanup
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const onSend = useCallback(async (newMessages = []) => {
    const newMessage = newMessages[0];
    try {
      await addDoc(collection(db, 'chats'), {
        createdAt: newMessage.createdAt,
        text: newMessage.text,
        user: newMessage.user,
        listingId: listingId,
      });
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages)
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [db]);

  return (
    <GiftedChat
      messages={messages}
      placeholder= "Send A Message"
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
      onSend={onSend}
      messagesContainerStyle={{ backgroundColor: '#fff' }}
      textInputStyle={{ backgroundColor: '#fff', borderRadius: 20 }}
      user={{ _id: userAccount ? userAccount.id : '', avatar: userAccount.imageUrl }} 
    />
  );
}
