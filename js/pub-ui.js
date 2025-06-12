
	let gnbToggling = false;
	
	function gnbMenu(){
    let $dim = $('.gnb-dim');
    let $gnbSub = $('.n-gnb-sub');
    let $gnbSubUl = $gnbSub.children('ul');
    let $gnbSubItems = $gnbSubUl.children('li');

    function slidein(index) {
      $gnbSub.addClass('on');
      $dim.fadeIn();
      $gnbSubItems.hide();
      $gnbSubItems.eq(index).show();
      $gnbSubUl.slideDown();
    }

    function slideout() {
      $gnbSubUl.slideUp(function () {
        $gnbSub.removeClass('on');
        $gnbSubItems.hide();
        $dim.fadeOut();
      });
    }

		$('.n-gnb li').on('mouseover', function(e) {
   
        let index = $(this).index();

        clearTimeout(gnbToggling);
        gnbToggling = setTimeout(slidein, 300, index);
		});
		$('.n-gnb, .n-gnb-sub').on('mouseleave', function(e) {
      const toElement = e.relatedTarget;
      if ($(toElement).closest('.n-gnb').length || $(toElement).closest('.n-gnb-sub').length) return;

			clearTimeout(gnbToggling);
			setTimeout(slideout, 300);
		});
		$('.n-gnb > li > a').on('focus', function(e) {
        let index = $(this).parent().index();
        clearTimeout(gnbToggling);
        gnbToggling = setTimeout(slidein, 300, index);
		});
		$('.n-gnb > li > a').on('keydown', function(e) {
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            let index = $(this).parent().index();

            let $subMenu = $gnbSub.children('ul').children('li').eq(index);
            let $firstSubItem = $subMenu.find('a').first();
            let $lastSubItem = $subMenu.find('a').last();

            if ($firstSubItem.length) $firstSubItem.focus();

            $lastSubItem.off('keydown').on('keydown', function(e) {
                if (e.key === "Tab" && !e.shiftKey) {
                    e.preventDefault();

                    let $nextMain = $('.n-gnb > li > a').eq(index + 1);
                    if ($nextMain.length) {
                        $nextMain.focus();
                    } else {
                        $('.n-user-info button').focus();
                    }
                }
            });
        }
    });

		$('.n-gnb-sub li:last a ').on('focusout', function(e) {
			clearTimeout(gnbToggling);
			setTimeout(slideout, 300);
		});
	}



  // ready
  $(function(){
    gnbMenu();
  })