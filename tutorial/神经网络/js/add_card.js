import { add_card } from '../../../JS/card_function.js';

fetch('./file_names.json')
    .then(res => res.json())
    .then(files => {
        add_card(files);
    })
