import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvide from './componenet/ThemeProvide.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <ThemeProvide>
            <App />
            </ThemeProvide>
        </Provider>
    </PersistGate>
)
