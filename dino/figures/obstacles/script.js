class Obstacles {
    constructor(x, y, type=0, scale=2) {
        this.x = x;
        this.y = y;
        this.w = null;
        this.h = null;
        this.scale = scale;
        this.type = type;

        this.dx = -gameSpeed;

        this.cactus_xs = undefined;
        this.cactus_s = undefined;
        this.cactus_l = undefined;
        this.cactus_m = undefined;
        this.bird_down = undefined;
        this.bird_up = undefined;
        this.flag = false;
        this.tick_count = 0;
    }

    CactusXs = (ctx, startX=0, startY=0, scale=1) => {
        ctx.beginPath();
        ctx.moveTo(startX+(4*scale),startY);
        ctx.lineTo(startX+(5*scale),startY);
        ctx.lineTo(startX+(5*scale),startY+(scale));
        ctx.lineTo(startX+(6*scale),startY+(scale));
        ctx.lineTo(startX+(6*scale),startY+(8*scale));
        ctx.lineTo(startX+(7*scale),startY+(8*scale));
        ctx.lineTo(startX+(7*scale),startY+(4*scale));
        ctx.lineTo(startX+(8*scale),startY+(4*scale));
        ctx.lineTo(startX+(8*scale),startY+(3*scale));
        ctx.lineTo(startX+(9*scale),startY+(3*scale));
        ctx.lineTo(startX+(9*scale),startY+(8*scale));
        ctx.lineTo(startX+(8*scale),startY+(8*scale));
        ctx.lineTo(startX+(8*scale),startY+(9*scale));
        ctx.lineTo(startX+(6*scale),startY+(9*scale));
        ctx.lineTo(startX+(6*scale),startY+(13*scale));
        ctx.lineTo(startX+(3*scale),startY+(13*scale));
        ctx.lineTo(startX+(3*scale),startY+(8*scale));
        ctx.lineTo(startX+(scale),startY+(8*scale));
        ctx.lineTo(startX+(scale),startY+(7*scale));
        ctx.lineTo(startX,startY+(7*scale));
        ctx.lineTo(startX,startY+(3*scale));
        ctx.lineTo(startX+(scale),startY+(3*scale));
        ctx.lineTo(startX+(scale),startY+(2*scale));
        ctx.lineTo(startX+(2*scale),startY+(2*scale));
        ctx.lineTo(startX+(2*scale),startY+(7*scale));
        ctx.lineTo(startX+(3*scale),startY+(7*scale));
        ctx.lineTo(startX+(3*scale),startY+(scale));
        ctx.lineTo(startX+(4*scale),startY+(scale));

        ctx.fillStyle = '#000';
        ctx.fill();

        this.w = 9 * scale;
        this.h = 13 * scale;
        this.cactus_xs = ctx.getImageData(startX, startY, this.w, this.h);
    }
    CactusS (ctx, startX=0, startY=0, scale=1) {
        ctx.beginPath();
        ctx.moveTo(startX+(5*scale),startY);
        ctx.lineTo(startX+(7*scale),startY);
        ctx.lineTo(startX+(7*scale),startY+(scale));
        ctx.lineTo(startX+(8*scale),startY+(scale));
        ctx.lineTo(startX+(8*scale),startY+(10*scale));
        ctx.lineTo(startX+(9*scale),startY+(10*scale));
        ctx.lineTo(startX+(9*scale),startY+(3*scale));
        ctx.lineTo(startX+(10*scale),startY+(3*scale));
        ctx.lineTo(startX+(10*scale),startY+(2*scale));
        ctx.lineTo(startX+(11*scale),startY+(2*scale));
        ctx.lineTo(startX+(11*scale),startY+(3*scale));
        ctx.lineTo(startX+(12*scale),startY+(3*scale));
        ctx.lineTo(startX+(12*scale),startY+(11*scale));
        ctx.lineTo(startX+(11*scale),startY+(11*scale));
        ctx.lineTo(startX+(11*scale),startY+(12*scale));
        ctx.lineTo(startX+(10*scale),startY+(12*scale));
        ctx.lineTo(startX+(10*scale),startY+(13*scale));
        ctx.lineTo(startX+(8*scale),startY+(13*scale));
        ctx.lineTo(startX+(8*scale),startY+(21*scale));
        ctx.lineTo(startX+(4*scale),startY+(21*scale));
        ctx.lineTo(startX+(4*scale),startY+(16*scale));
        ctx.lineTo(startX+(2*scale),startY+(16*scale));
        ctx.lineTo(startX+(2*scale),startY+(15*scale));
        ctx.lineTo(startX+(scale),startY+(15*scale));
        ctx.lineTo(startX+(scale),startY+(14*scale));
        ctx.lineTo(startX,startY+(14*scale));
        ctx.lineTo(startX,startY+(6*scale));
        ctx.lineTo(startX+(scale),startY+(6*scale));
        ctx.lineTo(startX+(scale),startY+(5*scale));
        ctx.lineTo(startX+(2*scale),startY+(5*scale));
        ctx.lineTo(startX+(2*scale),startY+(6*scale));
        ctx.lineTo(startX+(3*scale),startY+(6*scale));
        ctx.lineTo(startX+(3*scale),startY+(13*scale));
        ctx.lineTo(startX+(4*scale),startY+(13*scale));
        ctx.lineTo(startX+(4*scale),startY+(scale));
        ctx.lineTo(startX+(5*scale),startY+(scale));

        ctx.fillStyle = '#000';
        ctx.fill();

        this.w = 12 * scale;
        this.h = 21 * scale;
        this.cactus_s = ctx.getImageData(startX, startY, this.w, this.h);
    }
    CactusM (ctx, startX=0, startY=0, scale=1) {
        for(let x = 0;x <= 12*scale+5; x+=12*scale+5) {
            ctx.beginPath();
            ctx.moveTo(x+startX + (5 * scale), startY);
            ctx.lineTo(x+startX + (7 * scale), startY);
            ctx.lineTo(x+startX + (7 * scale), startY + (scale));
            ctx.lineTo(x+startX + (8 * scale), startY + (scale));
            ctx.lineTo(x+startX + (8 * scale), startY + (10 * scale));
            ctx.lineTo(x+startX + (9 * scale), startY + (10 * scale));
            ctx.lineTo(x+startX + (9 * scale), startY + (3 * scale));
            ctx.lineTo(x+startX + (10 * scale), startY + (3 * scale));
            ctx.lineTo(x+startX + (10 * scale), startY + (2 * scale));
            ctx.lineTo(x+startX + (11 * scale), startY + (2 * scale));
            ctx.lineTo(x+startX + (11 * scale), startY + (3 * scale));
            ctx.lineTo(x+startX + (12 * scale), startY + (3 * scale));
            ctx.lineTo(x+startX + (12 * scale), startY + (11 * scale));
            ctx.lineTo(x+startX + (11 * scale), startY + (11 * scale));
            ctx.lineTo(x+startX + (11 * scale), startY + (12 * scale));
            ctx.lineTo(x+startX + (10 * scale), startY + (12 * scale));
            ctx.lineTo(x+startX + (10 * scale), startY + (13 * scale));
            ctx.lineTo(x+startX + (8 * scale), startY + (13 * scale));
            ctx.lineTo(x+startX + (8 * scale), startY + (21 * scale));
            ctx.lineTo(x+startX + (4 * scale), startY + (21 * scale));
            ctx.lineTo(x+startX + (4 * scale), startY + (16 * scale));
            ctx.lineTo(x+startX + (2 * scale), startY + (16 * scale));
            ctx.lineTo(x+startX + (2 * scale), startY + (15 * scale));
            ctx.lineTo(x+startX + (scale), startY + (15 * scale));
            ctx.lineTo(x+startX + (scale), startY + (14 * scale));
            ctx.lineTo(x+startX, startY + (14 * scale));
            ctx.lineTo(x+startX, startY + (6 * scale));
            ctx.lineTo(x+startX + (scale), startY + (6 * scale));
            ctx.lineTo(x+startX + (scale), startY + (5 * scale));
            ctx.lineTo(x+startX + (2 * scale), startY + (5 * scale));
            ctx.lineTo(x+startX + (2 * scale), startY + (6 * scale));
            ctx.lineTo(x+startX + (3 * scale), startY + (6 * scale));
            ctx.lineTo(x+startX + (3 * scale), startY + (13 * scale));
            ctx.lineTo(x+startX + (4 * scale), startY + (13 * scale));
            ctx.lineTo(x+startX + (4 * scale), startY + (scale));
            ctx.lineTo(x+startX + (5 * scale), startY + (scale));

            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.closePath();
        }

        this.w = 29 * scale;
        this.h = 21 * scale;
        this.cactus_m = ctx.getImageData(startX, startY, this.w, this.h);
    }
    CactusL (ctx, startX=0, startY=0, scale=1) {
        ctx.beginPath();
        ctx.moveTo(startX+(4*scale),startY);
        ctx.lineTo(startX+(5*scale),startY);
        ctx.lineTo(startX+(5*scale),startY+(scale));
        ctx.lineTo(startX+(6*scale),startY+(scale));
        ctx.lineTo(startX+(6*scale),startY+(12*scale));
        ctx.lineTo(startX+(7*scale),startY+(12*scale));
        ctx.lineTo(startX+(7*scale),startY+(5*scale));
        ctx.lineTo(startX+(9*scale),startY+(5*scale));
        ctx.lineTo(startX+(9*scale),startY+(12*scale));
        ctx.lineTo(startX+(8*scale),startY+(12*scale));
        ctx.lineTo(startX+(8*scale),startY+(13*scale));
        ctx.lineTo(startX+(6*scale),startY+(13*scale));
        ctx.lineTo(startX+(6*scale),startY+(21*scale));
        ctx.lineTo(startX+(3*scale),startY+(21*scale));
        ctx.lineTo(startX+(3*scale),startY+(14*scale));
        ctx.lineTo(startX+(scale),startY+(14*scale));
        ctx.lineTo(startX+(scale),startY+(13*scale));
        ctx.lineTo(startX,startY+(13*scale));
        ctx.lineTo(startX,startY+(5*scale));
        ctx.lineTo(startX+(2*scale),startY+(5*scale));
        ctx.lineTo(startX+(2*scale),startY+(12*scale));
        ctx.lineTo(startX+(3*scale),startY+(12*scale));
        ctx.lineTo(startX+(3*scale),startY+(scale));
        ctx.lineTo(startX+(4*scale),startY+(scale));

        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(startX+(13*scale),startY);
        ctx.lineTo(startX+(15*scale),startY);
        ctx.lineTo(startX+(15*scale),startY+(8*scale));
        ctx.lineTo(startX+(16*scale),startY+(8*scale));
        ctx.lineTo(startX+(16*scale),startY+(3*scale));
        ctx.lineTo(startX+(17*scale),startY+(3*scale));
        ctx.lineTo(startX+(17*scale),startY+(9*scale));
        ctx.lineTo(startX+(15*scale),startY+(9*scale));
        ctx.lineTo(startX+(15*scale),startY+(21*scale));
        ctx.lineTo(startX+(13*scale),startY+(21*scale));
        ctx.lineTo(startX+(13*scale),startY+(14*scale));
        ctx.lineTo(startX+(11*scale),startY+(14*scale));
        ctx.lineTo(startX+(11*scale),startY+(13*scale));
        ctx.lineTo(startX+(10*scale),startY+(13*scale));
        ctx.lineTo(startX+(10*scale),startY+(7*scale));
        ctx.lineTo(startX+(12*scale),startY+(7*scale));
        ctx.lineTo(startX+(12*scale),startY+(13*scale));
        ctx.lineTo(startX+(13*scale),startY+(13*scale));

        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(startX+(18*scale),startY+(9*scale));
        ctx.lineTo(startX+(19*scale),startY+(9*scale));
        ctx.lineTo(startX+(19*scale),startY+(15*scale));
        ctx.lineTo(startX+(20*scale),startY+(15*scale));
        ctx.lineTo(startX+(20*scale),startY+(11*scale));
        ctx.lineTo(startX+(21*scale),startY+(11*scale));
        ctx.lineTo(startX+(21*scale),startY+(16*scale));
        ctx.lineTo(startX+(19*scale),startY+(16*scale));
        ctx.lineTo(startX+(19*scale),startY+(21*scale));
        ctx.lineTo(startX+(18*scale),startY+(21*scale));
        ctx.lineTo(startX+(18*scale),startY+(16*scale));
        ctx.lineTo(startX+(16*scale),startY+(16*scale));
        ctx.lineTo(startX+(16*scale),startY+(11*scale));
        ctx.lineTo(startX+(17*scale),startY+(11*scale));
        ctx.lineTo(startX+(17*scale),startY+(15*scale));
        ctx.lineTo(startX+(18*scale),startY+(15*scale));

        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(startX+(24*scale),startY);
        ctx.lineTo(startX+(27*scale),startY);
        ctx.lineTo(startX+(27*scale),startY+(12*scale));
        ctx.lineTo(startX+(28*scale),startY+(12*scale));
        ctx.lineTo(startX+(28*scale),startY+(5*scale));
        ctx.lineTo(startX+(30*scale),startY+(5*scale));
        ctx.lineTo(startX+(30*scale),startY+(12*scale));
        ctx.lineTo(startX+(29*scale),startY+(12*scale));
        ctx.lineTo(startX+(29*scale),startY+(13*scale));
        ctx.lineTo(startX+(27*scale),startY+(13*scale));
        ctx.lineTo(startX+(27*scale),startY+(21*scale));
        ctx.lineTo(startX+(24*scale),startY+(21*scale));
        ctx.lineTo(startX+(24*scale),startY+(11*scale));
        ctx.lineTo(startX+(22*scale),startY+(11*scale));
        ctx.lineTo(startX+(22*scale),startY+(10*scale));
        ctx.lineTo(startX+(21*scale),startY+(10*scale));
        ctx.lineTo(startX+(21*scale),startY+(3*scale));
        ctx.lineTo(startX+(23*scale),startY+(3*scale));
        ctx.lineTo(startX+(23*scale),startY+(9*scale));
        ctx.lineTo(startX+(24*scale),startY+(9*scale));

        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.closePath();

        this.w = 30 * scale;
        this.h = 21 * scale;
        this.cactus_l = ctx.getImageData(startX, startY, this.w, this.h);
    }
    BirdDown = (ctx, startX=0, startY=0, scale=1) => {
        ctx.beginPath();
        //head
        ctx.moveTo(startX+(8*scale),startY+(12*scale));
        ctx.lineTo(startX+(8*scale),startY+(11*scale));
        ctx.lineTo(startX+(7*scale),startY+(11*scale));
        ctx.lineTo(startX+(7*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(9*scale));
        ctx.lineTo(startX,startY+(9*scale));
        ctx.lineTo(startX,startY+(8*scale));
        ctx.lineTo(startX+(scale),startY+(8*scale));
        ctx.lineTo(startX+(scale),startY+(7*scale));
        ctx.lineTo(startX+(2*scale),startY+(7*scale));
        ctx.lineTo(startX+(2*scale),startY+(6*scale));
        ctx.lineTo(startX+(3*scale),startY+(6*scale));
        ctx.lineTo(startX+(3*scale),startY+(5*scale));
        ctx.lineTo(startX+(4*scale),startY+(5*scale));
        ctx.lineTo(startX+(4*scale),startY+(4*scale));
        ctx.lineTo(startX+(7*scale),startY+(4*scale));
        ctx.lineTo(startX+(7*scale),startY+(6*scale));
        ctx.lineTo(startX+(8*scale),startY+(6*scale));
        ctx.lineTo(startX+(8*scale),startY+(8*scale));
        //body
        ctx.lineTo(startX+(16*scale),startY+(8*scale));
        ctx.lineTo(startX+(16*scale),startY+(9*scale));
        ctx.lineTo(startX+(17*scale),startY+(9*scale));
        ctx.lineTo(startX+(17*scale),startY+(10*scale));
        ctx.lineTo(startX+(18*scale),startY+(10*scale));
        ctx.lineTo(startX+(18*scale),startY+(11*scale));
        ctx.lineTo(startX+(24*scale),startY+(11*scale));
        ctx.lineTo(startX+(24*scale),startY+(12*scale));
        ctx.lineTo(startX+(21*scale),startY+(12*scale));
        ctx.lineTo(startX+(21*scale),startY+(13*scale));
        ctx.lineTo(startX+(23*scale),startY+(13*scale));
        ctx.lineTo(startX+(23*scale),startY+(14*scale));
        ctx.lineTo(startX+(20*scale),startY+(14*scale));
        ctx.lineTo(startX+(20*scale),startY+(15*scale));
        ctx.lineTo(startX+(14*scale),startY+(15*scale));
        ctx.lineTo(startX+(14*scale),startY+(16*scale));
        ctx.lineTo(startX+(13*scale),startY+(16*scale));
        ctx.lineTo(startX+(13*scale),startY+(18*scale));
        ctx.lineTo(startX+(12*scale),startY+(18*scale));
        ctx.lineTo(startX+(12*scale),startY+(19*scale));
        ctx.lineTo(startX+(11*scale),startY+(19*scale));
        ctx.lineTo(startX+(11*scale),startY+(20*scale));
        ctx.lineTo(startX+(10*scale),startY+(20*scale));
        ctx.lineTo(startX+(10*scale),startY+(21*scale));
        ctx.lineTo(startX+(9*scale),startY+(21*scale));
        ctx.lineTo(startX+(9*scale),startY+(12*scale));

        ctx.fillStyle = '#000';
        ctx.fill();

        this.w = 24 * scale;
        this.h = 21 * scale;
        this.bird_down = ctx.getImageData(startX, startY, this.w, this.h);
        ctx.clearRect(startX, startY, this.w, this.h);
    }
    BirdUp = (ctx, startX=0, startY=0, scale=1) => {
        ctx.beginPath();
        //head
        ctx.moveTo(startX+(8*scale),startY+(12*scale));
        ctx.lineTo(startX+(8*scale),startY+(11*scale));
        ctx.lineTo(startX+(7*scale),startY+(11*scale));
        ctx.lineTo(startX+(7*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(9*scale));
        ctx.lineTo(startX,startY+(9*scale));
        ctx.lineTo(startX,startY+(8*scale));
        ctx.lineTo(startX+(scale),startY+(8*scale));
        ctx.lineTo(startX+(scale),startY+(7*scale));
        ctx.lineTo(startX+(2*scale),startY+(7*scale));
        ctx.lineTo(startX+(2*scale),startY+(6*scale));
        ctx.lineTo(startX+(3*scale),startY+(6*scale));
        ctx.lineTo(startX+(3*scale),startY+(5*scale));
        ctx.lineTo(startX+(4*scale),startY+(5*scale));
        ctx.lineTo(startX+(4*scale),startY+(4*scale));
        ctx.lineTo(startX+(7*scale),startY+(4*scale));
        ctx.lineTo(startX+(7*scale),startY+(6*scale));
        ctx.lineTo(startX+(8*scale),startY+(6*scale));
        ctx.lineTo(startX+(8*scale),startY+(8*scale));
        //body
        ctx.lineTo(startX+(9*scale),startY+(8*scale));
        ctx.lineTo(startX+(9*scale),startY+(4*scale));
        ctx.lineTo(startX+(8*scale),startY+(4*scale));
        ctx.lineTo(startX+(8*scale),startY);
        ctx.lineTo(startX+(9*scale),startY);
        ctx.lineTo(startX+(9*scale),startY+(scale));
        ctx.lineTo(startX+(10*scale),startY+(scale));
        ctx.lineTo(startX+(10*scale),startY+(2*scale));
        ctx.lineTo(startX+(11*scale),startY+(2*scale));
        ctx.lineTo(startX+(11*scale),startY+(3*scale));
        ctx.lineTo(startX+(12*scale),startY+(3*scale));
        ctx.lineTo(startX+(12*scale),startY+(4*scale));
        ctx.lineTo(startX+(13*scale),startY+(4*scale));
        ctx.lineTo(startX+(13*scale),startY+(5*scale));
        ctx.lineTo(startX+(14*scale),startY+(5*scale));
        ctx.lineTo(startX+(14*scale),startY+(6*scale));
        ctx.lineTo(startX+(15*scale),startY+(6*scale));
        ctx.lineTo(startX+(15*scale),startY+(7*scale));
        ctx.lineTo(startX+(16*scale),startY+(7*scale));
        ctx.lineTo(startX+(16*scale),startY+(9*scale));
        ctx.lineTo(startX+(17*scale),startY+(9*scale));
        ctx.lineTo(startX+(17*scale),startY+(10*scale));
        ctx.lineTo(startX+(18*scale),startY+(10*scale));
        ctx.lineTo(startX+(18*scale),startY+(11*scale));
        ctx.lineTo(startX+(24*scale),startY+(11*scale));
        ctx.lineTo(startX+(24*scale),startY+(12*scale));
        ctx.lineTo(startX+(21*scale),startY+(12*scale));
        ctx.lineTo(startX+(21*scale),startY+(13*scale));
        ctx.lineTo(startX+(23*scale),startY+(13*scale));
        ctx.lineTo(startX+(23*scale),startY+(14*scale));
        ctx.lineTo(startX+(20*scale),startY+(14*scale));
        ctx.lineTo(startX+(20*scale),startY+(15*scale));
        ctx.lineTo(startX+(11*scale),startY+(15*scale));
        ctx.lineTo(startX+(11*scale),startY+(14*scale));
        ctx.lineTo(startX+(10*scale),startY+(14*scale));
        ctx.lineTo(startX+(10*scale),startY+(13*scale));
        ctx.lineTo(startX+(9*scale),startY+(13*scale));
        ctx.lineTo(startX+(9*scale),startY+(12*scale));

        ctx.fillStyle = '#000';
        ctx.fill();

        this.w = 24 * scale;
        this.h = 21 * scale;
        this.bird_up = ctx.getImageData(startX, startY, this.w, this.h);
        ctx.clearRect(startX, startY, this.w, this.h);
    }

    Update () {
        this.x += this.dx;

        if(this.type === 0) {
            if(this.cactus_xs) {
                ctx.putImageData(this.cactus_xs, this.x-this.w, this.y-this.h);
            } else {
                this.CactusXs(ctx, this.x-(this.scale*12), this.y-(this.scale*21), this.scale);
            }
        }
        if(this.type === 1) {
            if(this.cactus_s) {
                ctx.putImageData(this.cactus_s, this.x-this.w, this.y-this.h);
            } else {
                this.CactusS(ctx, this.x-(this.scale*12), this.y-(this.scale*21), this.scale);
            }
        }
        if(this.type === 2) {
            if(this.cactus_m) {
                ctx.putImageData(this.cactus_m, this.x-this.w, this.y-this.h);
            } else {
                this.CactusM(ctx, this.x-(this.scale*29), this.y-(this.scale*21), this.scale);
            }
        }
        if(this.type === 3) {
            if(this.cactus_l) {
                ctx.putImageData(this.cactus_l, this.x-this.w, this.y-this.h);
            } else {
                this.CactusL(ctx, this.x-(this.scale*30), this.y-(this.scale*21), this.scale);
            }
        }
        if(this.type === 4) {
            if(this.bird_down && this.bird_up) {
                if(this.flag) {
                    this.flag = !this.flag;
                    ctx.putImageData(this.bird_up, this.x-this.w, this.y-this.h);
                } else {
                    this.flag = !this.flag;
                    ctx.putImageData(this.bird_down, this.x-this.w, this.y-this.h);
                }
            } else {
                this.BirdUp(ctx, this.x-(this.scale*24), this.y-(this.scale*21), this.scale);
                this.BirdDown(ctx, this.x-(this.scale*24), this.y-(this.scale*21), this.scale);
            }
        }

        this.dx = -gameSpeed;
    }
}