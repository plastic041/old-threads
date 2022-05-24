type Thread = {
  id: string;
  title: string;
  category_id: string;
  created_at: string;
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
