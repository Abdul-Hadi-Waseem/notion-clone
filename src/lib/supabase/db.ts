import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as dotenv from "dotenv"
import * as schema from "../../../migrations/schema"
import { migrate } from "drizzle-orm/postgres-js/migrator"
dotenv.config({ path: ".env" })
if (!process.env.DATABASE_URL) {
  console.log("No db url")
}
const client = postgres(process.env.DATABASE_URL as string, { max: 1 })
// console.log("Hello World")
const db = drizzle(client, { schema })
const migrateDb = async () => {
  console.log("🟠Migrating Client")
  try {
    await migrate(db, {
      migrationsFolder: "migrations",
    })
    console.log("🟢Client Migrated Successfully")
  } catch (e) {
    console.log("🔴Client Migration Failed")
  }
}
migrateDb()
export default db
