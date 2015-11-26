var tinyTrie = require('tiny-trie/dist/tiny-trie');
var fs = require('fs');

module.exports = function(source) {
    this.cacheable();

    var words = source.split(/\s+/);

    var s, trie, packed;

    // Min mode: Create the trie at build time, serialize it, and inject binary
    // into module. Takes a long time to build, but has minimal space and time
    // overhead at runtime.
    if (this.minimize) {
        packed = tinyTrie.createFrozenSync(words);

        s = "var PackedTrie = require('tiny-trie/lib/PackedTrie');\n";
        s += "module.exports = new PackedTrie('" + packed.replace(/'/g, "\\'") + "');";
        return s;
    }
    // Dev mode: Put array of words in module, create trie at runtime.
    // Not space efficient, but reasonably fast.
    else {
        s = "var tinyTrie = require('tiny-trie');";
        s = "var words = " + JSON.stringify(words) + ";";
        s += "module.exports = tinyTrie.createSync(words);";
        return s;
    }
};
