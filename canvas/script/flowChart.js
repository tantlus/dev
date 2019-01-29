function FlowChart(canvas) {
  var flowChart = {
    ctx: canvas.getContext('2d'),
    canvasBound: canvas.getBoundingClientRect(),
    shapes: [],
    startX: 0,
    startY: 0,
    isDrag: false,
    shapeIndex: undefined,

    getData: function(){
      return this.shapes;
    },

    loadData: function(data){
      this.shapes = data;
      this.DrawCanvas();
    },

    getIndexFromId: function(id){
      for (var i = 0; i < this.shapes.length; i++) {
        if(this.shapes[i].id == id) return i;
      }
    },

    AddShape: function(iLeft, iTop, iWidth, iHeight, shapeType, id , clickEventFn) {
      var info = {
        left: iLeft,
        top: iTop,
        width: iWidth,
        height: iHeight,
        type: shapeType,
        id: '',
        lineTo: [],
        message: '',
        clickFunc:function(param){}
      };

      if (id == undefined || id == '') {
        info.id = Math.random().toString(36).replace(/[^a-z]+/g, '');
      } else {
        info.id = id;
      }

      if(clickEventFn != undefined ) info.clickFunc = clickEventFn;


      this.shapes[this.shapes.length] = info;

      this.DrawCanvas();
    },

    setMessage: function(message) {
      this.shapes[this.shapeIndex].message = message;
      this.DrawCanvas();
    },

    removeShape: function() {
      if(this.shapeIndex == undefined) return;
      var oshapes = this.shapes;
      for (var i = oshapes.length-1; 0 <= i; i--) {
        var lines = oshapes[i].lineTo;
        for (var j = lines.length-1 ; 0 <= j ; j--) {
          var idx = this.getIndexFromId(oshapes[i].lineTo[j]);
          if (idx == this.shapeIndex) {
            oshapes[i].lineTo.splice(j, 1);
          }
        }
      }
      this.shapes.splice(this.shapeIndex, 1);
      this.shapeIndex = undefined;

      this.DrawCanvas();
    },

    AddLine: function(iStart, iEnd) {
      var iCount = this.shapes.length;
      var toId = this.shapes[iEnd].id;

      if (iStart < 0 || iStart >= iCount) return;
      if (iEnd < 0 || iEnd >= iCount) return;
      if (toId == undefined || toId == '') return;
      this.shapes[iStart].lineTo[this.shapes[iStart].lineTo.length] = toId;

      this.DrawCanvas();
    },

    MoveBox: function(iBoxIndex, iX, iY) {
      this.shapes[iBoxIndex].left = this.shapes[iBoxIndex].left + iX;
      this.shapes[iBoxIndex].top = this.shapes[iBoxIndex].top + iY;

      this.DrawCanvas();
    },

    DrawCanvas: function() {

      var shapeCount = this.shapes.length;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < shapeCount; ++i) {
        var oShape = this.shapes[i];
        if ('START' == oShape.type.toUpperCase()) {

        } else if ('TASK1' == oShape.type.toUpperCase()) {
          this.drawTask1Shape(oShape);
        } else if ('TASK2' == oShape.type.toUpperCase()) {
          this.drawTask2Shape(oShape);
        } else if ('TASK3' == oShape.type.toUpperCase()) {
          this.drawTask3Shape(oShape);
        } else if ('END' == oShape.type.toUpperCase()) {

        }
      }

/*
      for (var i = 0; i < this.shapes.length; i++) {
        console.log(this.shapes[i].lineTo[0] + ',' +this.shapeIndex + ' , ' + this.shapes[i].left + ',' + this.shapes[i].top);
      }
*/
    },

    drawMessage: function(shape) {
      this.ctx.font = '14px serif';
      this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      var messageSubstr = shape.message;
      if (shape.message.length > 11) {
        messageSubstr = shape.message.substr(0, 11) + '...';
      }
      this.ctx.fillText(messageSubstr, shape.left + 2, shape.top + 50, shape.width - 4);
    },



    drawLine: function(shape) {
      var lines = shape.lineTo;

      for (var i = 0; i < lines.length; i++) {
        var clsLineBox = this.shapes[this.getIndexFromId(lines[i])];
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

        this.ctx.beginPath();

        if ((shape.left + shape.width) < clsLineBox.left) {
          //this.ctx.moveTo( shape.left + shape.width, shape.top + shape.height / 2 );
          //this.ctx.lineTo( clsLineBox.left, clsLineBox.top + clsLineBox.height / 2 );
          console.log('a');
          fromx = shape.left + shape.width;
          fromy = shape.top + shape.height / 2;
          tox = clsLineBox.left;
          toy = clsLineBox.top + clsLineBox.height / 2;
          this.drawArrow(fromx, fromy, tox, toy);
        } else if ((clsLineBox.left + clsLineBox.width) < shape.left) {
          //this.ctx.moveTo( clsLineBox.left + clsLineBox.width, clsLineBox.top + clsLineBox.height / 2 );
          //this.ctx.lineTo( shape.left , shape.top +  shape.height / 2);
          console.log('b');
          fromx = clsLineBox.left + clsLineBox.width;
          fromy = clsLineBox.top + clsLineBox.height / 2;
          tox = shape.left;
          toy = shape.top + shape.height / 2;
          this.drawArrow(tox, toy, fromx, fromy);
        } else if ((shape.top + shape.height) < clsLineBox.top) {
          //this.ctx.moveTo( shape.left + shape.width / 2, shape.top + shape.height );
          //this.ctx.lineTo( clsLineBox.left + clsLineBox.width / 2, clsLineBox.top );
          console.log('c');
          fromx = shape.left + shape.width / 2;
          fromy = shape.top + shape.height;
          tox = clsLineBox.left + clsLineBox.width / 2;
          toy = clsLineBox.top;
          this.drawArrow(fromx, fromy, tox, toy);
        } else {
          //this.ctx.moveTo( clsLineBox.left + clsLineBox.width / 2, clsLineBox.top + clsLineBox.height );
          //this.ctx.lineTo( shape.left + shape.width / 2, shape.top );
          console.log('d');
          fromx = clsLineBox.left + clsLineBox.width / 2;
          fromy = clsLineBox.top + clsLineBox.height;
          tox = shape.left + shape.width / 2;
          toy = shape.top;
          this.drawArrow(tox, toy, fromx, fromy);
        }
        this.ctx.stroke();
        this.ctx.closePath();
      }
    },
    drawArrow: function(fromx, fromy, tox, toy) {
      var headlen = 10; // length of head in pixels
      var angle = Math.atan2(toy - fromy, tox - fromx);
      this.ctx.moveTo(fromx, fromy);
      this.ctx.lineTo(tox, toy);
      this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
      this.ctx.moveTo(tox, toy);
      this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    },

    drawfocusShape: function(shape) {
      var path2D = new Path2D();
      path2D.rect(shape.left, shape.top, shape.width, shape.height);
      this.ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
      this.ctx.stroke(path2D);
      this.drawLine(shape);
    },

    drawTask1Shape: function(shape) {
      var path2D = new Path2D();
      path2D.rect(shape.left, shape.top, shape.width, shape.height);
      this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      this.ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
      this.ctx.fill(path2D);
      this.ctx.stroke(path2D);

      this.ctx.font = '25px serif';
      this.ctx.fillText(shape.id, shape.left + 2, shape.top + 20);

      this.drawLine(shape);
      this.drawMessage(shape);
    },

    drawTask2Shape: function(shape) {
      var path2D = new Path2D();
      path2D.rect(shape.left, shape.top, shape.width, shape.height);
      this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
      this.ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
      this.ctx.fill(path2D);
      this.ctx.stroke(path2D);

      this.ctx.font = '25px serif';
      this.ctx.fillText(shape.id, shape.left + 2, shape.top + 20);

      this.drawLine(shape);
      this.drawMessage(shape);
    },

    drawTask3Shape: function(shape) {
      var path2D = new Path2D();
      path2D.rect(shape.left, shape.top, shape.width, shape.height);
      this.ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
      this.ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
      this.ctx.fill(path2D);
      this.ctx.stroke(path2D);

      this.ctx.font = '25px serif';
      this.ctx.fillText(shape.id, shape.left + 2, shape.top + 20);

      this.drawLine(shape);
      this.drawMessage(shape);
    },

    //이벤트동작정의
    mousedown: function(e) {
      this.startX = e.clientX - this.canvasBound.left;
      this.startY = e.clientY - this.canvasBound.top;

      var shapeCount = this.shapes.length;

      for (var i = 0; i < shapeCount; ++i) {
        var shape = this.shapes[i];

        console.log(i+','+shape.left +','+shape.width);

        if (this.startX > shape.left && this.startX < (shape.left + shape.width) && this.startY > shape.top && this.startY < (shape.top + shape.height)) {
          this.isDrag = true;
          this.shapeIndex = i;
          this.drawfocusShape(shape);
          break;
        }
      }
    },

    mousemove: function(e) {
      if (this.isDrag) {
        this.MoveBox(this.shapeIndex, e.clientX - this.canvasBound.left - this.startX, e.clientY - this.canvasBound.top - this.startY);
        var shape = this.shapes[this.shapeIndex];
        this.drawfocusShape(shape);
        this.startX = e.clientX - this.canvasBound.left;
        this.startY = e.clientY - this.canvasBound.top;
      }
    },

    mouseup: function(e) {
      var shape = this.shapes[this.shapeIndex];
      if (this.isDrag) {
        this.MoveBox(this.shapeIndex, e.clientX - this.canvasBound.left - this.startX, e.clientY - this.canvasBound.top - this.startY);

        this.drawfocusShape(shape);
        this.isDrag = false;
      }
      if(shape.clickFunc != undefined) shape.clickFunc(shape);
    }
  };

  canvas.addEventListener("mousemove", function(e) {
    flowChart.mousemove(e);
  });
  canvas.addEventListener("mousedown", function(e) {
    flowChart.mousedown(e);
  });
  canvas.addEventListener("mouseup", function(e) {
    flowChart.mouseup(e);
  });

  return flowChart;
}
