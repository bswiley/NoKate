// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class Editor {
  constructor() {
    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Load the content of the editor from indexedDB or localStorage or use the header as a fallback
    this.loadEditorContent();

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }

  async loadEditorContent() {
    try {
      // Get the content from indexedDB
      const data = await getDb();

      if (data) {
        console.info('Loaded data from IndexedDB, injecting into the editor');
        this.editor.setValue(data);
      } else {
        // Fallback to localStorage if no data in indexedDB
        const localData = localStorage.getItem('content');
        this.editor.setValue(localData || header);
      }
    } catch (error) {
      console.error('Error loading data from indexedDB:', error);
      // Fallback to localStorage if any error occurs while loading data from indexedDB
      const localData = localStorage.getItem('content');
      this.editor.setValue(localData || header);
    }
  }
}