export { Complex, Vector};

class Complex {
    constructor(real, imag) {
        if (typeof real !== 'number' || typeof imag !== 'number') {
            console.error('实部和虚部必须是实数');
            console.error('real and imag must be numbers');
        }
        if (isNaN(real) || isNaN(imag)) {
            console.error('实部和虚部必须是有效的数字');
            console.error('real and imag must be valid numbers');
        }
        this.real = real;
        this.imag = imag;
    }

    add(other) {
        if (typeof other === 'number') {
            return new Complex(this.real + other, this.imag);
        }
        else if (other instanceof Complex) {
            return new Complex(this.real + other.real, this.imag + other.imag);
        }
        else {
            console.error('加法操作数必须是数字或复数');
            console.error('The operand of the addition must be a number or a complex number');
        }
    }
    sub(other) {
        if (typeof other === 'number') {
            return new Complex(this.real - other, this.imag);
        }
        else if (other instanceof Complex) {
            return new Complex(this.real - other.real, this.imag - other.imag);
        }
        else {
            console.error('减法操作数必须是数字或复数');
            console.error('The operand of the subtraction must be a number or a complex number');
        }
    }
    mul(other) {
        if (typeof other === 'number') {
            return new Complex(this.real * other, this.imag * other);
        }
        else if (other instanceof Complex) {
            return new Complex(this.real * other.real - this.imag * other.imag, this.real * other.imag + this.imag * other.real);
        }
        else {
            console.error('乘法操作数必须是数字或复数');
            console.error('The operand of the multiplication must be a number or a complex number');
        }
    }
    div(other) {
        if (typeof other === 'number') {
            return new Complex(this.real / other, this.imag / other);
        }
        else if (other instanceof Complex) {
            let denominator = other.real * other.real + other.imag * other.imag;
            return new Complex((this.real * other.real + this.imag * other.imag) / denominator, (this.imag * other.real - this.real * other.imag) / denominator);
        }
        else {
            console.error('除法操作数必须是数字或复数');
            console.error('The operand of the division must be a number or a complex number');
        }
    }
    abs() {
        if (this.real === 0) {
            return Math.abs(this.imag);
        }
        else if (this.imag === 0) {
            return Math.abs(this.real);
        }
        else {

            return Math.sqrt(this.real * this.real + this.imag * this.imag);
        }
    }
    arg() {
        return Math.atan2(this.imag, this.real);
    }
    conjugate() {
        return new Complex(this.real, -this.imag);
    }
    toString() {
        if (this.imag >= 0) {
            return `${this.real} + ${this.imag}i`;
        } else {
            return `${this.real} - ${Math.abs(this.imag)}i`;
        }
    }
    toPolar() {
        return [this.abs(), this.arg()];
    }
    toCartesian() {
        return [this.real, this.imag];
    }
}

class Vector {
    constructor(x) {
        if (Array.isArray(x)) {
            this.vec = x;
            this.len = x.length;
        }
        else{
            this.len = arguments.length;
            this.vec = new Array(len);
            for (let i = 0; i < len; i++) {
                if (typeof arguments[i] !== 'number') {
                    throw new Error('向量的元素必须是数字\nThe elements of the vector must be numbers\n');
                }
                this.vec[i] = arguments[i];
            }
        }
    }
    add(other) {
        if (typeof other === 'number') {
            return new Vector(this.vec.map(x => x + other));
        }
        else if (other instanceof Vector) {
            if (this.len !== other.len) {
                throw new Error(`向量的长度不一致,操作的向量长度分别为${this.len}和${other.len}\nThe length of the vectors is inconsistent, the lengths of the vectors are ${this.len} and ${other.len}\n`);
            }
            return new Vector(this.vec.map((x, i) => x + other.vec[i]));
        }
        else {
            throw new Error('加法操作数必须是数字或向量\nThe operand of the addition must be a number or a vector\n');
        }
    }

    sub(other) {
        if (typeof other === 'number') {
            return new Vector(this.vec.map(x => x - other));
        }
        else if (other instanceof Vector) {
            if (this.len !== other.len) {
                throw new Error(`向量的长度不一致,操作的向量长度分别为${this.len}和${other.len}\nThe length of the vectors is inconsistent, the lengths of the vectors are ${this.len} and ${other.len}\n`);
            }
            return new Vector(this.vec.map((x, i) => x - other.vec[i]));
        }
        else {
            throw new Error('减法操作数必须是数字或向量\nThe operand of the subtraction must be a number or a vector\n');
        }
    }

    dot(other) {
        if (other instanceof Vector) {
            if (this.len !== other.len) {
                throw new Error(`向量的长度不一致,操作的向量长度分别为${this.len}和${other.len}\nThe length of the vectors is inconsistent, the lengths of the vectors are ${this.len} and ${other.len}\n`);
            }
            return this.vec.reduce((acc, x, i) => acc + x * other.vec[i], 0);
        }
        else {
            throw new Error('点积操作数必须是向量\nThe operand of the dot product must be a vector\n');
        }
    }

    cross(other) {
        if (other instanceof Vector) {
            if (this.len !== 3 || other.len !== 3) {
                throw new Error('叉积操作数必须是三维向量\nThe operand of the cross product must be a three-dimensional vector\n');
            }
            else if (this.len !== other.len) {
                throw new Error(`向量的长度不一致,操作的向量长度分别为${this.len}和${other.len}\nThe length of the vectors is inconsistent, the lengths of the vectors are ${this.len} and ${other.len}\n`);
            }
            return new Vector([
                this.vec[1] * other.vec[2] - this.vec[2] * other.vec[1],
                this.vec[2] * other.vec[0] - this.vec[0] * other.vec[2],
                this.vec[0] * other.vec[1] - this.vec[1] * other.vec[0]
            ]);
        }
        else {
            throw new Error('叉积操作数必须是向量\nThe operand of the cross product must be a vector\n');
        }
    }
    len() {
        return this.vec.length;
    }
    get(i) {
        if (i < 0 || i >= this.len) {
            throw new Error(`索引超出范围,索引为${i},向量长度为${this.len}\nIndex out of range, index is ${i}, vector length is ${this.len}\n`);
        }
        return this.vec[i];
    }
    set(i, value) {
        if (i < 0 || i >= this.len) {
            throw new Error(`索引超出范围,索引为${i},向量长度为${this.len}\nIndex out of range, index is ${i}, vector length is ${this.len}\n`);
        }
        this.vec[i] = value;
    }
    abs() {
        return Math.sqrt(this.vec.reduce((acc, x) => acc + x * x, 0));
    }
}

class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.data[i] = new Array(cols).fill(0);
        }
    }
    get(i, j) {
        if (i < 0 || i >= this.rows || j < 0 || j >= this.cols) {
            throw new Error(`索引超出范围,索引为(${i},${j}),矩阵大小为(${this.rows},${this.cols})\nIndex out of range, index is (${i},${j}), matrix size is (${this.rows},${this.cols})\n`);
        }
        return this.data[i][j];
    }
}