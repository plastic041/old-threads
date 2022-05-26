import { NextApiRequest } from "next";

export const getIp = (req: NextApiRequest) => {
  const x_forwarded_for = req.headers["x-forwarded-for"] as string | undefined;
  const ip =
    x_forwarded_for?.split(",").pop() || req.socket.remoteAddress || "";
  return ip;
};
