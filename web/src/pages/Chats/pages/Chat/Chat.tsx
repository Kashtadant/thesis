import { useState, useEffect, useMemo, useRef } from "react";

import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";

import { IRoom, getRoom, getRooms } from "../../../../modules/features/rooms";
import { IMessage, getMessages } from "../../../../modules/features/messages";
import { IUser } from "../../../../modules/features/users";

import { ChatDrawer } from "./components/ChatDrawer";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessage } from "./components/ChatMessage";
import { ChatMessages } from "./components/ChatMessages";
import { ChatTextarea } from "./components/ChatTextarea";
import { ChatVote } from "./components/ChatVote";
import { ChatText } from "./components/ChatText";
import { ChatVoteResult } from "./components/ChatVoteResult";

interface IChatProps {
  user: IUser;
}

export const Chat = ({ user }: IChatProps) => {
  const { id } = useParams<{ id: string }>();
  const isBottom = useRef(false);

  const [room, setRoom] = useState<IRoom | null>(null);
  const [isRoomFetching, setRoomFetching] = useState(true);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [isRoomsFetching, setRoomsFetching] = useState(true);

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const onScroll = () => {
      isBottom.current =
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1;
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (isBottom.current) {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (id) {
      setRoomFetching(true);
      setRoomFetching(true);

      Promise.all([getRoom(+id), getRooms()]).then(([room, rooms]) => {
        setRoom(room);
        setRooms(rooms);
        setRoomFetching(false);
        setRoomsFetching(false);
      });

      getMessages(+id).then((data) => {
        setMessages(data);
      });
    }
  }, [id]);

  const usersMap = useMemo(() => {
    if (!room) {
      return {} as Record<number, IUser>;
    }
    return room.members.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<number, IUser>);
  }, [room]);

  const onCreateMessage = (message: IMessage) => {
    setMessages((prevMessages) => prevMessages.concat(message));
  };

  const onVote = (message: IMessage) => {
    setMessages((prevMessages) => {
      const v = prevMessages.slice();
      const i = prevMessages.findIndex((m) => m.id === message.id);
      v[i] = message;
      return v;
    });
  };

  if (isRoomFetching || isRoomsFetching || !room) {
    return null;
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "256px 1fr" }}>
      <ChatDrawer room={room} user={user} />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatHeader room={room} rooms={rooms} />
        <ChatMessages>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              user={usersMap[message.user_id]}
            >
              {message.type === "message" && (
                <ChatText>{message.text}</ChatText>
              )}
              {message.type === "poll" && (
                <ChatVote message={message} user={user} onVote={onVote} />
              )}
            </ChatMessage>
          ))}
          <ChatMessage message={{} as any} user={user}>
            <ChatVoteResult />
          </ChatMessage>
        </ChatMessages>
        <ChatTextarea
          room={room}
          user={user}
          onCreateMessage={onCreateMessage}
        />
      </Box>
    </Box>
  );
};
