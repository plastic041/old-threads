import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import IdPage from "~/pages/threads/[id]";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("IdPage", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/threads/616");
  });

  it("renders correctly", async () => {
    const view = render(<IdPage />);
    expect(view).toMatchSnapshot();
  });
});
