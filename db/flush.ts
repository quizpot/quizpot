import { is, sql } from "drizzle-orm";
import { db } from ".";
import * as schema from "./schema";
import { getTableConfig, PgTable } from "drizzle-orm/pg-core";

const main = async () => {
  const tables = Object.values(schema).filter((table) => is(table, PgTable));

  console.log(`Cleaning ${tables.length} tables...`);

  for (const table of tables) {
    const { name } = getTableConfig(table as PgTable);
    console.log(`Cleaning table: ${name}`);
    
    await db.execute(sql.raw(`DROP TABLE IF EXISTS "${name}" CASCADE`));
  }

  console.log("Flushed!");
  process.exit(0);
};

main();