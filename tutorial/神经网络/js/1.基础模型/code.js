import { str2html } from "../../../../JS/code_box.js";

let active_func_code = `import numpy as np
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def ReLU(x):
    return np.maximum(0, x)
`

let init_code = `N = [3,5,5,3]
weights = []
biases = []

for i in range(len(N)-1):
    W = np.random.randn(N[i+1], N[i])
    b = np.random.randn(N[i+1], 1)
    weights.append(W)
    biases.append(b)

X = np.array([[1], [2], [3]])
`

let forward_code = `z1 = np.dot(weights[0], X) + biases[0]
a1 = sigmoid(z1)
z2 = np.dot(weights[1], a1) + biases[1]
a2 = sigmoid(z2)
z3 = np.dot(weights[2], a2) + biases[2]
a3 = sigmoid(z3)

print('第一层的净输入：\\n',z1)
print('第一层的活性值：\\n',a1)
print('第二层的净输入：\\n',z2)
print('第二层的活性值：\\n',a2)
print('第三层的净输入：\\n',z3)
print('第三层的活性值：\\n',a3)`

let forward_code_modified = `Z = []
A = [X]

for i in range(len(N)-1):
    Z.append(np.dot(weights[i], A[i]) + biases[i])
    A.append(sigmoid(Z[i]))
    print('第%d层的净输入：\\n'%(i+1),Z[i])
    print('第%d层的激活值：\\n'%(i+1),A[i+1])`

let backward_code = `def BSE_dsigmoid(y_pred, y):
    return y_pred - y

def dsigmoid(x):
    return sigmoid(x) * (1 - sigmoid(x))`

let set_data = `data_len = 100
X = [np.random.randn(2,1) for _ in range(data_len)]
Y = [1 if x[0]*x[1] > 0 else 0 for x in X]`

let modified_forward_code_with_dataset=`N = [2,5,1]
weights = []
biases = []

for i in range(len(N)-1):
    W = np.random.randn(N[i+1], N[i])
    b = np.random.randn(N[i+1], 1)
    weights.append(W)
    biases.append(b)

data_len = 100
X = [np.random.randn(2,1) for _ in range(data_len)]
Y = [1 if x[0]*x[1] > 0 else 0 for x in X]

for i in range(data_len):
    Z = []
    A = [X[i]]

    for j in range(len(N)-1):
        Z.append(np.dot(weights[j], A[j]) + biases[j])
        A.append(sigmoid(Z[j]))`

let get_dout = `dout = [0 for _ in range(len(N)-1)]
for i in range(data_len):
    Z = []
    A = [X[i]]

    for j in range(len(N)-1):
        Z.append(np.dot(weights[j], A[j]) + biases[j])
        A.append(sigmoid(Z[j]))
        
    dout[-1] = BSE_dsigmoid(A[-1], Y[i])
    for j in range(len(dout)-2,-1,-1):
        dout[j] = np.dot(weights[j+1].T, dout[j+1]) * dsigmoid(Z[j])`

let upgrade = `    for j in range(len(dout)):
        weights[j] -= np.dot(dout[j], A[j].T)
        biases[j] -= dout[j]`

let verify = `while True:
    x = input("input\\n")
    if x == "q":
        break
    x = x.split(' ')
    x = np.array([[float(x[0])], [float(x[1])]])

    Z = []
    A = [x]

    for j in range(len(N)-1):
        Z.append(np.dot(weights[j], A[j]) + biases[j])
        A.append(sigmoid(Z[j]))
    print(1 if A[-1] > 0.5 else 0)`

let complete = `import numpy as np
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def ReLU(x):
    return np.maximum(0, x)

def BSE_dsigmoid(y_pred, y):
    return y_pred - y

def dsigmoid(x):
    return sigmoid(x) * (1 - sigmoid(x))

N = [2,5,1]
weights = []
biases = []

for i in range(len(N)-1):
    W = np.random.randn(N[i+1], N[i])
    b = np.random.randn(N[i+1], 1)
    weights.append(W)
    biases.append(b)

data_len = 100
X = [np.random.randn(2,1) for _ in range(data_len)]
Y = [1 if x[0]*x[1] > 0 else 0 for x in X]


dout = [0 for _ in range(len(N)-1)]
for i in range(data_len):
    Z = []
    A = [X[i]]

    for j in range(len(N)-1):
        Z.append(np.dot(weights[j], A[j]) + biases[j])
        A.append(sigmoid(Z[j]))
        
    dout[-1] = BSE_dsigmoid(A[-1], Y[i])
    for j in range(len(dout)-2,-1,-1):
        dout[j] = np.dot(weights[j+1].T, dout[j+1]) * dsigmoid(Z[j])

    for j in range(len(dout)):
        weights[j] -= np.dot(dout[j], A[j].T)
        biases[j] -= dout[j]

while True:
    x = input("input\\n")
    if x == "q":
        break
    x = x.split(' ')
    x = np.array([[float(x[0])], [float(x[1])]])

    Z = []
    A = [x]

    for j in range(len(N)-1):
        Z.append(np.dot(weights[j], A[j]) + biases[j])
        A.append(sigmoid(Z[j]))
    print(1 if A[-1] > 0.5 else 0)`

let code_list = [active_func_code, init_code, forward_code,forward_code_modified,backward_code,set_data,
    modified_forward_code_with_dataset,get_dout,upgrade,verify,complete];

let code_box = document.getElementsByClassName('code-box');

for (let i = 0; i < code_box.length; i++) {
    str2html(code_box[i], code_list[i], 'Python')
}