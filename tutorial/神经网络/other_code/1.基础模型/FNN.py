import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def ReLU(x):
    return np.maximum(0, x)


N = [3,5,5,3]
weights = []
biases = []

for i in range(len(N)-1):
    W = np.random.randn(N[i+1], N[i])
    b = np.random.randn(N[i+1], 1)
    weights.append(W)
    biases.append(b)

X = np.array([[1], [2], [3]])

z1 = np.dot(weights[0], X) + biases[0]
a1 = sigmoid(z1)
z2 = np.dot(weights[1], a1) + biases[1]
a2 = sigmoid(z2)
z3 = np.dot(weights[2], a2) + biases[2]
a3 = sigmoid(z3)

print('第一层的净输入：\n',z1)
print('第一层的激活值：\n',a1)
print('第二层的净输入：\n',z2)
print('第二层的激活值：\n',a2)
print('第三层的净输入：\n',z3)
print('第三层的激活值：\n',a3)
