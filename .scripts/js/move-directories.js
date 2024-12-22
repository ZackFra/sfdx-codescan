"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const actionPath = process.env.GITHUB_ACTION_PATH;
const workspace = process.env.GITHUB_WORKSPACE;
const sfdxProject = JSON.parse(fs_1.default.readFileSync('sfdx-project.json', 'utf-8'));
const projectDirectories = sfdxProject.packageDirectories.map(dir => dir.path);
for (const projectDirectory of projectDirectories) {
    if (fs_1.default.existsSync(`${workspace}/${projectDirectory}`)) {
        fs_1.default.renameSync(`${workspace}/${projectDirectory}`, `${actionPath}/${projectDirectory}`);
    }
}
