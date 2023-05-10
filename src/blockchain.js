const Block = require("./block");
const { SHA256 } = require("crypto-js");

class Blockchain {
  constructor() {
    this.chain = [];
    this.position = -1;
    this.initializeChain();
  }

  async initializeChain() {
    if (this.position === -1) {
      const newblock = new Block({ data: "Genesis Block" });
      await this.addBlock(newblock);
    }
  }

  validatteChain() {
    let self = this;
    let errors = [];

    return new Promise(async (resolve, reject) => {
      self.chain.map(async (block) => {
        try {
          let isValid = await block.validarHash();
          if (!isValid) {
            errors.push(new Error("Hash not valid: " + block.position));
          }
        } catch (error) {
          errors.push(error);
        }
      });
      resolve(errors);
    });
  }

  addBlock(block) {
    let self = this;
    return new Promise(async (resolve, reject) => {
      block.position = self.chain.length;
      block.timestamp = new Date().getTime().toString();

      if (self.chain.length > 0) {
        block.previusBlockHash = self.chain[self.chain.length - 1].hash;
      }

      let errors = this.validatteChain();
      if (errors.length > 0) {
        reject(new Error("Chain not valid: " + errors));
      }

      block.hash = SHA256(JSON.stringify(block)).toString();
      self.chain.push(block);
      resolve(block);
    });
  }

  print() {
    let self = this;
    for (let block of this.chain) {
      console.log(block.toString());
    }
  }
}

module.exports = Blockchain;
