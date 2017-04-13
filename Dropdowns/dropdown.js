$(document).ready(function(){
	var dropdown = $('.dd-base').get(0);	
     $(dropdown).DropDown({
     	dataProxy: 'loadData'
     });

     var dropdown1 = $('.dd-base').get(1);	
     $(dropdown1).DropDown({
     	dataProxy: 'loadData2'
     });     		
});

var FakeServer = function(){
	//emulates slow server response
	this.loadData = function(callback, context, dd){
		setTimeout(function(){
			let data = [], i=0;
			for(i = 0; i < 10000; i++){
				data.push({Id: i, Name: "Option " + (i+1) });
			}
			callback.call(context, data, dd);
		}, 1000);
	}
	this.loadData2 = function(callback, context, dd){
		setTimeout(function(){
			let data = [], i="A".charCodeAt(0);

			for(i; i <= "z".charCodeAt(0); i++){
				data.push({Id: i, Name: "Option " + String.fromCharCode(i) });
			}
			callback.call(context, data, dd);
		}, 1000);
	}
}
var server = new FakeServer();



(function() {

	$(document).on('click', function(e){
     	if(DropDown.ddOpen){
     		var $el = $(e.target || e.srcElement);
            //if click inside the opened drop-down don't hide it
            if ($el.hasClass("." + DropDown.dropElCls) || 
            	$el.siblings("." + DropDown.dropElCls).length || 
            	$el.closest("." + DropDown.dropElCls).length)
                return;
            DropDown.ddOpen.hideDD();
     	}
     });

	var DropDown = {

		dropElCls: 'drop-el',
		ddOpen: null,

		init: function(settings){
			this.data = {
				dropEl: null,
				dataProxy: settings.dataProxy
			};
			let arrowIcon = $("<span class='arrowDown'></span>");
			let self = this;
			$(arrowIcon).click(function(){ 
				DropDown.toggleDDlist.call(self);
			}); 
			$(this).append(arrowIcon);
			DropDown.applyPublicMethods.call(this);

			return null;
		},

		applyPublicMethods: function(){
			this.hideDD = function () { return DropDown.hideDD.apply(this, arguments); }
            this.showDD = function () { return DropDown.showDD.apply(this, arguments); }         
		},

		toggleDDlist:function(){
			var data = this.data,
                ddVisible = (data.dropEl && data.dropEl.style.display == 'block');
            if (ddVisible)
                DropDown.hideDD.call(this);
            else {
                DropDown.showDD.call(this);
            }
		},

		showDD:function(){
			let data = this.data;
			if(!data.dropEl){
				DropDown.renderDropEl.call(this);
			}else{
				//data.dropEl.style.display = 'block';
				$(data.dropEl).slideDown(600);
			}
			DropDown.ddOpen = this;
		},

		hideDD:function(){
			let data = this.data;
			if (!data || !data.dropEl) //|| data.dropEl.style.display === "none")
                return;
            //data.dropEl.style.display = 'none';
            $(data.dropEl).slideUp("fast");
            DropDown.ddOpen = null;
		},

		renderDropEl: function(){
			let data = this.data,
				dropEl = document.createElement('div');

			dropEl.className = DropDown.dropElCls;				
			$(this).append(dropEl);
			dropEl.style.display = 'block';
			data.dropEl = dropEl;		
			DropDown.renderListElements.call(this);			
		},

		renderListElements: function(){
			var data = this.data;

			if(!data.dropEl) return;				

			var renderDDItems = function(ddItems, dd){
				var data = this.data,
					self = this,				
					elem, fn,
					container = data.dropEl,
					list = document.createElement("ul");

				for(let i = 0; i < ddItems.length; i++){	
					var el = document.createElement('li');
					el.onclick = function(){ 
						dd.onItemSelected.call(self, ddItems[i].Id, ddItems[i].Name.toString());
						self.find('li').removeClass('selected');
					    $(this).addClass('selected'); };
					el.innerHTML = ddItems[i].Name;
					$(list).append($(el));
				}
				container.append(list);
			};
			server[data.dataProxy].call(this, renderDDItems, this, DropDown);
		},

		onItemSelected: function(itemId, itemName){
			var data = this.data;

			data.SelectedId = itemId,
			data.SelectedName = itemName;

			$(this).children('input').val(itemName);
		}

	};

	$.fn.DropDown = function(option, method){
		if (DropDown[method]) {
            return DropDown[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return DropDown.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' was not implemented for jQuery.dropdown plugin');
        }
	}
})();
