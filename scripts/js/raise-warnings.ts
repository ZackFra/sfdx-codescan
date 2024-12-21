// `::warning file={name},line={line},endLine={endLine},title={title}::{message}`
import core from '@actions/core'
import fs from 'fs'
import { getMessagesWithSeverities } from './utils'
const maxSeverity = parseInt(core.getInput('max-severity'));

if(![0, 1, 2, 3, 4, 5].includes(maxSeverity)) {
  throw new Error("Invalid max-severity, must be a number between 0 and 5");
}

const codeScanFile = JSON.parse(fs.readFileSync("codescan.json", "utf8"));
const errors: MessageWithSeverity[] = [];

for (const warning of codeScanFile) {
  errors.push(...getMessagesWithSeverities(warning, maxSeverity));
}

// sort errors by severity, we want the high severity errors to be at the top
errors.sort((a, b) => a.severity - b.severity);

for (const error of errors) {
  console.log(error.message);
}

if(errors[0].severity <= maxSeverity) {
  throw new Error("Code scan failed with errors");
}