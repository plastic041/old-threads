import { hash } from "~/lib/hash";
import { nanoid } from "nanoid";

export const getUserId = () => {
  const localUserId = localStorage.getItem("userId");
  if (localUserId) {
    return localUserId;
  }
  const userId = nanoid();
  localStorage.setItem("userId", userId);
  return userId;
};

export const getUsername = (ip: string, thread_id: number) => {
  return hash(`${ip}${thread_id}`, 6);
};
