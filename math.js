var operator //DONE string | uset
var difficulty //DONE string | uset
var num_of_operation //DONE integer | uset
var min //DONE integer | pset
var max //DONE integer | pset
var num_one // integer | gen
var num_two // integer | gen 
var result // integer
var answer // integer

var round = 0 // integer

var good_answer = 0 // integer
var wrong_answer = 0 // integer

//
$('#main_content').hide()

//set_operator
$('input[name="operator"]').on("change", function () {
    operator = $('input[name="operator"]:checked').val();
    system_check()
})
//

//set_difficulty
$('input[name="difficulty"]').on("change", function () {
    difficulty = $('input[name="difficulty"]:checked').val();
    set_min_max(difficulty)
    system_check()
});
//

//set_num_of_operation
$('#num_of_operation').on('input', function () {
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
}
//

//set_result
function set_result() {
    switch (operator) {
        case "+":
            result = num_one + num_two
            console.log(result)
            break
        case "-":
            result = num_one - num_two
            console.log(result)
            break
        case "*":
            result = num_one * num_two
            console.log(result)
            break
        case "/":
            result = num_one
            num_one = num_one * num_two
            break
    }
}



function summary() {
    $('#num_of_operation_val').text(num_of_operation)
    $('#good_answer_val').text(good_answer)
    $('#wrong_answer_val').text(wrong_answer)
    $('#main_content').hide()
    $('#setting_content').show()
}


function system_check() {
    if (operator == undefined || difficulty == undefined || num_of_operation == undefined || num_of_operation=="") {
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



//set_answer
$('#answer').on('input', function () {
    $(this).val($(this).val().replace(/\D/g, ''));
    answer = $('#answer').val()
})
//


//set_check
function check() {


    round = round + 1
    $('#answer').val('')



    if (result == answer) {
        console.log(":D")
        good_answer = good_answer + 1
        console.log(good_answer)
        $('#check_btn').toggleClass("bg-success")
        $('#check_btn').prop('disabled', true);
        setTimeout(() => {
            $('#check_btn').toggleClass("bg-success")
            $('#check_btn').prop('disabled', false);
        }, 1000);

    } else {
        console.log(":C")
        wrong_answer = wrong_answer + 1
        console.log(wrong_answer)
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
$(document).ready(function () {
    $('#check_btn').on('click', function () {
        if (!isNaN(num_one) && !isNaN(answer)) {
            check()
        }
    })
})
//



//display_operator
function display_operation() {
    $('#display_operation').text(num_one + " " + operator + " " + num_two)
}
//



//show_btn
$(document).ready(function () {
    $('#show_btn').on('click', function () {
    })
});
//



//start
function start() {
    if (num_of_operation != 0) {

        if (!isNaN(min) && !isNaN(max)) {
            $('#setting_content').hide()
            $('#main_content').show()
            gen_num_one()
            gen_num_two()
            set_result()
            display_operation()
        }
    }

}
//




//start_btn
$(document).ready(function () {
    $('#start_btn').on('click', function () {
        start()
    })
});
//

$(document).ready(function () {
    $('#restart_btn').on('click', function () {
        start()
    })
})



$(document).ready(function () {
    system_check()
});

