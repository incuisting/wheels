var Slider = (function() {
            function _Slider($container) {
                this.$container = $container;
                this.init();
                this.bind();
                this.autoPlay();
            }

            _Slider.prototype.init = function() {
                var $content = this.$content = this.$container.find('.content'),
                    $pre = this.$pre = this.$container.find('.arrow.pre'),
                    $next = this.$next = this.$container.find('.arrow.next'),
                    $content_li = this.$content_li = this.$content.find('li'),
                    $label = this.$label = this.$container.find('.label li'),

                    img_count = this.img_count = 0,

                    img_width = this.img_width = $content_li.width(),
                    img_length = this.img_length = $content_li.length + 2;

                $content.append($content_li.first().clone());
                $content.prepend($content_li.last().clone());
                $content.css('width', img_length * img_width);
            }

            _Slider.prototype.bind = function() {
                    //将this的指向存储起来
                    var _this = this;
                    //上一页按钮的事件
                    this.$pre.on('click', function() {
                        _this.pre(1);
                    });
                    //下一页按钮事件
                    this.$next.on('click', function() {
                        _this.next(1);
                    });
                    //表示标签的点上的事件
                    this.$label.on('click', function() {
                        var index = $(this).index();
                        // console.log('index', index);
                        if (index > _this.img_count) {
                            // console.log('_this.img_count - index', index - _this.img_count)
                            _this.next(index - _this.img_count);
                        } else if (index < _this.img_count) {
                            _this.pre(_this.img_count - index);
                        }
                    });
                }
                //上一页按钮
            _Slider.prototype.pre = function(length) {
                    var _this = this;
                    //配置动画
                    this.$content.animate({
                        //计算偏移的值是图片宽度*步进长度
                        left: '+=' + _this.img_width * length
                    }, function() {
                        _this.img_count = _this.img_count - length;
                        // console.log('img_count', _this.img_count)
                        if (_this.img_count < 0) {
                            _this.img_count = _this.$content_li.length - 1;
                            _this.$content.css('left', -_this.$content_li.length * _this.img_width);
                        }
                        _this.changeLabel();
                    });
                }
                //下一页按钮
            _Slider.prototype.next = function(length) {
                var _this = this;
                _this.$content.animate({
                    //计算偏移的值是图片宽度*步进长度
                    left: '-=' + _this.img_width * length
                }, function() {
                    _this.img_count = _this.img_count + length;
                    // console.log('img_count', _this.img_count)
                    if (_this.img_count > _this.$content_li.length - 1) {
                        // 当计数超过总长度 把图片队列置回第一张
                        _this.img_count = 0;
                        _this.$content.css('left', -_this.img_width);
                    }
                    _this.changeLabel();
                });
            }
            _Slider.prototype.changeLabel = function(length) {
                this.$label.removeClass('active')
                    .eq(this.img_count)
                    .addClass('active');
            }
            _Slider.prototype.autoPlay = function() {
                var _this = this;
                clock = setInterval(function() {
                    _this.next(1);
                }, 2000);
            }
            return {
                init: function($container) {
                    $container.each(function(index, node) {
                        console.log(arguments);
                        new _Slider($(node));
                    })
                }
            }
        })()

