import fs from 'fs'

const actionPath = process.env.GITHUB_ACTION_PATH
const workspace = process.env.GITHUB_WORKSPACE

const sfdxProject = JSON.parse(fs.readFileSync('sfdx-project.json', 'utf-8')) as SfdxProjectDef
const projectDirectories = sfdxProject.packageDirectories.map(dir => dir.path)
for(const projectDirectory of projectDirectories) {
    if(fs.existsSync(`${workspace}/${projectDirectory}`)) {
        fs.renameSync(`${workspace}/${projectDirectory}`, `${actionPath}/${projectDirectory}`)
    }
}