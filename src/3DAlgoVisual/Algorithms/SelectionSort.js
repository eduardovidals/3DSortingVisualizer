export function getSelectionSortAnimations(arr) {
  let animations = [];
  arr = arr.slice();
  selectionSort(arr, animations);
  return [animations, arr];
}

function selectionSort(arr, animations) {
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i];
    let minIndex = i;
    for (let j = i; j < arr.length; j++) {
      animations.push([j, j, 'color', 'insert']);
      animations.push([j, j, 'color', 'revert']);
      if (min > arr[j]) {
        min = arr[j];
        minIndex = j;
      }
    }
    animations.push([i, arr[minIndex], 'swap', 'swap']);
    animations.push([minIndex, arr[i], 'swap', 'swap']);
    swap(arr, i, minIndex);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
