import cassandra from "cassandra-driver";

export const client = new cassandra.Client({
  contactPoints: [process.env.CONTACT_POINT!],
  keyspace: process.env.KEYSPACE,
  localDataCenter: process.env.LOCALDATACENTER,
  credentials: { username: "cassandra", password: "cassandra" },
});
