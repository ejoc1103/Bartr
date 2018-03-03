console.log("bartr.js loaded")

$(document.body).on("click", ".DECLINE", function() { //swaps between animate and still image
    console.log("DECLINE")

    var offerId = $(this).attr('data-button');
    console.log(this)
    console.log(offerId)

    let postx = { id : offerId};

    $.ajax({
        method: "PUT",
        url: "/api/offers/decline",
        data: postx
      })
      .then(function() {
        
      });




    $(this).parent().remove();

  });



  $(document.body).on("click", ".ACCEPT", function() { //swaps between animate and still image
    console.log("ACCEPT")

    var offerId = $(this).attr('data-button');
    console.log(this)
    console.log(offerId)

    let postx = { id : offerId};

    $.ajax({
        method: "PUT",
        url: "/api/offers/accept",
        data: postx
      })
      .then(function() {
        window.location.href = "/1111";
      });




   
    



  
  });