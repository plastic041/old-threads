import type { NextApiRequest, NextApiResponse } from "next";
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
            thread_id: string;
            body: string;
            username: string;
          } = req.body;

          const { data: thread, error: threadError } = await supabase
            .from<{ Post: { thread_id: number }[] }>("Thread")
            .select("Post(thread_id)")
            .limit(1)
            .single();

          if (threadError) return res.status(500).json({ threadError });

          const { data: post, error: postError } = await supabase
            .from<Post>("Post")
            .insert({ ...body, number: thread.Post.length + 1 });

          if (postError) return res.status(500).json({ postError });

          res.status(201).json({
            post,
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
