export{ show_contents };

function show_contents(file_dict) {
    let side_bar = document.getElementsByClassName('side-bar')[0];
    let dic = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 }
  
    for (let i = 0; i < file_dict.length; i++) {
      let child = document.createElement('div');
      let dir_name = document.createElement('h1');
      dir_name.innerHTML = file_dict[i]["name"];
      child.appendChild(dir_name);
  
      if (file_dict[i]["name"].includes("附录") || file_dict[i]["name"].includes("参考资料")) {
        dir_name.style.fontSize = '13rem';
      }

      for (let j = 0; j < file_dict[i]["children"].length; j++) {
        let file_name_div = document.createElement('div');
        let file_name_p = document.createElement('a');
        let dic_name = dic[file_dict[i]["name"].split('.')[0]] + '.' + file_dict[i]["name"].split('.')[1];
  
        file_name_div.className = 'children-file-name';
        file_name_p.innerHTML = file_dict[i]["children"][j].split('.html')[0];
        file_name_p.href = '../' + dic_name + '/' + file_dict[i]["children"][j];

        file_name_div.appendChild(file_name_p);
        child.appendChild(file_name_div);
      }
  
      side_bar.appendChild(child);
    }
  }