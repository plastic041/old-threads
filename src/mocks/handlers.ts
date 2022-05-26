import { rest } from "msw";

export const handlers = [
  rest.get(`/api/threads`, (req, res, ctx) => {
    const result: {
      name: string;
      id: number;
      Thread: Thread[];
    }[] = [];

    return res(ctx.status(200), ctx.json(result));
  }),

  rest.get(`/api/threads/616`, (req, res, ctx) => {
    const result: {
      id: number;
      posts: Post[];
      title: string;
    } = {
      id: 616,
      posts: [
        {
          id: 1,
          thread_id: 1,
          body: "test post body 1",
          username: "test username 1",
          number: 1,
          created_at: "2020-06-16T00:00:00.000Z",
        },
        {
          id: 2,
          thread_id: 1,
          body: "test post body 2",
          username: "test username 2",
          number: 2,
          created_at: "2020-06-16T00:00:00.000Z",
        },
      ],
      title: "test thread title 1",
    };

    return res(ctx.status(200), ctx.json(result));
  }),
];
