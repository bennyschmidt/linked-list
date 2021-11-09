class LinkedList {
  constructor(items = []) {
    this.head = null;
    items.forEach(i => this.add(i));
  }

  insertAt = (index, data) => {
    if (!this.head || index === 0) {
      return this.insert(data);
    }

    const item = new LinkedListItem(data);
    const prev = this.itemAt(index - 1);

    item.next = prev.next;
    prev.next = item;

    return this;
  };

  itemAt = index => {
    let i = 0;
    let item = this.head;

    while(i++ < index) {
      item = item && item.next;
    }

    return item;
  };

  removeAt = index => {
    if (!this.head) {
      return false;
    }

    if (index === 0) {
      this.head = this.head.next;

      return true;
    }

    const prev = this.itemAt(index - 1);

    if (!prev || !prev.next) {
      return false;
    }

    prev.next = prev.next.next;

    return true;
  };

  add = data => {
    if (!this.head) {
      return this.insert(data);
    }

    let tail = this.head;

    while (tail.next) {
      tail = tail.next;
    }

    tail.next = new LinkedListItem(data);

    return this;
  };

  insert = data => {
    this.head = new LinkedListItem(data, this.head);

    return this;
  };
}

class LinkedListItem {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

module.exports = {
  LinkedList,
  LinkedListItem
};
