console.log("bartr.js loaded")

$(document.body).on("click", ".DECLINE", function() { //swaps between animate and still image
    console.log("DECLINE")

    var offerId = $(this).attr('data-button');
    console.log(this)
    console.log(offerId)


    $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      })
      .then(function() {
        window.location.href = "/blog";
      });




    $(this).parent().remove();
    



  
  });