import { db } from ".";
import { users } from "./schema";

const main = async () => {
  await db.insert(users).values([
    { 
      color: "#ff9900",
      email: "kragleh@gmail.com",
      nickname: "Daniel Kragleh",
      username: "kragleh",
      pwHash: "$2a$12$xPoA2eOROWeCRQ/JU1w1qOG0k/OdIxqQsnzGR0bATdRV5sNVX2dQu",
      icon: "star",
      isAdmin: true,
    }
  ]);

  console.log("Seeded!");
  process.exit(0);
};

main();