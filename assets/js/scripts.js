$(function () {
  'use strict';

  $("[id*='-tab']").on("click", function() {
    $("[id*='-tab']").removeClass("clicked-tab");
    $("[id*='-tab-content']").hide();
    $(this).addClass("clicked-tab");
    $("#" + $(this).attr("id") + "-content").show();
    console.log("**" + $(this).attr("id") + "-content is visible **");
    console.log("** " + $(this).attr("id") + " clicked **");
  });

});  // End of file.
