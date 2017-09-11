var Exposure = (function() {
            function _Exposure($target, callback, one) {
                this.$target = $target;
                this.callback = callback;
                this.moreTime = true;
                this.one = one || false;
                this.check();
                this.bind();
            }
            _Exposure.prototype = {
                bind: function() {
                    var _this = this;
                    $(window).on('scroll', function() {
                        _this.check();
                    })
                },
                check: function() {
                    if (this.isShow(this.$target) && this.moreTime) {
                        this.callback(this.$target);
                        this.one ? this.moreTime = false : this.moreTime = true;
                    }
                },
                isShow: function() {
                    var windowHeight = $(window).height(),
                        scrollTop = $(window).scrollTop(),
                        offsetTop = this.$target.offset().top,
                        nodeHeight = this.$target.height();
                    if (windowHeight + scrollTop > offsetTop && scrollTop < offsetTop + nodeHeight) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return {
                init: function($node, callback) {
                    $node.each(function(index, target) {
                        new _Exposure($node, callback)
                    })
                },
                one: function($node, callback) {
                    $node.each(function() {
                        new _Exposure($node, callback, true)
                    })
                }
            }
        })()
