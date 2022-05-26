import { hash } from "~/lib/hash";
import { nanoid } from "nanoid";

export const getIp = async () => {
  const res = await fetch("https://jsonip.com/", {
    mode: "cors",
  });
  const json: { ip: string } = await res.json();
  const ip = json.ip;
  return ip;
};

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
