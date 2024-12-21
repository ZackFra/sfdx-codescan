"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// `::warning file={name},line={line},endLine={endLine},title={title}::{message}`
const core_1 = __importDefault(require("@actions/core"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
const maxSeverity = parseInt(core_1.default.getInput('max-severity'));
const validSeverities = [0, 1, 2, 3, 4, 5];
if (!validSeverities.includes(maxSeverity)) {
    throw new Error("Invalid max-severity, must be a number between 0 and 5");
}
const codeScanFile = JSON.parse(fs_1.default.readFileSync("codescan.json", "utf8"));
const errors = [];
for (const warning of codeScanFile) {
    errors.push(...(0, utils_1.getMessagesWithSeverities)(warning, maxSeverity));
}
// sort errors by severity, we want the high severity errors to be at the top
errors.sort((a, b) => a.severity - b.severity);
for (const error of errors) {
    console.log(error.message);
}
if (errors[0].severity <= maxSeverity) {
    throw new Error("Max severity exceeded, see logs for details");
}
