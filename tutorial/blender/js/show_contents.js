import { show_contents } from '../../../JS/contents_function.js';

fetch('../../file_names.json')
  .then(res => res.json())
  .then(files => {
    show_contents(files);
  })