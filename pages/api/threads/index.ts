import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "~/lib/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise<void>((resolve) => {
    switch (req.method) {
      case "GET": {
        const get = async () => {
          const { data: threads, error } = await supabase
            .from("Thread")
            .select("*");

          if (error) return res.status(500).json({ error });

          res.status(200).json(threads);
          resolve();
        };
        get();
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
