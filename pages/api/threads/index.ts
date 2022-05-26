import type { NextApiRequest, NextApiResponse } from "next";
import { getIp } from "~/lib/ip";
import supabase from "~/lib/supabase";
import { getUsername } from "~/lib/username";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise<void>((resolve, reject) => {
    switch (req.method) {
      case "GET": {
        const get = async () => {
          const { data: category, error: categoryError } = await supabase
            .from("Category")
            .select("name, id, Thread(*)");

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
            category: number;
          };
          const { data: thread, error: threadError } = await supabase
            .from<Thread>("Thread")
            .insert({
              title: body.title,
              category_id: body.category,
            })
            .limit(1)
            .single();

          if (threadError) return res.status(500).json({ error: threadError });

          const ip = getIp(req);
          const { error: postError } = await supabase
            .from<Post>("Post")
            .insert({
              thread_id: thread.id,
              body: body.body,
              username: getUsername(ip, thread.id),
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
