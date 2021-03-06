jQuery(function($) {

	"use strict";


    function gbt_ajaxCall( data ) {
    	var ajaxurl 	= $(".getbowtied-install-demo-wizard").attr("data-ajaxurl");
    	var thisBtn		= $(".wizard-demo-import .install:not(.done-ajax)");
        jQuery.ajax({
            url: ajaxurl,
            data: data,
            dataType: "json",
            type: "post"
        }).done( function( response ) {
            if ( 'undefined' !== typeof response.status && 'newAJAX' === response.status ) {
                gbt_ajaxCall( data );
            }
            else if ( 'undefined' !== typeof response.message && 'ImportDone' === response.status ) {
                var data_2 = { 
					action: "gbt_after_import",
					demo_type: data.demo_type
				}

				var afterImport = jQuery.ajax({
					url: ajaxurl,
			        data: data_2,
			        dataType: "json",
			        type: "post"
				});

				

				afterImport.complete(function(rsp) {

					if(rsp.status === 200) {
						thisBtn.removeClass("doing-ajax").addClass("done-ajax").html("Done!");
						var next =thisBtn.attr("href");
						window.location.href=next;
					} else {
						thisBtn.removeClass("doing-ajax").addClass("failed-ajax").html("Try again?");
					}
				});
            }
            else {
               	thisBtn.removeClass("doing-ajax").addClass("failed-ajax").html("Try again?");
            }
        })
        .fail( function( error ) {
            thisBtn.removeClass("doing-ajax").addClass("failed-ajax").html("Try again?");
        });
    }

	/**
	 * Demo import
	 *
	 *
	 */
	$(".wizard-demo-import").on("click", " .install:not(.done-ajax)", function(e) {

		var thisBtn = $(this);
		thisBtn.removeClass("failed-ajax").addClass("doing-ajax").html("Installing...");

		var demo_type 	= $(".getbowtied-install-demo-wizard").attr("data-demo");
		var ajaxurl 	= $(".getbowtied-install-demo-wizard").attr("data-ajaxurl");

		var data = {
			action: "gbt_demo_importer",
			demo_type: demo_type
		};

		gbt_ajaxCall( data );

		e.preventDefault();
	});

	var status = true;

	function parse_plugins() {

		var pluginContainer = $(".plugins .plugin:not(.parsed):first");

		if (pluginContainer.length > 0) {

			console.log("found container");

			var pluginBtn = $(pluginContainer).find(".button.ajax-request");

			if (pluginBtn.length > 0) {
				console.log("found button");

				var url = pluginBtn.attr("href");
				var pluginSlug = pluginBtn.attr("data-plugin");
				var ajaxUrl = pluginBtn.attr("data-verify");
				var action = pluginBtn.attr("data-action");

				var self = pluginBtn;

				var doAction = jQuery.ajax({
					url: url,
			        type: "get"
				});

				doAction.complete(function(e, xhr){ 

					$.post(ajaxUrl,
					{
						action	  : "gbt_get_wizard_plugins",
						gbt_plugin: pluginSlug
					},
					function ( rsp ) { 
						if ( rsp === true ) {
							// The action was done correctly
							status = status && true;
							pluginContainer.addClass("parsed").find(".plugin-status").empty().html("<span class=\"dashicons dashicons-yes\"></span>");

						} else {
							// The action failed for whatever reason
							status = status && false;
							pluginContainer.addClass("parsed").find(".plugin-status").empty().html("<span class=\"dashicons dashicons-no\"></span>");

						}
						parse_plugins(); // recursivity
					});
				});
			} else {
				pluginContainer.addClass("parsed");
				pluginContainer.find(".plugin-status").empty().html("<span class=\"dashicons dashicons-yes\"></span>");
				parse_plugins(); // recursivity
			}

		} else {
			if ( status === true ) {
				$(".wizard-plugins .install").removeClass("doing-ajax").removeClass("failed-ajax").addClass("done-ajax").html("Done!");
				var next = $(".wizard-plugins .install").attr("href");
				window.location.href=next;
			} else {
				$(".plugins .plugin").removeClass("parsed");
				$(".wizard-plugins .install").removeClass("doing-ajax").addClass("failed-ajax").html("Try again?");
			}
			return false;
		}
	}

	$(".wizard-plugins").on("click", " .install:not(.done-ajax)", function(e) {
			e.preventDefault();
			$(this).removeClass("failed-ajax").addClass("doing-ajax").html("Installing...");
			parse_plugins();
	});

});