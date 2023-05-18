import fs from "node:fs";
import { buildSchema } from 'graphql';

const TOTAL_SCHEMAS = 1;

console.assert(TOTAL_SCHEMAS === 1, `[INFO] Exhaustive handling of schemas, total: ${TOTAL_SCHEMAS}`)

const userSchema = fs.readFileSync("./user.graphql", "utf8");

export default buildSchema(`${userSchema}`)
