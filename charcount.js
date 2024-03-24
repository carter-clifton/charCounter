let updateButton = document.getElementById("updateButton")
updateButton.addEventListener("click", function() {updateVariables()})


let AutoRunSetting = true;
let addressCapacity = 10;
let maxAddressValue = 127;

function updateVariables() {
  addressCapacity = parseInt(document.getElementById("addressValueInput").value);
  maxAddressValue = parseInt(document.getElementById("maxValueInput").value);
  runCode();
}

function closingBracket(string) {
  let counter = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "[") {
      counter++;
    }
    if (string[i] === "]") {
      if (counter !== 0) {
        counter--;
      } else {
        return i;
      }
    }
  }
}

function correspondingBracketsIndexes(string) {
  let brackets = {};
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "[") {
      let closed = closingBracket(string.slice(i + 1));
      closed += (i + 1)
      brackets[i] = closed;
    }
  }
  return brackets;
}

class Brainfuck {
  // static DEFAULT_CAPACITY = 10;
  // static DEFAULT_MAX_VALUE = 127;
  currentIndex;
  memory;
  constructor(initialCapacity, maxValue) {
    this.memory = new Array(initialCapacity).fill(0);
    this.maxValue = maxValue;
    this.currentIndex = 0;
  }
  left() {
    if (this.currentIndex === 0) {
      return false;
    }
    this.currentIndex -= 1;
    return true;
  }
  right() {
    if (this.currentIndex === this.memory.length - 1) {
      return false;
    }
    this.currentIndex += 1;
    return true;
  }
  get() {
    return String.fromCharCode(this.memory[this.currentIndex]);
  }
  getMemoryValue() {
    return this.memory[this.currentIndex];
  }
  getAddress() {
    return this.currentIndex;
  }
  add() {
    if (this.memory[this.currentIndex] >= this.maxValue) {
      this.memory[this.currentIndex] = 0;
    } else {
      this.memory[this.currentIndex]++;
    }
    // console.log("ADD ONE")
  }
  minus() {
    if (this.memory[this.currentIndex] === 0) {
      this.memory[this.currentIndex] = this.maxValue;
    } else {
      this.memory[this.currentIndex]--;
    }
  }
  toString() {
    let stringBuilder = ""
    for (let i = 0; i < this.memory.length; i++) {
        stringBuilder += "[";
        let value = this.memory[i].toString();
        let valueLength = value.length;
        while (valueLength < 3) {
            value = "0" + value;
            valueLength = value.length;
        }
        stringBuilder += value;
        stringBuilder += "]";
    }
    return stringBuilder;
}
  sendPointerTo(index) {
    this.currentIndex = index;
  }
  getMemoryFromIndex(index) {
    return this.memory[index];
  }
}

class Compiler {
  constructor(code, addressCapacity, maxAddressValue) {
    this.code = code;
    this.memory = new Brainfuck(addressCapacity, maxAddressValue);
    console.log("memory -> ", this.memory)
  }
  run(code = this.code) {
    let brackets = correspondingBracketsIndexes(code)
    let i = 0
    let output = "[ - no output yet - ]"
    while (i < code.length) {
      let character = code[i];
      // console.log(character)
      switch (character) {
        case ">":
          this.memory.right();
          break;
        case "<":
          this.memory.left();
          break;
        case "+":
          this.memory.add();
          // console.log(this.memory.toString())
          break;
        case "-":
          this.memory.minus();
          break;
        case ".":
          if (output === "[ - no output yet - ]") {
            output = this.memory.get();
          } else {
            output += this.memory.get();
          }
          console.log(this.memory.get());
          break;
        case "[":
          let maxLoops = 10;
          let numLoops = 0;
          let pointerPosition = this.memory.getAddress();
          let currentCharacterIndex = i;
          let endIndex = brackets[currentCharacterIndex]
          let innerCode = code.slice(currentCharacterIndex + 1, endIndex);
          // console.log(innerCode);
          // console.log(this.memory.getMemoryFromIndex(pointerPosition))
          // console.log(endIndex)
          while (this.memory.getMemoryFromIndex(pointerPosition) !== 0 && numLoops < maxLoops) {
            this.run(innerCode);
            numLoops++;
            // console.log(pointerPosition, this.memory.getMemoryFromIndex(pointerPosition))
            // console.log(this.memory.toString())
          }
          i = endIndex;
          // if (this.memory.getMemoryFromIndex(pointerPosition) === 0) {
          //   i = (endIndex); // THIS SHOULD UPDATE I
          //   console.log("ended");
          // } else {
          //   console.log(code.slice(currentCharacterIndex + 1, endIndex))
          //   this.run(code.slice(currentCharacterIndex + 1, endIndex))
          //   console.log("repeated")
          // }
          break;
        case "P":
          document.querySelector('#output').innerHTML = this.memory.getMemoryValue()
          // console.log(this.memory.getMemoryValue());
          break;
        case "A":
          document.querySelector('#output').innerHTML = this.memory.getAddress()
          // console.log(this.memory.getAddress());
          break;
      }
      i++;
    }
    document.querySelector('#output').innerHTML = output
    document.querySelector('#memoryAddresses').innerHTML = this.memory.toString()
  }
}

function runCode() {
  let p = new Compiler("", addressCapacity, maxAddressValue);
  let codeToRun = document.getElementById("codeEntry").value;
  p.run(codeToRun)
}

runCode();