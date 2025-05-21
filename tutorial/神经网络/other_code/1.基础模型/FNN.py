# import numpy as np
# import random

# def sigmoid(x):
#     return 1 / (1 + np.exp(-x))

# def ReLU(x):
#     return np.maximum(0, x)

# def cross_entropy_loss(y_true, y_pred):
#     return -y_true*np.log(y_pred)-(1-y_true)*np.log(1-y_pred)

# def dcross_entropy_loss(y_true, y_pred):
#     return y_pred-y_true
    
# def dsigmoid(x):
#     return sigmoid(x) * (1 - sigmoid(x))


# def acc(x_data,y_data,weights,bias):
#     acc_sum = 0
#     for i in range(len(x_data)):
#         x = x_data[i]
#         y_true = y_data[i]
#         a[0] = x
#         for l in range(len(layers)-1):
#             z[l] = weights[l] @ a[l] + bias[l]
#             a[l+1] = sigmoid(z[l])
#         acc_sum += (a[-1]>0.5) == y_true
#     print("acc:%.2f"%(acc_sum/len(x_data)))

# layers = [1,10,1]

# weights = [np.random.randn(x,y) for x,y in zip(layers[1:],layers[:-1])]
# bias = [np.zeros((n,1)) for n in layers[1:]]

# z = [np.zeros((n,1)) for n in layers[1:]]
# a = [np.zeros((n,1)) for n in layers]

# dout = [np.zeros((n,1)) for n in layers[1:]]

# # grad_w = [np.random.randn(x,y) for x,y in zip(layers[1:],layers[:-1])]
# # grad_b = [np.zeros(n) for n in layers[:-1]]

# lr = 0.01

# x_data = np.random.randn(10000,1,1)*100
# y_data = [np.array([[0]]) if x_data[i]<0 else np.array([[1]]) for i in range(len(x_data))]
# index = [i for i in range(len(x_data))]

# epochs = 1  
# for epoch in range(epochs):
#     random.shuffle(index)

#     for i in index:
#         x = x_data[i]
#         y_true = y_data[i]
#         a[0] = x

#         for l in range(len(layers)-1):
#             z[l] = weights[l] @ a[l] + bias[l]
#             a[l+1] = sigmoid(z[l])

#         dout[-1] = dcross_entropy_loss(y_true,a[-1])
#         for l in range(len(dout)-2,-1,-1):
#             dout[l] = dsigmoid(z[l])*(weights[l+1].T @ dout[l+1])

#         for l in range(len(bias)):
#             weights[l] -= lr*dout[l] @ a[l].T
#             bias[l] -= lr*dout[l]

# acc(x_data,y_data,weights,bias)
# while True:
#     x = input("x:")
#     if x=='q':
#         break
#     a[0] = np.array([[float(x)]])
    
#     for l in range(len(layers)-1):
#         z[l] = weights[l] @ a[l] + bias[l]
#         a[l+1] = sigmoid(z[l])
#     print(a[-1])
#     if a[-1]<0.5:
#         print('负数')
#     else:
#         print('正数')
import numpy as np
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def ReLU(x):
    return np.maximum(0, x)

N = [3,5,5,3,3]
weights = []
biases = []

for i in range(len(N)-1):
    W = np.random.randn(N[i+1], N[i])
    b = np.random.randn(N[i+1], 1)
    weights.append(W)
    biases.append(b)

X = np.array([[1], [2], [3]])
Z = []
A = [X]

for i in range(len(N)-1):
    Z.append(np.dot(weights[i], A[i]) + biases[i])
    A.append(sigmoid(Z[i]))
    print('第%d层的净输入：\n'%(i+1),Z[i])
    print('第%d层的激活值：\n'%(i+1),A[i+1])