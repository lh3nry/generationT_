$(function() {
  var DOC_URL = 'https://script.google.com/macros/s/AKfycbwJCxo2y40HLBS5ePTGS9rvu0ZYcOx4cyuDj14H2jt5SIae4OJK/exec';
  var $advanceButtons = $('button.advance-button');
  var currentPhase = 0,
      userPassword = '',
      trainingTries = 0,
      test1Tries = 0;
      test1Time = 0;

  init();

  function advancePhase(e) {
    if (e) e.preventDefault();

    if (currentPhase === 0) phase0();

    $('#phase'+currentPhase).fadeOut(function() {
      currentPhase++;
      $('#phase'+currentPhase).fadeIn();

      switch (currentPhase) {
        case 1:
          phase1();
          break;
        case 3:
          phase3();
          break;
      }
    });
  }

  /**
   * Record user password
   */
  function phase0() {
    userPassword = $('#phase0 input')[0].value;
  }

  /**
   * User training. Has to enter password correctly 3 times in a row
   */
  function phase1() {
    var $form = $('#phase1 form'),
        $submit = $form.find('button'),
        $errorMessage = $form.find('.input--help.error'),
        $numTimes = $form.find('#num-times');

    var counter = 0;

    $('.input--help.count').show();
    $submit.click(function(e) {
      e.preventDefault();
      trainingTries++;
      var $input = $form.find('input');
      if ($input[0].value == userPassword) {
        $errorMessage.fadeOut();
        $input.removeClass('input--error');
        counter++;
      } else {
        $errorMessage.fadeIn();
        $input.addClass('input--error');
        counter = 0;
      }

      $numTimes.text(counter);
      $input[0].value = '';

      if (counter === 3) {
        $input.prop('disabled', true);
        $(this).fadeOut(function() {
          $('#phase1-advance').fadeIn();
        });
      }
    });
  }

  function phase3() {
    var $form = $('#phase3 form'),
        $submit = $form.find('button'),
        $input = $form.find('input'),
        $errorMessage = $form.find('input--help.error');
    var startTime = Date.now(),
        endTime;

    $submit.click(function(e) {
      e.preventDefault();
      test1Tries++;
      if($input[0].value == userPassword) {
        $errorMessage.fadeOut();
        $input.removeClass('input--error');
        endTime = Date.now() - startTime;
        test1Time = endTime;
        $(this).prop('disabled', true);
        postResults(function(result) {
          if (result.result == 'success') {
            advancePhase();
          } else {
            alert('Problem recording result');
          }
        });
      } else {
        $errorMessage.fadeIn();
        $input.addClass('input--error');
      }
    });
  }

  function postResults(cb) {
    // password, training_tries, test1_tries, test1_time
    data = {
      'password': userPassword,
      'training_tries': trainingTries,
      'test1_tries': test1Tries,
      'test1_time': test1Time
    };

    $.post(DOC_URL, data)
    .done(function(result) {
      cb(result);
    });
  }

  function init() {
    // $formButton.click(submitFormHandler);
    $('#phase1, #phase2, #phase3, #phase4').hide();
    $('#phase1-advance, .input--help').hide();
    $advanceButtons.click(advancePhase);
  }

});
