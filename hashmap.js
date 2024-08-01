export default class HashMap {
  #capacity = 16;
  #loadFactor = 0.75;
  #buckets = [];
  #length = 0;
  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.#capacity;
  }
  #checkIndex(index) {
    if (index < 0 || index >= this.#capacity) {
      throw new Error("Trying to access index out of bound");
    }
  }
  set(key, value) {
    this.#resize();
    const hashCode = this.#hash(key);
    this.#checkIndex(hashCode);
    const data = {
      key,
      value,
      next: null,
    };

    let currentBucketItem = this.#buckets[hashCode];
    while (currentBucketItem) {
      if (currentBucketItem.key === data.key) {
        currentBucketItem.value = data.value;
        return;
      } else if (currentBucketItem.next === null) {
        currentBucketItem.next = data;
        this.#length++;
        return;
      }
      currentBucketItem = currentBucketItem.next;
    }

    this.#length++;
    this.#buckets[hashCode] = data;
  }
  get(key) {
    const hashCode = this.#hash(key);
    this.#checkIndex(hashCode);
    let currentBucketItem = this.#buckets[hashCode];
    while (currentBucketItem) {
      if (key === currentBucketItem.key) {
        return currentBucketItem.value;
      }
      currentBucketItem = currentBucketItem.next;
    }
    return null;
  }
  has(key) {
    const hashCode = this.#hash(key);
    this.#checkIndex(hashCode);
    let currentBucketItem = this.#buckets[hashCode];
    while (currentBucketItem) {
      if (key === currentBucketItem.key) {
        return true;
      }
      currentBucketItem = currentBucketItem.next;
    }
    return false;
  }
  remove(key) {
    const hashCode = this.#hash(key);
    this.#checkIndex(hashCode);
    let currentBucketItem = this.#buckets[hashCode];
    if (key === currentBucketItem.key) {
      this.#buckets[hashCode] = currentBucketItem.next;
      this.#length--;
      return true;
    }
    while (currentBucketItem) {
      if (currentBucketItem.next && key === currentBucketItem.next.key) {
        currentBucketItem.next = currentBucketItem.next.next;
        this.#length--;
        return true;
      }
      currentBucketItem = currentBucketItem.next;
    }
    return false;
  }
  length() {
    let length = 0;
    for (const bucket of this.#buckets) {
      let listItem = bucket;
      while (listItem) {
        length++;
        listItem = listItem.next;
      }
    }
    return length;
  }
  clear() {
    this.#capacity = 16;
    this.#buckets = [];
  }
  #makeArray(cb) {
    return this.#buckets.reduce((array, bucket) => {
      let listItem = bucket;
      while (listItem) {
        array.push(cb(listItem));
        listItem = listItem.next;
      }
      return array;
    }, []);
  }
  keys() {
    return this.#makeArray((listItem) => listItem.key);
  }
  values() {
    return this.#makeArray((listItem) => listItem.value);
  }
  entries() {
    return this.#makeArray((listItem) => [listItem.key, listItem.value]);
  }
  #resize() {
    if (this.length() < this.#capacity * this.#loadFactor) return;
    this.#capacity *= 2;
    const entries = this.entries();
    this.#buckets = [];
    entries.forEach((entry) => this.set(...entry));
  }
}
