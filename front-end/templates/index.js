// 3rd Party //
import * as reactDOM from 'react-dom';

// Styles //
<%- tailwind ? `
// Import tailwind first to give our styles preference //
import 'tailwindcss/tailwind.css';` : null %>
import './src/styles/style.scss';

// Components //
import App from './src/components/App'

// Render //
reactDOM.render(<App/>, document.getElementById('app'));
