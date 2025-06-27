import { render } from 'preact';
import { App } from './src/components/App';

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/mathbook/service-worker.js');
    });
}

render(<App />, document.getElementById('app'));