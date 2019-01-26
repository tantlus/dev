function FlowChart(canvas) {
  var flowChart = {
    ctx: canvas.getContext('2d'),
    canvasBound: canvas.getBoundingClientRect(),
    shapes: [],
    startX: 0,
    startY: 0,
    isDrag: false,
    shapeIndex: 0,

    AddShape: function(iLeft, iTop, iWidth, iHeight, shapeType) {
      var info = {
        left: iLeft,
        top: iTop,
        width: iWidth,
        height: iHeight,
        type: shapeType,
        lineTo: -1
      };

      this.shapes[this.shapes.length] = info;

      this.DrawCanvas();
    },

    MoveBox: function( iBoxIndex, iX, iY ){
     this.shapes[iBoxIndex].left = this.shapes[iBoxIndex].left + iX;
     this.shapes[iBoxIndex].top = this.shapes[iBoxIndex].top + iY;

     this.DrawCanvas();
    },

    DrawCanvas: function() {

      var shapeCount = this.shapes.length;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < shapeCount; ++i) {
        var oShape = this.shapes[i];
        if ('START' == oShape.type.toUpperCase()){

        }else if ('TASK1' == oShape.type.toUpperCase()){
          this.drawTask1Shape(oShape);
        }else if ('TASK2' == oShape.type.toUpperCase()){
          this.drawTask2Shape(oShape);
        }else if ('TASK3' == oShape.type.toUpperCase()){
          this.drawTask3Shape(oShape);
        }else if ('END' == oShape.type.toUpperCase()){

        }
      }
    },

    drawTask1Shape: function(shape) {
      var path2D = new Path2D();
      path2D.rect(shape.left, shape.top, shape.width, shape.height);
      this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      this.ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
      this.ctx.fill(path2D);
      this.ctx.stroke(path2D);

      path2D = new Path2D();
      path2D.rect(shape.left, shape.top, 5, shape.height);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      this.ctx.fill(path2D);

    },

    drawTask2Shape: function(shape) {
      var path2D = new Path2D();
      path2D.rect(shape.left, shape.top, shape.width, shape.height);
      this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
      this.ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
      this.ctx.fill(path2D);
      this.ctx.stroke(path2D);
    },

    drawTask3Shape: function(shape) {
      var path2D = new Path2D();
      path2D.rect(shape.left, shape.top, shape.width, shape.height);
      this.ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
      this.ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
      this.ctx.fill(path2D);
      this.ctx.stroke(path2D);
    },

    //이벤트동작정의
    mousedown: function(e){
      this.startX = e.clientX - this.canvasBound.left;
      this.startY = e.clientY - this.canvasBound.top;

      var shapeCount = this.shapes.length;

      for( var i = 0; i < shapeCount; ++i )
      {
       var shape = this.shapes[i];

       if( this.startX > shape.left && this.startX < ( shape.left + shape.width ) && this.startY > shape.top && this.startY < ( shape.top + shape.height ) )
       {
        this.isDrag = true;
        this.shapeIndex = i;
        break;
       }
      }
    },

    mousemove: function(e){
     if( this.isDrag )
     {
      this.MoveBox( this.shapeIndex, e.clientX - this.canvasBound.left - this.startX, e.clientY - this.canvasBound.top - this.startY );
      this.startX = e.clientX - this.canvasBound.left;
      this.startY = e.clientY - this.canvasBound.top;
     }
    },

    mouseup: function(e){
     if( this.isDrag )
     {
      this.MoveBox( this.shapeIndex, e.clientX - this.canvasBound.left - this.startX, e.clientY - this.canvasBound.top - this.startY );
      this.isDrag = false;
     }
    }

  };

    canvas.addEventListener( "mousemove", function(e){ flowChart.mousemove(e); } );
    canvas.addEventListener( "mousedown", function(e){ flowChart.mousedown(e); } );
    canvas.addEventListener( "mouseup", function(e){ flowChart.mouseup(e); } );

    return flowChart;
  }
