const Blockchain = require("./src/blockchain.js");
const Block = require("./src/block.js");

async function run() {
  const blockchain = await new Blockchain();
  const block1 = new Block({ data: "Genesis One" });
  const block2 = new Block({ data: "Genesis Two" });
  const block3 = new Block({ data: "Genesis Three" });

  await blockchain.addBlock(block1);
  await blockchain.addBlock(block2);
  await blockchain.addBlock(block3);

  blockchain.print();
}

run();
