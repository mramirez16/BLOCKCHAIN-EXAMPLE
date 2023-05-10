const SHA256 = require("crypto-js/sha256");
const hex2ascii = require("hex2ascii");
class Block {
  constructor(data) {
    this.hash = null;
    this.position = 0;
    this.body = Buffer.from(JSON.stringify(data).toString("hex"));
    this.timestamp = 0;
    this.previusBlockHash = "";
  }

  validarHash() {
    const self = this;
    return new Promise((resolve, reject) => {
      let actualHash = self.hash;

      self.hash = SHA256(JSON.stringify({ ...self, hash: null })).toString();
      if (actualHash !== self.hash) {
        return resolve(false);
      }
      return resolve(true);
    });
  }

  
  getData() {
    const self = this;
    return new Promise((resolve, reject) => {
      let encodedData = self.body;
      let decodedData = hex2ascii(encodedData);
      let dataObject = JSON.parse(decodedData);

      if (dataObject == "Genesis Block") {
        reject(new Error("Thi error the Genesis Block"));
      }
      resolve(dataObject)
    });
  }

  toString(){
    const {
        hash,
        position,
        body,
        timestamp,
        previusBlockHash
    } = this;
    return `Block - 
    hash: ${hash}
    position: ${position}
    body: ${body}
    timestamp: ${timestamp}
    previusBlockHash: ${previusBlockHash}
    ------------------------------------`
  }
}

module.exports = Block;

/*JSON1:{
  obj:{

  },
  obj2:{

  }
}

JSONPRINCIPAL:{
  objPrincipal:{

  },
  JSON1:{
    obj:{
  
    },
    obj2:{
  
    }
  }
}*/