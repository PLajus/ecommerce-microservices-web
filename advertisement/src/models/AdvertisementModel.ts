export default {
  fields: {
    id: {
      type: "uuid",
      default: { $db_function: "uuid()" },
    },
    name: { type: "varchar", default: "no name provided" },
    description: { type: "varchar", default: "no description provided" },
    created: {
      type: "timestamp",
      default: { $db_function: "toTimestamp(now())" },
    },
    expires: {
      type: "timestamp",
      default: { $db_function: "toTimestamp(now())" },
    },
    shownCount: "int",
  },
  key: ["id"],
};
