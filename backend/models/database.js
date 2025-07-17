import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

let pool;

if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  console.log("✅ Connected to PostgreSQL database (development)");
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  console.log("✅ Connected to PostgreSQL database (production)");
}

pool.connect().catch((err) => console.error("❌ DB connection error:", err));

const db = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      console.log("executed query", { text });
      return res;
    } catch (error) {
      console.error("error in query", { text });
      throw error;
    }
  },
};

export default db;
