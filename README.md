Basic usage:

```
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
```
