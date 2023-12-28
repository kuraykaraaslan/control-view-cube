import React, { Suspense, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Plane } from '@react-three/drei';
import { MathUtils } from 'three';

function ViewCube(props) {

    //localization
    const locale = props.locale;

    // style
    const style = props.style;

    // settings
    const settings = props.settings;


    // Creates a cube with a specific position, rotation, and using the viewCubeRef as a reference
    let styleWidth = parseInt(String(style.width).replace('px', ''));
    let styleHeight = parseInt(String(style.height).replace('px', ''));
    let cubeSize = Math.min(styleWidth, styleHeight) / 80;

    // textPosition
    const textPosition = cubeSize / 2 + style.texts.offset;

    // Hide text if not selected
    const textMainHide = !style.texts.main;
    const textCornerHide = !style.texts.corner;
    const textEdgeHide = !style.texts.edge;

    // colors
    const mainBackgroundColor = style.colors.main.background;
    const edgeBackgroundColor = style.colors.edge.background;
    const cornerBackgroundColor = style.colors.corner.background;

    // textSizes
    const textSize = style.texts.size;

    // textColors
    const mainTextColor = style.colors.main.text;
    const edgeTextColor = style.colors.edge.text;
    const cornerTextColor = style.colors.corner.text;


    /**
     * Handles the pointer down event.
     * 
     * @param {Object} e - The event object.
     */
    function _onPointerDown(e) {
        let faceName = e.object.faceName;
        props.onPointerDown(faceName);
    }

    /**
     * Handles the pointer up event.
     * 
     * @param {Object} e - The event object.
     * @returns {void}
     */
    function _onPointerUp(e) {
        let faceName = e.object.faceName;
        props.onPointerUp(faceName);
    }

    /**
     * Handles the double click event on the cube face.
     * @param {Object} e - The event object.
     */
    function _onDoubleClick(e) {
        let faceName = e.object.faceName;
        props.onDoubleClick(faceName);
    }

    function _onContextMenu(e) {
        let faceName = e.object.faceName;

        if (e.object.firstClickTimer !== null) {
            props.onContextMenu(faceName);
            e.object.firstClickTimer = null;
            return;
        } else {

            e.object.firstClickTimer = setTimeout(() => {
                e.object.firstClickTimer = null;
            }, 350);

        }


    }

    const commonProps = {
        args: [cubeSize / 3, cubeSize / 3],
        onPointerDown: _onPointerDown,
        onPointerUp: _onPointerUp,
        onDoubleClick: _onDoubleClick,
        onContextMenu: _onContextMenu,
    };

        


    return (
        <>
            <Suspense fallback={null}>
                {/* Main */}
                {/* Top */}
                <group faceName="control-view-cube-itself">
                    <Plane position={[0, cubeSize / 2, 0]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={mainBackgroundColor} faceName="top" {...commonProps} />
                    <Text position={[0, textPosition, 0]} fontSize={textSize} color={mainTextColor} rotation={[MathUtils.degToRad(-90), 0, 0]}>{textMainHide ? '' : locale.top}</Text>
                    {/* Bottom */}
                    <Plane position={[0, -cubeSize / 2, 0]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={mainBackgroundColor} faceName="bottom"  {...commonProps} />
                    <Text position={[0, -textPosition, 0]} fontSize={textSize} color={mainTextColor} rotation={[MathUtils.degToRad(90), 0, 0]}>{locale.bottom}</Text>
                    {/* North */}
                    <Plane position={[0, 0, cubeSize / 2]} rotation={[0, 0, 0]} material-color={mainBackgroundColor} faceName="north"  {...commonProps} />
                    <Text position={[0, 0, textPosition]} fontSize={textSize} color={mainTextColor} rotation={[0, 0, 0]}>{textMainHide ? '' : locale.north}</Text>
                    {/* South */}
                    <Plane position={[0, 0, -cubeSize / 2]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={mainBackgroundColor} faceName="south"  {...commonProps} />
                    <Text position={[0, 0, -textPosition]} fontSize={textSize} color={mainTextColor} rotation={[0, MathUtils.degToRad(180), 0]}>{textMainHide ? '' : locale.south}</Text>
                    {/* East */}
                    <Plane position={[cubeSize / 2, 0, 0]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={mainBackgroundColor} faceName="east"  {...commonProps} />
                    <Text position={[textPosition, 0, 0]} fontSize={textSize} color={mainTextColor} rotation={[0, MathUtils.degToRad(90), 0]}>{textMainHide ? '' : locale.east}</Text>
                    {/* West */}
                    <Plane position={[-cubeSize / 2, 0, 0]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={mainBackgroundColor} faceName="west"  {...commonProps} />
                    <Text position={[-textPosition, 0, 0]} fontSize={textSize} color={mainTextColor} rotation={[0, MathUtils.degToRad(-90), 0]}>{textMainHide ? '' : locale.west}</Text>
                    {/* Vertical Edges */}
                    {/* North East Parallel to North */}
                    <Plane position={[cubeSize / 3, 0, cubeSize / 2]} rotation={[0, 0, 0]} material-color={edgeBackgroundColor} faceName="northEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, 0, textPosition]} fontSize={textSize} color={edgeTextColor} rotation={[0, 0, 0]}>{textEdgeHide ? '' : locale.northEast}</Text>
                    {/* North East Parallel to East */}
                    <Plane position={[cubeSize / 2, 0, cubeSize / 3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={edgeBackgroundColor} faceName="northEast"  {...commonProps} />
                    <Text position={[textPosition, 0, cubeSize / 3]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(90), 0]}>{textEdgeHide ? '' : locale.northEast}</Text>
                    {/* North West Parallel to North */}nortEast
                    <Plane position={[-cubeSize / 3, 0, cubeSize / 2]} rotation={[0, 0, 0]} material-color={edgeBackgroundColor} faceName="northWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, 0, textPosition]} fontSize={textSize} color={edgeTextColor} rotation={[0, 0, 0]}>{textEdgeHide ? '' : locale.northWest}</Text>
                    {/* North West Parallel to West */}
                    <Plane position={[-cubeSize / 2, 0, cubeSize / 3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={edgeBackgroundColor} faceName="northWest"  {...commonProps} />
                    <Text position={[-textPosition, 0, cubeSize / 3]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(-90), 0]}>{textEdgeHide ? '' : locale.northWest}</Text>
                    {/* South East Parallel to South */}
                    <Plane position={[cubeSize / 3, 0, -cubeSize / 2]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={edgeBackgroundColor} faceName="southEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, 0, -textPosition]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(180), 0]}>{textEdgeHide ? '' : locale.southEast}</Text>
                    {/* South East Parallel to East */}
                    <Plane position={[cubeSize / 2, 0, -cubeSize / 3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={edgeBackgroundColor} faceName="southEast"  {...commonProps} />
                    <Text position={[textPosition, 0, -cubeSize / 3]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(90), 0]}>{textEdgeHide ? '' : locale.southEast}</Text>
                    {/* South West Parallel to South */}
                    <Plane position={[-cubeSize / 3, 0, -cubeSize / 2]} rotation={[MathUtils.degToRad(0), MathUtils.degToRad(180), 0]} material-color={edgeBackgroundColor} faceName="southWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, 0, -textPosition]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(180), 0]}>{textEdgeHide ? '' : locale.southWest}</Text>
                    {/* South West Parallel to West */}
                    <Plane position={[-cubeSize / 2, 0, -cubeSize / 3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={edgeBackgroundColor} faceName="southWest"  {...commonProps} />
                    <Text position={[-textPosition, 0, -cubeSize / 3]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(-90), 0]}>{textEdgeHide ? '' : locale.southWest}</Text>
                    {/* Horizontal Edges */}
                    {/* Top North face to North */}
                    <Plane position={[0, cubeSize / 3, cubeSize / 2]} rotation={[0, 0, 0]} material-color={edgeBackgroundColor} faceName="topNorth"  {...commonProps} />
                    <Text position={[0, cubeSize / 3, textPosition]} fontSize={textSize} color={edgeTextColor} rotation={[0, 0, 0]}>{textEdgeHide ? '' : locale.topNorth}</Text>
                    {/* Top North face to Top */}
                    <Plane position={[0, cubeSize / 2, cubeSize / 3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={edgeBackgroundColor} faceName="topNorth"  {...commonProps} />
                    <Text position={[0, textPosition, cubeSize / 3]} fontSize={textSize} color={edgeTextColor} rotation={[MathUtils.degToRad(-90), 0, 0]}>{textEdgeHide ? '' : locale.topNorth}</Text>
                    {/* Top South face to South */}
                    <Plane position={[0, cubeSize / 3, -cubeSize / 2]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={edgeBackgroundColor} faceName="topSouth"  {...commonProps} />
                    <Text position={[0, cubeSize / 3, -textPosition]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(180), 0]}>{textEdgeHide ? '' : locale.topSouth}</Text>
                    {/* Top South face to Top */}
                    <Plane position={[0, cubeSize / 2, -cubeSize / 3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={edgeBackgroundColor} faceName="topSouth"  {...commonProps} />
                    <Text position={[0, textPosition, -cubeSize / 3]} fontSize={textSize} color={edgeTextColor} rotation={[MathUtils.degToRad(-90), 0, 0]}>{textEdgeHide ? '' : locale.topSouth}</Text>
                    {/* Top East face to East */}
                    <Plane position={[cubeSize / 2, cubeSize / 3, 0]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={edgeBackgroundColor} faceName="topEast"  {...commonProps} />
                    <Text position={[textPosition, cubeSize / 3, 0]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(90), 0]}>{textEdgeHide ? '' : locale.topEast}</Text>
                    {/* Top East face to Top */}
                    <Plane position={[cubeSize / 3, cubeSize / 2, 0]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={edgeBackgroundColor} faceName="topEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, textPosition, 0]} fontSize={textSize} color={edgeTextColor} rotation={[MathUtils.degToRad(-90), 0, 0]}>{textEdgeHide ? '' : locale.topEast}</Text>
                    {/* Top West face to West */}
                    <Plane position={[-cubeSize / 2, cubeSize / 3, 0]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={edgeBackgroundColor} faceName="topWest"  {...commonProps} />
                    <Text position={[-textPosition, cubeSize / 3, 0]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(-90), 0]}>{textEdgeHide ? '' : locale.topWest}</Text>
                    {/* Top West face to Top */}
                    <Plane position={[-cubeSize / 3, cubeSize / 2, 0]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={edgeBackgroundColor} faceName="topWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, textPosition, 0]} fontSize={textSize} color={edgeTextColor} rotation={[MathUtils.degToRad(-90), 0, 0]}>{textEdgeHide ? '' : locale.topWest}</Text>
                    {/* Bottom North face to North */}
                    <Plane position={[0, -cubeSize / 3, cubeSize / 2]} rotation={[0, 0, 0]} material-color={edgeBackgroundColor} faceName="bottomNorth"  {...commonProps} />
                    <Text position={[0, -cubeSize / 3, textPosition]} fontSize={textSize} color={edgeTextColor} rotation={[0, 0, 0]}>{textEdgeHide ? '' : locale.bottomNorth}</Text>
                    {/* Bottom North face to Bottom */}
                    <Plane position={[0, -cubeSize / 2, cubeSize / 3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={edgeBackgroundColor} faceName="bottomNorth"  {...commonProps} />
                    <Text position={[0, -textPosition, cubeSize / 3]} fontSize={textSize} color={edgeTextColor} rotation={[MathUtils.degToRad(90), 0, 0]}>{textEdgeHide ? '' : locale.bottomNorth}</Text>
                    {/* Bottom South face to South */}
                    <Plane position={[0, -cubeSize / 3, -cubeSize / 2]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={edgeBackgroundColor} faceName="bottomSouth"  {...commonProps} />
                    <Text position={[0, -cubeSize / 3, -textPosition]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(180), 0]}>{textEdgeHide ? '' : locale.bottomSouth}</Text>
                    {/* Bottom South face to Bottom */}
                    <Plane position={[0, -cubeSize / 2, -cubeSize / 3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={edgeBackgroundColor} faceName="bottomSouth"  {...commonProps} />
                    <Text position={[0, -textPosition, -cubeSize / 3]} fontSize={textSize} color={edgeTextColor} rotation={[MathUtils.degToRad(90), 0, 0]}>{textEdgeHide ? '' : locale.bottomSouth}</Text>
                    {/* Bottom East face to East */}
                    <Plane position={[cubeSize / 2, -cubeSize / 3, 0]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={edgeBackgroundColor} faceName="bottomEast"  {...commonProps} />
                    <Text position={[textPosition, -cubeSize / 3, 0]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(90), 0]}>{textEdgeHide ? '' : locale.bottomEast}</Text>
                    {/* Bottom East face to Bottom */}
                    <Plane position={[cubeSize / 3, -cubeSize / 2, 0]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={edgeBackgroundColor} faceName="bottomEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, -textPosition, 0]} fontSize={textSize} color={edgeTextColor} rotation={[MathUtils.degToRad(90), 0, 0]}>{textEdgeHide ? '' : locale.bottomEast}</Text>
                    {/* Bottom West face to West */}
                    <Plane position={[-cubeSize / 2, -cubeSize / 3, 0]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={edgeBackgroundColor} faceName="bottomWest"  {...commonProps} />
                    <Text position={[-textPosition, -cubeSize / 3, 0]} fontSize={textSize} color={edgeTextColor} rotation={[0, MathUtils.degToRad(-90), 0]}>{textEdgeHide ? '' : locale.bottomWest}</Text>
                    {/* Bottom West face to Bottom */}
                    <Plane position={[-cubeSize / 3, -cubeSize / 2, 0]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={edgeBackgroundColor} faceName="bottomWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, -textPosition, 0]} fontSize={textSize} color={edgeTextColor} rotation={[MathUtils.degToRad(90), 0, 0]}>{textEdgeHide ? '' : locale.bottomWest}</Text>
                    {/* Corners */}
                    {/* Top North East */}
                    {/* Top North East face to North */}
                    <Plane position={[cubeSize / 3, cubeSize / 3, cubeSize / 2]} rotation={[0, 0, 0]} material-color={cornerBackgroundColor} faceName="topNorthEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, cubeSize / 3, textPosition]} fontSize={textSize} color={cornerTextColor} rotation={[0, 0, 0]}>{textCornerHide ? '' : locale.topNorthEast}</Text>
                    {/* Top North East face to Top */}
                    <Plane position={[cubeSize / 3, cubeSize / 2, cubeSize / 3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={cornerBackgroundColor} faceName="topNorthEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, textPosition, cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[MathUtils.degToRad(-90), 0, 0]}>{textCornerHide ? '' : locale.topNorthEast}</Text>
                    {/* Top North East face to East */}
                    <Plane position={[cubeSize / 2, cubeSize / 3, cubeSize / 3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={cornerBackgroundColor} faceName="topNorthEast"  {...commonProps} />
                    <Text position={[textPosition, cubeSize / 3, cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(90), 0]}>{textCornerHide ? '' : locale.topNorthEast}</Text>
                    {/* Top North West */}
                    {/* Top North West face to North */}
                    <Plane position={[-cubeSize / 3, cubeSize / 3, cubeSize / 2]} rotation={[0, 0, 0]} material-color={cornerBackgroundColor} faceName="topNorthWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, cubeSize / 3, textPosition]} fontSize={textSize} color={cornerTextColor} rotation={[0, 0, 0]}>{textCornerHide ? '' : locale.topNorthWest}</Text>
                    {/* Top North West face to Top */}
                    <Plane position={[-cubeSize / 3, cubeSize / 2, cubeSize / 3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={cornerBackgroundColor} faceName="topNorthWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, textPosition, cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[MathUtils.degToRad(-90), 0, 0]}>{textCornerHide ? '' : locale.topNorthWest}</Text>
                    {/* Top North West face to West */}
                    <Plane position={[-cubeSize / 2, cubeSize / 3, cubeSize / 3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={cornerBackgroundColor} faceName="topNorthWest"  {...commonProps} />
                    <Text position={[-textPosition, cubeSize / 3, cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(-90), 0]}>{textCornerHide ? '' : locale.topNorthWest}</Text>
                    {/* Top South East */}
                    {/* Top South East face to South */}
                    <Plane position={[cubeSize / 3, cubeSize / 3, -cubeSize / 2]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={cornerBackgroundColor} faceName="topSouthEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, cubeSize / 3, -textPosition]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(180), 0]}>{textCornerHide ? '' : locale.topSouthEast}</Text>
                    {/* Top South East face to Top */}
                    <Plane position={[cubeSize / 3, cubeSize / 2, -cubeSize / 3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={cornerBackgroundColor} faceName="topSouthEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, textPosition, -cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[MathUtils.degToRad(-90), 0, 0]}>{textCornerHide ? '' : locale.topSouthEast}</Text>
                    {/* Top South East face to East */}
                    <Plane position={[cubeSize / 2, cubeSize / 3, -cubeSize / 3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={cornerBackgroundColor} faceName="topSouthEast"  {...commonProps} />
                    <Text position={[textPosition, cubeSize / 3, -cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(90), 0]}>{textCornerHide ? '' : locale.topSouthEast}</Text>
                    {/* Top South West */}
                    {/* Top South West face to South */}
                    <Plane position={[-cubeSize / 3, cubeSize / 3, -cubeSize / 2]} rotation={[MathUtils.degToRad(0), MathUtils.degToRad(180), 0]} material-color={cornerBackgroundColor} faceName="topSouthWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, cubeSize / 3, -textPosition]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(180), 0]}>{textCornerHide ? '' : locale.topSouthWest}</Text>
                    {/* Top South West face to Top */}
                    <Plane position={[-cubeSize / 3, cubeSize / 2, -cubeSize / 3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={cornerBackgroundColor} faceName="topSouthWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, textPosition, -cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[MathUtils.degToRad(-90), 0, 0]}>{textCornerHide ? '' : locale.topSouthWest}</Text>
                    {/* Top South West face to West */}
                    <Plane position={[-cubeSize / 2, cubeSize / 3, -cubeSize / 3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={cornerBackgroundColor} faceName="topSouthWest"  {...commonProps} />
                    <Text position={[-textPosition, cubeSize / 3, -cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(-90), 0]}>{textCornerHide ? '' : locale.topSouthWest}</Text>
                    {/* Bottom North East */}
                    {/* Bottom North East face to North */}
                    <Plane position={[cubeSize / 3, -cubeSize / 3, cubeSize / 2]} rotation={[0, 0, 0]} material-color={cornerBackgroundColor} faceName="bottomNorthEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, -cubeSize / 3, textPosition]} fontSize={textSize} color={cornerTextColor} rotation={[0, 0, 0]}>{textCornerHide ? '' : locale.bottomNorthEast}</Text>
                    {/* Bottom North East face to Bottom */}
                    <Plane position={[cubeSize / 3, -cubeSize / 2, cubeSize / 3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={cornerBackgroundColor} faceName="bottomNorthEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, -textPosition, cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[MathUtils.degToRad(90), 0, 0]}>{textCornerHide ? '' : locale.bottomNorthEast}</Text>
                    {/* Bottom North East face to East */}
                    <Plane position={[cubeSize / 2, -cubeSize / 3, cubeSize / 3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={cornerBackgroundColor} faceName="bottomNorthEast"  {...commonProps} />
                    <Text position={[textPosition, -cubeSize / 3, cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(90), 0]}>{textCornerHide ? '' : locale.bottomNorthEast}</Text>
                    {/* Bottom North West */}
                    {/* Bottom North West face to North */}
                    <Plane position={[-cubeSize / 3, -cubeSize / 3, cubeSize / 2]} rotation={[0, 0, 0]} material-color={cornerBackgroundColor} faceName="bottomNorthWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, -cubeSize / 3, textPosition]} fontSize={textSize} color={cornerTextColor} rotation={[0, 0, 0]}>{textCornerHide ? '' : locale.bottomNorthWest}</Text>
                    {/* Bottom North West face to Bottom */}
                    <Plane position={[-cubeSize / 3, -cubeSize / 2, cubeSize / 3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={cornerBackgroundColor} faceName="bottomNorthWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, -textPosition, cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[MathUtils.degToRad(90), 0, 0]}>{textCornerHide ? '' : locale.bottomNorthWest}</Text>
                    {/* Bottom North West face to West */}
                    <Plane position={[-cubeSize / 2, -cubeSize / 3, cubeSize / 3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={cornerBackgroundColor} faceName="bottomNorthWest"  {...commonProps} />
                    <Text position={[-textPosition, -cubeSize / 3, cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(-90), 0]}>{textCornerHide ? '' : locale.bottomNorthWest}</Text>
                    {/* Bottom South East */}
                    {/* Bottom South East face to South */}
                    <Plane position={[cubeSize / 3, -cubeSize / 3, -cubeSize / 2]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={cornerBackgroundColor} faceName="bottomSouthEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, -cubeSize / 3, -textPosition]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(180), 0]}>{textCornerHide ? '' : locale.bottomSouthEast}</Text>
                    {/* Bottom South East face to Bottom */}
                    <Plane position={[cubeSize / 3, -cubeSize / 2, -cubeSize / 3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={cornerBackgroundColor} faceName="bottomSouthEast"  {...commonProps} />
                    <Text position={[cubeSize / 3, -textPosition, -cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[MathUtils.degToRad(90), 0, 0]}>{textCornerHide ? '' : locale.bottomSouthEast}</Text>
                    {/* Bottom South East face to East */}
                    <Plane position={[cubeSize / 2, -cubeSize / 3, -cubeSize / 3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={cornerBackgroundColor} faceName="bottomSouthEast"  {...commonProps} />
                    <Text position={[textPosition, -cubeSize / 3, -cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(90), 0]}>{textCornerHide ? '' : locale.bottomSouthEast}</Text>
                    {/* Bottom South West */}
                    {/* Bottom South West face to South */}
                    <Plane position={[-cubeSize / 3, -cubeSize / 3, -cubeSize / 2]} rotation={[MathUtils.degToRad(0), MathUtils.degToRad(180), 0]} material-color={cornerBackgroundColor} faceName="bottomSouthWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, -cubeSize / 3, -textPosition]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(180), 0]}>{textCornerHide ? '' : locale.bottomSouthWest}</Text>
                    {/* Bottom South West face to Bottom */}
                    <Plane position={[-cubeSize / 3, -cubeSize / 2, -cubeSize / 3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={cornerBackgroundColor} faceName="bottomSouthWest"  {...commonProps} />
                    <Text position={[-cubeSize / 3, -textPosition, -cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[MathUtils.degToRad(90), 0, 0]}>{textCornerHide ? '' : locale.bottomSouthWest}</Text>
                    {/* Bottom South West face to West */}
                    <Plane position={[-cubeSize / 2, -cubeSize / 3, -cubeSize / 3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={cornerBackgroundColor} faceName="bottomSouthWest"  {...commonProps} />
                    <Text position={[-textPosition, -cubeSize / 3, -cubeSize / 3]} fontSize={textSize} color={cornerTextColor} rotation={[0, MathUtils.degToRad(-90), 0]}>{textCornerHide ? '' : locale.bottomSouthWest}</Text>
                </group>
            </Suspense>

        </>
    )
}

export default ViewCube;