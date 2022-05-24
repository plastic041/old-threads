import type { NextApiRequest, NextApiResponse } from "next";
import { fetchData } from "~/lib/data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve) => {
    switch (req.method) {
      case "GET": {
        fetchData().then((data) => {
          const threads = data.threads.map((thread) => ({
            createdAt: thread.posts[0].createdAt,
            title: thread.title,
            id: thread.id,
          }));
          res.status(200).json(threads);
          res.end();
          resolve();
        });
        break;
      }
      default:
        res.status(405).json({ status: "Only GET requests are allowed." });
        res.end();
        resolve();
        break;
    }
  });
};

export default handler;
