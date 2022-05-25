import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "~/lib/supabase";
import { makeUsername } from "~/lib/username";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise<void>((resolve, reject) => {
    switch (req.method) {
      case "GET": {
        const get = async () => {
          // const { data: threads, error: threadsError } = await supabase
          //   .from("Thread")
          //   .select("*");
          // if (threadsError) return res.status(500).json({ error: threadsError });
          const { data: category, error: categoryError } = await supabase
            .from("Category")
            .select("name, id, Thread(id, title)");

          if (categoryError) {
            res.status(500).json({ error: categoryError });
            reject(categoryError);
          }

          res.status(200).json(category);
          resolve();
        };
        get();
        break;
      }
      case "POST": {
        const post = async () => {
          const body = req.body as {
            title: string;
            body: string;
            username: string;
          };
          const { data: thread, error: threadError } = await supabase
            .from<Thread>("Thread")
            .insert({
              title: body.title,
              category_id: 1,
            })
            .limit(1)
            .single();

          if (threadError) return res.status(500).json({ error: threadError });

          const { error: postError } = await supabase
            .from<Post>("Post")
            .insert({
              thread_id: thread.id,
              body: body.body,
              username: makeUsername(body.username, thread.id),
              number: 1,
            });

          if (postError) return res.status(500).json({ error: postError });

          res.status(201).json(thread);
          resolve();
        };
        post();
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
