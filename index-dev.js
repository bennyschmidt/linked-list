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
    // If no `head` (e.g. empty list), do an insert instead to define it
    if (!this.head) {
      return this.insert(data);
    }

    // Starting at the `head`, iterate over all items in the list...
    let tail = this.head;

    // ...until reaching the last item, which by definition has no `next`
    while (tail.next) {
      tail = tail.next;
    }

    // Now that tail is the last item in the list, 
    // define its `next` as a new LinkedListItem
    // (effectively putting it at the end of the list)
    tail.next = new LinkedListItem(data);

    // Return `this` to support method chaining
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
    // Update the head to that of a new LinkedListItem,
    // passing the current `head` as the new item's `next`
    // (effectively putting it at the beginning of the list)
    this.head = new LinkedListItem(data, this.head);

    // Return `this` to support method chaining
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
    // If no `head` (e.g. empty list), or the index is 0,
    // do an insert instead to define a `head`
    if (!this.head || index === 0) {
      return this.insert(data);
    }

    // Instantiate the new LinkedListItem independent of any 
    // list (no `next`)
    const item = new LinkedListItem(data);
    // Retrieve whichever item is just before the provided target 
    // index (the "previous" item) 
    const prev = this.itemAt(index - 1);

    // Now set the `next` on the new item to whatever the `next` is
    // on the previous item
    item.next = prev.next;
    // And change the previous `next` to the new item
    // (effectively inserting a new item before it in the list)
    prev.next = item;

    // Return `this` to support method chaining
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
    // Starting at the `head`, iterate over all items in the list...
    let i = 0;
    let item = this.head;

    // ...until reaching the provided target index
    while(i++ < index) {
      item = item && item.next;
    }

    // Return that item
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
    // If no `head` (e.g. empty list), nothing to remove
    if (!this.head) {
      // Return false, remove was unsuccessful
      return false;
    }

    // If index is 0 (e.g. the `head`), remove it by overwriting `head`
    // with its `next`
    if (index === 0) {
      this.head = this.head.next;

      // Return true when successfully removed
      return true;
    }

    // Otherwise retrieve whichever item is just before the provided 
    // target index (the "previous" item) 
    const prev = this.itemAt(index - 1);

    // If no previous item, or the previous item has no next,
    // there is no item to remove
    if (!prev || !prev.next) {
      // Return false, remove was unsuccessful
      return false;
    }

    // Otherwise set the previous `next` to that of the target item
    // (effectively excluding the target item from the list)
    prev.next = prev.next.next;

    // Return true when successfully removed
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
 * Set up test
 */

const runTest = () => {
  const list = new LinkedList();

  list.add('third');
  list.insert('second');
  list.add('fifth');
  list.insertAt(0, 'first');
  list.insertAt(3, 'seventh');
  list.add('sixth');
  list.removeAt(3);
  list.insertAt(3, 'fourth');

  const expectation = 'first second third fourth fifth ';
  let output = '';

  for (let i = 0; i < 5; i++) {
    output += `${list.itemAt(i).data} `;
  }

  console.log(`Test passed: ${output === expectation}`);
}

/*
 * Run test
 */

runTest();
