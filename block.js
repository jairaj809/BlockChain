const SHA256 = require(`crypto-js/sha256`);
class Block
{
    constructor(index,date,data,previoushash = "")
    {
        this.index = index;
        this.date = date;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this._calHash();
    }
    _calHash()
    {
        return SHA256(this.index + this.date + this.data + this.previoushash).toString();
    }
}
class Blockchain
{
    constructor()
    {
        this.chain = [this._createGenesisBlock()];
    }
    _createGenesisBlock()
    {
        return new Block(0, "7-01-2019","Genesis-block","000");
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }
    addblock(newBlock)
    {
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.hash = newBlock._calHash();
        this.chain.push(newBlock);
    }
    isChainValid()
    {
        for(let i=1;i<this.chain.length; i++)
        {
            let previousBlock = this.chain[i-1];
            let CurrentBlock = this.chain[i];
            if(previousBlock.hash != CurrentBlock.previoushash)
            {
                console.log("HASH CHAIN BREAK!");
                return false;
            }
            if(CurrentBlock.hash != CurrentBlock._calHash())
            {
                console.log("HASH CALCULATE ERROR!");
                return false;
            }
        }
        return true;
    }
}
const b = new Blockchain();
const Block1 = new Block(1,"7-01-2017",500);
const Block2 = new Block(2,"7-01-2016",200);
const Block3 = new Block(3,"7-01-2015",300);
const Block4 = new Block(4,"7-01-2013",400);
const Block5 = new Block(5,"7-01-2018",389400);
const Block6 = new Block(6,"7-01-2019",900);
b.addblock(Block1);
console.log(b.getLatestBlock());
b.addblock(Block2);
console.log(b.getLatestBlock());
b.addblock(Block3);
console.log(b.getLatestBlock());
b.addblock(Block4);
console.log(b.getLatestBlock());
b.addblock(Block5);
console.log(b.getLatestBlock());
b.addblock(Block6);
console.log(b.getLatestBlock());
console.log(b.isChainValid());
b.chain[3].data = 7000;
console.log(b.isChainValid());