const SHA256 = require(`crypto-js/sha256`)
class Block
{
    constructor (name,rln,div,course,previoushash= "")
    {
        this.name = name;
        this.rollno = rln;
        this.div = div;
        this.course = course;
        this.previoushash = "";
    }
    _calHash()
    {
        return SHA256(this.name+this.rollno+this.div+this.course+this.previoushash).toString();
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
        return new Block("Jairaj",32,"B","EXTC","00000000");
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
        for(let i=1; i<this.chain.length;i++)
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
let a = new Blockchain();
const Block1 = new Block("Romit",21,"B","CS");
const Block2 = new Block("Niranjan",31,"B","EXTC");
const Block3 = new Block("Abhishek",35,"B","CS");
const Block4 = new Block("Ritvij",39,"B","CS");
const Block5 = new Block("Kapish",15,"B","CS");
a.addblock(Block1);
console.log(a.getLatestBlock());
a.addblock(Block2);
console.log(a.getLatestBlock());
a.addblock(Block3);
console.log(a.getLatestBlock());
a.addblock(Block4);
console.log(a.getLatestBlock());
a.addblock(Block5);
console.log(a.getLatestBlock());
console.log(a.isChainValid());
