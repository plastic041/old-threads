type Thread = {
  id: string;
  posts: Post[];
  title: string;
};

type Post = {
  id: string;
  number: number;
  body: string;
  createdAt: string;
  userId: string;
};

// type User = {
//   id: string;
//   joinedAt: string;
// };
