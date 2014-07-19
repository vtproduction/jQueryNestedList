var NestedList = function(){};

NestedList.prototype = {
	//properties
    elemId: '', //the id of html element that will contain the list, eg: '#elemId'
	data: [], //array of data to be display, eg: [1,2,[3,4,5]]
	title: '', //the title of your select button
	collapsible: true, //check if the sub-list is collapsible or not
	topNoteSelectable: false, //check if the sub-list first node is selectable or not
	includeInputOption: false, //include <select></select> tag inside your elemId
	mobileResponsive: false, //apply responsive data for mobile client
	dv_width :  screen.width,
	dv_height :  screen.height,

	config: function(config){
		this.elemId = config.elemId;
		this.data = config.data;
		this.title = config.title;
		this.collapsible = config.collapsible;
		this.topNoteSelectable = config.topNoteSelectable;
		this.includeInputOption = config.includeInputOption;
		this.mobileResponsive = config.mobileResponsive;
	},

    //functions
    init: function() {
    	
    	//--------START RENDER HTML------------
    	$(this.elemId).addClass('dropdownlist');
    	$(this.elemId).append('<div class="dropdown" alt="">'+this.title+'</div><div class="rtpDropdownValue" style="display:none" id="dropdownvalue"></div>');
    	if (this.includeInputOption == true) {
    		$(this.elemId).append('<select class="dropdownlistOption" name="selectdropdownvalue" id="dropdownlistOption"></select>');
    	}
		var curList = this.data;
		var list = '<ul>';
		var toPush = [];
		for (var i = 0; i < curList.length; i++) {
			if (!$.isArray(curList[i])) {
				//list += ('<li>'+curList[i]+'</li>');
				if (i==0) {
					list += ('<li class="li-first" style="background-image: url(images/top.png)">'+curList[i]+'</li>');
				}else if (i == curList.length -1) {
					list += ('<li class="li-last">'+curList[i]+'</li>');
				}else{
					list += ('<li class="li-bwn">'+curList[i]+'</li>');	
				}
				$('#dropdownlistOption').append('<option value="'+curList[i]+'">'+curList[i]+'</option>');
			}else{
				list += ('<li class="top-node"><div class="rtTop"></div><div class="rtp rtplus"></div><span>'+curList[i][0]+'</span><ul>');
				$('#dropdownlistOption').append('<option value="'+curList[i][0]+'">'+curList[i][0]+'</option>');
				list += ('ins-'+i+'</ul></li>');
				var topush = {'k':'ins-'+i , 'v':curList[i]};
				toPush.push(topush);
			}
		};	
		while(toPush.length > 0){
			var topop = toPush[0];

			toPush.shift();
			curList = topop.v;
			var temp = '';
			for (var i = 1; i < curList.length; i++) {
				if (!$.isArray(curList[i])) {
					if (i==1) {
						temp += ('<li class="li-first">'+curList[i]+'</li>');
					}else if (i == curList.length -1) {
						temp += ('<li class="li-last">'+curList[i]+'</li>');
					}else{
						temp += ('<li class="li-bwn">'+curList[i]+'</li>');	
						
					}
					$('#dropdownlistOption').append('<option value="'+curList[i]+'">'+curList[i]+'</option>');
				}else{
					temp += ('<li class="top-node @@replace@@"><div class="rtTop"></div><span class="rtp rtplus"></span><span>'+curList[i][0]+'</span><ul>');
					temp += ('<li>ins-'+i+'</ul></li>');
					if (i==curList.length-1) {
						temp = temp.replace('@@replace@@','topnodeLast');
					}
					$('#dropdownlistOption').append('<option value="'+curList[i][0]+'">'+curList[i][0]+'</option>');
					var topush = {'k':'ins-'+i , 'v':curList[i]};
					toPush.push(topush);
				}
			}
			list = list.replace(topop.k,temp);
		}
		list += '</ul>';
		$('#dropdownvalue').empty().append(list);
		$('#dropdownvalue>ul li:last-child').addClass('topnodeLast');
		detectElem($('#dropdownvalue>ul'));
		//--------END RENDER HTML------------

		
		//register click event for open select area
		var mobileResponsive = this.mobileResponsive;
		$('.dropdown').click(function(){
			
			if (screen.width <= 720 && mobileResponsive == true) {
				var divHeight = (screen.height > 500)? 500 : screen.height * 0.7;
				$('#dropdownvalue').css('width', ($('html').width()*0.9));
				$('#dropdownvalue').css('height', '' + divHeight );
				$('#dropdownvalue').css('z-index', '100000000' );
				$('#dropdownvalue').css('top', '' + (- $('.dropdown').offset().top + $(window).scrollTop() + 20));
				$('#dropdownvalue').css('left', '' + ($(window).scrollLeft() + $('html').width()*0.05 - $('.dropdown').offset().left ));
			}

			if ($('#dropdownvalue').is(':visible')) {
				if (screen.width <= 720 && mobileResponsive == true){
					$('#dropdownvalue').fadeOut('fast');
				}else{
					$('#dropdownvalue').slideUp('fast');
				}	
			}else{
				if (screen.width <= 720 && mobileResponsive == true){
					$('#dropdownvalue').fadeIn('fast');
				}else{
					$('#dropdownvalue').slideDown('fast');
				}
			}
		});
		
		
		//config for collapsible group
		if (this.collapsible == true) {
			$('.rtp').click(function(){
				
				if ($(this).hasClass('rtplus')) {
					$(this).removeClass('rtplus').addClass('rtMinus');
					$(this).parent().children().last().slideUp('fast');
				}
				else{
					$(this).removeClass('rtMinus').addClass('rtplus');
					$(this).parent().children().last().slideDown('fast');
				}		
			});
		}
		else{
			$('.rtp').addClass('rtUnClickable');
		}


		//config for selectable top node{
		if (this.topNoteSelectable == true) {
			$('.top-node > span').addClass('value-selectable');
		}else{
			$('.top-node > span').removeClass('value-selectable');
		}


		//register outside select area click event
		$(document).mouseup(function (e)
		{
		    var container = $("#dropdownvalue");

		    if (!container.is(e.target) // if the target of the click isn't the container...
		        && container.has(e.target).length === 0) // ... nor a descendant of the container
		    {
		        container.slideUp('fast');
		    }
		});


		//register clickable event for list item
		var includeInputOption = this.includeInputOption;
		$('.value-selectable').click(function(){
			$('#dropdownvalue').slideUp('fast');
			$('.dropdown').empty().append($(this).html());

			if (includeInputOption == true) {
				$('#dropdownlistOption option').prop('selected', false)
                   .filter('[value="'+$(this).html()+'"]')
                   .prop('selected', true);
			};
		});

		//re-apply css
		$('#dropdownvalue').css('width', $(this.elemId).css('width'));
		
    },

    retrieveData: function(){
    	return ($('.dropdown').text() == this.title) ? '' : $('.dropdown').text();
    },

    selfDestroy: function() {
    	$(this.elemId).remove();
    	delete this.elemId;
    	delete this.title;
    	delete this.data;
    	delete this.collapsible;
    	delete this.topNoteSelectable;
    	delete this.includeInputOption;
    	delete this.mobileResponsive;
    }

};

function detectElem(elem){
	if(elem.context.nodeName == 'LI'){
		if ((elem.has('ul').length) == 0) {
			elem.addClass('value-selectable');
			if ( elem.text()=='') {
				elem.remove();
			};
			return;
		}else{
			elem.find('ul > li').each(function(){
				detectElem($(this));
			});
		}
	}else{
		elem.find('li').each(function(){
			detectElem($(this));
		});
	}
}

