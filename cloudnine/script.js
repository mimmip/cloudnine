
//pageinit event for first page
//triggers only once
//write all your on-load functions and event handlers pertaining to page1
$(document).on("pageinit", "#list-page", function () {

    $.getJSON( "salons.json", function( salons ) {

    //set up string for adding <li/>
    var li = "";

    //container for $li to be added
    $.each( salons, function( i, item ) {

        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
        li += '<div class="row">   <a href="#" data-transition="slide" id="' + i + '" class="info-go">   <li>   <div class="col-xs-2 nopad text-center time"><p> '+item.time+' </p></div>   <div class="col-xs-5 nopad"><div class="row"><div class="col-xs-12 nopad"><h3>  '+item.name+' </h3></div></div> <div class="row"><div class="col-xs-12 nopad"><img src="img/rating.png" /><span> '+item.rating+'  </span></div></div>  <div class="row"><div class="col-xs-12 nopad"><p> '+item.adress+' </p></div></div></div>   <div class="col-xs-2 text-center"><div class="row"><div class="col-xs-12"><p> '+item.price+' </p></div></div> <div class="row"><div class="col-xs-12"><p> '+item.timeEst+' </p></div></div></div>  <div class="col-xs-1 nopad text-right"><img src="img/chevron_right.png" /> </div></div></li></a></div><hr />';
        //console.log(item.tel);
    });
    //append list to ul
    $("#salon-list").append(li).promise().done(function () {
        //wait for append to finish - thats why you use a promise()
        //done() will run after append is done
        //add the click event for the redirection to happen to #details-page
        $(this).on("click", ".info-go", function (e) {
            //console.log(this);
            e.preventDefault();
            //store the information in the next page's data
            $("#details-page").data("info", salons[this.id]);
            //console.log(info[this.id]);
            //change the page # to second page.
            //Now the URL in the address bar will read index.html#details-page
            //where #details-page is the "id" of the second page
            //we're gonna redirect to that now using changePage() method
            $.mobile.changePage("#details-page");
        });

        //refresh list to enhance its styling.
        $(this).listview("refresh");
    });
    });
});

//use pagebeforeshow
//DONT USE PAGEINIT!
//the reason is you want this to happen every single time
//pageinit will happen only once

    $(document).on("pagebeforeshow", "#details-page", function () {

    //get from data - you put this here when the "a" wa clicked in the previous page
    var info = $(this).data("info");

    // vars with html
    var header_view = '<div class="container-fluid bgr headerView"><div class="row title"><div class="col-xs-12"><h1> '+info.name+' </h1></div></div><div class="row rate"><div class="col-xs-12"><img src="img/rating.png" /><span> '+info.rating+' </span></div></div></div>';

    var tabs = '<div class="container-fluid"><div class="row"><div class="col-xs-6 text-center active tabs"><p>Info</p></div> <div class="col-xs-6 text-center tabs"><p>Schema</p></div></div></div> '

    var adress = '<div class="container"><div class="row"><div class="col-xs-12"><img src="img/icon.png" /><span> &nbsp; '+info.adress+ '&nbsp;' +info.zip+' </span></div></div><hr/> ';
    var open = '<div class="row"><div class="col-xs-12"><img src="img/icon_clock.png" /><span> &nbsp;'+info.open+' </span></div></div> <hr/>';
    var tel = '<div class="row"><div class="col-xs-12"><img src="img/icon_tel.png" /><span> &nbsp;'+info.tel+' </span></div></div> <hr/>';
    var site = '<div class="row"><div class="col-xs-12"><img src="img/icon_web.png" /><span> &nbsp; '+info.site+' </span></div></div> <hr/>';
    var desc = '<div class="row"><div class="col-xs-12"><p> '+info.desc+' </p></div></div> </div> <br/>';

    //add this to html
    $(this).find("div.content").html(header_view+tabs+adress+open+tel+site+desc);
});
