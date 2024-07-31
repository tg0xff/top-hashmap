export default class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = [];
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }
  checkIndex(index) {
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bound");
    }
  }
  set(key, value) {
    const hashCode = this.hash(key);
    this.checkIndex(hashCode);
    const data = {
      key,
      value,
      next: null,
    };

    let currentBucketItem = this.buckets[hashCode];
    while (currentBucketItem) {
      if (currentBucketItem.key === data.key) {
        currentBucketItem.value = data.value;
        return;
      } else if (currentBucketItem.next === null) {
        currentBucketItem.next = data;
        return;
      }
      currentBucketItem = currentBucketItem.next;
    }

    this.buckets[hashCode] = data;
  }
  get(key) {
    const hashCode = this.hash(key);
    let currentBucketItem = this.buckets[hashCode];
    while (currentBucketItem) {
      if (key === currentBucketItem.key) {
        return currentBucketItem.value;
      }
      currentBucketItem = currentBucketItem.next;
    }
    return null;
  }
}
