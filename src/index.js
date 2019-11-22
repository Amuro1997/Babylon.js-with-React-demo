import React from 'react';
import {Provider} from "mobx-react"
import {observable, action, computed} from 'mobx'
import ReactDOM from 'react-dom';
import App from './App';
import Store from './Shared/Store';

ReactDOM.render(<App />,document.getElementById('root'));
