$(function() {

  var $advanceButtons = $('button.advance-button');
  var currentPhase = 0,
      userPassword = '',
      phase1Count = 0;

  init();

  function advancePhase(e) {
    e.preventDefault();

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
    $form = $('#phase1 form');
    $submit = $form.find('button');
    $errorMessage = $form.find('.input--help.error');
    $numTimes = $form.find('#num-times');

    $('.input--help.count').show();
    $submit.click(function(e) {
      e.preventDefault();

      var $input = $form.find('input');
      if ($input[0].value == userPassword) {
        $errorMessage.fadeOut();
        $input.removeClass('input--error');
        phase1Count++;
      } else {
        $errorMessage.fadeIn();
        $input.addClass('input--error');
        phase1Count = 0;
      }

      $numTimes.text(phase1Count);
      $input[0].value = '';

      if (phase1Count === 3) {
        $(this).fadeOut(function() {
          $('#phase1-advance').fadeIn();
        });
      }
    });
  }

  function phase3() {

  }

  function init() {
    // $formButton.click(submitFormHandler);
    $('#phase1, #phase2, #phase3').hide();
    $('#phase1-advance, .input--help').hide();
    $advanceButtons.click(advancePhase);
  }

});
