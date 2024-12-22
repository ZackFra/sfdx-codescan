"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const workflowDir = process.argv[2];
const sfdxProject = JSON.parse(fs_1.default.readFileSync('sfdx-project.json', 'utf-8'));
const projectDirectories = sfdxProject.packageDirectories.map(dir => dir.path);
const currentDir = process.cwd();
for (const projectDirectory of projectDirectories) {
    if (fs_1.default.existsSync(`${currentDir}/${projectDirectory}`)) {
        fs_1.default.renameSync(`${currentDir}/${projectDirectory}`, `${currentDir}/${workflowDir}/${projectDirectory}`);
    }
}
