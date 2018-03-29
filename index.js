$('document').ready(function() {
  var recordList = [];
  // there was some problem with the api given throwing error so made a simple JSON store in myjson and hitting that url to get data
  //calling the api
  $.ajax({
    type: "GET",
    url: "https://api.myjson.com/bins/t8w07",
    dataType: "json",
    success: callbackFunction,
    error: function(result) {
      console.log(result);
      alert(result.statusText);
    }
  });


  function callbackFunction(data) {
    console.log(data);
    recordList = data;
	//append the data
    $.each(data.items, function(index, element) {
      $('<h1 class="receipeTitle">' + element.title + '</h1>').appendTo('.slider-container');
	  $('<p class="receipeTitle">' + element.abstract + '</p>').appendTo('.slider-container');
	  $('<p class="receipeTitle">' + element.author + '</p>').appendTo('.slider-container');
      $('<div class="slick' + index + '"></div>').appendTo('.slider-container')
      $.each(element.images, function(k, v) {
        $(".slick" + index).append("<div class='row slickCarosuel'><img data-mainindex=" + index + " data-imageindex=" + k + " src=" + v.url + "  id=slick" + index + "></div>");
      });
    });

    for (var i = 0; i < recordList.items.length; i++) {
      $('.slick' + i).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });
    }

  }
  $('.slider-container').on('click', 'img', function() {
    var dataIndex = $(this).data('mainindex');
    var imageIndex = $(this).data('imageindex');

    var currentElement = recordList.items[dataIndex].images[imageIndex];
    $('#modal-selected-img-title').text(currentElement.title);
    $('#modal-selected-desc-title').text(currentElement.description);
    $('#modal-img').attr('src', currentElement.url);
    $('#modalReceipe').modal();

  });


});
