/**
 * Created by Administrator on 2016/11/24.
 */
//开场动画
var deduction={
    TIME:0,//记录计时器运行的次数
    timer:null,
    ctx:null,
    DURATION:40,
    v0:[],//初始速度
    //var vt=v0;//末速度
    y:[],//初始高度
    y0:[],//初始高度
    y1:[],//初始高度
    t:[],//初始时间
    a:50,//加速度
    x:[],
    xdir:[],
    c:[],//随机颜色
    n:500,//小球数量
    p:[],//倍率
    canMove:[],//有损耗时使用
    rippleX:10,//运动涟漪的x坐标
    rippleY:10,//运动涟漪的y坐标
    alpha:1,//透明度 1:不透明
    init:function(){
        this.ctx=canvas.getContext('2d');
        this.moreInit();
        this.timer=setInterval(this.start.bind(this),this.DURATION);
    },
    //多球体的初始化
    moreInit:function(){
        for(var i=0;i<this.n;i++){
            this.x[i]=500+this.rn(-200,200);//x轴的初始位置
            this.xdir[i]=Math.random()>0.5?1:-1;//水平移动初始方向
            this.c[i]=this.rc(200,255);//随机颜色
            this.y0[i]=this.rn(100,300);//随机高度
            this.y1[i]=this.y0[i];
            this.y[i]=this.y0[i];
            this.t[i]=0;
            this.v0[i]=0;
            this.p[i]=this.rn(5,20);//随机倍率，用于控制随机速度
            this.canMove[i]=true;
        }
    },
    //动画开始
    start:function(){
        this.TIME++;
        this.ctx.clearRect(0,0,1000,500);
        //绘制背景
        var grd=this.ctx.createRadialGradient(500,270,0,500,500,1500);
        grd.addColorStop(0,'#fff');
        grd.addColorStop(1,'#aaa');
        this.ctx.fillStyle=grd;
        this.ctx.fillRect(0,0,1000,500);

        //过渡
        if(this.TIME<=30){
            this.ctx.globalAlpha=1;
        }else if(this.TIME<=50){
            this.ctx.globalAlpha=this.alpha;
            this.alpha-=0.05;
        }else if(this.TIME<=70){
            this.ctx.globalAlpha=this.alpha;
            this.alpha+=0.05;
        }
        else if(this.TIME<=110){
            this.ctx.globalAlpha=1;
        }else if(this.TIME<=130){
            this.ctx.globalAlpha=this.alpha;
            this.alpha-=0.05;
        }else if(this.TIME<=150){
            this.ctx.globalAlpha=this.alpha;
            this.alpha+=0.05;
        }
        else if(this.TIME<=200){
            this.ctx.globalAlpha=1;
        }else if(this.TIME<=220){
            this.ctx.globalAlpha=this.alpha;
            this.alpha-=0.05;
        }else if(this.TIME<=240){
            this.ctx.globalAlpha=this.alpha;
            this.alpha+=0.05;
        }
        else if(this.TIME<=310){
            this.ctx.globalAlpha=1;
        }else if(this.TIME<=330){
            this.ctx.globalAlpha=this.alpha;
            this.alpha-=0.05;
        }else if(this.TIME<=350){
            this.ctx.globalAlpha=this.alpha;
            this.alpha+=0.05;
        }
        else if(this.TIME<=360){
            this.ctx.globalAlpha=1;
        }else if(this.TIME<=380){
            this.ctx.globalAlpha=this.alpha;
            this.alpha-=0.05;
        }else if(this.TIME<=400){
            this.ctx.globalAlpha=this.alpha;
            this.alpha+=0.05;
        }

        if(this.TIME<=50){
            this.crashBall(1,false,true,[20]);
            //this.freeFalling();
        }else if(this.TIME<=130){
            this.crashBall(this.n,true,true,this.p);
        }else if(this.TIME<=220){
            this.crashBall(1,true,true,[15]);
        }else if(this.TIME<=330){
            this.rippleRound(this.rn(100,800),this.rn(100,400),this.rn(20,100));
            //this.crashBall(this.n,true,this.p);
        }else if(this.TIME<=380){
            //if((this.TIME-300)%2==0){
            //    //var x=(this.TIME-200)*5;
            //    this.rippleX=200;
            //    this.rippleY=100;
            //}
            //this.rippleMove(this.rippleX,this.rippleY);
            //大量小球由下至上涌现
            this.crashBall(this.n,false,false,this.p);
        }else if(this.TIME<=400){
            this.nameLine((this.TIME-380)*50);
        }else if(this.TIME<=510){
            this.nameLine((this.TIME-360)*50);
            this.drawName();
        }

        //this.ctx.beginPath();
        //this.ctx.fillStyle='#333';
        //this.ctx.arc(500,200,20,0,2*Math.PI);
        //this.ctx.fill();

    },
    ////自由落体
    //freeFalling:function(){
    //    this.ctx.beginPath();
    //    this.ctx.fillStyle="#0af";
    //    this.ctx.arc(500,150,20,0,2*Math.PI);
    //    this.ctx.fill();
    //},

    ////运动涟漪效果
    //rippleMove:function(x,y){
    //    for(var i=0;i<10;i++){
    //        this.ctx.beginPath();
    //        this.ctx.strokeStyle=this.rc(0,255);
    //        this.ctx.lineWidth=i*i;
    //        this.ctx.arc(x,y,i*20,0,2*Math.PI);
    //        this.ctx.stroke();
    //    }
    //},
    changeAlpha:function(){
      this.ctx.globalAlpha=this.alpha;
    },
    //涟漪效果
    rippleRound:function(x,y,r){
        this.ctx.beginPath();
        this.ctx.strokeStyle=this.rc(0,255);
        this.ctx.lineWidth=3;
        this.ctx.arc(x,y,r,0,2*Math.PI);
        this.ctx.stroke();
    },
    //画线
    drawName:function() {
        this.ctx.textBaseline = top;
        //this.ctx.fillStyle="#333";
        var grd=this.ctx.createRadialGradient(650,250,10,700,300,100);
        grd.addColorStop(0,'#444');
        grd.addColorStop(1,'#222');
        //this.ctx.shadowColor='#333';
        //this.ctx.shadowBlur=3;
        this.ctx.fillStyle=grd;
        this.ctx.font = "bold 80px SimHei";
        this.ctx.fillText("黄俊杰", 650, 250);
        this.ctx.font = "bold 42px SimHei";
        this.ctx.fillText("Huang Jun Jie", 660, 300);
    },
    nameLine:function(x){
        this.ctx.beginPath();
        this.ctx.moveTo(0,265);
        this.ctx.lineTo(x,265);
        //this.ctx.quadraticCurveTo(x/2,0,x,272);
        this.ctx.lineWidth=5;
        this.ctx.strokeStyle="#3af";
        this.ctx.stroke();
    },
    //生成大量碰撞的小球--参数：n：数量，cnaX：能否水平运动，p：倍率
    crashBall:function(n,canX,canY,p){
        for(var i=0;i<n;i++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.c[i];
            this.ctx.arc(this.x[i], this.y[i], 20, 0, 2 * Math.PI);
            this.ctx.fill();

            /*无能量损耗*/
            if(canX){
                this.x[i]+=this.xdir[i]*p[i];
            }
            if (this.x[i] >= 970 || this.x[i] <= 20) {
                this.xdir[i] *= -1;
                this.c[i] = this.rca(0, 225);
            }
            this.t[i] += p[i] / 100;
            this.y[i] = this.v0[i] * this.t[i] + this.a * this.t[i] * this.t[i] / 2 + this.y0[i];
            if(canY){
                if (this.y[i] >= 460) {
                    this.y0[i] = 460;
                    this.v0[i] = -1 * this.a * this.t[i];
                    this.t[i] = 0;
                    this.c[i] = this.rca(0, 225);
                }
                if (this.y[i] <= this.y1[i]) {
                    this.t[i] = 0;
                    this.y0[i] = this.y[i];
                    this.v0[i] = 0;
                }
            }

        }
    },
    //随机数的生成
    rn:function(max,min){
        return Math.floor(Math.random()*(max-min)+min);
    },
    rc:function(max,min){
        var r=this.rn(max,min);
        var g=this.rn(max,min);
        var b=this.rn(max,min);
        return `rgb(${r},${g},${b})`;
    },
    rca:function(max,min){
        var r=this.rn(max,min);
        var g=this.rn(max,min);
        var b=this.rn(max,min);
        return `rgba(${r},${g},${b},0.5)`;
    }
}

deduction.init();
