export default class HashMap {
  #capacity = 16;
  #loadFactor = 0.75;
  buckets = [];
  #length = 0;
  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.#capacity;
  }
  // This helper method is necessary because if it didn't exist the
  // #length field would be erroneously doubled each time #resize() is
  // called.
  #addOrUpdateKey(key, value) {
    const hashCode = this.#hash(key);
    const data = {
      key,
      value,
      next: null,
    };
    let currentBucketItem = this.buckets[hashCode];
    while (currentBucketItem) {
      if (currentBucketItem.key === data.key) {
        currentBucketItem.value = data.value;
        // The #length field shouldn't grow whenever a key's value is
        // merely updated. Hence this return value.
        return false;
      } else if (currentBucketItem.next === null) {
        currentBucketItem.next = data;
        return true;
      }
      currentBucketItem = currentBucketItem.next;
    }
    this.buckets[hashCode] = data;
    return true;
  }
  set(key, value) {
    if (this.#addOrUpdateKey(key, value)) {
      this.#length++;
    }
    if (this.#length > this.#capacity * this.#loadFactor) {
      this.#resize();
    }
  }
  get(key) {
    const hashCode = this.#hash(key);
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
    const hashCode = this.#hash(key);
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
    const hashCode = this.#hash(key);
    let currentBucketItem = this.buckets[hashCode];
    if (currentBucketItem) {
      if (key === currentBucketItem.key) {
        this.buckets[hashCode] = currentBucketItem.next;
        this.#length--;
        return true;
      }
      do {
        if (currentBucketItem.next && key === currentBucketItem.next.key) {
          currentBucketItem.next = currentBucketItem.next.next;
          this.#length--;
          return true;
        }
        currentBucketItem = currentBucketItem.next;
      } while (currentBucketItem);
    }
    return false;
  }
  length() {
    return this.#length;
  }
  clear() {
    this.#capacity = 16;
    this.buckets = [];
    this.#length = 0;
  }
  #makeArray(cb) {
    return this.buckets.reduce((array, bucket) => {
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
    this.#capacity *= 2;
    const entries = this.entries();
    this.buckets = [];
    entries.forEach((entry) => this.#addOrUpdateKey(...entry));
  }
}
