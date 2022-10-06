class Text {
    constructor(text, x, y, a, color, size) {
        this.t = text;
        this.x = x;
        this.y = y;
        this.a = a;
        this.c = color;
        this.s = size;
    }

    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.font = this.s + "px sans-serif";
        ctx.textAlign = this.a;
        ctx.fillText(this.t, this.x, this.y);
        ctx.closePath();
    }
}