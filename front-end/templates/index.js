// 3rd Party //
import * as reactDOM from 'react-dom';

// Styles //
<%- tailwind ? `
// Import tailwind first to give our styles preference //
import 'tailwindcss/tailwind.css';` : null %>
import './styles/style.scss';

// Components //
import App from './components/App'

// Render //
reactDOM.render(<App/>, document.getElementById('app'));
