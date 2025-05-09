export{ add_card}

function add_card(file_dict) {
    let card_box = document.getElementsByClassName('card-box')[0];
    let dic = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 }
    let dic_name = '';
    for (let i = 0; i < file_dict.length; i++) {
        let child = document.createElement('a');
        child.className = 'card';

        if (file_dict[i]["name"].includes('.')) {
            dic_name = dic[file_dict[i]["name"].split('.')[0]] + '.' + file_dict[i]["name"].split('.')[1];
            child.innerHTML = file_dict[i]["name"].split('.')[1];
        }
        else {
            dic_name = file_dict[i]["name"];
            child.innerHTML = file_dict[i]["name"];
        }
            child.href = './html/' + dic_name + '/' + file_dict[i]["children"][0];
            console.log(dic_name)
        card_box.appendChild(child);
    }
}