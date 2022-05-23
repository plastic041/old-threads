import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

class Data {
  static user(): User {
    return {
      id: nanoid(),
      joinedAt: faker.date.recent().toISOString(),
    };
  }

  static post(number: number): Post {
    return {
      id: nanoid(),
      number,
      user: Data.user(),
      body: faker.lorem.paragraph(),
      createdAt: faker.date.recent().toISOString(),
    };
  }

  static thread(length: number): Thread {
    const posts = Array.from({ length }, (_, i) => Data.post(i + 1));
    return {
      id: nanoid(),
      posts,
      title: faker.lorem.sentence(),
    };
  }
}

export default Data;
