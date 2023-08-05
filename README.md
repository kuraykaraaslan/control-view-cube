Camera Control Cube with React and @react-three/drei

This project is a simple example of using React and the @react-three/drei library to create a 3D cube that can be controlled using the camera. The cube is rendered using the Three.js library, and camera controls are implemented for easy navigation around the scene.

Features
Interactive 3D cube that responds to camera controls.
Smooth and intuitive camera navigation using mouse and keyboard inputs.
Built with React for a modular and component-based structure.
Utilizes the @react-three/drei library for easy integration of Three.js components.
Minimal setup and configuration required.
Getting Started
Follow these steps to get the project up and running on your local machine:

Clone the repository:

bash
Copy code
git clone https://github.com/kuraykaraaslan/control-view-cube.git
Navigate to the project directory:

bash
Copy code
cd control-view-cub
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser:

Visit http://localhost:3000 in your web browser to see the camera control cube in action.


## One Line Inject
just put
<ControlViewCube /> in canvas and go.

Project Structure
The project structure is designed to keep the code organized and easy to understand. Here's an overview of the main files and directories:

src/components/CameraControlCube.js: The main React component that renders the 3D cube and sets up camera controls.
src/index.js: Entry point of the application.
public/index.html: HTML template for the application.
Dependencies
React: A JavaScript library for building user interfaces.
@react-three/drei: A library of useful helpers and abstractions for building with Three.js and React.
Three.js: A JavaScript 3D library that makes it easy to create and display 3D graphics in the browser.
Contributing
Contributions are welcome! If you'd like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
Note: This is a basic README template to get you started. Feel free to customize it according to your project's specific details and requirements.


# Control View Cube Default Props

Below is a table listing the default properties for the `ControlViewCube` component. These properties define various settings and styles for the control view cube.

| Property                | Default Value       | Description                                                                                                                                                                                                                                     |
|-------------------------|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| root_id                 | 'control-view-cube-root' | The ID of the root element for the control view cube.                                                                                                                                                                                           |
| location                | 'top-right'         | The location of the control view cube ('top-right', 'top-left', 'bottom-right', 'bottom-left').                                                                                                                                                |
| div_style               | See below           | CSS styles for the container div of the control view cube.                                                                                                                                                                                     |
| canvas_style            | See below           | CSS styles for the canvas element of the control view cube.                                                                                                                                                                                     |
| cube                    | See below           | Configuration options for the cube appearance and behavior.                                                                                                                                                                                    |
| canvas_settings         | {}                  | Additional settings for the canvas used to render the cube.                                                                                                                                                                                    |
| camera_controls_settings | See below           | Configuration options for camera controls.                                                                                                                                                                                                     |
| locale                  | See below           | Localization strings for different cube faces.                                                                                                                                                                                                |

## Default Styles and Configuration

### `div_style` Default




