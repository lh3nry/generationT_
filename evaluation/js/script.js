$(function() {
  var $phase1 = $('#phase1'),
      $thanks = $('#thanks'),
      $form = $('#phase1 form'),
      $formButton = $form.find('button'),
      $formFields = $form.find('input'),
      $errorText = $('#error-text'),
      $userPassword = $('#user-password');

  init();

  function submitFormHandler(e) {
    e.preventDefault();

    var passwordsIdentical = $formFields.toArray().reduce(function(prev, current) {
      return (prev.value === current.value && prev.value) ? prev : false;
    });

    if (!passwordsIdentical) {
      $formFields.addClass('input--error');
      $errorText.fadeIn();
    } else {
      $userPassword.text($formFields.get(0).value);
      $phase1.fadeOut(function() {
        $thanks.fadeIn();
      });
    }
  }

  function init() {
    $formButton.click(submitFormHandler);
    $errorText.hide();
    $thanks.hide();
  }

});
