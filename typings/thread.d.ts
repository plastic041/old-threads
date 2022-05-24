type Thread = {
  id: string;
  posts: Post[];
  title: string;
};

type Post = {
  id: string;
  number: number;
  body: string;
  created_at: string;
  username: string;
  thread_id: string;
};

// type User = {
//   id: string;
//   joinedAt: string;
// };
