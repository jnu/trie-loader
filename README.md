trie-loader
===

A Webpack loader for tries. The goal of this loader is to bundle a wordlist
dependency as a trie for efficient transport and lookup. The bundle may be
embedded in the application or stored as an asynchronous chunk, depending on
configuration.

Uses the [tiny-trie](https://github.com/jnu/tiny-tree) for encoding.

## Usage

Take a big list of words (or whatever - all characters are welcome here!)

`wordlist.text`:
```
...
treacle
tree
trie
trill
trim
...
```

Import this wordlist directly into JavaScript. The resultant binding will be
a `PackedTrie` (see [tiny-trie](https://github.com/jnu/tiny-tree)), which
exposes a `lookup` method.

```js
import words from 'trie!./wordlist.txt';

if (words.lookup('trie')) {
    console.log('`trie` is in the dictionary!');
} else {
    console.log('`trie` is not a real word');
}
```

