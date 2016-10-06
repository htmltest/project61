var sliderPeriod    = 5000;
var sliderTimer     = null;

(function($) {

    $(document).ready(function() {

        $('form').each(function() {
            initForm($(this));
        });

        $('.top-menu-link').click(function(e) {
            $('.top-menu').toggleClass('open');
            $('.profile-menu').removeClass('open');
            e.preventDefault();
        });

        $('.top-search-mobile-link').click(function(e) {
            $('.top-search').addClass('open');
            e.preventDefault();
        });

        $('body').keyup(function(e) {
            if (e.keyCode == 27) {
                $('.top-search').removeClass('open');
                $('.top-menu').removeClass('open');
                $('.profile-menu').removeClass('open');
            }
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.top-menu').length == 0 && !$(e.target).hasClass('top-menu') && !$(e.target).hasClass('top-menu-link') && $(e.target).parents().filter('.top-search').length == 0 && !$(e.target).hasClass('top-search')) {
                $('.top-menu').removeClass('open');
            }
            if ($(e.target).parents().filter('.top-search').length == 0 && !$(e.target).hasClass('top-search') && !$(e.target).hasClass('top-search-mobile-link')) {
                $('.top-search').removeClass('open');
            }
        });

        $('.profile-menu-mobile').click(function(e) {
            $('.profile-menu').toggleClass('open');
            $('.top-menu').removeClass('open');
            e.preventDefault();
        });

        var navMenuTimer = null;
        $('nav > ul > li.with-submenu').mouseover(function() {
            var curMenu = $(this);
            window.clearTimeout(navMenuTimer);
            navMenuTimer = null;

            navMenuTimer = window.setTimeout(function() {
                $('nav > ul > li.hover').removeClass('hover');
                curMenu.addClass('hover');
            }, 300);
        });

        $('nav > ul > li.with-submenu').mouseout(function() {
            window.clearTimeout(navMenuTimer);
            navMenuTimer = null;

            navMenuTimer = window.setTimeout(function() {
                $('nav > ul > li.hover').removeClass('hover');
            }, 300);
        });

        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            var curHTML = '';
            curSlider.find('.slider-content li').each(function() {
                curHTML += '<a href="#"></a>';
            });
            $('.slider-ctrl').html(curHTML);
            $('.slider-ctrl a:first').addClass('active');
            sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
        });

        function sliderNext() {
            var curSlider = $('.slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex >= curSlider.find('.slider-content li').length) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('.slider-ctrl a.active').removeClass('active');
                curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
            }
        }

        $('.slider').on('click', '.slider-ctrl a', function(e) {
            if (!$(this).hasClass('active')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;

                var curSlider = $('.slider');
                if (curSlider.data('disableAnimation')) {
                    curSlider.find('.slider-content li.played').removeClass('played');

                    var curIndex = curSlider.data('curIndex');
                    var newIndex = $('.slider-ctrl a').index($(this));

                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);

                    curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                    curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1}).show();

                    curSlider.find('.slider-ctrl a.active').removeClass('active');
                    curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                    curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                        curSlider.data('disableAnimation', true);
                        sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                    });
                }
            }

            e.preventDefault();
        });

        $('.recommend-menu ul li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.recommend-menu ul li').index(curLi);
                $('.recommend-menu ul li.active').removeClass('active');
                curLi.addClass('active');
                $('.recommend-menu-current').html($(this).html());

                $('.recommend-tab.active').removeClass('active');
                $('.recommend-tab').eq(curIndex).addClass('active');
            }
            $('.recommend-menu').removeClass('open');
            e.preventDefault();
        });

        $('.recommend-menu-current').click(function() {
            $('.recommend-menu').toggleClass('open');
        });

        $('.video a').click(function(e) {
            $('.video').html('<iframe src="' + $(this).attr('href') + '?rel=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>');
            e.preventDefault();
        });

        $('.detail-photo').each(function() {
            if ($('.detail-photo-preview ul li').length < 2) {
                $('.detail-photo-next, .detail-photo-prev').hide();
            }
        });

        $('.detail-photo-preview ul li a').click(function(e) {
            var curLink = $(this);
            var curLi = curLink.parent();
            if (!curLink.parent().hasClass('active')) {
                $('.detail-photo-preview ul li.active').removeClass('active');
                curLi.addClass('active');
                $('.detail-photo-big img').attr('src', curLink.attr('href'));
            }
            e.preventDefault();
        });

        $('.detail-photo-next').click(function(e) {
            var curIndex = $('.detail-photo-preview ul li').index($('.detail-photo-preview ul li.active'));
            curIndex++;
            if (curIndex > $('.detail-photo-preview ul li').length - 1) {
                curIndex = 0;
            }
            $('.detail-photo-preview ul li').eq(curIndex).find('a').click();
            e.preventDefault();
        });

        $('.detail-photo-prev').click(function(e) {
            var curIndex = $('.detail-photo-preview ul li').index($('.detail-photo-preview ul li.active'));
            curIndex--;
            if (curIndex < 0) {
                curIndex = $('.detail-photo-preview ul li').length - 1;
            }
            $('.detail-photo-preview ul li').eq(curIndex).find('a').click();
            e.preventDefault();
        });

        $('.detail-photo-max a').fancybox({
            tpl : {
                closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            helpers: {
                overlay : {
                    locked : false
                }
            }
        });

        $('.detail-photo-zoom').click(function(e) {
            var curIndex = $('.detail-photo-preview ul li').index($('.detail-photo-preview ul li.active'));
            $('.detail-photo-max a').eq(curIndex).click();
            e.preventDefault();
        });

        $('.basket-delete a').click(function(e) {
            var curRow = $(this).parents().filter('.basket-row');
            curRow.remove();
            recalcBasket();
            e.preventDefault();
        });

        function recalcBasket() {
            var curSumm = 0;
            $('.basket-row').each(function() {
                curSumm += Number($(this).find('.basket-row-summ span').html().replace(' ', ''));
            });
            $('.basket-summ span').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        }

        $('.recommend-tab').on('click', '.recommend-ctrl a', function(e) {
            var curLink = $(this);
            var curBlock = curLink.parents().filter('.recommend-tab');
            var curWidth = $('.recommend').width();

            var curIndex = curBlock.find('.recommend-ctrl a').index(curLink);

            curBlock.find('.recommend-item:first').stop(true, true).animate({'margin-left': -curIndex * curWidth});

            curBlock.find('.recommend-ctrl a.active').removeClass('active');
            curLink.addClass('active');
            e.preventDefault();
        });

        $('.catalogue-filter-link').click(function(e) {
            $('.catalogue').toggleClass('open-filter');
            var curLink = $(this);
            var curText = curLink.html();
            curLink.html(curLink.data('alttext'));
            curLink.data('alttext', curText);
            e.preventDefault();
        });

        $('.detail-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            var curHTML = '';
            curSlider.find('.detail-slider-content li').each(function() {
                curHTML += '<a href="#"></a>';
            });
            $('.detail-slider-ctrl').html(curHTML);
            $('.detail-slider-ctrl a:first').addClass('active');
        });

        $('.detail-slider').on('click', '.detail-slider-ctrl a', function(e) {
            if (!$(this).hasClass('active')) {
                var curSlider = $('.detail-slider');
                if (curSlider.data('disableAnimation')) {
                    curSlider.find('.detail-slider-content li.played').removeClass('played');

                    var curIndex = curSlider.data('curIndex');
                    var newIndex = $('.detail-slider-ctrl a').index($(this));

                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);

                    curSlider.find('.detail-slider-content li').eq(curIndex).css({'z-index': 2});
                    curSlider.find('.detail-slider-content li').eq(newIndex).css({'z-index': 1}).show();

                    curSlider.find('.detail-slider-ctrl a.active').removeClass('active');
                    curSlider.find('.detail-slider-ctrl a').eq(newIndex).addClass('active');

                    curSlider.find('.detail-slider-content li').eq(curIndex).fadeOut(function() {
                        curSlider.data('disableAnimation', true);
                    });
                }
            }

            e.preventDefault();
        });

        $('.detail-link-gift, .detail-link-pay, .detail-link-delivery').click(function(e) {
            var curLink = $(this);
            $.ajax({
                url: curLink.attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                if ($('.detail-links-window').length > 0) {
                    $('.detail-links-window').remove();
                }
                $('.detail-links').append('<div class="detail-links-window">' + html + '<a href="#" class="detail-links-window-close"></a></div>');
                $('.detail-links-window-content').jScrollPane({
                    autoReinitialise: true
                });
                initForm($('.fast-window form'));

                $('.detail-links-window-close').click(function(e) {
                    $('.detail-links-window').remove();
                    e.preventDefault();
                });

            });
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.detail-links').length == 0) {
                $('.detail-links-window').remove();
            }
        });

        $('body').bind('keyup', function(e) {
            if (e.keyCode == 27) {
                $('.detail-links-window').remove();
            }
        });

        $('.detail-link-shops').click(function(e) {
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                if ($('.shops').length > 0) {
                    $('.shops').remove();
                }

                var windowWidth     = $(window).width();
                var windowHeight    = $(window).height();
                var curScrollTop    = $(window).scrollTop();
                var curScrollLeft   = $(window).scrollLeft();

                var bodyWidth = $('body').width();
                $('body').css({'height': windowHeight, 'overflow': 'hidden'});
                var scrollWidth =  $('body').width() - bodyWidth;
                $('body').css({'padding-right': scrollWidth + 'px'});
                $(window).scrollTop(0);
                $(window).scrollLeft(0);
                $('body').css({'margin-top': -curScrollTop});
                $('body').data('scrollTop', curScrollTop);
                $('body').css({'margin-left': -curScrollLeft});
                $('body').data('scrollLeft', curScrollLeft);

                $('body').append(html)

                $('.shops-close').click(function(e) {
                    shopsClose();
                    e.preventDefault();
                });

                $('body').bind('keyup', keyUpBodyShops);

                $('.shops-list-container').jScrollPane({
                    autoReinitialise: true
                });

                $('.shops-region a').click(function(e) {
                    var curLink = $(this);
                    var curLi = curLink.parent();
                    if (!curLi.hasClass('active')) {
                        $('.shops-region li.active').removeClass('active');
                        curLi.addClass('active');

                        $('.shops-content.active').removeClass('active');
                        $('.shops-region-value').html($(this).html());
                        $('.shops-region').removeClass('open');
                        $('.shops-content').each(function() {
                            var curBlock = $(this);
                            if (curBlock.data('region') == curLink.data('region') && curBlock.data('view') == $('.shops-views li.active a').data('view')) {
                                curBlock.addClass('active');
                            }
                        });
                    }
                    e.preventDefault();
                });

                $('.shops-region-value').click(function() {
                    $('.shops-region').toggleClass('open');
                });

                $('.shops-views a').click(function(e) {
                    var curLink = $(this);
                    var curLi = curLink.parent();
                    if (!curLi.hasClass('active')) {
                        $('.shops-views li.active').removeClass('active');
                        curLi.addClass('active');

                        $('.shops-content.active').removeClass('active');
                        $('.shops-views-value').html($(this).html());
                        $('.shops-views').removeClass('open');
                        $('.shops-content').each(function() {
                            var curBlock = $(this);
                            if (curBlock.data('view') == curLink.data('view') && curBlock.data('region') == $('.shops-region li.active a').data('region')) {
                                curBlock.addClass('active');
                            }
                        });
                    }
                    e.preventDefault();
                });

                $('.shops-views-value').click(function() {
                    $('.shops-views').toggleClass('open');
                });

                ymaps.ready(init);

                var myMap1;
                var myMap2;

                function init() {
                    myMap1 = new ymaps.Map('map1', {
                        center: [55.75396, 37.620393],
                        zoom: 9,
                        controls: ['zoomControl']
                    });

                    myMap1.behaviors.disable('scrollZoom');

                    $('#map1').parent().find('.shops-map-item').each(function() {
                        var curItem = $(this);
                        var myGeocoder = ymaps.geocode(curItem.find('.shops-map-item-address').html());
                        myGeocoder.then(
                            function (res) {
                                var coords = res.geoObjects.get(0).geometry.getCoordinates();
                                myPlacemark = new ymaps.Placemark(coords, {
                                     hintContent: curItem.find('.shops-map-item-name').html() + '<br />' + curItem.find('.shops-map-item-address').html() + '<br />' + curItem.find('.shops-map-item-phone').html()
                                }, {
                                    iconLayout: 'default#image',
                                    iconImageHref: 'images/map-icon.png',
                                    iconImageSize: [58, 69],
                                    iconImageOffset: [-29, -63]
                                });
                                myMap1.geoObjects.add(myPlacemark);
                            },
                            function (err) {
                                alert('Ошибка');
                            }
                        );
                    });

                    myMap2 = new ymaps.Map('map2', {
                        center: [55.75396, 37.620393],
                        zoom: 9,
                        controls: ['zoomControl']
                    });

                    myMap2.behaviors.disable('scrollZoom');

                    $('#map2').parent().find('.shops-map-item').each(function() {
                        var curItem = $(this);
                        var myGeocoder = ymaps.geocode(curItem.find('.shops-map-item-address').html());
                        myGeocoder.then(
                            function (res) {
                                var coords = res.geoObjects.get(0).geometry.getCoordinates();
                                myPlacemark = new ymaps.Placemark(coords, {
                                     hintContent: curItem.find('.shops-map-item-name').html() + '<br />' + curItem.find('.shops-map-item-address').html() + '<br />' + curItem.find('.shops-map-item-phone').html()
                                }, {
                                    iconLayout: 'default#image',
                                    iconImageHref: 'images/map-icon.png',
                                    iconImageSize: [58, 69],
                                    iconImageOffset: [-29, -63]
                                });
                                myMap2.geoObjects.add(myPlacemark);
                            },
                            function (err) {
                                alert('Ошибка');
                            }
                        );
                    });
                }

            });
            e.preventDefault();
        });

        function keyUpBodyShops(e) {
            if (e.keyCode == 27) {
                shopsClose();
            }
        }

        function shopsClose() {
            $('body').unbind('keyup', keyUpBodyShops);
            $('.shops').remove();
            $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
            $(window).scrollTop($('body').data('scrollTop'));
            $(window).scrollLeft($('body').data('scrollLeft'));
        }

        $('.warning-link').each(function() {
            if ($.cookie('warning') != '1') {
                $.ajax({
                    type: 'POST',
                    url: $(this).attr('href'),
                    dataType: 'html',
                    cache: false
                }).done(function(html) {
                    if ($('.window').length > 0) {
                        windowClose();
                    }
                    windowOpen(html);
                });
            }
        });

        $('.detail-order-cart').submit(function(e) {
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: $(this).serialize(),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                if ($('.window').length > 0) {
                    windowClose();
                }
                windowOpen(html);
            });
            e.preventDefault();
        });

        $('.detail-order-fast').submit(function(e) {
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: $(this).serialize(),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                if ($('.detail-links-window').length > 0) {
                    $('.detail-links-window').remove();
                }
                $('.detail-links').append('<div class="detail-links-window">' + html + '<a href="#" class="detail-links-window-close"></a></div>');
                initForm($('.fast-window form'));

                $('.detail-links-window-close').click(function(e) {
                    $('.detail-links-window').remove();
                    e.preventDefault();
                });
            });
            e.preventDefault();
        });

        $('.recommend-item-buy a, .catalogue-item-buy a').click(function(e) {
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                if ($('.window').length > 0) {
                    windowClose();
                }
                windowOpen(html);
            });
            e.preventDefault();
        });

        $('body').on('click', '.window-basket-close', function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').on('click', '.subscribe-close', function(e) {
            windowClose();
            e.preventDefault();
        });

    });

    $(window).resize(function() {
        $('.form-select select').chosen('destroy');
        $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    });

    function initForm(curForm) {
        curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

        curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

        curForm.find('.form-checkbox span input:checked').parent().parent().addClass('checked');
        curForm.find('.form-checkbox').click(function() {
            $(this).toggleClass('checked');
            $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
        });

        $('.form-checkbox-all a').click(function(e) {
            var curBlock = $(this).parents().filter('.form-checkboxes');
            curBlock.find('.form-checkbox input').prop('checked', true);
            curBlock.find('.form-checkbox').addClass('checked');
            e.preventDefault();
        });

        curForm.find('.form-radio span input:checked').parent().parent().addClass('checked');
        curForm.find('.form-radio').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.form-radio input[name="' + curName + '"]').parent().parent().removeClass('checked');
            $(this).addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        curForm.find('.form-slider').each(function() {
            var curSlider = $(this);
            noUiSlider.create(curSlider.find('.form-slider-inner')[0], {
                start: [
                    Number(curSlider.find('.form-slider-from input').val()),
                    Number(curSlider.find('.form-slider-to input').val())
                ],
                tooltips: [
                    true,
                    true
                ],
                range: {
                    'min': Number(curSlider.find('.form-slider-min').html()),
                    'max': Number(curSlider.find('.form-slider-max').html())
                },
                format: wNumb({
                    decimals: 0
                })
            }).on('update', function(values, handle) {
                curSlider.find('input').eq(handle).val(values[handle]);
            });
        });

        curForm.find('input[type="number"]').each(function() {
            var curBlock = $(this).parent();
            var curHTML = curBlock.html();
            curBlock.html(curHTML.replace(/type=\"number\"/g, 'type="text"'));
            curBlock.find('input').spinner();
            curBlock.find('input').keypress(function(evt) {
                var charCode = (evt.which) ? evt.which : evt.keyCode
                if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                    return false;
                }
                return true;
            });
        });

        curForm.find('.form-input-clear').click(function(e) {
            $(this).parent().find('input').val('').trigger('change');
            e.preventDefault();
        });

        curForm.find('.form-reset input').click(function(e) {
            var curForm = $(this).parents().filter('form');
            window.setTimeout(function() {
                curForm.find('.form-checkbox').removeClass('checked');
                curForm.find('.form-checkbox input:checked').parent().parent().addClass('checked');

                curForm.find('.form-radio').removeClass('checked');
                curForm.find('.form-radio input:checked').parent().parent().addClass('checked');

                curForm.find('.form-select select').trigger('chosen:updated');

                curForm.find('.form-slider').each(function() {
                    var curSlider = $(this);
                    curSlider.find('.form-slider-inner')[0].noUiSlider.set([Number(curSlider.find('.form-slider-from input').val()), Number(curSlider.find('.form-slider-to input').val())]);
                });
            }, 100);
        });

        if (curForm.hasClass('warning-form')) {
            curForm.validate({
                ignore: '',
                invalidHandler: function(form, validatorcalc) {
                    validatorcalc.showErrors();
                    checkErrors();
                },
                submitHandler: function(form, validatorcalc) {
                    $.cookie('warning', '1');
                    windowClose();
                }
            });
        } else if (curForm.parent().hasClass('subscribe-form') || curForm.parent().hasClass('catalogue-subscribe')) {
            curForm.validate({
                submitHandler: function(form, validatorcalc) {
                    $.ajax({
                        type: 'POST',
                        url: $(form).attr('action'),
                        data: $(form).serialize(),
                        dataType: 'html',
                        cache: false
                    }).done(function(html) {
                        if ($('.window').length > 0) {
                            windowClose();
                        }
                        windowOpen(html);
                    });
                }
            });
        } else {
            curForm.validate({
                ignore: '',
                invalidHandler: function(form, validatorcalc) {
                    validatorcalc.showErrors();
                    checkErrors();
                }
            });
        }
    }

    function checkErrors() {
        $('.form-checkbox').each(function() {
            var curField = $(this);
            if (curField.find('input.error').length > 0) {
                curField.addClass('error');
            } else {
                curField.removeClass('error');
            }
        });
    }

    $(window).bind('load resize', function() {

        $('.categories').each(function() {
            var curList = $(this);
            curList.find('.category-inner-wrap').css({'min-height': 0 + 'px'});

            curList.find('.category-inner-wrap').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                curList.find('.category-inner-wrap').each(function() {
                    var otherBlock = $(this);
                    if (otherBlock.offset().top == curTop) {
                        var newHeight = otherBlock.height();
                        if (newHeight > curHeight) {
                            curBlock.css({'min-height': newHeight + 'px'});
                        } else {
                            otherBlock.css({'min-height': curHeight + 'px'});
                        }
                    }
                });
            });
        });

        $('.recommend-inner').each(function() {
            var curList = $(this);
            curList.find('.recommend-item-inner').css({'min-height': 0 + 'px'});

            if ($(window).width() < 1170) {
                curList.find('.recommend-item-inner').each(function() {
                    var curBlock = $(this);
                    var curHeight = curBlock.height();
                    var curTop = curBlock.offset().top;

                    curList.find('.recommend-item-inner').each(function() {
                        var otherBlock = $(this);
                        if (otherBlock.offset().top == curTop) {
                            var newHeight = otherBlock.height();
                            if (newHeight > curHeight) {
                                curBlock.css({'min-height': newHeight + 'px'});
                            } else {
                                otherBlock.css({'min-height': curHeight + 'px'});
                            }
                        }
                    });
                });
            }
        });

        $('.catalogue-list').each(function() {
            var curList = $(this);
            curList.find('.catalogue-item-photo').css({'min-height': 0 + 'px'});

            curList.find('.catalogue-item-photo').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                curList.find('.catalogue-item-photo').each(function() {
                    var otherBlock = $(this);
                    if (otherBlock.offset().top == curTop) {
                        var newHeight = otherBlock.height();
                        if (newHeight > curHeight) {
                            curBlock.css({'min-height': newHeight + 'px'});
                        } else {
                            otherBlock.css({'min-height': curHeight + 'px'});
                        }
                    }
                });
            });

            curList.find('.catalogue-item-wrap').css({'min-height': 0 + 'px'});

            curList.find('.catalogue-item-wrap').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                curList.find('.catalogue-item-wrap').each(function() {
                    var otherBlock = $(this);
                    if (otherBlock.offset().top == curTop) {
                        var newHeight = otherBlock.height();
                        if (newHeight > curHeight) {
                            curBlock.css({'min-height': newHeight + 'px'});
                        } else {
                            otherBlock.css({'min-height': curHeight + 'px'});
                        }
                    }
                });
            });
        });

        $('.recommend-tab').each(function() {
            var curBlock = $(this);
            var curWidth = $(window).width();
            if (curWidth > 767 && curWidth < 1169) {
                var curPages = Math.ceil(curBlock.find('.recommend-item').length / 2);
            } else if (curWidth < 768) {
                var curPages = curBlock.find('.recommend-item').length;
            }
            var curHTML = '';
            for (var i = 0; i < curPages; i++) {
                curHTML += '<a href="#"></a>';
            }
            curBlock.find('.recommend-ctrl').html(curHTML);
            curBlock.find('.recommend-ctrl a:first').addClass('active');
            curBlock.find('.recommend-item:first').css({'margin-left': 0});
        });

    });

    $(window).bind('load resize scroll', function() {
        if ($(window).scrollTop() > 160) {
            $('body').addClass('fixed');
        } else {
            $('body').removeClass('fixed');
        }
    });

    function windowOpen(contentWindow) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();
        var curScrollLeft   = $(window).scrollLeft();

        var bodyWidth = $('body').width();
        $('body').css({'height': windowHeight, 'overflow': 'hidden'});
        var scrollWidth =  $('body').width() - bodyWidth;
        $('body').css({'padding-right': scrollWidth + 'px'});
        $(window).scrollTop(0);
        $(window).scrollLeft(0);
        $('body').css({'margin-top': -curScrollTop});
        $('body').data('scrollTop', curScrollTop);
        $('body').css({'margin-left': -curScrollLeft});
        $('body').data('scrollLeft', curScrollLeft);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-loading"></div><div class="window-container window-container-load"><div class="window-content">' + contentWindow + '<a href="#" class="window-close">Закрыть</a></div></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').load(function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-loading').remove();
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-loading').remove();
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        $('.window-close').click(function(e) {
            if ($('.warning-form .form-checkbox input:checked').length == 1) {
                $.cookie('warning', '1');
            } else {
                window.location = '01_main.html';
            }
            windowClose();
            e.preventDefault();
        });

        $('body').bind('keyup', keyUpBody);

        $('.window form').each(function() {
            initForm($(this));
        });

    }

    function windowPosition() {
        var dpr = 1;
        if (window.devicePixelRatio !== undefined) {
            dpr = window.devicePixelRatio;
        }

        var windowWidth     = $(window).width() * dpr;
        var windowHeight    = $(window).height() * dpr;

        if ($('.window-container').width() > windowWidth - 40) {
            $('.window-container').css({'left': 20, 'margin-left': 0});
            $('.window-overlay').width($('.window-container').width() + 40);
        } else {
            $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});
            $('.window-overlay').width('100%');
        }

        if ($('.window-container').height() > windowHeight - 40) {
            $('.window-overlay').height($('.window-container').height() + 40);
            $('.window-container').css({'top': 20, 'margin-top': 0});
        } else {
            $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2});
            $('.window-overlay').height('100%');
        }
    }

    function keyUpBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    function windowClose() {
        $('body').unbind('keyup', keyUpBody);
        $('.window').remove();
        $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
        $(window).scrollTop($('body').data('scrollTop'));
        $(window).scrollLeft($('body').data('scrollLeft'));
    }

    $(window).resize(function() {
        if ($('.window').length > 0) {
            var windowWidth     = $(window).width();
            var windowHeight    = $(window).height();
            var curScrollTop    = $(window).scrollTop();
            var curScrollLeft   = $(window).scrollLeft();

            $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
            var bodyWidth = $('body').width();
            $('body').css({'height': windowHeight, 'overflow': 'hidden'});
            var scrollWidth =  $('body').width() - bodyWidth;
            $('body').css({'padding-right': scrollWidth + 'px'});
            $(window).scrollTop(0);
            $(window).scrollLeft(0);
            $('body').data('scrollTop', 0);
            $('body').data('scrollLeft', 0);

            windowPosition();
        }
    });

})(jQuery);