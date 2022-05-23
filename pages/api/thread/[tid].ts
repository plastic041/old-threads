import faker from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";
import Data from "~/lib/data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { tid } = req.query as { tid: string };

  faker.seed(tid.length);
  res.status(200).json(Data.thread(100));
};

export default handler;
