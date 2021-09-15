const fs = require('fs')
const yaml = require('js-yaml')

function jitConfig(configFile) {

  try {
    let contents = fs.readFileSync(configFile)
  } catch (e) {
    if (process.env.NODE_ENV === "production") {
      throw e
    }
    fs.writeFileSync(configFile, yaml.dump({ test: true }))
  }
  console.log("got here")
  return {}
}

module.exports = jitConfig