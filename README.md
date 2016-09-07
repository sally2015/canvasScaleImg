

# canvasScaleImg

利用canvas对拖拽进来的图片进行缩小，实现在前端压缩图片的功能

    	dragenterFn  : 拖拽进入目标框时的回调函数
    
	dragoverFn ： 拖拽在目标框上的回调函数
		
	  dragleaveFn ：拖拽离开目标框的回调函数
	  
	dropFn ：释放目标框上的回调函数
	
	errorMsg ： 如果拖拽的不是图片的错误回调

	maxHeight ：等比压缩的最大高度
	
	maxWidth ：等比压缩的最大宽度；当宽高同时存在时，取宽
	
	dropImgOnLoad 等拖拽的图片加载完后回调函数 可获得self.canvasUrl 可获得canvas导出图片的src
