"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// `::warning file={name},line={line},endLine={endLine},title={title}::{message}`
const core = __importStar(require("@actions/core"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
const maxSeverity = Number(core.getInput('max-severity'));
console.log(`Max severity: ${core.getInput('max-severity')}, ${maxSeverity}`);
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
if (errors.length && errors[0].severity <= maxSeverity) {
    throw new Error("Max severity exceeded, see logs for details");
}
