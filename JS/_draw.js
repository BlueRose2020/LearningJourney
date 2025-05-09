import { Complex } from "./_math.js";

export { Draw , Interaction };

class Draw {
    constructor(canvas, resolution=2) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`;

        this.canvas.width = this.canvas.width * resolution;
        this.canvas.height = this.canvas.height * resolution;
    }

    getColor(color) {
        let color_string = '';
        if (typeof color === 'string') {
            color_string = color;
        }
        else if (typeof color === 'object' && color.length === 3) {
            color_string = `rgb(${color[0]},${color[1]},${color[2]})`
        }
        else if (typeof color === 'object' && color.length === 4) {
            color_string = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`
        }
        return color_string
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fill(color) {
        this.ctx.fillStyle = this.getColor(color);
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    PPline(positin1, positin2, color, lineWidth, lineDash = []) {
        let x1 = positin1[0], y1 = positin1[1];
        let x2 = positin2[0], y2 = positin2[1];
        this.ctx.strokeStyle = this.getColor(color);
        this.ctx.lineWidth = lineWidth;
        this.ctx.setLineDash(lineDash);
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    PLDline(positin, len, direction, color, lineWidth, lineDash = []) {
        if (len < 0) {
            throw new Error("长度必须大于0\nlength must be greater than 0\n")
        }
        let x = positin[0], y = positin[1];
        this.ctx.strokeStyle = this.getColor(color);
        this.ctx.lineWidth = lineWidth;
        this.ctx.setLineDash(lineDash);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        if (typeof direction === "number") {
            this.ctx.lineTo(x + len * Math.cos(direction), y + len * Math.sin(direction));
        }
        else if (typeof direction === "object" && direction.length === 2) {
            let dir_abs = Math.sqrt(direction[0] ** 2 + direction[1] ** 2);
            this.ctx.lineTo(x + len * direction[0] / dir_abs, y + len * direction[1] / dir_abs);
        }
        else {
            throw new Error("方向必须是一个数字或者一个长度为2的数组\ndirection must be a number or an array of length 2\n")
        }

        this.ctx.stroke();
    }

    circle(position, radius, color, lineWidth = 1, lineDash = []) {
        if (radius < 0) {
            console.error("半径必须大于0");
            console.error("radius must be greater than 0");
            return;
        }
        let x = position[0], y = position[1];
        let new_color = this.getColor(color);
        this.ctx.fillStyle = new_color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.setLineDash(lineDash);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (lineWidth < 0) {
            this.ctx.fill();
        }
    }

    rect(satrt_position, end_position, color, lineWidth = 1, lineDash = []) {
        let x1 = satrt_position[0], y1 = satrt_position[1];
        let x2 = end_position[0], y2 = end_position[1];
        let new_color = this.getColor(color);
        this.ctx.fillStyle = new_color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.setLineDash(lineDash);
        this.ctx.beginPath();
        this.ctx.rect(x1, y1, x2 - x1, y2 - y1);
        if (lineWidth < 0) {
            this.ctx.fill();
        }
    }

    triangle(position1, position2, position3, color, lineWidth = 1) {
        let x1 = position1[0], y1 = position1[1];
        let x2 = position2[0], y2 = position2[1];
        let x3 = position3[0], y3 = position3[1];
        let new_color = this.getColor(color);;

        this.ctx.fillStyle = new_color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.closePath();
        if (lineWidth < 0) {
            this.ctx.fill();
        }
    }

    AHDisoscelesTriangle(angle, size, direction, vertex, color, lineWidth = 1) {
        if (size < 0) {
            throw new Error("边长必须大于0\nsize must be greater than 0\n")
        }

        let complex_direction = new Complex(0, 0);
        if (typeof direction === "number") {
            complex_direction = new Complex(Math.cos(direction), Math.sin(direction));
        }
        else if (typeof direction === "object" && direction.length === 2) {
            let len = Math.sqrt(direction[0] ** 2 + direction[1] ** 2);
            complex_direction = new Complex(direction[0] / len, direction[1] / len);
        }
        else {
            throw new Error("方向必须是一个数字或者一个长度为2的数组\ndirection must be a number or an array of length 2\n")
        }


        let x1 = vertex[0], y1 = vertex[1];
        let x2 = x1 - size;
        let x3 = x1 - size;
        let y2 = y1 + size * Math.tan(angle / 2);
        let y3 = y1 - size * Math.tan(angle / 2);

        const vertex1 = new Complex(x1, y1);
        const vertex2 = new Complex(x2, y2);
        const vertex3 = new Complex(x3, y3);

        const side1 = vertex1.sub(vertex2).mul(complex_direction);
        const side3 = vertex3.sub(vertex1).mul(complex_direction);

        x2 = vertex1.real - side1.real;
        y2 = vertex1.imag - side1.imag;
        x3 = vertex1.real + side3.real;
        y3 = vertex1.imag + side3.imag;

        this.triangle([x1, y1], [x2, y2], [x3, y3], this.getColor(color), lineWidth);
    }

    SSDisoscelesTriangle(waist_length, hemline_length, direction, vertex, color, lineWidth = 1) {
        if (waist_length < 0 || hemline_length < 0) {
            throw new Error("腰长和底边长度必须大于0\nwaist_length and hemline_length must be greater than 0\n")
        }
        if (2 * waist_length < hemline_length) {
            throw new Error("腰长和底边长度不符合三角形不等式\nwaist_length and hemline_length do not satisfy the triangle inequality\n")
        }
        let angle = 2 * Math.asin(hemline_length / (2 * waist_length));
        this.AHDisoscelesTriangle(angle, waist_length, direction, vertex, color, lineWidth);
    }

    PPVector(start_position, end_position, color, lineWidth = 1, arrow_size = 20, arrow_angle = Math.PI / 6, arrow_position = 0, offset_mode = 0) {
        if (arrow_size < 0) {
            throw new Error("箭头大小必须大于0\narrow_size must be greater than 0\n")
        }
        if (arrow_angle < 0 || arrow_angle > Math.PI) {
            throw new Error("箭头角度必须在0到π之间\narrow_angle must be between 0 and π\n")
        }
        let new_color = this.getColor(color);
        let direction = Math.atan2(end_position[1] - start_position[1], end_position[0] - start_position[0]);
        let line_end_position = [end_position[0] - Math.cos(direction) * (arrow_size - 1), end_position[1] - Math.sin(direction) * (arrow_size - 1)]; 

        this.PPline(start_position, line_end_position, new_color, lineWidth);

        let vertex = [];
        if (offset_mode === 1) {
            arrow_position = arrow_position / Math.sqrt((end_position[0] - start_position[0]) ** 2 + (end_position[1] - start_position[1]) ** 2);
        }
        vertex[0] = arrow_position * start_position[0] + (1 - arrow_position) * end_position[0];
        vertex[1] = arrow_position * start_position[1] + (1 - arrow_position) * end_position[1];

        this.AHDisoscelesTriangle(arrow_angle, arrow_size, direction, vertex, new_color, -1);
    }

    PLVector(start_position, length, direction, color, lineWidth = 1, arrow_size = 20, arrow_angle = Math.PI / 6, arrow_position = 0, offset_mode = 0) {
        let end_position = [start_position[0] + length * Math.cos(direction), start_position[1] + length * Math.sin(direction)];
        this.PPVector(start_position, end_position, color, lineWidth, arrow_size, arrow_angle, arrow_position, offset_mode);
    }
    text(position, text, color, fontSize = 20, fontFamily = "Arial", textAlign = "center", textBaseline = "middle") {
        this.ctx.fillStyle = this.getColor(color);
        this.ctx.font = `${fontSize}px ${fontFamily}`;
        this.ctx.textAlign = textAlign;
        this.ctx.textBaseline = textBaseline;
        this.ctx.fillText(text, position[0], position[1]);
    }
}

class Interaction extends Draw {
    constructor(canvas, resolution = 2) {
        super(canvas, resolution);
        this.click_functions = [];
        this.move_functions = [];
    }

    listen() {
        this.canvas.addEventListener('click', (event) => {
            this.click_functions.forEach(func => {
                func(event);
            });
        });

        this.canvas.addEventListener('mousemove', (event) => {
            this.move_functions.forEach(func => {
                func(event);
            });
        });
    }

    play_button(position,size, color='orange',func = null) {
        if (size < 0) {
            throw new Error("大小必须大于0\nsize must be greater than 0\n")
        }
        let play = false,in_area = false;
        let click_posision = [];
        position = [position[0]-size/2, position[1]-size/2];
        this.#draw_play_button(position, size, color);
        this.click_functions.push((event) => {
            play = !play;
            click_posision = [event.clientX-this.canvas.offsetLeft, event.clientY-this.canvas.offsetTop];
            in_area = click_posision[0] > position[0] && click_posision[0] < position[0] + size && click_posision[1] > position[1] && click_posision[1] < position[1] + size;
            if (play && in_area) {
                this.#draw_play_button(position, size, 'white');
                this.#draw_pause_button(position, size, color);
                func(event);
            }
            else if (!play && in_area) {
                this.#draw_pause_button(position, size, 'white');
                this.#draw_play_button(position, size, color);
            }
        });
    }

    next_button(position, size, color = 'orange',func = null) {
        this.#draw_right_arrow(position, size, color);
        let click_posision = [], in_area = false;
        this.click_functions.push((event) => {
            click_posision = [event.clientX-this.canvas.offsetLeft, event.clientY-this.canvas.offsetTop];
            in_area = click_posision[0] > position[0] && click_posision[0] < position[0] + size && click_posision[1] > position[1] && click_posision[1] < position[1] + size;
            if (in_area) {
                func(event);
            }
        });
    }

    #draw_play_button(position, size, color = 'orange') {
        if (size < 0) {
            throw new Error("大小必须大于0\nsize must be greater than 0\n")
        }
        let x = position[0], y = position[1];
        this.ctx.fillStyle = this.getColor(color);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + size * 0.866, y + size / 2);
        this.ctx.lineTo(x, y + size);
        this.ctx.closePath();
        this.ctx.fill();
    }

    #draw_pause_button(position, size, color = 'orange') {
        if (size < 0) {
            throw new Error("大小必须大于0\nsize must be greater than 0\n")
        }
        this.rect(position, [position[0] + size/3, position[1] + size], color, -1);
        this.rect([position[0] + 2 * size / 3, position[1]], [position[0] + size, position[1] + size], color, -1);
    }

    #draw_close_button(position, size, color = 'orange') {
        if (size < 0) {
            throw new Error("大小必须大于0\nsize must be greater than 0\n")
        }
        this.rect(position, [position[0] + size, position[1] + size], color, -1);
    }

    #draw_right_arrow(position, size, color = 'orange') {
        this.PPVector([position[0]-size/4, position[1]], [position[0] + size, position[1]], color, 2*size/5, 2*size/3, Math.PI / 3, 0, 1);
    }
}

let canvas = document.getElementsByTagName("canvas")[0];

const resolution = 1;

let plain = new Interaction(canvas, resolution);
plain.fill('black');
plain.play_button([100, 100], 50, 'orange',()=>(console.log("play button clicked")));
plain.next_button([200, 100], 55, 'orange',()=>(console.log("next button clicked")));
plain.listen();

