/*!
 * Custom tooltip
 * Created by Sinan ŞAHİN on 14.03.2019
 * Require jquery-3.3.1 JS
 */
(function($) {
    $.fn.SnnTooltip = function(opts) {
        // default configuration
        var config = $.extend({}, {
            position: 'bottom',
            fadeIn: 'fast',
            getDomContent: false,
            color: '#ffffff',
            showFunction: function () {},
            hideFunction: function () {}
        }, opts);

        // main function
        function initializeSnnTooltip(e) {
            $(e).mouseover(function () {
                var constant = 10;

                var tooltipContent = '';

                //SET TOOLTIP CONTENT
                if(config.getDomContent){
                    tooltipContent = $(e).html();
                }
                else{
                    tooltipContent = $(e).attr('snn-title');
                }

                //CREATE TOOLTIP
                var tooltip = $('<div/>', {
                    id: 'snn-tooltip',
                    class: 'snn-tooltip'
                }).html(tooltipContent).prependTo('body');

                //TOOLTIP GAP VALUES
                var gapWidth = $(tooltip).outerWidth() - $(e).outerWidth();
                var gapHeight = $(tooltip).outerHeight() - $(e).outerHeight();

                //SET TOOLTIP POSITIONS
                var tooltipPositions = {};
                var postionClass = '';
                if(config.position.toLowerCase() === 'bottom')
                {
                    postionClass = 'snn-tooltip-bottom';

                    //BOTTOM
                    tooltipPositions = {
                        top: $(e).offset().top + $(e).outerHeight() + constant + 'px',
                        left: $(e).offset().left - gapWidth / 2 + 'px',
                        height: $(e).outerHeight() + 'px',
                        width: $(e).outerWidth() + 'px'
                    };
                }
                else if(config.position.toLowerCase() === 'right')
                {
                    postionClass = 'snn-tooltip-right';

                    //RIGHT
                    tooltipPositions = {
                        top: $(e).offset().top - gapHeight / 2 + 'px',
                        left: $(e).offset().left + $(e).outerWidth() + constant + 'px',
                        height: $(e).outerHeight() + 'px',
                        width: $(e).outerWidth() + 'px'
                    };
                }
                else if(config.position.toLowerCase() === 'top')
                {
                    postionClass = 'snn-tooltip-top';

                    //TOP
                    tooltipPositions = {
                        top: $(e).offset().top - $(tooltip).outerHeight() - constant + 'px',
                        left: $(e).offset().left - gapWidth / 2 + 'px',
                        height: $(e).outerHeight() + 'px',
                        width: $(e).outerWidth() + 'px'
                    };
                }
                else if(config.position.toLowerCase() === 'left')
                {
                    postionClass = 'snn-tooltip-left';

                    //LEFT
                    tooltipPositions = {
                        top: $(e).offset().top - gapHeight / 2 + 'px',
                        left: $(e).offset().left - $(e).outerWidth() - gapWidth - constant + 'px',
                        height: $(e).outerHeight() + 'px',
                        width: $(e).outerWidth() + 'px'
                    };
                }

                //ASSIFN TOOLTIP POSITION FOR 'BEFORE CSS'
                $(tooltip).addClass(postionClass);

                //ASSIGN TOOLTIP POSITION
                $(tooltip).css({
                    "top": tooltipPositions.top,
                    "left": tooltipPositions.left
                });

                //TOOLTIP COLOR
                $(tooltip).css({
                    "color" : config.color
                });

                //TOOLTIP ANIMATION
                $(tooltip).fadeIn(config.fadeIn);

                //CALL WHEN TOOLTIP SHOWN FUNCTION
                config.showFunction();
            });

            $(e).mouseout(function () {
                //REMOVE TOOLTIP
                $('#snn-tooltip').remove();

                //CALL WHEN TOOLTIP REMOVED FUNCTION
                config.hideFunction();
            });
        }

        // initialize every element
        this.each(function() {
            initializeSnnTooltip($(this));
        });

        return this;
    };

    // start
    $(function() {
        $('button:eq(0)').SnnTooltip({
            position: 'left',
            fadeIn: 'slow',
            getDomContent: false
        });

        $('button:eq(1)').SnnTooltip({
            position: 'top',
            fadeIn: 'slow',
            getDomContent: false
        });

        $('button:eq(2)').SnnTooltip({
            position: 'right',
            fadeIn: 'slow',
            getDomContent: false
        });

        $('button:eq(3)').SnnTooltip({
            position: 'bottom',
            fadeIn: 'slow',
            getDomContent: false
        });
    });
})(jQuery);