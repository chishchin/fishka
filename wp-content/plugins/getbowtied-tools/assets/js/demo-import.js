jQuery(function($) {

    "use strict";
   
    /* global gbtAjaxurl gbtStrings */


    $(document).ready(function() {
        $(".tooltip").tooltipster();
    });

    function gbt_ajaxCall( data ) {
        jQuery.ajax({
            url: gbtAjaxurl,
            data: data,
            dataType: "json",
            type: "post"
        }).done( function( response ) {
            if ( 'undefined' !== typeof response.status && 'newAJAX' === response.status ) {
                gbt_ajaxCall( data );
            }
            else if ( 'undefined' !== typeof response.message && 'ImportDone' === response.status ) {
                $(".status-importer").removeClass("doing-ajax").addClass("ajax-done");
                $(".status-settings").attr("class", "status-log status-settings doing-ajax").append(gbtStrings.start_settings + "...");

                var data_2 = { 
                    action: "gbt_after_import",
                    demo_type: data.demo_type
                }

                var afterImport = jQuery.ajax({
                    url: gbtAjaxurl,
                    data: data_2,
                    dataType: "json",
                    type: "post"
                });

                afterImport.complete(function(rsp) {

                    if(rsp.status === 200) {
                        $(".status-settings").attr("class", "status-log status-settings ajax-done");
                        $(".status-final").attr("class", "status-log status-final status-success").append(gbtStrings.view_site);
                    } else {
                        $(".status-settings").attr("class", "status-log status-settings ajax-error");
                        $(".status-final").attr("class", "status-log status-final status-success").append(gbtStrings.view_site);
                    }
                });
            }
            else {
                $(".getbowtied-install-demo-button").removeClass("clicked");
                $(".status-importer").attr("class", "status-log status-importer ajax-error");
                $(".status-final").attr("class", "status-log status-final status-error").append(gbtStrings.import_error);
            }
        })
        .fail( function( error ) {
            $(".getbowtied-install-demo-button").removeClass("clicked");
            $(".status-importer").attr("class", "status-log status-importer ajax-error");
            $(".status-final").attr("class", "status-log status-final status-error").append(gbtStrings.import_error);
        });
    }

    $(".getbowtied-install-demo-button").on("click", function(e) {
        $(this).addClass("clicked");
        $(".status-log").empty().removeClass("ajax-done ajax-error status-success status-error");
        $(".status-importer").attr("class", "status-log doing-ajax status-importer").append(gbtStrings.start_import + "...");

        var demo_type = $(this).attr("data-demo");

        var data = {
            action: "gbt_demo_importer",
            demo_type: demo_type
        };

        gbt_ajaxCall(data);

        e.preventDefault();
    });

    $(".gbt-container").on("click", ".import-try-again", function(e) {
        $(".getbowtied-install-demo-button").trigger("click");
    });

});