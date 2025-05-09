import os

def get_contents(path):
    file_names = os.listdir(os.path.join(path,'html'))
    dic = ['一','二','三','四','五','六','七','八','九','十']
    with open(os.path.join(path, "file_names.json"), "w",encoding='utf-8') as f:
        s = '['
        end_str = ''
        for file_name in file_names:
            children = "["
            for child in os.listdir(os.path.join(path,'html', file_name)):
                children += '"'+child+'",'
            
            if '.' in file_name:
                file_name = dic[int(file_name.split('.')[0])-1] + '.' +file_name.split('.')[-1]

            add_str = '''
        {
        \t"name":"%s",
        \t"children":%s
        },'''% (file_name, children[:-1]+']' if children != "[" else children + ']')
            if file_name == '附录':
                end_str = add_str + end_str
            elif file_name == '参考资料':
                end_str += add_str
            else:
                s += add_str
            
        s = (s + end_str)[:-1] + '\n]'
        f.write(s)

tutorial = "./tutorial/"
for directory in os.listdir(tutorial):
    get_contents(os.path.join(tutorial,directory))
