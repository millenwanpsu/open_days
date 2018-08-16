'use strict';
//Copyright (c) 2018 millenwanpsu

jQuery('form').on("submit",function(event){
    //https://stackoverflow.com/questions/2276463/how-can-i-get-form-data-with-javascript-jquery
    var formData = jQuery('form').serialize();
    var loc = formData.substr(formData.indexOf("location")+9);
    if(loc!="" && loc.indexOf("%")>-1){
        loc = loc.substr(0,loc.indexOf("%"));
        //https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
        loc = loc.charAt(0).toUpperCase()+loc.substr(1).toLowerCase();
    }

    //https://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
    var folder_xp = "Imgs/"+loc+"/experiences/";
    jQuery.ajax({
        url : folder_xp,
        success: function(pics) {
            jQuery(pics).find("a").attr("href", function (i, val) {
                if(val.match(/\.(jpe?g)$/) ) {
                    //https://stackoverflow.com/questions/23331873/html-img-onclick-javascript
                    //https://stackoverflow.com/questions/2116558/fastest-method-to-replace-all-instances-of-a-character-in-a-string
                    var name = val.replace(/%20/g," ");
                    name = name.substr(0,name.indexOf("."));
                    var source = "<div class=\"frame\"><label>"+name+"</label><img src='"+folder_xp+val+"' onclick=\"select(this)\"/></div>";
                    jQuery('#experiences').append(source);
                    jQuery("#welcome").text("Explore "+loc+"!");
                }
            });
            jQuery('#experiences').append("<div id='submit'><button onclick=schedule()>Submit</button></div>");
        },
        error: function(){
            window.alert('No data for this location yet! Please try again.')
            jQuery("#welcome").text("Please choose a destination!");
        }
    });
    var folder = "Imgs/"+loc+"/restaurants/";
    jQuery.ajax({
        url : folder,
        success: function(pics) {
            jQuery(pics).find("a").attr("href", function (i, val) {
                if(val.match(/\.(jpe?g)$/) ) {
                    var name = val.replace(/%20/g," ");
                    name = name.substr(0,name.indexOf("."));
                    var source = "<div class=\"frame\"><label>"+name+"</label><img src='"+folder+val+"' onclick=\"select(this)\"/></div>";
                    jQuery('#restaurants').append(source);
                }
            });
            jQuery('#restaurants').append("<div id='submit'><button onclick=book()>Submit</button></div>");
        }
    });
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

var schedule_count = 0;
function schedule(){
    ++schedule_count;
    var selected = "----Sample Schedule "+schedule_count+"----";
    var formData = jQuery('form').serialize();
    var days = formData.substr(formData.indexOf("num_days")+9);
    days = days.substr(0,days.indexOf("&"));
    var count = 1;
    jQuery('#experiences .frame').each(function(index){
        if(jQuery(this).find('img').css("border-top-style") != "none"){
            if(count == parseInt(days)+1){
                selected += ("\n--------------------------\nAdditional Days required to visit:\n");
            }
            if(count > days){
                selected += (jQuery(this).find('label').text() + ", ");
            }
            else {
                selected += ("\nDay " + count + ": " + jQuery(this).find('label').text());
            }
            ++count;
        }
    });
    if((count-1) > days){
        window.alert('You have too many events selected!\nYou will need more than ' + days + ' days to visit them all!');
    }
    selected += "\n--------------------------";
    //https://stackoverflow.com/questions/37167755/writing-to-file-using-ajax
    jQuery.ajax({
        type: 'POST',
        url: "index.php",
        data: {selections: selected},
        success: function(result){
            window.alert("sample schedule " + schedule_count + " added");
        }
    });
    jQuery('.dropdown-menu').append("<a class=\"dropdown-item\" href=\"#\" id=\""+schedule_count+"\">Sample Schedule "+schedule_count+"</a>");
    jQuery('#'+schedule_count).on("click",function(){
        window.alert(selected);
    });
}

function book(){
    console.log('Add Selected Restaurants to Schedule.');
}
