import { hash } from "~/lib/hash";
import { nanoid } from "nanoid";

export const getUsername = (tid: string): string => {
  const localUserId = localStorage.getItem("userId");
  if (localUserId) {
    return hash(`${localUserId}${tid}`, 8);
  }
  const userId = nanoid();
  localStorage.setItem("userId", userId);
  return hash(`${userId}${tid}`, 8);
};
