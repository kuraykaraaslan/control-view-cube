import React, { useRef, useEffect, useContext } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text, Plane, CameraControls, Point, Float, Group, View } from '@react-three/drei';
import { Camera, MathUtils } from 'three';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import { Suspense } from 'react';

const ControlViewCubeDefaultProps = {
    root_id: 'control-view-cube-root',
    div_style: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '130px',
        height: '130px',
        backgroundColor: 'grey',
        zIndex: '1000',
    },
    canvas_style: {
        width: '100%',
        height: '100%'
    },
    cube : {
        size: 1.5,
        main_color: 'red',
        corner_color: 'orange',
        edge_color: 'green',
        border_color: 'black',
        text_color: 'black',
        text_size: 0.1,
        text_offset: 0.005,
        text_hide: false,
        text_main_hide: false,
        text_corner_hide: true,
        text_edge_hide: true,
    },
    canvas_settings: {},
    camera_controls_settings: {
        enableRotate: true,
        enablePan: true,
        enableZoom: false,
        azimuthRotateSpeed: 0.3,
        polarRotateSpeed: 0.3,
        maxZoom: 5,
        minZoom: 5,
    },
    locale : {
        top: 'Top',
        bottom: 'Bottom',
        north: 'North',
        south: 'South',
        east: 'East',
        west: 'West',
        top_north: 'TN',
        top_south: 'TS',
        top_east: 'TE',
        top_west: 'TW',
        bottom_north: 'BN',
        bottom_south: 'BS',
        bottom_east: 'BE',
        bottom_west: 'BW',
        top_north_east: 'TNE',
        top_north_west: 'TNW',
        top_south_east: 'TSE',
        top_south_west: 'TSW',
        bottom_north_east: 'BNE',
        bottom_north_west: 'BNW',
        bottom_south_east: 'BSE',
        bottom_south_west: 'BSW',
    },
}

const Loading = () => {
    return (
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <h1>Loading...</h1>
        </div>
    )
}


const ControlViewCube = (propsIn) => {
    // Creating ref for the pseudo canvas element
    const targetCanvasElementRef = useRef(null);

    // if any prop is not defined, use the default
    const defaultProps = ControlViewCubeDefaultProps;
    //props = Object.assign({}, defaultProps, props);
    const props = Object.assign({}, defaultProps, propsIn);

    const rootElement = document.getElementById(props.root_id);

    // if the root element is not found, get canvas element
    if (!rootElement) {
        console.log('root element not found');
    }


    // set the style of the root element
    rootElement.style.position = props.div_style.position;
    rootElement.style.top = props.div_style.top;
    rootElement.style.right = props.div_style.right;
    rootElement.style.width = props.div_style.width;
    rootElement.style.height = props.div_style.height;
    rootElement.style.backgroundColor = props.div_style.backgroundColor;
    rootElement.style.zIndex = props.div_style.zIndex;

    function createCube() {
        const cube_size = props.cube.size;
        const text_position = cube_size/2 + props.cube.text_offset;

        const text_corner_hide = props.cube.text_corner_hide;
        const text_edge_hide = props.cube.text_edge_hide;
        

        return (
            <>
            {/* Top */}
            <Plane position={[0, cube_size/2, 0]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={props.cube.main_color} />
            <Text position={[0, text_position , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(-90), 0, 0]}>{text_corner_hide ? '' : props.locale.top}</Text>
            {/* Bottom */}
            <Plane position={[0, -cube_size/2, 0]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={props.cube.main_color} />
            <Text position={[0, -text_position , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(90), 0, 0]}>{props.locale.bottom}</Text>
            {/* North */}
            <Plane position={[0, 0, cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, 0, 0]} material-color={props.cube.main_color} />
            <Text position={[0, 0 , text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, 0, 0]}>{'North'}</Text>
            {/* South */}
            <Plane position={[0, 0, -cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={props.cube.main_color} />
            <Text position={[0, 0 , -text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(180), 0]}>{'South'}</Text>
            {/* East */}
            <Plane position={[cube_size/2, 0, 0]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={props.cube.main_color} />
            <Text position={[text_position, 0 , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(90), 0]}>{'East'}</Text>
            {/* West */}
            <Plane position={[-cube_size/2, 0, 0]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={props.cube.main_color} />
            <Text position={[-text_position, 0 , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(-90), 0]}>{'West'}</Text>
            {/* Vertical Edges */}
                {/* North East Parallel to North */}
                <Plane position={[cube_size/3, 0, cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[cube_size/3, 0 , text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, 0, 0]}>{'NE'}</Text>
                {/* North East Parallel to East */}
                <Plane position={[cube_size/2, 0, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={props.cube.edge_color} />
                <Text position={[text_position, 0 , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(90), 0]}>{'NE'}</Text>
                {/* North West Parallel to North */}
                <Plane position={[-cube_size/3, 0, cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[-cube_size/3, 0 , text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, 0, 0]}>{'NW'}</Text>
                {/* North West Parallel to West */}
                <Plane position={[-cube_size/2, 0, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={props.cube.edge_color} />
                <Text position={[-text_position, 0 , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(-90), 0]}>{'NW'}</Text>
                {/* South East Parallel to South */}
                <Plane position={[cube_size/3, 0, -cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={props.cube.edge_color} />
                <Text position={[cube_size/3, 0 , -text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(180), 0]}>{'SE'}</Text>
                {/* South East Parallel to East */}
                <Plane position={[cube_size/2, 0, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={props.cube.edge_color} />
                <Text position={[text_position, 0 , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(90), 0]}>{'SE'}</Text>
                {/* South West Parallel to South */}
                <Plane position={[-cube_size/3, 0, -cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(0), MathUtils.degToRad(180), 0]} material-color={props.cube.edge_color} />
                <Text position={[-cube_size/3, 0 , -text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(180), 0]}>{'SW'}</Text>
                {/* South West Parallel to West */}
                <Plane position={[-cube_size/2, 0, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={props.cube.edge_color} />
                <Text position={[-text_position, 0 , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(-90), 0]}>{'SW'}</Text>
            {/* Horizontal Edges */}
                {/* Top North Face to North */}
                <Plane position={[0, cube_size/3, cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[0, cube_size/3 , text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, 0, 0]}>{'TN'}</Text>
                {/* Top North Face to Top */}
                <Plane position={[0, cube_size/2, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[0, text_position , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(-90), 0, 0]}>{'TN'}</Text>
                {/* Top South Face to South */}
                <Plane position={[0, cube_size/3, -cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={props.cube.edge_color} />
                <Text position={[0, cube_size/3 , -text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(180), 0]}>{'TS'}</Text>
                {/* Top South Face to Top */}
                <Plane position={[0, cube_size/2, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[0, text_position , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(-90), 0, 0]}>{'TS'}</Text>
                {/* Top East Face to East */}
                <Plane position={[cube_size/2, cube_size/3, 0]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={props.cube.edge_color} />
                <Text position={[text_position, cube_size/3 , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(90), 0]}>{'TE'}</Text>
                {/* Top East Face to Top */}
                <Plane position={[cube_size/3, cube_size/2, 0]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[cube_size/3, text_position , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(-90), 0, 0]}>{'TE'}</Text>
                {/* Top West Face to West */}
                <Plane position={[-cube_size/2, cube_size/3, 0]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={props.cube.edge_color} />
                <Text position={[-text_position, cube_size/3 , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(-90), 0]}>{'TW'}</Text>
                {/* Top West Face to Top */}
                <Plane position={[-cube_size/3, cube_size/2, 0]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[-cube_size/3, text_position , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(-90), 0, 0]}>{'TW'}</Text>
                {/* Bottom North Face to North */}
                <Plane position={[0, -cube_size/3, cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[0, -cube_size/3 , text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, 0, 0]}>{'BN'}</Text>
                {/* Bottom North Face to Bottom */}
                <Plane position={[0, -cube_size/2, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[0, -text_position , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(90), 0, 0]}>{'BN'}</Text>
                {/* Bottom South Face to South */}
                <Plane position={[0, -cube_size/3, -cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={props.cube.edge_color} />
                <Text position={[0, -cube_size/3 , -text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(180), 0]}>{'BS'}</Text>
                {/* Bottom South Face to Bottom */}
                <Plane position={[0, -cube_size/2, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[0, -text_position , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(90), 0, 0]}>{'BS'}</Text>
                {/* Bottom East Face to East */}
                <Plane position={[cube_size/2, -cube_size/3, 0]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={props.cube.edge_color} />
                <Text position={[text_position, -cube_size/3 , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(90), 0]}>{'BE'}</Text>
                {/* Bottom East Face to Bottom */}
                <Plane position={[cube_size/3, -cube_size/2, 0]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[cube_size/3, -text_position , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(90), 0, 0]}>{'BE'}</Text>
                {/* Bottom West Face to West */}
                <Plane position={[-cube_size/2, -cube_size/3, 0]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={props.cube.edge_color} />
                <Text position={[-text_position, -cube_size/3 , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(-90), 0]}>{'BW'}</Text>
                {/* Bottom West Face to Bottom */}
                <Plane position={[-cube_size/3, -cube_size/2, 0]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={props.cube.edge_color} />
                <Text position={[-cube_size/3, -text_position , 0]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(90), 0, 0]}>{'BW'}</Text>
            {/* Corners */}
                {/* Top North East */}
                    {/* Top North East Face to North */}
                    <Plane position={[cube_size/3, cube_size/3, cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[cube_size/3, cube_size/3 , text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, 0, 0]}>{'TNE'}</Text>
                    {/* Top North East Face to Top */}
                    <Plane position={[cube_size/3, cube_size/2, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[cube_size/3, text_position , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(-90), 0, 0]}>{'TNE'}</Text>
                    {/* Top North East Face to East */}
                    <Plane position={[cube_size/2, cube_size/3, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={props.cube.corner_color} />
                    <Text position={[text_position, cube_size/3 , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(90), 0]}>{'TNE'}</Text>
                {/* Top North West */}
                    {/* Top North West Face to North */}
                    <Plane position={[-cube_size/3, cube_size/3, cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[-cube_size/3, cube_size/3 , text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, 0, 0]}>{'TNW'}</Text>
                    {/* Top North West Face to Top */}
                    <Plane position={[-cube_size/3, cube_size/2, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[-cube_size/3, text_position , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(-90), 0, 0]}>{'TNW'}</Text>
                    {/* Top North West Face to West */}
                    <Plane position={[-cube_size/2, cube_size/3, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={props.cube.corner_color} />
                    <Text position={[-text_position, cube_size/3 , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(-90), 0]}>{'TNW'}</Text>
                {/* Top South East */}
                    {/* Top South East Face to South */}
                    <Plane position={[cube_size/3, cube_size/3, -cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={props.cube.corner_color} />
                    <Text position={[cube_size/3, cube_size/3 , -text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(180), 0]}>{'TSE'}</Text>
                    {/* Top South East Face to Top */}
                    <Plane position={[cube_size/3, cube_size/2, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[cube_size/3, text_position , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(-90), 0, 0]}>{'TSE'}</Text>
                    {/* Top South East Face to East */}
                    <Plane position={[cube_size/2, cube_size/3, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={props.cube.corner_color} />
                    <Text position={[text_position, cube_size/3 , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(90), 0]}>{'TSE'}</Text>
                {/* Top South West */}
                    {/* Top South West Face to South */}
                    <Plane position={[-cube_size/3, cube_size/3, -cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(0), MathUtils.degToRad(180), 0]} material-color={props.cube.corner_color} />
                    <Text position={[-cube_size/3, cube_size/3 , -text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(180), 0]}>{'TSW'}</Text>
                    {/* Top South West Face to Top */}
                    <Plane position={[-cube_size/3, cube_size/2, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(-90), 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[-cube_size/3, text_position , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(-90), 0, 0]}>{'TSW'}</Text>
                    {/* Top South West Face to West */}
                    <Plane position={[-cube_size/2, cube_size/3, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={props.cube.corner_color} />
                    <Text position={[-text_position, cube_size/3 , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(-90), 0]}>{'TSW'}</Text>
                {/* Bottom North East */}
                    {/* Bottom North East Face to North */}
                    <Plane position={[cube_size/3, -cube_size/3, cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[cube_size/3, -cube_size/3 , text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, 0, 0]}>{'BNE'}</Text>
                    {/* Bottom North East Face to Bottom */}
                    <Plane position={[cube_size/3, -cube_size/2, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[cube_size/3, -text_position , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(90), 0, 0]}>{'BNE'}</Text>
                    {/* Bottom North East Face to East */}
                    <Plane position={[cube_size/2, -cube_size/3, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={props.cube.corner_color} />
                    <Text position={[text_position, -cube_size/3 , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(90), 0]}>{'BNE'}</Text>
                {/* Bottom North West */}
                    {/* Bottom North West Face to North */}
                    <Plane position={[-cube_size/3, -cube_size/3, cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[-cube_size/3, -cube_size/3 , text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, 0, 0]}>{'BNW'}</Text>
                    {/* Bottom North West Face to Bottom */}
                    <Plane position={[-cube_size/3, -cube_size/2, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[-cube_size/3, -text_position , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(90), 0, 0]}>{'BNW'}</Text>
                    {/* Bottom North West Face to West */}
                    <Plane position={[-cube_size/2, -cube_size/3, cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={props.cube.corner_color} />
                    <Text position={[-text_position, -cube_size/3 , cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(-90), 0]}>{'BNW'}</Text>
                {/* Bottom South East */}
                    {/* Bottom South East Face to South */}
                    <Plane position={[cube_size/3, -cube_size/3, -cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(180), 0]} material-color={props.cube.corner_color} />
                    <Text position={[cube_size/3, -cube_size/3 , -text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(180), 0]}>{'BSE'}</Text>
                    {/* Bottom South East Face to Bottom */}
                    <Plane position={[cube_size/3, -cube_size/2, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[cube_size/3, -text_position , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(90), 0, 0]}>{'BSE'}</Text>
                    {/* Bottom South East Face to East */}
                    <Plane position={[cube_size/2, -cube_size/3, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(90), 0]} material-color={props.cube.corner_color} />
                    <Text position={[text_position, -cube_size/3 , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(90), 0]}>{'BSE'}</Text>
                {/* Bottom South West */}
                    {/* Bottom South West Face to South */}
                    <Plane position={[-cube_size/3, -cube_size/3, -cube_size/2]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(0), MathUtils.degToRad(180), 0]} material-color={props.cube.corner_color} />
                    <Text position={[-cube_size/3, -cube_size/3 , -text_position]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(180), 0]}>{'BSW'}</Text>
                    {/* Bottom South West Face to Bottom */}
                    <Plane position={[-cube_size/3, -cube_size/2, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[MathUtils.degToRad(90), 0, 0]} material-color={props.cube.corner_color} />
                    <Text position={[-cube_size/3, -text_position , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[MathUtils.degToRad(90), 0, 0]}>{'BSW'}</Text>
                    {/* Bottom South West Face to West */}
                    <Plane position={[-cube_size/2, -cube_size/3, -cube_size/3]} args={[cube_size/3, cube_size/3]} rotation={[0, MathUtils.degToRad(-90), 0]} material-color={props.cube.corner_color} />
                    <Text position={[-text_position, -cube_size/3 , -cube_size/3]} fontSize={props.cube.text_size} color={props.cube.text_color} rotation={[0, MathUtils.degToRad(-90), 0]}>{'BSW'}</Text>
            
                    
            </>
        )
    }


    function create() {

        return (
            <>
                <Suspense fallback={Loading()} />
                <Canvas>
                    <CameraControls 
                        enableRotate={props.camera_controls_settings.enableRotate}
                        enablePan={props.camera_controls_settings.enablePan}
                        enableZoom={props.camera_controls_settings.enableZoom}
                        azimuthRotateSpeed={props.camera_controls_settings.azimuthRotateSpeed}
                        polarRotateSpeed={props.camera_controls_settings.polarRotateSpeed}
                        maxZoom={props.camera_controls_settings.maxZoom}
                        minZoom={props.camera_controls_settings.minZoom}
                    />
                    {createCube()}
                </Canvas>
                        

            </>
        )
        
    }

    function render() {
        ReactDOM.render(create(), rootElement);
    }

    render();
        
    return (
        <>
        <Box position={[10, 10, 10]} args={[0.1, 0.1, 0.1]} ref={targetCanvasElementRef} material-color="yellow" />
        </>
        
    )
}

export default ControlViewCube;
