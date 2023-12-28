import React, { useRef, useEffect, useContext } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text, Plane, CameraControls, Point, Float, Group, View } from '@react-three/drei';
import { Camera, MathUtils } from 'three';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import { Suspense } from 'react';
import * as THREE from 'three';

import { extend } from '@react-three/fiber'

// import Cubes
import ViewCube from './cube.jsx';


import { OrbitControlsAddon } from 'three/addons/controls/OrbitControls.js';


/**
 * Default props for the ControlViewCube component.
 *
 */
const ControlViewCubeDefaultProps = {
  style: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    width: '200px', // 200px
    height: '200px', // 200px
    zIndex: '1000',
    backgroundColor: 'transparent',
    texts: {
      main: true,
      edge: true,
      corner: true,
      offset: 0.005,
      size: 0.1,
    },
    colors: {
      main: {
        background: 'grey',
        border: '#ffffff',
        text: 'black',

        hover: {
          background: '#ffffff',
          border: '#ffffff',
          text: '#000000',
        },
      },
      edge: {
        background: '#ffffff',
        border: '#ffffff',
        text: 'black',

        hover: {
          background: '#ffffff',
          border: '#ffffff',
          text: '#000000',
        },
      },
      corner: {
        background: 'grey',
        border: '#ffffff',
        text: 'red',
        hover: {
          background: '#ffffff',
          border: '#ffffff',
          text: '#000000',
        },
      },
      container: {
        background: 'transparent',
        border: 'transparent',

        hover: {
          background: 'transparent',
          border: 'transparent',
        },
      },
    }
  },
  locale: {
    top: 'top',
    bottom: 'bottom',
    north: 'north',
    south: 'south',
    east: 'east',
    west: 'west',
    northEast: 'NE',
    northWest: 'NW',
    southEast: 'SE',
    southWest: 'SW',
    topNorth: 'TN',
    topSouth: 'TS',
    topEast: 'TE',
    topWest: 'TW',
    bottomNorth: 'BN',
    bottomSouth: 'BS',
    bottomEast: 'BE',
    bottomWest: 'BW',
    topNorthEast: 'TNE',
    topNorthWest: 'TNW',
    bottomNorthEast: 'BNE',
    bottomNorthWest: 'BNW',
    topSouthEast: 'TSE',
    topSouthWest: 'TSW',
    bottomSouthEast: 'BSE',
    bottomSouthWest: 'BSW',
  },
  settings: {
    centerNodes: true,
    cornerNodes: true,
    edgeNodes: true,
    syncCamera: true,
    syncFrequency: 100,
    syncMode: 0, // 0: Always focus on the target, 1: Free rotation
  },
};


const ControlViewCube = (props) => {

  // Target Canvas ReferenceS
  let targetCanvas = useRef(null); // Creates a reference to be used for the canvas element
  let TargetDOMElement = useRef(null); // Creates a reference to be used for the DOM element


  // View Cube Reference
  const viewCubeRef = useRef(); // Creates a reference to be used for the view cube component
  const viewCubeCanvasRef = useRef(); // Creates a reference to be used for the view cube canvas component
  const viewCubeContainer = useRef(); // Creates a reference to be used for the view cube container component
  let targetOrbitControls = useRef(null); // Creates a reference to be used for the view cube orbit controls component
  const targetSphereRef = useRef(null); // Creates a reference to be used for the view cube target sphere component

  // View Cube Canvas References
  const viewCubeCanvas = useRef(null); // Creates a reference to be used for the view cube canvas element
  const viewCubeCanvasContainer = useRef(null); // Creates a reference to be used for the view cube canvas container element
  const viewCubeCanvasScene = useRef(null); // Creates a reference to be used for the view cube canvas scene element
  const viewCubeCanvasCamera = useRef(null); // Creates a reference to be used for the view cube canvas camera element
  const viewCubeCanvasOrbitControls = useRef(null); // Creates a reference to be used for the view cube canvas orbit controls element
  const viewCubeItself = useRef(null); // Creates a reference to be used for the view cube itself element

  // Variable to store the sync
  var syncTargetDistance = 0;

  /**
   * Generates a view sphere mesh with a specific position, rotation, and using the viewSphereRef as a reference.
   * @returns {JSX.Element} The view sphere mesh.
   */

  const _generateViewSphere = () => {
    return (
      <mesh
        name="control-view-cube-target-sphere"
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        ref={targetSphereRef}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={'black'} transparent opacity={0.0} />
      </mesh>
    );
  }

  /*
  * Retrieves the style, locale, and settings objects from the props.
  */
  const style = { ...ControlViewCubeDefaultProps.style, ...props.style };
  const locale = { ...ControlViewCubeDefaultProps.locale, ...props.locale };
  const settings = { ...ControlViewCubeDefaultProps.settings, ...props.settings };


  /**
   * Retrieves the scene that contains the target sphere.
   * @returns {THREE.Scene|null} The scene that contains the target sphere, or null if not found.
   */
  const _getSceneByTargetSphere = () => {

    let parent = targetSphereRef.current.parent;

    if (parent.type === 'Scene') {
      return parent;
    }

    return null; // If a scene is not found, return null
  };

  /**
   * Retrieves the canvas element from the DOM.
   * @returns {HTMLCanvasElement|null} The canvas element if found, otherwise null.
   */
  const _getCanvasByDOMElement = () => {
    let canvas = document.querySelector('canvas');
    if (canvas !== null) {
      return canvas;
    }
    return null; // If a canvas is not found, return null
  };


  useEffect(() => {
    // get the scene
    const scene = _getSceneByTargetSphere();

    if (scene === null) {
      console.error('Unable to find the scene.');
      return;
    }

    // give the scene a name
    scene.name = 'control-view-cube-target-scene';

    // give a reference to the scene
    targetCanvas = scene;

    // get Target Canvas Orbit Controls
    const targetOrbitControls = getOrCreateTargetCanvasOrbitControls(targetCanvas);

    if (targetOrbitControls === null) {
      console.error('Unable to find the target canvas orbit controls.');
      return;
    }

    targetOrbitControls.name = 'control-view-cube-target-orbit-controls';
    targetOrbitControls.object.name = 'control-view-cube-target-orbit-controls-camera';



    // render  react component to the parent of canvas
    const container = _createContainer();
    canvas.parentNode.appendChild(container);

    // render react component to the container
    ReactDOM.render(_createViewCubeCanvas(style, locale, settings), container);

    // get

  }, []);


  /**
   * Retrieves or creates the target canvas orbit controls.
   *
   * @param {HTMLCanvasElement} targetCanvas - The target canvas element.
   * @returns {Object|null} - The target orbit controls object, or null if not found.
   */
  function getOrCreateTargetCanvasOrbitControls(targetCanvas) {
    let targerCanvasR3FObjects = targetCanvas.__r3f.objects;

    let orbitControls = null;

    for (let i = 0; i < targerCanvasR3FObjects.length; i++) {
      let object = targerCanvasR3FObjects[i];

      //if object has autoRotate property and enablePan property
      if (object.hasOwnProperty('autoRotate') && object.hasOwnProperty('enablePan')) {
        orbitControls = object;

        // set the orbit controls to the targetOrbitControls
        targetOrbitControls = orbitControls;
        break;
      }

    }

    if (orbitControls === null) {
      return null;

    }

    // Add event listener to the orbit controls
    orbitControls.addEventListener('change', _getTargetCanvasOrbitControlsonChange);


    return targetOrbitControls;
  }


  /**
   * Creates a container element to hold the view cube.
   * @returns {HTMLElement} The created container element.
   */

  function _createContainer() {

    // Creates a container element to hold the view cube
    let container = document.createElement('div');
    container.style.position = style.position;
    if (style.top !== undefined) {
      container.style.top = style.top;
    } else {
      container.style.bottom = style.bottom;
    }
    if (style.left !== undefined) {
      container.style.left = style.left;
    } else {
      container.style.right = style.right;
    }
    container.style.width = style.width;
    container.style.height = style.height;
    container.style.zIndex = style.zIndex;
    container.style.backgroundColor = style.backgroundColor;
    container.name = "control-view-cube-container";

    container.ref = viewCubeContainer;

    return container;

  }

  const FivedividedBySqrt2 = 5 / Math.sqrt(2);
  const FivedividedBySqrt3 = 5 / Math.sqrt(3);


  /**
   * Predefined positions for the control view cube.
   * @type {Object}
   */
  const predefinedPositions = {
    top: { x: 0, y: 5, z: 0 },
    bottom: { x: 0, y: -5, z: 0 },
    south: { x: 0, y: 0, z: -5 },
    north: { x: 0, y: 0, z: 5 },
    east: { x: 5, y: 0, z: 0 },
    west: { x: -5, y: 0, z: 0 },

    topSouth: { x: 0, y: FivedividedBySqrt2, z: -FivedividedBySqrt2 },
    topNorth: { x: 0, y: FivedividedBySqrt2, z: FivedividedBySqrt2 },
    topEast: { x: FivedividedBySqrt2, y: FivedividedBySqrt2, z: 0 },
    topWest: { x: -FivedividedBySqrt2, y: FivedividedBySqrt2, z: 0 },

    bottomSouth: { x: 0, y: -FivedividedBySqrt2, z: -FivedividedBySqrt2 },
    bottomNorth: { x: 0, y: -FivedividedBySqrt2, z: FivedividedBySqrt2 },
    bottomEast: { x: FivedividedBySqrt2, y: -FivedividedBySqrt2, z: 0 },
    bottomWest: { x: -FivedividedBySqrt2, y: -FivedividedBySqrt2, z: 0 },

    southEast: { x: FivedividedBySqrt2, y: 0, z: -FivedividedBySqrt2 },
    southWest: { x: -FivedividedBySqrt2, y: 0, z: -FivedividedBySqrt2 },
    northEast: { x: FivedividedBySqrt2, y: 0, z: FivedividedBySqrt2 },
    northWest: { x: -FivedividedBySqrt2, y: 0, z: FivedividedBySqrt2 },

    topSouthEast: { x: FivedividedBySqrt3, y: FivedividedBySqrt3, z: -FivedividedBySqrt3 },
    topSouthWest: { x: -FivedividedBySqrt3, y: FivedividedBySqrt3, z: -FivedividedBySqrt3 },
    topNorthEast: { x: FivedividedBySqrt3, y: FivedividedBySqrt3, z: FivedividedBySqrt3 },
    topNorthWest: { x: -FivedividedBySqrt3, y: FivedividedBySqrt3, z: FivedividedBySqrt3 },

    bottomSouthEast: { x: FivedividedBySqrt3, y: -FivedividedBySqrt3, z: -FivedividedBySqrt3 },
    bottomSouthWest: { x: -FivedividedBySqrt3, y: -FivedividedBySqrt3, z: -FivedividedBySqrt3 },
    bottomNorthEast: { x: FivedividedBySqrt3, y: -FivedividedBySqrt3, z: FivedividedBySqrt3 },
    bottomNorthWest: { x: -FivedividedBySqrt3, y: -FivedividedBySqrt3, z: FivedividedBySqrt3 },
  };
  

  /**
   * Retrieves the selected position of the view cube based on the given face name.
   * @param {string} faceName - The name of the face.
   * @returns {Object|null} - The selected position object or null if the position is undefined.
   */
  function _getViewCubeSelectedPositionByFaceName(faceName) {
    console.log(faceName);
    var position = predefinedPositions[faceName];

    if (position === undefined) {
      return null;
    }

    //get the view cube orbit controls
    let viewCubeOrbitControls = viewCubeCanvasOrbitControls.current;
    let viewCubeOrbitControlsCamera = viewCubeOrbitControls.object;

    // set the position of the view cube orbit controls camera
    return position;
  }


  /**
   * Animates the view cube camera to a target position.
   * 
   * @param {Object} targetPosition - The target position to animate the camera to.
   * @param {number} targetPosition.x - The x-coordinate of the target position.
   * @param {number} targetPosition.y - The y-coordinate of the target position.
   * @param {number} targetPosition.z - The z-coordinate of the target position.
   */
  function _animateViewCubeCameraToPosition(targetPosition = { x: 0, y: 5, z: 0 }) {
    // Get current position
    let orbitControls = viewCubeCanvasOrbitControls.current;
    let orbitControlsCamera = orbitControls.object;
    let currentPosition = orbitControlsCamera.position;

    // if the target position is the same as the current position, do nothing
    if (targetPosition.x === currentPosition.x && targetPosition.y === currentPosition.y && targetPosition.z === currentPosition.z) {
      return;
    }
  
    // Set up variables for the animation
    let startTime = null;
    const duration = 1000; // Animation duration in milliseconds
  
    // Define the animation function
    function animate(time) {
      if (!startTime) startTime = time;
  
      // Calculate progress based on elapsed time and duration
      const progress = Math.min(1, (time - startTime) / duration);
  
      // Calculate the new position using linear interpolation
      const newPosition = currentPosition.clone().lerp(targetPosition, progress);
  
      // Update the camera position
      orbitControlsCamera.position.set(newPosition.x, newPosition.y, newPosition.z);
  
      // Check if the animation is complete
      if (progress < 1) {
        // Continue the animation
        requestAnimationFrame(animate);
      } else {
        // Animation is complete, set the final position
        orbitControlsCamera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
      }
    }
  
    // Start the animation
    requestAnimationFrame(animate);
  }


  /**
   * Returns the position of the object used for view cube canvas orbit controls.
   * @returns {Object} The position of the object.
   */
  const _getViewCubeCanvasOrbitControlsPosition = () => {
    return viewCubeCanvasOrbitControls.current.object;
  }

  /**
   * Returns the azimuthal angle of the view cube canvas orbit controls.
   * @returns {number} The azimuthal angle.
   */
  const _getViewCubeCanvasOrbitControlsAzimuthalAngle = () => {
    return viewCubeCanvasOrbitControls.current.getAzimuthalAngle();
  }

  /**
   * Returns the polar angle of the view cube canvas orbit controls.
   * @returns {number} The polar angle.
   */
  const _getViewCubeCanvasOrbitControlsPolarAngle = () => {
    return viewCubeCanvasOrbitControls.current.getPolarAngle();
  }

  /**
   * Function that handles the change event for the view cube canvas orbit controls.
   * It ensures that the execution of the function is synchronized based on the specified syncFrequency.
   * If at least 0.1 seconds have passed since the last execution, it executes the syncCamera function with the 'viewCube' parameter.
   * If less than 10 executions have occurred in the last second, it also executes the syncCamera function with the 'viewCube' parameter.
   */
  const _getViewCubeCanvasOrbitControlsonChange = (() => {
    let lastExecutionTime = 0;
    let executionCount = 0;

    return () => {
      const currentTime = Date.now();
      let syncFrequency = settings.syncFrequency;

      if (syncFrequency === 0) {
        // Synchronization is disabled
        return;
      } else if (syncFrequency < 0) {
        // set the sync frequency to 0.1 seconds
        syncFrequency = 100;
      } else if (syncFrequency > 1000) {
        // set the sync frequency to 1 second
        syncFrequency = 1000;
      }

      const executionLimit = 1000 / syncFrequency;

      if (currentTime - lastExecutionTime >= syncFrequency) {
        // At least 0.1 seconds have passed since the last execution
        lastExecutionTime = currentTime;
        executionCount = 1;
        syncCamera('viewCube');
      } else if (executionCount < executionLimit) {
        // Less than 10 executions in the last second
        executionCount++;
        syncCamera('viewCube');
      }
    };
  })();

  /**
   * Function that handles the change event for the target canvas orbit controls.
   * It synchronizes the camera based on the specified sync frequency.
   */
  const _getTargetCanvasOrbitControlsonChange = (() => {
    let lastExecutionTime = 0;
    let executionCount = 0;

    return () => {
      const currentTime = Date.now();
      let syncFrequency = settings.syncFrequency;

      if (syncFrequency === 0) {
        // Synchronization is disabled
        return;
      } else if (syncFrequency < 0) {
        // set the sync frequency to 0.1 seconds
        syncFrequency = 100;
      } else if (syncFrequency > 1000) {
        // set the sync frequency to 1 second
        syncFrequency = 1000;
      }

      const executionLimit = 1000 / syncFrequency;

      if (currentTime - lastExecutionTime >= syncFrequency) {
        // At least 0.1 seconds have passed since the last execution
        lastExecutionTime = currentTime;
        executionCount = 1;
        syncCamera('target');
      } else if (executionCount < executionLimit) {
        // Less than 10 executions in the last second
        executionCount++;
        syncCamera('target');
      }
    };
  })();

  /**
   * Handles the pointer down event on the view cube face.
   * @param {string} faceName - The name of the face that was clicked.
   */
  const onPointerDown = (faceName) => {
    // enable rotation
    viewCubeCanvasOrbitControls.current.enableRotate = true;
  }

  /**
   * Handles the pointer up event.
   * @param {string} faceName - The name of the face.
   */
  const onPointerUp = (faceName) => {
    // disable rotation
    viewCubeCanvasOrbitControls.current.enableRotate = false;
  }

  
  /**
   * Handles the double click event on the view cube face.
   * @param {string} faceName - The name of the face that was double clicked.
   */
  const onDoubleClick = (faceName) => {
    var newPosition = _getViewCubeSelectedPositionByFaceName(faceName);
    if (newPosition !== null) {
      _animateViewCubeCameraToPosition(newPosition);
    }
  }

  /**
   * Handles the context menu event for the view cube face.
   * @param {string} faceName - The name of the face.
   */
  const onContextMenu = (faceName) => {
    // disable rotation
    setTargetCameraToZeros();
  }

  const setTargetCameraToZeros = () => {
    // get the target of the target canvas orbit controls
    let target = targetOrbitControls.target;

    // get the position of the target canvas orbit controls
    target.set(0, 0, 0);
  }


  /**
   * Creates a canvas with a specific position, rotation, and using the viewCubeCanvasRef as a reference.
   * @param {object} style - The style object containing colors and other styling properties.
   * @param {string} locale - The locale string specifying the language.
   * @param {object} settings - The settings object containing configuration options.
   * @returns {JSX.Element} - The canvas component with the specified properties.
   */
  const _createViewCubeCanvas = (style, locale, settings) => {
    // Creates a canvas with a specific position, rotation, and using the viewCubeCanvasRef as a reference

    const viewCubeProps = {
      style: style,
      locale: locale,
      settings: settings,
      name: "control-view-cube",
      ref: viewCubeRef,
      onPointerDown: onPointerDown,
      onPointerUp: onPointerUp,
      onDoubleClick: onDoubleClick,
      onContextMenu: onContextMenu,
    };

    return (
      <Canvas
        color={style.colors.main.background}
        name="control-view-cube-canvas"
      >
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} name="control-view-cube-orbit-controls" ref={viewCubeCanvasOrbitControls} onChange={_getViewCubeCanvasOrbitControlsonChange} />
        <ViewCube  {...viewCubeProps} />
      </Canvas>
    );
  }

  /**
   * Synchronizes the camera based on the origin.
   * @param {string} origin - The origin of the camera change ('viewCube' or 'target').
   */
  const syncCamera = (origin) => {
    // there is two camera, one is the camera of the view cube, the other is the camera of the target canvas
    // the camera of the target canvas is the camera of the scene
    let syncOriginOrbitControls = null;
    let syncAimOrbitControls = null;

    let syncOriginOrbitControlsCamera = null;
    let syncAimOrbitControlsCamera = null;

    if (origin === 'viewCube') {
      syncOriginOrbitControls = viewCubeCanvasOrbitControls.current;
      syncAimOrbitControls = targetOrbitControls;
    } else if (origin === 'target') {
      syncOriginOrbitControls = targetOrbitControls;
      syncAimOrbitControls = viewCubeCanvasOrbitControls.current;
    }

    // check if the syncOriginOrbitControls and syncAimOrbitControls are null
    if (syncOriginOrbitControls === null || syncAimOrbitControls === null) {
      return;
    }

    // get the camera of the syncOriginOrbitControls and syncAimOrbitControls
    syncOriginOrbitControlsCamera = syncOriginOrbitControls.object;
    syncAimOrbitControlsCamera = syncAimOrbitControls.object;

    //console.log(syncOriginOrbitControls.name + " will sync to " + syncAimOrbitControls.name);

    //console.log(syncOriginOrbitControls.object);

    // Get the distance of Aim Orbit Controls from the target

    var syncOriginTarget = syncOriginOrbitControls.target;
    var syncOriginPosition = syncOriginOrbitControlsCamera.position;
    var syncOriginDistance = syncOriginPosition.distanceTo(syncOriginTarget);
    var syncOriginAzimuthalAngle = syncOriginOrbitControls.getAzimuthalAngle();
    var syncOriginPolarAngle = syncOriginOrbitControls.getPolarAngle();

    var syncAimTarget = syncAimOrbitControls.target;
    var syncAimPosition = syncAimOrbitControlsCamera.position;
    var syncAimDistance = syncAimPosition.distanceTo(syncAimTarget);
    var syncAimAzimuthalAngle = syncAimOrbitControls.getAzimuthalAngle();
    var syncAimPolarAngle = syncAimOrbitControls.getPolarAngle();

    // Change the position of the camera of the syncAimOrbitControls to the position of the camera of the syncOriginOrbitControls
    // Calculate the new position of the camera of the syncAimOrbitControls based on the distance, azimuthal angle, and polar angle of the camera of the syncOriginOrbitControls

    var syncAimPositionX = syncAimTarget.x + syncAimDistance * Math.cos(syncOriginAzimuthalAngle) * Math.sin(syncOriginPolarAngle);
    var syncAimPositionY = syncAimTarget.y + syncAimDistance * Math.cos(syncOriginPolarAngle);
    var syncAimPositionZ = syncAimTarget.z + syncAimDistance * Math.sin(syncOriginAzimuthalAngle) * Math.sin(syncOriginPolarAngle);

    syncAimPosition.set(syncAimPositionX, syncAimPositionY, syncAimPositionZ);




  }


  return (
    <Suspense fallback={null}>
      {_generateViewSphere()}
    </Suspense>
  );


}


export default ControlViewCube;
