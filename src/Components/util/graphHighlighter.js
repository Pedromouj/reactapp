export default function GraphHilitor(id, tag) {
  // Original JavaScript code by Chirp Internet: www.chirpinternet.eu
  // Please acknowledge use of this code by including this header.

  // private variables
  let targetNode = document.getElementById(id) || document.body;
  let className = "fill-yellow";
  let wordColor = [];
  let matchRegExp = "";

  // characters to strip from start and end of the input string
  let endRegExp = new RegExp("/", "g");

  // characters used to break up the input string into words
  let breakRegExp = new RegExp("/", "g");

  this.setEndRegExp = function (regex) {
    endRegExp = regex;
    return endRegExp;
  };

  this.setBreakRegExp = function (regex) {
    breakRegExp = regex;
    return breakRegExp;
  };

  this.setMatchType = function (type) {
    switch (type) {
      case "left":
        this.openLeft = false;
        this.openRight = true;
        break;

      case "right":
        this.openLeft = true;
        this.openRight = false;
        break;

      case "open":
        this.openLeft = this.openRight = true;
        break;

      default:
        this.openLeft = this.openRight = false;
    }
  };

  this.setRegex = function (input) {
    input = input.replace(endRegExp, "");
    input = input.replace(breakRegExp, "|");
    input = input.replace(/^\||\|$/g, "");
    if (input) {
      let re = "(" + input + ")";
      if (!this.openLeft) {
        re = "\\b" + re;
      }
      if (!this.openRight) {
        re = re + "\\b";
      }
      matchRegExp = new RegExp(re, "i");
      return matchRegExp;
    }
    return false;
  };

  this.getRegex = function () {
    let retval = matchRegExp.toString();
    retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;
  };

  // recursively apply word highlighting
  this.hiliteWords = function (node) {
    if (node === undefined || !node) return;
    if (!matchRegExp) return;

    if (node.hasChildNodes()) {
      for (let i = 0; i < node.childNodes.length; i++) this.hiliteWords(node.childNodes[i]);
    }
    if (node.nodeType === 3) {
      let nv, regs;
      if ((nv = node.nodeValue) && (regs = matchRegExp.exec(nv))) {
        if (!wordColor[regs[0].toLowerCase()]) {
          wordColor[regs[0].toLowerCase()] = "";
        }
        if (node.parentNode.nodeName === "text") node.parentNode.classList.add(className);
      }
    }
  };

  // remove highlighting
  this.remove = function () {
    let cl = document.getElementsByClassName(className);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < cl.length; j++) {
        cl[j].classList.remove(className);
      }
    }
  };

  // start highlighting at target node
  this.apply = function (input) {
    this.remove();
    if (input === undefined || !(input = input.replace(/(^\s+|\s+$)/g, ""))) {
      return;
    }
    if (this.setRegex(input)) {
      this.hiliteWords(targetNode);
    }
    return matchRegExp;
  };

  this.hightlightById = function (id) {
    this.remove();
    const el = document.getElementById(`name_${id}`);
    el.classList.add("fill-yellow");
  };
}
