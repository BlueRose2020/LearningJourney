import numpy as np
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
    x = input("input\n")
    if x == "q":
        break
    x = x.split(' ')
    x = np.array([[float(x[0])], [float(x[1])]])

    Z = []
    A = [x]

    for j in range(len(N)-1):
        Z.append(np.dot(weights[j], A[j]) + biases[j])
        A.append(sigmoid(Z[j]))
    print(1 if A[-1] > 0.5 else 0)