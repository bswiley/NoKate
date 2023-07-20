import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

// Check if the editor is undefined or null to display the spinner
if (!editor) {
  loadSpinner();
} else {
  // Assuming Editor class has a render method to render the editor UI
  editor.render(main);
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register the workbox service worker
  const workboxSW = new Workbox('/sw.js');
  try {
    workboxSW.register();
  } catch (error) {
    console.error('Service worker registration failed:', error);
  }
} else {
  console.error('Service workers are not supported in this browser.');
}
