import HashMap from "./hashmap.js";

const hashMap = new HashMap();

hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");
hashMap.set("dog", "brown");
hashMap.set("elephant", "gray");
hashMap.set("frog", "green");
hashMap.set("grape", "purple");
hashMap.set("hat", "black");
hashMap.set("ice cream", "white");
hashMap.set("jacket", "blue");
hashMap.set("kite", "pink");
hashMap.set("lion", "golden");

console.log(`Populated hash map before going load factor:\n${hashMap.entries()}`)

hashMap.set("hat", "rainbow");
console.log(`Changed value of 'hat':\n${hashMap.entries()}`);
hashMap.set("kite", "mauve");
console.log(`Changed value of 'kite':\n${hashMap.entries()}`);
hashMap.set("grape", "light green");
console.log(`Changed value of 'grape':\n${hashMap.entries()}`);
hashMap.set("hat", "black");
console.log(`Changed value of 'hat' again:\n${hashMap.entries()}`);
