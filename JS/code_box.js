export {str2html};

let key_word = ['def','import','as','from','with','if','else','elif','for','in','while','return','break','continue','try','except','finally','raise']

function str2html(code_box, str, code_language) {
    let top_bar = document.createElement('div');
    let code = document.createElement('code');
    
    top_bar.className = "code-top-bar";
    top_bar.innerHTML = code_language;
    str.split('\n').forEach(line => {
        let p = document.createElement('p');
        while (line.includes(' ')) {
            line = line.replace(' ','&ensp;');
        }
        line = '&ensp;'+line;
        for (let i = 0; i < key_word.length; i++) {
            if (line.includes('&ensp;'+key_word[i]+'&ensp;') || line.includes('&ensp;'+key_word[i]+':')) {
                line = line.replace('&ensp;'+key_word[i], '&ensp;<span class="key-word">' + key_word[i] + '</span>');
            }
        }

        p.innerHTML = line;
        code.appendChild(p);
    });
    code_box.appendChild(top_bar);
    code_box.appendChild(code);
}
function in_str_count(str, char) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == char) {
            count++;
        }
    }
    return count;
}