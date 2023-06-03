// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentDayEl = $('#currentDay')


$(function () {

  // Listener for click events on the save button. 
  $('.saveBtn').click(function(){
    // console.log($(this));
    var textAreaValue = $(this).siblings('textarea').val();
    // console.log(textAreaValue);
  // Uses the id in the containing time-block as a key to save the user input in local storage. 
    var parentID = $(this).parent().attr("id");
    // console.log(parentID);
    localStorage.setItem(parentID, textAreaValue);
  })

  // Function applies the past, present, or future class to each time block by comparing the id to the current hour.
  $('.time-block').each(function() {
    // console.log($(this).attr("id").slice(5));
    var currentTime = dayjs().hour();
    var timeBlocksTime = $(this).attr("id").slice(5);

  // Attribute of each time-block used to conditionally add or removeClass the past, present, and future classes
    if (currentTime == timeBlocksTime) {
      $(this).addClass('present').removeClass('past future');
    } else if (currentTime > timeBlocksTime) {
      $(this).addClass('past').removeClass('present future');

    } else {
      $(this).addClass('future').removeClass('past present');
    }
    
  })
  
  //Function gets any user input that was saved in localStorage and sets the values of the corresponding textarea elements.
  $('.row').each(function(i, el) {
    // console.log(el.id);
    var savedInfo = localStorage.getItem(el.id);
    $(el).children('.description')[0].textContent = savedInfo;
    // console.log($(el).children('.description')[0].textContent);
    
  })
  
  
  
});

// Function displays the current date in the header of the page.
function displayDay() {
  var rightNow = dayjs().format('dddd, MMMM DD, YYYY');
  currentDayEl.text(rightNow);
}

displayDay();