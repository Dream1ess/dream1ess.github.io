class Dino {
    constructor(x, y, scale=2) {
        this.x = x;
        this.y = y;
        this.w = 20*scale;
        this.h = 21*scale;
        this.scale = scale;

        this.dy = 0;
        this.jumpForce = 15;
        this.originalHeight = 21*scale;
        this.grounded = false;
        this.jumpTimer = 0;
        this.flag = false;

        this.dinoStepLeftImg = undefined;
        this.dinoStepRightImg = undefined;
        this.dinoStayImg = undefined;
        this.dinoDownStepLeftImg = undefined;
        this.dinoDownStepRightImg = undefined;

        this.tick_count = 0
    }
    dinoBody = (ctx,startX=0, startY=0, scale=1) => {
        ctx.beginPath();
        ctx.moveTo(startX+(4*scale),startY+(17*scale));
        ctx.lineTo(startX+(4*scale),startY+(16*scale));
        ctx.lineTo(startX+(3*scale),startY+(16*scale));
        ctx.lineTo(startX+(3*scale),startY+(15*scale));
        ctx.lineTo(startX+(2*scale),startY+(15*scale));
        ctx.lineTo(startX+(2*scale),startY+(14*scale));
        ctx.lineTo(startX+(scale),startY+(14*scale));
        ctx.lineTo(startX+(scale),startY+(13*scale));
        ctx.lineTo(startX,startY+(13*scale));
        ctx.lineTo(startX,startY+(7*scale));
        ctx.lineTo(startX+(scale),startY+(7*scale));
        ctx.lineTo(startX+(scale),startY+(9*scale));
        ctx.lineTo(startX+(2*scale),startY+(9*scale));
        ctx.lineTo(startX+(2*scale),startY+(10*scale));
        ctx.lineTo(startX+(3*scale),startY+(10*scale));
        ctx.lineTo(startX+(3*scale),startY+(11*scale));
        ctx.lineTo(startX+(5*scale),startY+(11*scale));
        ctx.lineTo(startX+(5*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(9*scale));
        ctx.lineTo(startX+(8*scale),startY+(9*scale));
        ctx.lineTo(startX+(8*scale),startY+(8*scale));
        ctx.lineTo(startX+(9*scale),startY+(8*scale));
        ctx.lineTo(startX+(9*scale),startY+(7*scale));
        ctx.lineTo(startX+(10*scale),startY+(7*scale));
        ctx.lineTo(startX+(10*scale),startY+(scale));
        ctx.lineTo(startX+(11*scale),startY+(scale));
        ctx.lineTo(startX+(11*scale), startY);
        ctx.lineTo(startX+(19*scale), startY);
        ctx.lineTo(startX+(19*scale),startY+(scale));
        ctx.lineTo(startX+(20*scale),startY+(scale));
        ctx.lineTo(startX+(20*scale),startY+(5*scale));
        ctx.lineTo(startX+(15*scale),startY+(5*scale));
        ctx.lineTo(startX+(15*scale),startY+(6*scale));
        ctx.lineTo(startX+(18*scale),startY+(6*scale));
        ctx.lineTo(startX+(18*scale),startY+(7*scale));
        ctx.lineTo(startX+(14*scale),startY+(7*scale));
        ctx.lineTo(startX+(14*scale),startY+(9*scale));
        ctx.lineTo(startX+(16*scale),startY+(9*scale));
        ctx.lineTo(startX+(16*scale),startY+(11*scale));
        ctx.lineTo(startX+(15*scale),startY+(11*scale));
        ctx.lineTo(startX+(15*scale),startY+(10*scale));
        ctx.lineTo(startX+(14*scale),startY+(10*scale));
        ctx.lineTo(startX+(14*scale),startY+(13*scale));
        ctx.lineTo(startX+(13*scale),startY+(13*scale));
        ctx.lineTo(startX+(13*scale),startY+(15*scale));
        ctx.lineTo(startX+(12*scale),startY+(15*scale));
        ctx.lineTo(startX+(12*scale),startY+(16*scale));
        ctx.lineTo(startX+(11*scale),startY+(16*scale));
    }
    dinoLegLeft = (ctx, startX=0, startY=0, scale=1) => {
        this.dinoBody(ctx, startX, startY, scale);

        //right leg
        ctx.lineTo(startX+(11*scale),startY+(20*scale));
        ctx.lineTo(startX+(12*scale),startY+(20*scale));
        ctx.lineTo(startX+(12*scale),startY+(21*scale));
        ctx.lineTo(startX+(10*scale),startY+(21*scale));
        ctx.lineTo(startX+(10*scale),startY+(18*scale));
        ctx.lineTo(startX+(9*scale),startY+(18*scale));
        ctx.lineTo(startX+(9*scale),startY+(17*scale));
        //left leg
        ctx.lineTo(startX+(7*scale),startY+(17*scale));
        ctx.lineTo(startX+(7*scale),startY+(18*scale));
        ctx.lineTo(startX+(8*scale),startY+(18*scale));
        ctx.lineTo(startX+(8*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(18*scale));
        ctx.lineTo(startX+(5*scale),startY+(18*scale));

        ctx.lineTo(startX+(5*scale),startY+(17*scale));
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.clearRect(startX+(12*scale), startY+(scale), scale, scale);

        this.dinoStepLeftImg = ctx.getImageData(startX, startY, 20*scale, 21*scale);
    }
    dinoLegRight = (ctx, startX=0, startY=0, scale=1) => {
        this.dinoBody(ctx, startX, startY, scale)

        //right leg
        ctx.lineTo(startX+(11*scale),startY+(17*scale));
        ctx.lineTo(startX+(12*scale),startY+(17*scale));
        ctx.lineTo(startX+(12*scale),startY+(18*scale));
        ctx.lineTo(startX+(10*scale),startY+(18*scale));

        ctx.lineTo(startX+(10*scale),startY+(17*scale));
        //left leg
        ctx.lineTo(startX+(8*scale),startY+(17*scale));
        ctx.lineTo(startX+(8*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(20*scale));
        ctx.lineTo(startX+(7*scale),startY+(20*scale));
        ctx.lineTo(startX+(7*scale),startY+(21*scale));
        ctx.lineTo(startX+(5*scale),startY+(21*scale));

        ctx.lineTo(startX+(5*scale),startY+(17*scale));
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.clearRect(startX+(12*scale), startY+(scale), scale, scale);

        this.dinoStepRightImg = ctx.getImageData(startX, startY, 20*scale, 21*scale);
    }
    dinoStay = (ctx, startX=0, startY=0, scale=1) => {
        ctx.beginPath();
        ctx.moveTo(startX+(4*scale),startY+(17*scale));
        ctx.lineTo(startX+(4*scale),startY+(16*scale));
        ctx.lineTo(startX+(3*scale),startY+(16*scale));
        ctx.lineTo(startX+(3*scale),startY+(15*scale));
        ctx.lineTo(startX+(2*scale),startY+(15*scale));
        ctx.lineTo(startX+(2*scale),startY+(14*scale));
        ctx.lineTo(startX+(scale),startY+(14*scale));
        ctx.lineTo(startX+(scale),startY+(13*scale));
        ctx.lineTo(startX,startY+(13*scale));
        ctx.lineTo(startX,startY+(7*scale));
        ctx.lineTo(startX+(scale),startY+(7*scale));
        ctx.lineTo(startX+(scale),startY+(9*scale));
        ctx.lineTo(startX+(2*scale),startY+(9*scale));
        ctx.lineTo(startX+(2*scale),startY+(10*scale));
        ctx.lineTo(startX+(3*scale),startY+(10*scale));
        ctx.lineTo(startX+(3*scale),startY+(11*scale));
        ctx.lineTo(startX+(5*scale),startY+(11*scale));
        ctx.lineTo(startX+(5*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(9*scale));
        ctx.lineTo(startX+(8*scale),startY+(9*scale));
        ctx.lineTo(startX+(8*scale),startY+(8*scale));
        ctx.lineTo(startX+(9*scale),startY+(8*scale));
        ctx.lineTo(startX+(9*scale),startY+(7*scale));
        ctx.lineTo(startX+(10*scale),startY+(7*scale));
        ctx.lineTo(startX+(10*scale),startY+(scale));
        ctx.lineTo(startX+(11*scale),startY+(scale));
        ctx.lineTo(startX+(11*scale), startY);
        ctx.lineTo(startX+(19*scale), startY);
        ctx.lineTo(startX+(19*scale),startY+(scale));
        ctx.lineTo(startX+(20*scale),startY+(scale));
        ctx.lineTo(startX+(20*scale),startY+(5*scale));
        ctx.lineTo(startX+(15*scale),startY+(5*scale));
        ctx.lineTo(startX+(15*scale),startY+(6*scale));
        ctx.lineTo(startX+(18*scale),startY+(6*scale));
        ctx.lineTo(startX+(18*scale),startY+(7*scale));
        ctx.lineTo(startX+(14*scale),startY+(7*scale));
        ctx.lineTo(startX+(14*scale),startY+(9*scale));
        ctx.lineTo(startX+(16*scale),startY+(9*scale));
        ctx.lineTo(startX+(16*scale),startY+(11*scale));
        ctx.lineTo(startX+(15*scale),startY+(11*scale));
        ctx.lineTo(startX+(15*scale),startY+(10*scale));
        ctx.lineTo(startX+(14*scale),startY+(10*scale));
        ctx.lineTo(startX+(14*scale),startY+(13*scale));
        ctx.lineTo(startX+(13*scale),startY+(13*scale));
        ctx.lineTo(startX+(13*scale),startY+(15*scale));
        ctx.lineTo(startX+(12*scale),startY+(15*scale));
        ctx.lineTo(startX+(12*scale),startY+(16*scale));
        ctx.lineTo(startX+(11*scale),startY+(16*scale));
        ctx.lineTo(startX+(11*scale),startY+(20*scale));
        ctx.lineTo(startX+(12*scale),startY+(20*scale));
        ctx.lineTo(startX+(12*scale),startY+(21*scale));
        ctx.lineTo(startX+(10*scale),startY+(21*scale));
        ctx.lineTo(startX+(10*scale),startY+(18*scale));
        ctx.lineTo(startX+(9*scale),startY+(18*scale));
        ctx.lineTo(startX+(9*scale),startY+(17*scale));
        ctx.lineTo(startX+(8*scale),startY+(17*scale));
        ctx.lineTo(startX+(8*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(20*scale));
        ctx.lineTo(startX+(7*scale),startY+(20*scale));
        ctx.lineTo(startX+(7*scale),startY+(21*scale));
        ctx.lineTo(startX+(5*scale),startY+(21*scale));
        ctx.lineTo(startX+(5*scale),startY+(17*scale));
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.clearRect(startX+(12*scale), startY+scale, scale, scale);
        ctx.closePath();

        this.dinoStayImg = ctx.getImageData(startX, startY, 20*scale, 21*scale);
    }
    dinoBodyDown = (ctx,startX=0, startY=0, scale=1) => {
        ctx.beginPath();
        ctx.moveTo(startX+(5*scale),startY+(16*scale));
        ctx.lineTo(startX+(4*scale),startY+(16*scale));
        ctx.lineTo(startX+(4*scale),startY+(15*scale));
        ctx.lineTo(startX+(3*scale),startY+(15*scale));
        ctx.lineTo(startX+(3*scale),startY+(14*scale));
        ctx.lineTo(startX+(2*scale),startY+(14*scale));
        ctx.lineTo(startX+(2*scale),startY+(13*scale));
        ctx.lineTo(startX+(scale),startY+(13*scale));
        ctx.lineTo(startX+(scale),startY+(12*scale));
        ctx.lineTo(startX,startY+(12*scale));
        ctx.lineTo(startX,startY+(9*scale));
        ctx.lineTo(startX+(scale),startY+(9*scale));
        ctx.lineTo(startX+(scale),startY+(10*scale));
        ctx.lineTo(startX+(3*scale),startY+(10*scale));
        ctx.lineTo(startX+(3*scale),startY+(11*scale));
        ctx.lineTo(startX+(7*scale),startY+(11*scale));
        ctx.lineTo(startX+(7*scale),startY+(10*scale));
        ctx.lineTo(startX+(15*scale),startY+(10*scale));
        ctx.lineTo(startX+(15*scale),startY+(11*scale));
        ctx.lineTo(startX+(18*scale),startY+(11*scale));
        ctx.lineTo(startX+(18*scale),startY+(10*scale));
        ctx.lineTo(startX+(19*scale),startY+(10*scale));
        ctx.lineTo(startX+(19*scale),startY+(9*scale));
        ctx.lineTo(startX+(27*scale),startY+(9*scale));
        ctx.lineTo(startX+(27*scale),startY+(10*scale));
        ctx.lineTo(startX+(28*scale),startY+(10*scale));
        ctx.lineTo(startX+(28*scale),startY+(14*scale));
        ctx.lineTo(startX+(23*scale),startY+(14*scale));
        ctx.lineTo(startX+(23*scale),startY+(15*scale));
        ctx.lineTo(startX+(26*scale),startY+(15*scale));
        ctx.lineTo(startX+(26*scale),startY+(16*scale));
        ctx.lineTo(startX+(18*scale),startY+(16*scale));
        ctx.lineTo(startX+(18*scale),startY+(15*scale));
        ctx.lineTo(startX+(16*scale),startY+(15*scale));
        ctx.lineTo(startX+(16*scale),startY+(17*scale));
        ctx.lineTo(startX+(15*scale),startY+(17*scale));
        ctx.lineTo(startX+(15*scale),startY+(18*scale));
        ctx.lineTo(startX+(16*scale),startY+(18*scale));
        ctx.lineTo(startX+(16*scale),startY+(19*scale));
        ctx.lineTo(startX+(14*scale),startY+(19*scale));
        ctx.lineTo(startX+(14*scale),startY+(17*scale));

        ctx.lineTo(startX+(11*scale),startY+(17*scale));
    }
    dinoDownLeft = (ctx,startX=0, startY=0, scale=1) => {
        this.dinoBodyDown(ctx, startX, startY, scale);
        //right leg
        ctx.lineTo(startX+(11*scale),startY+(18*scale));
        ctx.lineTo(startX+(10*scale),startY+(18*scale));
        ctx.lineTo(startX+(10*scale),startY+(19*scale));
        ctx.lineTo(startX+(9*scale),startY+(19*scale));
        ctx.lineTo(startX+(9*scale),startY+(20*scale));
        ctx.lineTo(startX+(10*scale),startY+(20*scale));
        ctx.lineTo(startX+(10*scale),startY+(21*scale));
        ctx.lineTo(startX+(8*scale),startY+(21*scale));
        ctx.lineTo(startX+(8*scale),startY+(17*scale));

        //left leg
        ctx.lineTo(startX+(6*scale),startY+(17*scale));
        ctx.lineTo(startX+(6*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(19*scale));
        ctx.lineTo(startX+(5*scale),startY+(19*scale));

        ctx.fillStyle = '#000';
        ctx.fill();
        //cut eye
        ctx.clearRect(startX+(20*scale), startY+(10*scale), scale, scale);

        this.dinoDownStepLeftImg = ctx.getImageData(startX, startY+(9*scale), 28*scale, 12*scale);
    }
    dinoDownRight = (ctx,startX=0, startY=0, scale=1) => {
        this.dinoBodyDown(ctx, startX, startY, scale);

        //right leg
        ctx.lineTo(startX+(11*scale),startY+(17.5*scale));
        ctx.lineTo(startX+(12*scale),startY+(17.5*scale));
        ctx.lineTo(startX+(12*scale),startY+(18.5*scale));
        ctx.lineTo(startX+(10*scale),startY+(18.5*scale));
        ctx.lineTo(startX+(10*scale),startY+(18*scale));
        ctx.lineTo(startX+(10*scale),startY+(17*scale));
        //left leg
        ctx.lineTo(startX+(8*scale),startY+(17*scale));
        ctx.lineTo(startX+(8*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(20*scale));
        ctx.lineTo(startX+(7*scale),startY+(20*scale));
        ctx.lineTo(startX+(7*scale),startY+(21*scale));
        ctx.lineTo(startX+(5*scale),startY+(21*scale));

        ctx.fillStyle = '#000';
        ctx.fill();
        //cut eye
        ctx.clearRect(startX+(20*scale), startY+(10*scale), scale, scale);

        this.dinoDownStepRightImg = ctx.getImageData(startX, startY+(9*scale), 28*scale, 12*scale);
    }
    dinoFall = (ctx, startX=0, startY=0, scale=1) => {
        ctx.beginPath();
        ctx.moveTo(startX+(4*scale),startY+(17*scale));
        ctx.lineTo(startX+(4*scale),startY+(16*scale));
        ctx.lineTo(startX+(3*scale),startY+(16*scale));
        ctx.lineTo(startX+(3*scale),startY+(15*scale));
        ctx.lineTo(startX+(2*scale),startY+(15*scale));
        ctx.lineTo(startX+(2*scale),startY+(14*scale));
        ctx.lineTo(startX+(scale),startY+(14*scale));
        ctx.lineTo(startX+(scale),startY+(13*scale));
        ctx.lineTo( startX, startY+(13*scale));
        ctx.lineTo( startX,startY+(7*scale));
        ctx.lineTo(startX+(scale),startY+(7*scale));
        ctx.lineTo(startX+(scale),startY+(9*scale));
        ctx.lineTo(startX+(2*scale),startY+(9*scale));
        ctx.lineTo(startX+(2*scale),startY+(10*scale));
        ctx.lineTo(startX+(3*scale),startY+(10*scale));
        ctx.lineTo(startX+(3*scale),startY+(11*scale));
        ctx.lineTo(startX+(5*scale),startY+(11*scale));
        ctx.lineTo(startX+(5*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(10*scale));
        ctx.lineTo(startX+(6*scale),startY+(9*scale));
        ctx.lineTo(startX+(8*scale),startY+(9*scale));
        ctx.lineTo(startX+(8*scale),startY+(8*scale));
        ctx.lineTo(startX+(9*scale),startY+(8*scale));
        ctx.lineTo(startX+(9*scale),startY+(7*scale));
        ctx.lineTo(startX+(10*scale),startY+(7*scale));
        ctx.lineTo(startX+(10*scale),startY+(scale));
        ctx.lineTo(startX+(11*scale),startY+(scale));
        ctx.lineTo(startX+(11*scale), startY);
        ctx.lineTo(startX+(19*scale), startY);
        ctx.lineTo(startX+(19*scale),startY+(scale));
        ctx.lineTo(startX+(20*scale),startY+(scale));
        ctx.lineTo(startX+(20*scale),startY+(5*scale));
        ctx.lineTo(startX+(15*scale),startY+(5*scale));
        ctx.lineTo(startX+(15*scale),startY+(6*scale));
        ctx.lineTo(startX+(18*scale),startY+(6*scale));
        ctx.lineTo(startX+(18*scale),startY+(7*scale));
        ctx.lineTo(startX+(14*scale),startY+(7*scale));
        ctx.lineTo(startX+(14*scale),startY+(9*scale));
        ctx.lineTo(startX+(16*scale),startY+(9*scale));
        ctx.lineTo((startX+16)*scale,(startY+11)*scale);
        ctx.lineTo((startX+15)*scale,(startY+11)*scale);
        ctx.lineTo((startX+15)*scale,(startY+10)*scale);
        ctx.lineTo((startX+14)*scale,(startY+10)*scale);
        ctx.lineTo((startX+14)*scale,(startY+13)*scale);
        ctx.lineTo((startX+13)*scale,(startY+13)*scale);
        ctx.lineTo((startX+13)*scale,(startY+15)*scale);
        ctx.lineTo((startX+12)*scale,(startY+15)*scale);
        ctx.lineTo((startX+12)*scale,(startY+16)*scale);
        ctx.lineTo((startX+11)*scale,(startY+16)*scale);
        ctx.lineTo((startX+11)*scale,(startY+20)*scale);
        ctx.lineTo((startX+12)*scale,(startY+20)*scale);
        ctx.lineTo((startX+12)*scale,(startY+21)*scale);
        ctx.lineTo((startX+10)*scale,(startY+21)*scale);
        ctx.lineTo((startX+10)*scale,(startY+18)*scale);
        ctx.lineTo(startX+(9*scale),startY+(18*scale));
        ctx.lineTo(startX+(9*scale),startY+(17*scale));
        ctx.lineTo(startX+(8*scale),startY+(17*scale));
        ctx.lineTo(startX+(8*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(18*scale));
        ctx.lineTo(startX+(7*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(19*scale));
        ctx.lineTo(startX+(6*scale),startY+(20*scale));
        ctx.lineTo(startX+(7*scale),startY+(20*scale));
        ctx.lineTo(startX+(7*scale),startY+(21*scale));
        ctx.lineTo(startX+(5*scale),startY+(21*scale));
        ctx.lineTo(startX+(5*scale),startY+(17*scale));
        ctx.fill();
        ctx.fillStyle = 'red';
        ctx.clearRect((startX+12)*scale, (startY+1)*scale, scale*2, scale*2);
        ctx.fillRect((startX+12.5)*scale, (startY+1.5)*scale, scale, scale);
    }
    Animate () {

        this.y += this.dy;

        //Gravity
        if(this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        //Jump Animation
        if(keys['Space'] || keys['KeyW'] || keys['ArrowUp']) {
            this.Jump();
            this.Draw('stay');

        } else if(keys['ShiftLeft'] || keys['KeyS'] || keys['ArrowDown']) {
            if(this.flag) {
                this.flag = !this.flag;
                this.Draw('down_step_left');

            } else {
                this.flag = !this.flag;
                this.Draw('down_step_right');
            }
        } else {
            this.jumpTimer = 0;
            if(this.flag) {
                this.flag = !this.flag;
                this.Draw('step_left');

            } else {
                this.flag = !this.flag;
                this.Draw('step_right');
            }
        }

    }

    Jump () {
        if(this.grounded && this.jumpTimer === 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if(this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50);
        }
    }

    Draw (type) {
        if(type === 'stay') {
            this.h = this.originalHeight;

            if(this.dinoStayImg) {
                ctx.putImageData(this.dinoStayImg, this.x, this.y);
            } else {
                this.dinoStay(ctx, this.x, this.y, this.scale);
            }
        }
        if(type === 'step_left') {
            this.h = this.originalHeight;

            if(this.dinoStepLeftImg) {
                ctx.putImageData(this.dinoStepLeftImg, this.x, this.y);
            } else {
                this.dinoLegLeft(ctx, this.x, this.y, this.scale);
            }
        }
        if(type === 'step_right') {
            this.h = this.originalHeight;

            if(this.dinoStepRightImg) {
                ctx.putImageData(this.dinoStepRightImg, this.x, this.y);
            } else {
                this.dinoLegRight(ctx, this.x, this.y, this.scale);
            }
        }
        if(type === 'down_step_left') {
            this.h = this.originalHeight - (9 * this.scale);
            if(this.dinoDownStepLeftImg) {
                ctx.putImageData(this.dinoDownStepLeftImg, this.x, this.y);
            } else {
                this.dinoDownLeft(ctx, this.x, this.y, this.scale);
            }
        }
        if(type === 'down_step_right') {
            this.h = this.originalHeight - (9 * this.scale);
            if(this.dinoDownStepRightImg) {
                ctx.putImageData(this.dinoDownStepRightImg, this.x, this.y);
            } else {
                this.dinoDownRight(ctx, this.x, this.y, this.scale);
            }
        }
    }

}