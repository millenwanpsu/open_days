'use strict';
//Copyright (c) 2018 millenwanpsu

jQuery('form').on("submit",function(event){
    //https://stackoverflow.com/questions/2276463/how-can-i-get-form-data-with-javascript-jquery
    var formData = jQuery('form').serialize();
    var day = formData.substr(formData.indexOf("num_days")+9);
    day = day.substr(0,day.indexOf("&"));
    var loc = formData.substr(formData.indexOf("location")+9);
    if(loc!=""){
        if(loc.indexOf("%")>-1){
            loc = loc.substr(0,loc.indexOf("%"));
            //https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
            loc = loc.charAt(0).toUpperCase()+loc.substr(1).toLowerCase();
        }
        jQuery("#welcome").text("Explore "+loc+"!");

        //https://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
        var folder = "Imgs/"+loc+"/experiences/";
        jQuery.ajax({
            url : folder,
            success: function(pics) {
                jQuery(pics).find("a").attr("href", function (i, val) {
                    if(val.match(/\.(jpe?g)$/) ) {
                        var source = "<img src='"+folder+val+"'>";
                        console.log(source);
                        jQuery('#experiences').append(source);
                    }
                });
            }
        });
    }
    else{
        jQuery("#welcome").text("Please choose a destination!");
    }
    return false;
});
