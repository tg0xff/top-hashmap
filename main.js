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

console.log("Populated hash map before going over load factor:");
console.log(hashMap.buckets);

hashMap.set("hat", "rainbow");
console.log("Changed value of 'hat':");
console.log(hashMap.buckets);
hashMap.set("kite", "mauve");
console.log("Changed value of 'kite':");
console.log(hashMap.buckets);
hashMap.set("grape", "light green");
console.log("Changed value of 'grape':");
console.log(hashMap.buckets);
hashMap.set("hat", "black");
console.log("Changed value of 'hat' again:");
console.log(hashMap.buckets);

hashMap.set("moon", "silver");
console.log("Surpassed load factor with 'moon' key:");
console.log(hashMap.buckets);

hashMap.set("moon", "pale");
console.log("Changed value of 'moon':");
console.log(hashMap.buckets);
hashMap.set("elephant", "pink");
console.log("Changed value of 'elephant':");
console.log(hashMap.buckets);
hashMap.set("lion", "lion coloured");
console.log("Changed value of 'lion':");
console.log(hashMap.buckets);
hashMap.set("banana", "nuclear");
console.log("Changed value of 'banana':");
console.log(hashMap.buckets);

console.log(`Testing get("lion"): ${hashMap.get("lion")}`);
console.log(`Testing get("moon"): ${hashMap.get("moon")}`);
console.log(`Testing get("mon") (non-existent): ${hashMap.get("mon")}`);

console.log(`Testing has("banana"): ${hashMap.has("banana")}`);
console.log(`Testing has("lion"): ${hashMap.has("lion")}`);
console.log(`Testing has("caramel") (non-existent): ${hashMap.has("caramel")}`);

console.log(`Testing remove("frog"): ${hashMap.remove("frog")}`);
console.log(`Testing remove("lion"): ${hashMap.remove("lion")}`);
console.log(`Testing remove("camel") (non-existent): ${hashMap.remove("camel")}`);

console.log(`Testing length(): ${hashMap.length()}`);
console.log(hashMap.buckets);
hashMap.set("axolotl", "pink");
console.log(`Added 'axolotl' and testing length() again: ${hashMap.length()}`);
console.log(hashMap.buckets);
