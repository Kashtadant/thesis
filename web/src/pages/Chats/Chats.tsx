import { useState, useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { useSession } from "../../modules/features/session";
import { IRoom, getRooms } from "../../modules/features/rooms";
import { IUser, getCurrentUser } from "../../modules/features/users";

import { Chat } from "./pages/Chat";
import { ChatForm } from "./pages/ChatForm";
import { ChatUsers } from "./pages/ChatUsers";

export const Chats = () => {
  const { session } = useSession();

  const [user, setUser] = useState<IUser | null>(null);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    if (session) {
      Promise.all([getCurrentUser(), getRooms()]).then(([user, rooms]) => {
        setUser(user);
        setRooms(rooms);
        setFetching(false);
      });
    }
  }, [session]);

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  if (isFetching || !user) {
    return null;
  }

  return (
    <Routes>
      <Route path="new" element={<ChatForm user={user} />} />
      <Route path=":id/users" element={<ChatUsers user={user} />} />
      <Route path=":id" element={<Chat user={user} />} />
      <Route
        path=""
        element={
          <Navigate to={rooms.length ? `${rooms[0].id}` : "new"} replace />
        }
      />
    </Routes>
  );
};
