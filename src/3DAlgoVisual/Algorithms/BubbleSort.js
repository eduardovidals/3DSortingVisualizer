export function getBubbleSortAnimations(arr) {
  arr = arr.slice();
  let animations = []
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      animations.push([j, j+1, "color", "insert"]);
      animations.push([j, j+1, "color", "revert"]);
      if (arr[j] > arr[j + 1]) {
        animations.push([j, arr[j+1], "swap", "swap"]);
        animations.push([j+1, arr[j], "swap", "swap"]);
        swap(arr, j, j + 1);
      }
    }
  }
  return [animations, arr];
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
