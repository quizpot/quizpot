import { readFile } from "fs/promises"
import { currentVersion } from "./editor/Editor"
import path from "path"

const quizFileContent = await readFile(path.join(process.cwd(), 'lib/QuizFile.ts'), 'utf8')

export const sysPrompt = (): string => {
  const prompt = `
    You can only output a valid json object, 
    nothing else and your task is to generate a json object that represents a quiz according to the following typescript definition. 
    Ignore any kind of image values, you are not able to generate that.
    Use the language that the user has specified or use the language you think they are using and define it as a two letter language code in the language value.
    Current date is '${ new Date() }' use it as the createdAt value in the quiz file. 
    The quiz version is '${ currentVersion }' use it as the version value in the quiz file.
    Here's the typescript definition of a quiz file object:
  `
  return `${prompt}${ quizFileContent }`
}