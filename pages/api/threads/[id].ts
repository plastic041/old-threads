import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchData, updateData } from "~/lib/data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };
  const body = req.body;

  if (req.method === "POST") {
    const post = async () => {
      const data = await fetchData();
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
    };
    post();
  }
};

export default handler;
