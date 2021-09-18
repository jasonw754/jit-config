const chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const sinon = require('sinon')

const mockInquirer = require('mock-inquirer')

const fs = require('fs')
const readline = require('readline')

describe("jit-config", function () {
  afterEach(function deleteGeneratedFile() {
    try {
      fs.unlinkSync("config.yml")
    } catch (e) {}
    process.env.NODE_ENV = "development"
    sinon.restore()
  })

  it("should create a config file if none is found", function () {
    const jitConfig = require("../index")

    // initialize with the desired name of the config file
    jitConfig("config.yml")
    
    expect(() => { fs.statSync("config.yml") }).not.to.throw()
  })

  it("should fail in production if config file is not found", function () {
    process.env.NODE_ENV = "production"
    const jitConfig = require("../index")

    // initialize with a config file that isn't there
    expect(jitConfig("config.yml")).to.be.rejected
  })

  it("should prompt for a value for a desired config var", function (done) {
    const jitConfig = require("../index")

    let result = {
      configParam1: 'answer for param 1'
    }
    let reset = mockInquirer([result])

    let config = jitConfig("config.yml", {
      configParam1: "Config parameter 1"
    })
    
    expect(config).to.eventually.deep.equal(result).notify(done)
    
    reset()
  })

})