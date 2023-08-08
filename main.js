var operator //DONE string | uset
var difficulty //DONE string | uset
var num_of_operation //DONE integer | uset
var min //DONE integer | pset
var max //DONE integer | pset
var num_one // integer | gen
var num_two // integer | gen 
var result // integer
var answer// integer

let good_answers = []
let wrong_answers = []
let results = []
let answers = []
let nums_one = []
let nums_two = []

var round = 0 // integer

var good_answer = 0 // integer
var wrong_answer = 0 // integer

//
$('#main_content').hide()
$('#num_pad').hide()


//set_operator
$('input[name="operator"]').on("change", function() {
  operator = $('input[name="operator"]:checked').val();
  system_check()
})
//

//set_difficulty
$('input[name="difficulty"]').on("change", function() {
  difficulty = $('input[name="difficulty"]:checked').val();
  set_min_max(difficulty)
  system_check()
});
//

//set_num_of_operation
$('#num_of_operation').on('input', function() {
  $(this).val($(this).val().replace(/\D/g, ''));
  num_of_operation = $('#num_of_operation').val()
  system_check()
})

//set_min_max
function set_min_max() {
  switch (difficulty) {
    case "Easy":
      min = 0;
      max = 5
      break
    case "Normal":
      min = 5
      max = 10;
      break
    case "Hard":
      min = 0
      max = 20;
      break
  }
}
//

//gen_num_one
function gen_num_one() {
  num_one = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("1. " + num_one)
  nums_one.push(num_one)
}
//

//gen_num_two
function gen_num_two() {
  num_two = Math.floor(Math.random() * (max - min + 1) + min);
  if (operator === "/") {
    console.log("!!!///")
    while (num_two === 0) {
      num_two = Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
  console.log("2. " + num_two)
  nums_two.push(num_two)
}
//

//set_result
function set_result() {
  switch (operator) {
    case "+":
      result = num_one + num_two
      results.push(result)
      break
    case "-":
      result = num_one - num_two
      results.push(result)
      break
    case "*":
      result = num_one * num_two
      results.push(result)
      break
    case "/":
      result = num_one
      num_one = num_one * num_two
      results.push(result)
      break
  }
}




function summary() {
  $('#num_of_operation_val').text(num_of_operation)
  $('#good_answer_val').text(good_answer)
  $('#wrong_answer_val').text(wrong_answer)
  //$('#nums_one_val').text(nums_one)
  //$('#nums_two_val').text(nums_two)
  $('#answers_val').text(answers)
  $('#results_val').text(results)
  for (let i = 0; i < nums_one.length; i++) {
    if (answers[i] == results[i]) {
      $('#summary').addClass('text-success')
    } else {
      $('#summary').addClass('text-danger')
    }
  }
  $('#main_content').hide()
  $('#setting_content').show()
  $('#num_pad').hide()
}


function system_check() {
  if (operator == undefined || difficulty == undefined || num_of_operation == undefined || num_of_operation == "") {
    $('#start_btn').prop('disabled', true)
  } else {
    $('#start_btn').prop('disabled', false)
  }
}


//set_display
function set_display() {
  $('#operator_val').text(operator);
  $("#difficulty_val").text(difficulty);
  $('#num_of_operation_val').text(num_of_operation);
  $('#min_val').text(min);
  $('#max_val').text(max);
  $('#num_one_val').text(num_one);
  $('#num_two_val').text(num_two);
  $('#result_val').text(result)
}
//


//set_check
function check() {

  answers.push(answer)

  round = round + 1
  $('#answer').text('')


  if (result == answer) {
    console.log(":D")
    good_answer = good_answer + 1
    good_answers.push(good_answer)
    $('#check_btn').toggleClass("bg-success")
    $('#check_btn').prop('disabled', true);
    setTimeout(() => {
      $('#check_btn').toggleClass("bg-success")
      $('#check_btn').prop('disabled', false);
    }, 1000);

  } else {
    console.log(":C")
    wrong_answer = wrong_answer + 1
    wrong_answers.push(wrong_answer)
    $('#check_btn').toggleClass("bg-danger")
    $('#check_btn').prop('disabled', true);
    setTimeout(() => {
      $('#check_btn').toggleClass("bg-danger")
      $('#check_btn').prop('disabled', false);
    }, 1000);


  }



  if (round == num_of_operation) {
    setTimeout(() => {
      summary()
      $('#result_modal').modal('show')
      round = 0
      good_answer = 0
      wrong_answer = 0
    }, 1000)
  } else {
    setTimeout(() => {
      start()
    }, 1000)
  }

}
//



//check_btn
$(document).ready(function() {
  $('#check_btn').on('click', function() {
    check()
    $("#check_btn").prop('disabled', true)
  })
})
//


//display_operator
function display_operation() {
  $('#display_operation').text(num_one + " " + operator + " " + num_two)
}
//



//show_btn
$(document).ready(function() {
  $('#show_btn').on('click', function() {})
});
//



//start
function start() {
  if (num_of_operation != 0) {
    $('#setting_content').hide()
    $('#main_content').show()
    gen_num_one()
    gen_num_two()
    set_result()
    display_operation()
    $('#check_btn').prop('disabled' , true)
    
  }

}
//




//start_btn
$(document).ready(function() {
  $('#start_btn').on('click', function() {
    $('#num_pad').show()
    answers.splice(0, answers.length)
    nums_one.splice(0, nums_one.length)
    nums_two.splice(0, nums_two.length)
    results.splice(0, results.length)
    $('#summary').text('')
    start()
  })
});
//

$(document).ready(function() {
  $('#restart_btn').on('click', function() {
    $('#num_pad').show()
    answers.splice(0, answers.length)
    nums_one.splice(0, nums_one.length)
    nums_two.splice(0, nums_two.length)
    results.splice(0, results.length)
    $('#summary').text('')
    start()
  })
})



$(document).ready(function() {
  system_check()
});


//num_pad
$("#0_btn").on("click", function() {
  access_answer = $("#answer").text()
  $("#answer").text(access_answer + 0)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#1_btn").on("click", function() {
  access_answer = $("#answer").text() 
  $("#answer").text(access_answer + 1)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#2_btn").on("click", function() {
  access_answer = $("#answer").text()
  $("#answer").text(access_answer + 2)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#3_btn").on("click", function() {
  access_answer = $("#answer").text()
  $("#answer").text(access_answer + 3)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#4_btn").on("click", function() {
  access_answer = $("#answer").text()
  $("#answer").text(access_answer + 4)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#5_btn").on("click", function() {
  access_answer = $("#answer").text()
  $("#answer").text(access_answer + 5)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#6_btn").on("click", function() {
  const access_answer = $("#answer").text()
  $("#answer").text(access_answer + 6)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#7_btn").on("click", function() {
  const access_answer = $("#answer").text()
  $("#answer").text(access_answer + 7)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#8_btn").on("click", function() {
  const access_answer = $("#answer").text()
  $("#answer").text(access_answer + 8)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#9_btn").on("click", function() {
  const access_answer = $("#answer").text()
  $("#answer").text(access_answer + 9)
  $('#check_btn').prop('disabled', false)
  answer = $('#answer').text()
})

$("#clear_btn").on("click", function() {
  $("#answer").text("")
  $('#check_btn').prop('disabled', true)
})

$("#del_btn").on("click", function() {
  
  var access_answer = $("#answer").text()
  $("#answer").text(access_answer.substring(0, access_answer.length - 1))
  answer = $('#answer').text()
  
  if (access_answer.length == 1) {
   $('#check_btn').prop('disabled', true) 
  }
})

$("#plus_minus_btn").on("click", function() {
  if (answer.length != 0) {
    access_answer = $("#answer").text()
    $("#answer").text(access_answer * -1)
    answer = $('#answer').text()
  }
})
//
