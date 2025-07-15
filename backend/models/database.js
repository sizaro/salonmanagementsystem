const { Pool } = require("pg");
require("dotenv").config();

let pool;

if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL database (development)"))
    .catch((err) => console.error("❌ DB connection error (development):", err));

  module.exports = {
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
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL database (production)"))
    .catch((err) => console.error("❌ DB connection error (production):", err));

  module.exports = pool;
}
