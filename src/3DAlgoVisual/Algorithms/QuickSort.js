export function getQuickSortAnimations(arr) {
  let animations = [];
  arr = arr.slice();
  quickSort(arr, 0, arr.length - 1, animations);
  return [animations, arr];
}

function quickSort(arr, l, h, animations) {
  if (l < h) {
    let j = partition(arr, l, h, animations);
    quickSort(arr, l, j, animations);
    quickSort(arr, j + 1, h, animations);
  }
}

function partition(arr, l, h, animations) {
  let pivotIndex = randomIntFromInterval(l, h);
  let swappedPivotIndex;
  let pivot = arr[pivotIndex];
  animations.push([pivotIndex, pivotIndex, 'pivot', 'insert']);
  let i = l - 1;
  let j = h + 1;
  while (true) {
    do {
      i++;
      animations.push([i, i, 'color', 'insert']);
      animations.push([i, i, 'color', 'revert']);
    } while (arr[i] < pivot);

    do {
      j--;
      animations.push([j, j, 'color', 'insert']);
      animations.push([j, j, 'color', 'revert']);
    } while (arr[j] > pivot);

    if (i >= j) {
      animations.push([swappedPivotIndex, swappedPivotIndex, 'pivot', 'revert']);
      return j;
    }


    animations.push([i, arr[j], 'swap', 'swap']);
    animations.push([j, arr[i], 'swap', 'swap']);
    swap(arr, i, j);


    if (i === pivotIndex) {
      animations.push([j, j, 'pivot', 'insert']);
      swappedPivotIndex = j;
    } else if (j === pivotIndex) {
      animations.push([i, i, 'pivot', 'insert']);
      swappedPivotIndex = i;
    }
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
