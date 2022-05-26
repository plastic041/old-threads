import type { NextApiRequest, NextApiResponse } from "next";
import { getIp } from "~/lib/ip";
import supabase from "~/lib/supabase";
import { getUsername } from "~/lib/username";

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
            if (a.number < b.number) return -1;
            if (a.number > b.number) return 1;
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
        const post = async () => {
          const body: {
            thread_id: number;
            body: string;
          } = req.body;
          const ip = getIp(req);
          const username = getUsername(ip, body.thread_id);

          const { data: thread, error: threadError } = await supabase
            .from<
              Thread & {
                Post: { thread_id: number }[];
              }
            >("Thread")
            .select("title, category_id, Post(thread_id)")
            .eq("id", body.thread_id)
            .limit(1)
            .single();

          if (threadError) return res.status(500).json({ threadError });

          // 포스트 생성
          const { data: post, error: postError } = await supabase
            .from<Post>("Post")
            .insert({
              ...body,
              username,
              number: thread.Post.length + 1,
            });

          if (postError) return res.status(500).json({ postError });

          res.status(201).json({
            id: body.thread_id,
            title: thread.title,
            category_id: thread.category_id,
            created_at: thread.created_at,
            posts: post,
          });
          resolve();
        };
        post();
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
