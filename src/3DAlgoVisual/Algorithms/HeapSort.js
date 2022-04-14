export function getHeapSortAnimations(arr) {
  let animations = []
  arr = arr.slice();
  heapSort(arr, animations);
  return [animations, arr];
}

function heapSort(arr, animations) {
  let n = arr.length;
  for (let k = n / 2; k >= 1; k--) {
    sink(arr, k, n, animations);
  }

  let k = n;
  while (k > 1) {
    swap(arr, 1, k--, animations);
    sink(arr, 1, k, animations);
  }
}

// helper methods
function sink(arr, k, n, animations) {
  while (2 * k <= n) {
    let j = 2 * k;
    if (j < n && less(arr, j, j + 1)) {
      j++;
    }

    if (!less(arr, k, j)) {
      break;
    }
    swap(arr, k, j, animations);
    k = j;
  }
}

function less(arr, i, j) {
  return arr[i - 1] < arr[j - 1];
}

function swap(arr, i, j, animations) {
  animations.push([i - 1, i - 1, 'color', 'insert']);
  animations.push([i - 1, i - 1, 'color', 'revert']);
  animations.push([i - 1, arr[j - 1], 'swap', 'swap']);
  animations.push([j - 1, j - 1, 'color', 'insert'])
  animations.push([j - 1, j - 1, 'color', 'revert'])
  animations.push([j - 1, arr[i - 1], 'swap', 'swap']);
  let temp = arr[i - 1];
  arr[i - 1] = arr[j - 1];
  arr[j - 1] = temp;
}
