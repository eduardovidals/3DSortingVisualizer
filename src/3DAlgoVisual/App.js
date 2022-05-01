import React, {useEffect, useRef, useState, createRef} from 'react';
import * as THREE from 'three';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {PointerLockControls, useHelper} from "@react-three/drei";

import './App.css';
import Bar from './Common/Bar';
import {getBubbleSortAnimations} from "./Algorithms/BubbleSort";
import AlgoSliderSetting from "./Common/AlgoSliderSetting";
import AlgoButton from "./Common/AlgoButton";
import {disabledButtonStyle, enabledButtonStyle} from "./Common/Styles";
import {getHeapSortAnimations} from "./Algorithms/HeapSort";
import {getInsertionSortAnimations} from "./Algorithms/InsertionSort";
import {getSelectionSortAnimations} from "./Algorithms/SelectionSort";
import {getMergeSortAnimations} from "./Algorithms/MergeSort";
import {getQuickSortAnimations} from "./Algorithms/QuickSort";
import AlgoButtonSetting from "./Common/AlgoButtonSetting";
import {DirectionalLightHelper} from "three";

const PRIMARY_COLOR = "white";
const SECONDARY_COLOR = "red";

// sorting algorithms
const options = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort", "Quick Sort", "Heap Sort"];

function App() {
  const dropdownSelection = createRef();
  const dropdownCaret = createRef();
  const [arr, setArr] = useState([]);
  const [numberOfBoxes, setNumberOfBoxes] = useState(100);
  const [maxBoxHeight, setMaxBoxHeight] = useState(50);
  const [sortingAlgorithm, setSortingAlgorithm] = useState("Bubble Sort");
  const [clickedRun, setClickedRun] = useState(false);
  const [sortingSpeed, setSortingSpeed] = useState(1);
  const [showSortingOptions, setShowSortingOptions] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState(enabledButtonStyle);
  const [dropdownOptionClicked, setDropdownOptionClicked] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const itemsRef = useRef([]);

  useEffect(() => {
    resetArr();
  }, [])

  const resetArr = () => {
    itemsRef.current = itemsRef.current.slice(0, numberOfBoxes);
    let arr = [];
    for (let i = 0; i < numberOfBoxes; i++) {
      arr.push(randomIntFromInterval(1, maxBoxHeight));
    }
    setArr(arr);
  }

  useEffect(() => {
    // this ensures that the slider does not reset the array once the min/max is reached
    if (numberOfBoxes > 10 && numberOfBoxes < 250) {
      resetArr()
    }
  }, [numberOfBoxes])

  useEffect(() => {
    if (clickedRun) {
      setOptionsDisabled(true);
      setDropdownStyle(disabledButtonStyle);

      switch (sortingAlgorithm) {
        case "Bubble Sort":
          sortingAnimations(getBubbleSortAnimations(arr));
          break;
        case "Insertion Sort":
          sortingAnimations(getInsertionSortAnimations(arr));
          break;
        case "Selection Sort":
          sortingAnimations(getSelectionSortAnimations(arr));
          break;
        case "Merge Sort":
          sortingAnimations(getMergeSortAnimations(arr));
          break;
        case "Quick Sort":
          sortingAnimations(getQuickSortAnimations(arr));
          break;
        case "Heap Sort":
          sortingAnimations(getHeapSortAnimations(arr));
          break;
      }
      setClickedRun(false);
    }
  }, [clickedRun])

  const showSortingAlgorithms = (e) => {
    // ensures that you close menu when clicked again
    if (!showSortingOptions && !optionsDisabled) {
      setShowSortingOptions(true);
      // not sure why this works but will figure out soon
      // makes dropdown work magically!
      e.stopPropagation();
      document.addEventListener("click", closeSortingAlgorithms);
    }
  }

  const closeSortingAlgorithms = () => {
    setShowSortingOptions(false);
    document.removeEventListener("click", closeSortingAlgorithms)
  }

  useEffect(() => {
    displaySortingAlgorithms()
  }, [showSortingOptions]);

  const displaySortingAlgorithms = () => {
    if (showSortingOptions) {
      dropdownSelection.current.style.display = "block";
      dropdownCaret.current.style.transform = "rotate(180deg)";
      dropdownCaret.current.style.transition = "all 250ms linear";
    } else {
      dropdownSelection.current.style.display = "none";
      dropdownCaret.current.style.transform = "rotate(0deg)";
      dropdownCaret.current.style.transition = "all 250ms linear";
    }
  }

  // enable settings once the the animation is over
  const enableSettings = (animationLength, arr) => {
    setTimeout(() => {
      setOptionsDisabled(false);
      setDropdownStyle(enabledButtonStyle);
      setArr(arr);
    }, animationLength);
  }

  const onMouseEnterDropdown = () => {
    if (!optionsDisabled) {
      setDropdownStyle({color: '#98d6e8', cursor: 'pointer'});
    }
  }

  const onMouseLeaveDropdown = () => {
    if (!optionsDisabled) {
      setDropdownStyle({color: '#fff', cursor: 'pointer'});
    }
  }

  const barsLimit = (e, value) => {
    setNumberOfBoxes(value);
  }

  const sliderSpeed = (e, value) => {
    setSortingSpeed(value);
  }

  // animations for sorting algorithms
  const sortingAnimations = (arrs) => {
    let [animations, sortedArr] = arrs;
    let animationLength = animations.length * sortingSpeed;
    enableSettings(animationLength, sortedArr);
    for (let i = 0; i < animations.length; i++) {
      let animationType = animations[i][2];
      switch (animationType) {
        case "color": {
          let [barOneIndex, barTwoIndex] = animations[i];
          let colorState = animations[i][3];
          let color = colorState === 'insert' ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            itemsRef.current[barOneIndex].material = new THREE.MeshStandardMaterial({color: color});
            itemsRef.current[barTwoIndex].material = new THREE.MeshStandardMaterial({color: color});
          }, i * sortingSpeed);
          break;
        }
        case "swap": {
          const [barOneIndex, newHeight] = animations[i];
          setTimeout(() => {
            itemsRef.current[barOneIndex].position.set(0, newHeight / 2 - 20, barOneIndex * 2 - 100)
            itemsRef.current[barOneIndex].geometry = new THREE.BoxGeometry(1, newHeight, 1);
          }, i * sortingSpeed);
          break;
        }
        case "pivot": {
          const [pivotIndex] = animations[i];
          let colorState = animations[i][3];
          let color = colorState === 'insert' ? "green" : "white";
          setTimeout(() => {
            itemsRef.current[pivotIndex].material = new THREE.MeshStandardMaterial({color: color});
          }, i * sortingSpeed);
          break;
        }
      }
    }
  }

  // min and max included
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const nodes = arr.map((number, index) => {
    return <Bar key={index} dimensions={[1, number, 1]} position={[0, number / 2 - 20, index * 2 - 100]}
                meshRef={(ref) => itemsRef.current[index] = ref} color={PRIMARY_COLOR}/>;
  })

  return (
    <div id={'app'}>
      <div className={'sidebar-wrapper'}>
        <div className={'sidebar'}>
          <div className={'sidebar-settings'}>
            <AlgoSliderSetting settingDescription={"Control number of bars"}
                               statusDescription={numberOfBoxes + " bars"}
                               disabled={optionsDisabled}
                               onChange={barsLimit} defaultValue={100} min={10} max={250}/>

            <AlgoSliderSetting settingDescription={"Control visualizer speed"}
                               statusDescription={sortingSpeed + " ms"}
                               disabled={optionsDisabled}
                               onChange={sliderSpeed} defaultValue={1} min={1} max={1000}/>

            <div className={"sidebar-setting"}>
              <p> Choose an algorithm </p>

              <div className={"selection-dropdown"} style={dropdownStyle} onClick={showSortingAlgorithms}
                   onMouseEnter={onMouseEnterDropdown} onMouseLeave={onMouseLeaveDropdown}>
                <div className={"current-option"}>
                  <p> {sortingAlgorithm} </p>
                </div>

                <div className={"caret-down"}>
                  <i className="fas fa-caret-down" ref={dropdownCaret}> </i>
                </div>
              </div>
              <div className={"selection-options"} ref={dropdownSelection}>
                <ul>
                  {
                    options.map(option => (
                      <div onClick={() => {
                        setSortingAlgorithm(option);
                        setDropdownOptionClicked(true);
                      }} key={option}>
                        {option}
                      </div>
                    ))
                  }
                </ul>
              </div>

              <AlgoButton buttonText={"Run"} disabled={optionsDisabled}
                          onClick={() => setClickedRun(true)}/>
            </div>
            <AlgoButtonSetting settingDescription={"Reset the array"} buttonText={"Reset"}
                               disabled={optionsDisabled} onClick={resetArr}/>
          </div>
        </div>
      </div>

      <div className={'visualizer-wrapper'}>
        <Canvas camera={{position: [-150, 0, 0], fov: 90, far: 5000}} shadows>
          <Light/>
          <FPSControls/>
          <group castShadow={true} receiveShadow={true}>
            {nodes}
          </group>
          <mesh rotation-x={Math.PI * -0.5} position={[0, -30, 0]} receiveShadow={true}>
            <planeBufferGeometry args={[3000, 3000]}/>
            <meshStandardMaterial color={"pink"}/>
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}

const Light = () => {
  const ref = useRef()
  useHelper(ref, DirectionalLightHelper, 1)

  useFrame(() => {

  })

  return (
    <>
      <directionalLight
        ref={ref}
        intensity={0.3}
        position={[-100, 100, 0]}
        castShadow={true}
      />
    </>
  )
}

function FPSControls() {
  const ref = useRef();

  let A = useKeyPress("a");
  let W = useKeyPress("w");
  let S = useKeyPress("s");
  let D = useKeyPress("d");
  let SPACE = useKeyPress(" ");

  const {camera} = useThree();

  useFrame(() => {
    if (W) ref.current.moveForward(1);
    if (A) ref.current.moveRight(-1);
    if (S) ref.current.moveForward(-1);
    if (D) ref.current.moveRight(1);
    if (SPACE) {
      camera.translateY(1);
      setTimeout(() => {
        camera.translateY(-1);
      }, 100)
    }
  })

  return (
    <PointerLockControls isLocked={false} ref={ref}/>
  )
}

function useKeyPress(targetKey) {
  // state for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // if pressed key is our target key then set to true
  function downHandler({key}) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // if released key is our target key then set to false
  const upHandler = ({key}) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export default App;
