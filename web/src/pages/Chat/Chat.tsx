import Box from "@mui/material/Box";

import { ChatDrawer } from "./components/ChatDrawer";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessage } from "./components/ChatMessage";
import { ChatMessages } from "./components/ChatMessages";
import { ChatTextarea } from "./components/ChatTextarea";
import { ChatVote } from "./components/ChatVote";
import { ChatText } from "./components/ChatText";

const messages: number[] = [];

for (let i = 0; i < 100; i++) {
  messages.push(i);
}

export const Chat = () => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "256px 1fr" }}>
      <ChatDrawer />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatHeader />
        <ChatMessages>
          {messages.map((i) => (
            <ChatMessage key={i}>
              <ChatText>Сообщение {i}</ChatText>
              {i === 0 && <ChatVote status="new" />}
              {i === 2 && <ChatVote status="finished" />}
              {i === 4 && <ChatVote status="result" />}
            </ChatMessage>
          ))}
        </ChatMessages>
        <ChatTextarea />
      </Box>
    </Box>
  );
};
