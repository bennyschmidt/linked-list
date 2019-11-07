/*
 * LinkedList
 * A list of items
 *
 * Arguments:
 * items - Array (optional)
 * 
 * Methods:
 * add - Add an item to the end of the list
 * insert - Insert an item at the beginning of the list
 * insertAt - Insert an item at the specified index
 * itemAt - Retrieve an item at the specified index
 * removeAt - Remove an item at the specified index
 *
 * Properties:
 * head - The first item in the list
 * 
 * Description:
 * Instantiate an empty list, or optionally with an array of items.
 * If items are provided, they are added to the list as LinkListItem 
 * instances. The LinkedList maintains a reference to the first 
 * LinkedListItem in the list via the `head` property.
 *
 */

class LinkedList {
  constructor(items = []) {
    this.head = null;
    items.forEach(i => this.add(i));
  }

  /*
   * add
   * Add an item to the end of the list
   *
   * Arguments:
   * data - Any (optional) the value of the item
   * 
   * Returns: the LinkedList instance
   */

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

  /*
   * insert
   * Insert an item at the beginning of the list
   *
   * Arguments:
   * data - Any (optional) the value of the item
   * 
   * Returns: the LinkedList instance
   */

  insert = data => {
    this.head = new LinkedListItem(data, this.head);

    return this;
  };

  /*
   * insertAt
   * Insert an item at the specified index
   *
   * Arguments:
   * index - Integer (required) the target item location
   * data - Any (optional) the value of the item
   * 
   * Returns: the LinkedList instance
   */

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

  /*
   * itemAt
   * Retrieve an item at the specified index
   *
   * Arguments:
   * index - Integer (required) the target item location
   * 
   * Returns: the queried LinkedListItem
   */

  itemAt = index => {
    let i = 0;
    let item = this.head;

    while(i++ < index) {
      item = item && item.next;
    }

    return item;
  };

  /*
   * removeAt
   * Remove an item at the specified index
   *
   * Arguments:
   * index - Integer (required) the target item location
   * 
   * Returns: Boolean (true if remove was successful)
   */

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
}

/*
 * LinkedListItem
 * An item in the list
 *
 * Arguments:
 * data - Any (optional) the value of the item
 * next - LinkedListItem (optional) the next item in the list
 *
 * Properties:
 * data - The value of the item
 * next - The next item in the list
 * 
 * Description:
 * Instantiate with a value, and optionally, with a reference to the
 * next item. Each LinkedListItem in a LinkedList has a reference to 
 * the next item in the list via the `next` property.
 *
 */

class LinkedListItem {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/*
 * Export for use
 */
export { 
  LinkedList, 
  LinkedListItem 
}
