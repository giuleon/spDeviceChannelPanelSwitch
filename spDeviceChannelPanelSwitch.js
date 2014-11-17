"use strict"

/*
Created by Giuliano De Luca, @giuleon, 15/11/2014
This code creates a jQuery UI Tab component in SharePoint 2013 when the page is in editing mode.
Requires jQuery, you can include:
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/start/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
*/

$(function () {
    ///Detecting edit mode
    var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
    if (inDesignMode == "1") {
        //  The page is in edit mode
        // Verify div DeviceChannelPanel exist
        var devChannExist = $("body").find("[data-name='" + 'DeviceChannelPanel' + "']");
        var typeDevChann = getCookie('editDeviceChannel');
        if (devChannExist[0] != undefined) {
            var HtmlDeviceChannel = '<div id="tabs"><ul><li><a href="#tabs-1" onclick="SwitchFullSite();">WEB</a></li><li><a href="#tabs-2" onclick="SwitchMobileSite();">MOBILE</a></li></ul>';
            var parent = $("body").find("#MSOTlPn_WebPartPageDiv");
            if (parent[0] == undefined) {
                $("#DeltaPlaceHolderMain").prepend(HtmlDeviceChannel + "</div>");
            }
            else {
                $("#MSOTlPn_WebPartPageDiv").prepend(HtmlDeviceChannel + "</div>");
            }
            var NumberFound = 0;
            $("div").each(function (i) {
                if ($(this).data().name == "DeviceChannelPanel") {
                    $(this).wrap('<div id="tabs-' + 1 + '"></div>');
                    $('#tabs-1').appendTo('#tabs');
                }
                return;
            });
            $("div").each(function (i) {
                if ($(this).data().name == "DeviceChannelPanel") {
                    if (NumberFound > 0) {
                        $(this).wrap('<div id="tabs-' + 2 + '"></div>');
                        $('#tabs-2').appendTo('#tabs');
                    }
                    NumberFound++
                }
            });
            if (typeDevChann == "Default" || typeDevChann == undefined) {
                $('#tabs').tabs({
                    active: 0
                });
            }
            else {
                $('#tabs').tabs({
                    active: 1
                });
            }
        }
    }
    else {
        // page is in browse mode
    }
});
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function ReadCookie() {
    var allcookies = document.cookie;
    alert("All Cookies : " + allcookies);

    // Get all the cookies pairs in an array
    cookiearray = allcookies.split(';');

    // Now take key value pair out of this array
    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        alert("Key is : " + name + " and Value is : " + value);
    }
}
function WriteCookie() {
    cookievalue = "WindowsPhone;";
    document.cookie = "deviceChannel=" + cookievalue;
    alert("Setting Cookies : " + "deviceChannel=" + cookievalue);
}
function WriteCookieMobile() {
    cookievalue = 'Mobile;';
    //document.cookie = "deviceChannel=" + cookievalue;
    document.cookie = "editDeviceChannel=" + cookievalue;
}
function WriteCookieFullSite() {
    cookievalue = 'Default;';
    //document.cookie = "deviceChannel=" + cookievalue;
    document.cookie = "editDeviceChannel=" + cookievalue;
}
function SwitchMobileSite() {
    WriteCookieMobile();
    //window.location.reload();
}
function SwitchFullSite() {
    WriteCookieFullSite();
    //window.location.reload();
}
