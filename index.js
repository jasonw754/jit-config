const fs = require('fs')
const yaml = require('js-yaml')
const inquirer = require('inquirer')

async function jitConfig(configFile, desiredConfig) {

  try {
    let contents = fs.readFileSync(configFile)
  } catch (e) {
    if (process.env.NODE_ENV === "production") {
      throw e
    }
    fs.writeFileSync(configFile, yaml.dump({ test: true }))
  }

  if (desiredConfig) { 
    return promptForConfig(desiredConfig)
  }
  return undefined
}

async function promptForConfig(desiredConfig) {
  let config = await inquirer.prompt(Object.keys(desiredConfig).map(key => ({
      type: 'input',
      name: key,
      message: 'Fill in a value'
    })
  ))
  return config
}

module.exports = jitConfig