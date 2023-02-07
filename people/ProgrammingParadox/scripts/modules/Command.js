let Command = function(config) {
  this.name = config.name ?? "";

  this.nodes = [];
};
Command.prototype.tree = function(tree) {
  this.nodes.push(tree);

  return this;
};
Command.prototype.execute = function(args) {
  // execute a command with the given arguments

  // find the longest node that matches the 
  // arguments and go from there
  let longest = {
    terms: -1,
    index: -1,
  }
  for (let i = 0; i < this.nodes.length; i++) {
    let node = this.nodes[i];

  }
};

export { Command };