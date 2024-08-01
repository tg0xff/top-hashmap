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
    this.checkIndex(hashCode);
    let currentBucketItem = this.buckets[hashCode];
    while (currentBucketItem) {
      if (key === currentBucketItem.key) {
        return currentBucketItem.value;
      }
      currentBucketItem = currentBucketItem.next;
    }
    return null;
  }
  has(key) {
    const hashCode = this.hash(key);
    this.checkIndex(hashCode);
    let currentBucketItem = this.buckets[hashCode];
    while (currentBucketItem) {
      if (key === currentBucketItem.key) {
        return true;
      }
      currentBucketItem = currentBucketItem.next;
    }
    return false;
  }
  remove(key) {
    const hashCode = this.hash(key);
    this.checkIndex(hashCode);
    let currentBucketItem = this.buckets[hashCode];
    if (key === currentBucketItem.key) {
      this.buckets[hashCode] = currentBucketItem.next;
      return true;
    }
    while (currentBucketItem) {
      if (key === currentBucketItem.next.key) {
        currentBucketItem.next = currentBucketItem.next.next;
        return true;
      }
      currentBucketItem = currentBucketItem.next;
    }
    return false;
  }
  length() {
    let length = 0;
    for (const bucket of this.buckets) {
      let listItem = bucket;
      while (listItem) {
        length++;
        listItem = listItem.next;
      }
    }
    return length;
  }
  clear() {
    this.capacity = 16;
    this.buckets = [];
  }
  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      let listItem = bucket;
      while (listItem) {
        keys.push(listItem.key);
        listItem = listItem.next;
      }
    }
    return keys;
  }
  values() {
    const values = [];
    for (const bucket of this.buckets) {
      let listItem = bucket;
      while (listItem) {
        values.push(listItem.value);
        listItem = listItem.next;
      }
    }
    return values;
  }
  entries() {
    return this.buckets.reduce((entries, bucket) => {
      let listItem = bucket;
      while (listItem) {
        entries.push([listItem.key, listItem.value]);
        listItem = listItem.next;
      }
      return entries;
    }, []);
  }
}
