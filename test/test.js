const should = require('should')
const fs = require('fs')

describe("jit-config", function () {
  afterEach(function deleteGeneratedFile() {
    try {
      fs.unlinkSync("config.yml")
    } catch (e) {}
    process.env.NODE_ENV = "development"
  })

  it("should create a config file if none is found", function () {
    const jitConfig = require("../index")

    // initialize with the desired name of the config file
    jitConfig("config.yml")
    
    fs.statSync("config.yml").should.not.throw()
  })

  it("should fail in production if config file is not found", function () {
    process.env.NODE_ENV = "production"
    const jitConfig = require("../index")

    // initialize with a config file that isn't there
    should(() => { jitConfig("config.yml") }).throw()
  })

})