import fs from 'fs'

const workflowDir = process.argv[2]

const sfdxProject = JSON.parse(fs.readFileSync('sfdx-project.json', 'utf-8')) as SfdxProjectDef
const projectDirectories = sfdxProject.packageDirectories.map(dir => dir.path)
const currentDir = process.cwd()
for(const projectDirectory of projectDirectories) {
    if(fs.existsSync(`${currentDir}/${projectDirectory}`)) {
        fs.renameSync(`${currentDir}/${projectDirectory}`, `${currentDir}/${workflowDir}/${projectDirectory}`)
    }
}