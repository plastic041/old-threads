type Thread = {
  id: string;
  posts: Post[];
  title: string;
};

type Post = {
  id: string;
  number: number;
  user: User;
  body: string;
  createdAt: string;
};

type User = {
  id: string;
  joinedAt: string;
};
