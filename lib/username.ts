import { hash } from "~/lib/hash";
import { nanoid } from "nanoid";

export const getUsername = () => {
  const localUserId = localStorage.getItem("userId");
  if (localUserId) {
    return localUserId;
  }
  const userId = nanoid();
  localStorage.setItem("userId", userId);
  return userId;
};

export const makeUsername = (userId: string, tid: number): string => {
  return hash(`${userId}${tid}`, 8);
};
