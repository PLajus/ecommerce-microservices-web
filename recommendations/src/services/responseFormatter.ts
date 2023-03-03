import { QueryResult } from "neo4j-driver";

export default function formatResponse(resultObj: QueryResult) {
  const result: any = [];
  if (resultObj.records.length > 0) {
    resultObj.records.map((record) => {
      result.push(record.length);
    });
  }
  return result;
}
