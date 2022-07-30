import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';

import PlayCover from './PlayCover';
import './index.css';

ReactDOM.render(
    <HashRouter>
        <PlayCover />
    </HashRouter>,
    document.getElementById('root')
);
