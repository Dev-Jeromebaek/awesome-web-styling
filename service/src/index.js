import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/public/stylesheets/index.css';
import '../src/public/stylesheets/chart.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

ReactDOM.render(<Root />, document.getElementById('root'));
