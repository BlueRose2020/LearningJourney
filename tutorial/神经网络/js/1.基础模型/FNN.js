import {Interaction} from "../../../../JS/draw.js";

class FNN_ModelInteractionWindow extends Interaction{
    constructor(canvas, layers, resolution=2){
        super(canvas, resolution);
        this.layers = layers;

        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;

        this.x_gap = this.width / (layers.length + 1);
        this.y_gap = layers.map(layer => this.height / (layer + 1));
    }

    set_model_position(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.x_gap = this.width / (layers.length + 1);
        this.y_gap = layers.map(layer => this.height / (layer + 1));
    }
    draw_FNN(radius=30,neuron_color=[0,180,255],line_color=[255,120,0],line_width=2,arrow_size=20){
        this.radius = radius;
        for (let i = 0; i < this.layers.length - 1; i++){
            let layer1 = this.layers[i];
            let layer2 = this.layers[i + 1];
            for (let j = 0; j < layer1; j++){
                for (let k = 0; k < layer2; k++){
                    let x1 = (i + 1) * this.x_gap + this.x;
                    let y1 = (j + 1) * this.y_gap[i] + this.y;
                    let x2 = (i + 2) * this.x_gap + this.x;
                    let y2 = (k + 1) * this.y_gap[i + 1] + this.y;
                    this.PPVector([x1, y1], [x2, y2], line_color, line_width, arrow_size, Math.PI / 6, radius, 1);
                }
            }
        }    
    
        for (let i = 0; i < this.layers.length; i++){
            let layer = this.layers[i];
            for (let j = 0; j < layer; j++){
                let x = (i + 1) * this.x_gap + this.x;
                let y = (j + 1) * this.y_gap[i] + this.y;
                this.circle([x, y], radius, neuron_color, -1);
            }
        }
    }
    
    draw_layer_rect(layer_index, color = [0,120,255],line_width = 2){
        let left_top_position, right_bottom_position; 
        if (typeof layer_index === "number"){
            if (layer_index < 1 || layer_index > this.layers.length){
                throw new Error("层索引超出范围\nLayer index out of range\n")
            }
            left_top_position = [this.x_gap * layer_index - 2 * this.radius, this.y_gap[layer_index - 1]/2];
            right_bottom_position = [this.x_gap * layer_index + 2 * this.radius, this.height - this.y_gap[layer_index - 1]/2];
        }
        else if (Array.isArray(layer_index) && layer_index.length===2){
            if (layer_index[0] < 1 || layer_index[0] > this.layers.length || layer_index[1] < 1 || layer_index[1] > this.layers.length){
                throw new Error("层索引超出范围\nLayer index out of range\n")
            }
            left_top_position = [this.x_gap * layer_index[0] - 2 * this.radius, Math.min(this.y_gap[layer_index[0]],this.y_gap[layer_index[1]])/2];
            right_bottom_position = [this.x_gap * layer_index[1] + 2 * this.radius, this.height - Math.min(this.y_gap[layer_index[0]],this.y_gap[layer_index[1]])/2];
        }
        else{
            throw new Error("层索引必须是一个数字或者一个长度为2的数组\nLayer index must be a number or an array of length 2\n")
        }

        left_top_position = [left_top_position[0] + this.x, left_top_position[1] + this.y];
        right_bottom_position = [right_bottom_position[0] + this.x, right_bottom_position[1] + this.y];
        this.rect(left_top_position, right_bottom_position, color, line_width,[10,10])
    }
}


let layers = [3,5,5,3];
//示意图代码
let diagram = document.getElementById("diagram");

let diagram_FNN = new FNN_ModelInteractionWindow(diagram,layers);
diagram_FNN.draw_FNN(30,[0,180,255],[255,120,0],2,20);
diagram_FNN.draw_layer_rect(1);
diagram_FNN.draw_layer_rect([2,layers.length-1]);
diagram_FNN.draw_layer_rect(layers.length);

//交互窗口代码
let interaction_window = document.getElementById("interaction-window");
let interaction_window_FNN = new FNN_ModelInteractionWindow(interaction_window,layers);
interaction_window_FNN.set_model_position(0,0,interaction_window.width,interaction_window.height);
interaction_window_FNN.draw_FNN(30,[0,180,255]);
