/*
  1.获取图片地址
  2.一张图片加载完毕后，将图片的宽高加入一个rowlist
  3.获取容器的宽度，将rowlist里加载完的图片的宽度累加与之对比
  4.当宽度大于容器宽度，去除数组的最后一个图片的信息，得到当前图片的累加宽度
  5.通过计算，等比例缩放图片使得图片占满一列
  6.清空rowlist将之前去除的图片信息加进去，继续从步骤2开始执行
*/

function Barrel($container){
  this.$container = $container;
  this.row_list = [];
  this.load_img();
}
Barrel.prototype={
  load_img:function(){
    var _this = this;
    var imgs = this.get_img_urls(20);
    
    $.each(imgs,function(index,url){
      var img = new Image();
      img.src = url;
      img.onload = function(){
        var img_info = {
          target : $(img),
          width:400*(img.width/img.height),
          height:400
        };
        
       _this.render(img_info);
//         console.log('width',img.width);
//         console.log('height',img.height);
      };
      
      
    });
    
    
    
    /*
    for(let i = 0;i<imgs.length;i++){
      var img = new Image();
      img.src= imgs[i];
      img.onload = function(){
        var img_info = {
          target : $(img),
          width:400*(img.width/img.height),
          height:400
        };
        console.log('img_width',img.width);
      console.log('img_info',img_info);
        _this.render(img_info);
      };
    }
    */
  },
  render:function(img_info){
    var client_width = this.$container.width();
    var row_width = 0;
    var new_row_height = 0;
    var last_img_info = img_info;
    
    this.row_list.push(img_info);
//     console.log('row_list',this.row_list);
    for(let i= 0;i<this.row_list.length;i++){
      row_width = row_width + this.row_list[i].width;
//       console.log('row_width',row_width);
    }
    if(row_width > client_width){
      row_width = row_width - last_img_info.width;
      //减去超出的图片的宽度
      //把它从数组中去除
      this.row_list.pop();
      new_row_height = client_width*400/row_width;
      
      
//       console.log('row_list',this.row_list);
//       console.log('new_row_height',new_row_height);
//       console.log('client_width',client_width);
      
      this.layout(new_row_height);
      //根据新得到的高度先容器里添加元素
      
      console.log('接下去添加到页面');
      this.row_list = [];
      this.row_list.push(last_img_info);
    }
  },
  layout:function(new_row_height){
    var $row_container = $('<div class="img-row"></div>');
    $.each(this.row_list,function(index,img_info){
      var $img_content = $('<div class="img-box"></div>'),
          $img = img_info.target;
          $img.height(new_row_height);
      //将图片的高度定义为计算后的等比高度，使得图片可以填满一行
          $img_content.append($img);
          $row_container.append($img_content);
      
    });
      console.log(this.$container);
      this.$container.append($row_container);
    
    
  },
  get_img_urls:function(num){
    var width,
        height,
        urls=[];
    for(let i = 0;i<num;i++){
      width= Math.floor(Math.random()*100+400);
      height = Math.floor(Math.random()*100+300);
      urls.push(`https://unsplash.it/${width}/${height}/?random`);
      
    }
    return urls;
  }
}
