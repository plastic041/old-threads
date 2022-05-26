import { hash } from "~/lib/hash";

export const getUsername = (ip: string, thread_id: number) => {
  return hash(`${ip}${thread_id}`, 6);
};
