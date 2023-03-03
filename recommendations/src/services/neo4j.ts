import neo4j from "neo4j-driver";

export var driver = neo4j.driver(
  process.env.DB_CONNECTION,
  neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASS),
  { maxConnectionLifetime: 3 * 60 * 60 * 1000 } // 3 hours
);
console.log("Connected to neo4j");
