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
                        //https://stackoverflow.com/questions/23331873/html-img-onclick-javascript
                        //https://stackoverflow.com/questions/2116558/fastest-method-to-replace-all-instances-of-a-character-in-a-string
                        var name = val.replace(/%20/g," ");
                        name = name.substr(0,name.indexOf("."));
                        var source = "<div class=\"frame\"><label>"+name+"</label><img src='"+folder+val+"' onclick=\"select(this)\"/></div>";
                        console.log(source);
                        jQuery('#experiences').append(source);
                    }
                });
                jQuery('#experiences').append("<button onclick=schedule()>Submit</button>");
            }
        });
    }
    else{
        jQuery("#welcome").text("Please choose a destination!");
    }
    return false;
});

function select(element)
{
    if(jQuery(element).css("border-top-style") == "none"){
        jQuery(element).css("border", "3pt solid green");
    }
    else {
        jQuery(element).css("border", "none");
    }
}

function schedule(){
    var selected = "";
    jQuery('#experiences .frame').each(function(index){
        if(jQuery(this).find('img').css("border-top-style") != "none"){
            selected += (jQuery(this).find('label').text() + "\n");
        }
    });
    console.log(selected);
    //https://stackoverflow.com/questions/37167755/writing-to-file-using-ajax
    jQuery.ajax({
        type: 'POST',
        url: "index.php",
        data: {selections: selected},
        success: function(result){
            console.log('schedule.txt updated')
        }
    });
}
