$(function () {
  'use strict';

  // Set tabs to starting view on page load
  $("#repo-tab-content").hide();
  $("#act-tab-content").hide();

  // show and hide tab content when tabs are clicked
  $("[id*='-tab']").on("click", function(e) {
    e.preventDefault();
    $("[id*='-tab']").removeClass("clicked-tab");
    $("[id*='-tab-content']").hide();
    $(this).addClass("clicked-tab");
    $("#" + $(this).attr("id") + "-content").show();
    // console.log("** " + $(this).attr("id") + "-content is visible **");
    // console.log("** " + $(this).attr("id") + " clicked **");

  });

  // var myUser = "ebonertz"
  // var myUser = "dennisgoldin";
  var myUser = "octocat";

  // $.getJSON(("apis/github/users/octocat.json"), function (value) {
  $.getJSON(("http://api.github.com/users/" + myUser), function (value) {

    var myUserTemp = _.template("<%- m.avatar_url %> "
                              + "<%- m.name %> "
                              + "<%- m.login %> "
                              + "<%- m.company %> "
                              + "<%- m.location %> "
                              + "<%- m.email %> "
                              + "<%- m.blog %> "
                              + "<%- m.created_at %> "
                              + "<%- m.followers %> "
                              + "<%- m.following %>", {variable: "m"});

    $("#profileImage").attr("src", myUserTemp({ name: value.avatar_url}));
    $("#fullName").html(myUserTemp({ name: value.name}));
    $("#loginId").html(myUserTemp({ name: value.login}));
    $("#company").html(myUserTemp({ name: value.company}));
    $("#userLocation").html(myUserTemp({ name: value.location}));
    $("#emailAddress").html(myUserTemp({ name: value.email}));
    $("#userURL").html(myUserTemp({ name: value.blog}));
    $("#startDate").html(formatDate( myUserTemp({ name: value.created_at})));
    $("#following").html(myUserTemp({ name: value.following}));
    $("#followers").html(formatNumber( myUserTemp({ name: value.followers})));

    // need to count the starred repos form a different JSON file
    $.getJSON(("https://api.github.com/users/octocat/starred"), function (value) {
      // do not need to bind in this case
      // var myStarsTemp = _.template("<%- m.html_url %>", {variable: "m"});
      // var myStars = myStarsTemp({ name: value.html_url});
      $("#stars").html($(value).length);
    });  // end JSON #2
  });  //end JSON #1

  // get repos for repo tab
  $.getJSON(("https://api.github.com/users/octocat/repos"), function (value) {

    var myReposTemp = _.template("<%- m.name %> "
                               + "<%- m.description %>", {variable: "m"});
    // do not need to bind in this case
    // var myName = myReposTemp({ name: value.name});
    // var myDesc = myReposTemp({ name: value.description});

    // var myHTML =
    //   "        <li class='repo-list-item'>\n" +
    //   "          <a href='#' class='repo-link'>\n" +
    //   "           <span class='repo-icon octicon octicon-repo'></span> &nbsp; \n" +
    //   "           <span class='repo-name'>" + obj.name + "</span>\n" +
    //   "           <span class='repo-stars\'> 9,933 <span class='octicon octicon-star'></span></span>\n" +
    //   "           <br>\n" +
    //   "           <span class='repo-desc'>" + obj.description + ".</span>\n" +
    //   "         </a>\n" +
    //   "       </li>\n";

    var myHTML =
      "        <h3 class='repo-title'>Popular Repositories</h3>\n" +
      "        <ul class='repo-list'>\n";

    $(value).each( function (index, obj) {
      myHTML +=
        "        <li class='repo-list-item'>\n" +
        "          <a href='#' class='repo-link'>\n" +
        "           <span class='repo-icon octicon octicon-repo'></span> &nbsp; \n" +
        "           <span class='repo-name'>" + obj.name + "</span>\n" +
        "           <span class='repo-stars\'> 9,933 <span class='octicon octicon-star'></span></span>\n" +
        "           <br>\n" +
        "           <span class='repo-desc'>" + obj.description + ".</span>\n" +
        "         </a>\n" +
        "       </li>\n";
      // console.log(index + " : " + obj.name);
      // console.log(index + " : " + obj.description);
    });

    myHTML +=
      "      </ul>\n" +
      "      <div> <!-- heat map image place holder -->\n" +
      "       <br>\n" +
      "       <img class='heat-map' src='./assets/images/heat-map.png' alt='Heat Map'>\n" +
      "      </div>\n" +
      "      <div class='cont-act-container'>\n" +
      "       <span class='cont-act-btn'>\n" +
      "         <span>Period: <span class='cont-act-btn-weight'>1 Week</span></span>\n";
    myHTML +=
      "         <span class='octicon octicon-triangle-down'></span>\n" +
      "       </span>\n" +
      "       <h2 class='cont-act-title'>Contribtution activity</h2>\n" +
      "     </div>\n" +
      "     <div class='activity-box'>\n" +
      "     octocat has no activity during this period.\n" +
      "     </div>\n" +
      "     <br>\n" +
      "   </div>\n" +
      " </div> <!-- end cont-tab-content -->";

    $("#cont-tab-content").html(myHTML);
    console.log(myHTML);
  });  // end JSON #3

  function formatNumber(num) {
    if (num > 1000) {
      return Math.round( num / 100) / 10 + "k";
    }
    return num;
  }

  function formatDate(str) {
    var monthStr = {
      1 : "Jan", 2 : "Feb", 3 : "Mar", 4 : "Apr", 5 : "May", 6 : "Jun",
      7 : "Jul", 8 : "Aug", 9 : "Sep", 10 : "Oct", 11 : "Nov", 12 : "Dec"
    };
    var myYear  = str.substring(1,5);
    var myMonth = monthStr[parseInt(str.substring(6,8), 10)];
    var myDay   = parseInt(str.substring(9,11), 10);
    return "Joined on " + myMonth + " " + myDay + ", " + myYear;
  }

});  // End of file.
