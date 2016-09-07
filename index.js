// window.onload = function(){

// 	var oDrog = document.getElementById('targetDrop');

// 	oDrog.addEventListener('dragover',function(ev){

// 		ev.preventDefault();

// 	});
// 	oDrog.addEventListener('dragenter',function(ev){

// 		ev.preventDefault();

// 		this.innerHTML='down your mouse';

// 	});
// 	oDrog.addEventListener('drop',function(ev){
// 		ev.preventDefault();
// 		console.log(ev.dataTransfer.files)

// 		this.innerHTML='drag your file';

// 		loadImg(ev.dataTransfer.files[0]);

// 	});
// 	oDrog.addEventListener('dragleave',function(ev){
// 		ev.preventDefault();

// 		this.innerHTML='drag your file';


// 	});


// 	function loadImg(data){
// 		console.log(data)
// 		var reader = new FileReader();  
// 	    // 绑定load事件自动回调函数  
// 	    reader.onload = function(e){  
// 	        scaleImg(e.target.result)
// 	    };  
// 	    // 读取文件内容  
// 	    reader.readAsDataURL(data); 
// 	}

// 	function scaleImg(src){

// 		var maxHeight = 100;

// 		var oImg = document.createElement('img');
// 		var oCanvas = document.getElementById('canvas');
// 		oImg.onload = function(){

// 			if(oImg.height>maxHeight){

// 				oImg.width=(maxHeight/oImg.height)*oImg.width;
// 				oImg.height=(maxHeight/oImg.height)*oImg.height;

// 			}

// 			var ctx = oCanvas.getContext('2d');

// 			ctx.clearRect(0,0,canvas.width,canvas.height);
// 			canvas.width = oImg.width;
// 			canvas.height = oImg.height;

// 			ctx.drawImage(oImg,0,0,oImg.width,oImg.height);
// 		}

// 		oImg.src = src;
// 	}
// }

(function(){

	function ScaleImg(options){
		this.oDrogTarget = document.getElementById( options.dropTargetId );
		

		this.oCanvas = document.getElementById( options.canvasId );
		this.dragenterFn = options.dragenterFn ;
		this.dragoverFn = options.dragoverFn;
		this.dragleaveFn = options.dragleaveFn;
		this.dropFn = options.dropFn;
		this.errorMsg = options.errorMsg;
		this.maxHeight = options.maxHeight;
		this.maxWidth= options.maxWidth;

		this.init();
	}

	ScaleImg.prototype.init = function(){
		this.events();
	}

	ScaleImg.prototype.events = function(){
		var self = this;
		this.oDrogTarget.addEventListener('dragenter',function(ev){
			ev.preventDefault();
			self.dragenterFn ? self.dragenterFn() :'';
		});

		this.oDrogTarget.addEventListener('dragover',function(ev){
			ev.preventDefault();
			self.dragoverFn ? self.dragoverFn() :'';
		});

		this.oDrogTarget.addEventListener('dragleave',function(ev){
			ev.preventDefault();
			self.dragleaveFn ? self.dragleaveFn() :'';

		});
		this.oDrogTarget.addEventListener('drop',function(ev){
			ev.preventDefault();
			self.getDataUrl( ev.dataTransfer.files[0] );
			self.dropFn ? self.dropFn() :'';

		});
	}
	ScaleImg.prototype.getDataUrl = function(data){//通过FileReader获取64位图片地址

		var self = this;

		if( !/image.*/.test(data.type) ){

			this.errorMsg ? this.errorMsg() : console.log('errorMsg');
		}

		var reader = new FileReader();

		reader.onload = function(ev){

			self.scale( ev.target.result );
		}

		reader.readAsDataURL(data);

	}

	ScaleImg.prototype.scale=function(src){//根据参数缩放图片

		var scaleNum='';
		var oImg = document.createElement('img');
		var self= this;
		oImg.onload = function(){

			if(self.maxHeight){

				if(oImg.height > self.maxHeight){
					scaleNum=self.maxHeight / oImg.height;
					oImg.width=scaleNum*oImg.width;
					oImg.height=scaleNum*oImg.height;

				}


			}else if(self.maxWidth){
				if(oImg.height > self.maxWidth){
					scaleNum = self.maxWidth/oImg.height;
					oImg.width=scaleNum*oImg.width;
					oImg.height=scaleNum*oImg.height;

				}
			}else{
				return;
			}

			var ctx = self.oCanvas.getContext('2d');
			console.log(scaleNum)
			ctx.clearRect(0,0,self.oCanvas.width,self.oCanvas.height);
			self.oCanvas.width = oImg.width;
			self.oCanvas.height = oImg.height;

			ctx.drawImage(oImg,0,0,oImg.width,oImg.height);

		}
		

		oImg.src = src;

	}

	window.ScaleImg=ScaleImg;
})()