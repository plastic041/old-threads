import Data from "~/lib/data";
import { writeFile } from "fs/promises";

export const write = async () => {
  const data = {
    threads: Array.from({ length: 10 }, () => Data.thread(100)),
  };

  await writeFile("./resources/data.json", JSON.stringify(data, null, 2));
};
