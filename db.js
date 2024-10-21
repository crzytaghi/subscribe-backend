import pg from "pg";

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "andrewtaghi",
  password: "postgres",
  database: "subscribe",
});

export default pool;
