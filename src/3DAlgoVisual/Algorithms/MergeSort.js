export function getMergeSortAnimations(arr) {
  let animations = [];
  const auxiliaryArray = arr.slice();
  arr = arr.slice();
  mergeSort(arr, 0, arr.length - 1, auxiliaryArray, animations);
  return [animations, arr];
}

function mergeSort(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j, 'color', 'insert']);
    animations.push([i, j, 'color', 'revert']);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i], 'swap', 'swap']);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j], 'swap', 'swap']);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i, 'color', 'insert']);
    animations.push([i, i, 'color', 'revert']);
    animations.push([k, auxiliaryArray[i], 'swap', 'swap']);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j, 'color', 'insert']);
    animations.push([j, j, 'color', 'revert']);
    animations.push([k, auxiliaryArray[j], 'swap', 'swap']);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
