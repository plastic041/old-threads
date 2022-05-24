import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchData, updateData } from "~/lib/data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve) => {
    const { id } = req.query as { id: string };

    switch (req.method) {
      case "GET": {
        fetchData().then((data) => {
          const thread = data.threads.find((t) => t.id === id);
          res.status(200).json(thread);
          resolve();
        });
        break;
      }
      case "POST": {
        fetchData().then((data) => {
          const body = req.body;
          const length = data.threads.find((thread) => thread.id === id)?.posts
            .length;
          const newNumber = length ? length + 1 : 1;
          data.threads
            .find((thread) => thread.id === id)
            ?.posts.push({
              body: body.body,
              createdAt: new Date().toISOString(),
              id: nanoid(),
              number: newNumber,
              userId: nanoid(),
            });
          updateData(data);
          res.status(200).json({ status: "success" });
          resolve();
        });
        break;
      }
      default:
        res
          .status(405)
          .json({ status: "Only GET and POST requests are allowed." });
        resolve();
        break;
    }
  });
};

export default handler;
