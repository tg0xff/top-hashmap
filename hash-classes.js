export class HashMap {
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

export class HashSet {
  buckets = [];
  #capacity = 16;
  #loadFactor = 0.75;
  #length = 0;
  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.#capacity;
  }
  #addKey(key) {
    const hashCode = this.#hash(key);
    const data = {
      key,
      next: null,
    };
    let listItem = this.buckets[hashCode];
    while (listItem) {
      if (listItem.key === key) {
        return false;
      } else if (listItem.next === null) {
        listItem.next = data;
        return true;
      }
      listItem = listItem.next;
    }
    this.buckets[hashCode] = data;
    return true;
  }
  set(key) {
    if (this.#addKey(key)) this.#length++;
    if (this.#length > this.#capacity * this.#loadFactor) this.#resize();
  }
  has(key) {
    for (const bucket of this.buckets) {
      let listItem = bucket;
      while (listItem) {
        if (listItem.key === key) return true;
        listItem = listItem.next;
      }
    }
    return false;
  }
  remove(key) {
    const hashCode = this.#hash(key);
    let listItem = this.buckets[hashCode];
    if (listItem && key === listItem.key) {
      this.buckets[hashCode] = null;
      this.#length--;
      return true;
    }
    while (listItem) {
      if (listItem.next && key === listItem.next.key) {
        listItem.next = listItem.next.next;
        this.#length--;
        return true;
      }
      listItem = listItem.next;
    }
    return false;
  }
  length() {
    return this.#length;
  }
  clear() {
    this.buckets = [];
    this.#length = 0;
    this.#capacity = 16;
  }
  keys() {
    return this.buckets.reduce((array, bucket) => {
      let listItem = bucket;
      while (listItem) {
        array.push(listItem.key);
        listItem = listItem.next;
      }
      return array;
    }, []);
  }
  #resize() {
    this.#capacity *= 2;
    const keys = this.keys();
    this.buckets = [];
    keys.forEach((key) => this.#addKey(key));
  }
}
