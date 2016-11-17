// This function generates random integer between two numbers
// low (inclusive) and high (inclusive) ([low, high])
function randomInteger (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

// Returns a function to get a random value of the given array
function randomValue(arr){

  var high = arr.length;

  return function(){
        return arr[randomInteger(0,high)];
  }
}

module.exports = {
  randomInteger: randomInteger,
  randomValue: randomValue
}
