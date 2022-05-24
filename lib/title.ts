import cjkSlugify from "cjk-slug";

export const makeTitle = (thread: Thread) => {
  const titleShorten = thread.title.slice(0, 20);
  const titleEncoded = cjkSlugify(titleShorten);
  const id = thread.id.slice(0, 8);
  return `${titleEncoded}_${id}`;
};
