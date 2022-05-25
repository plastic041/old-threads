import PostContainer from "~/components/thread/post/post";
import { render, screen } from "@testing-library/react";

describe("PostContainer", () => {
  it("renders correctly", () => {
    const post = {
      id: 1,
      thread_id: 1,
      number: 1,
      username: "username",
      body: "body",
      created_at: "2020-01-01T00:00:00.000Z",
    };
    const view = render(<PostContainer post={post} />);
    expect(view).toMatchSnapshot();
  });
});
