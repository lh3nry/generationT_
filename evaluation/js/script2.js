$(function() {
  var DOC_URL = 'https://script.google.com/macros/s/AKfycbxJNuhLFEtxvcDIk_u7WFNJZ2GFIG2mIeyijNgp_IbPjx9_kwD2/exec';
  var $advanceButtons = $('button.advance-button');
  var currentPhase = 0,
      userPassword = '',
      tries = 0,
      timeTaken = 0;

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
      }
    });
  }

  function phase0() {
    userPassword = $('#phase0 input')[0].value;
  }

  function phase1() {
    var $form = $('#phase1 form'),
        $errorMessage = $('.input--help.error'),
        $submit = $form.find('button');
    var startTime = Date.now();

    $errorMessage.hide();

    $submit.click(function(e) {
      e.preventDefault();
      tries++;

      var $input = $form.find('input');
      if ($input[0].value == userPassword) {
        $input.removeClass('input--error');
        timeTaken = Date.now() - startTime;
        postResults(function(result) {
          if (result.result == 'success') {
            advancePhase();
          } else {
            alert('Error submitting data');
            console.log(result);
          }
        });
      } else {
        $errorMessage.show();
        $input.addClass('input--error');
      }

      $input[0].value = '';

      // user failed
      if (tries === 3) {
        input.prop('disabled', true);
        postResults(function(result) {
          if (result.result == 'success') {
            advancePhase();
          } else {
            alert('Error submitting data');
            console.log(result);
          }
        });
      }
    });
  }

  function postResults(cb) {
    data = {
      'password': userPassword,
      'test2_tries': tries,
      'test2_time': timeTaken
    };

    $.post(DOC_URL, data)
    .done(function(result) {
      cb(result);
    });
  }

  function init() {
    $('#phase1, #phase2').hide();
    $advanceButtons.click(advancePhase);
  }

});
