
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
		this.dropImgOnLoad = options.dropImgOnLoad;

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
			ctx.clearRect(0,0,self.oCanvas.width,self.oCanvas.height);
			self.oCanvas.width = oImg.width;
			self.oCanvas.height = oImg.height;

			ctx.drawImage(oImg,0,0,oImg.width,oImg.height);

			self.canvasUrl=self.oCanvas.toDataURL();
			self.dropImgOnLoad ? self.dropImgOnLoad() : ''

		}
		

		oImg.src = src;

	}

	window.ScaleImg=ScaleImg;
})()
