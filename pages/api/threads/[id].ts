import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { updateData } from "~/lib/data";
import supabase from "~/lib/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise<void>((resolve) => {
    const { id } = req.query as { id: string };

    switch (req.method) {
      case "GET": {
        const get = async () => {
          const { data: thread, error: threadError } = await supabase
            .from<Thread>("Thread")
            .select("title")
            .eq("id", id)
            .limit(1)
            .single();

          if (threadError) return res.status(500).json({ threadError });

          const { data: posts, error: postsError } = await supabase
            .from<Post>("Post")
            .select("*")
            .eq("thread_id", id);

          if (postsError) return res.status(500).json({ postsError });

          const postsSorted = posts.sort((a, b) => {
            if (a.created_at < b.created_at) return 1;
            if (a.created_at > b.created_at) return -1;
            return 0;
          });

          res.status(200).json({
            id,
            posts: postsSorted,
            title: thread.title,
          });
          resolve();
        };
        get();
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
