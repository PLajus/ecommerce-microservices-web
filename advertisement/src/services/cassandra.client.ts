import dse from "dse-driver";

export const client = new dse.Client({
  contactPoints: ["127.0.0.1"],
  keyspace: "ecommerce_microservice",
  localDataCenter: "dc1",
});
