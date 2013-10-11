@activate_button = (input, button) ->
  $input = $(input)
  $button = $(button)
  default_value = $input.val()
  
  # FIXME : code un peu long
  $input.addClass "default"
  $button.attr "disabled", "disabled"
  $button.addClass "inactive"
  $input.on "focus", (evt) ->
    $input.val ""
    $input.addClass "focus"
    $input.removeClass "default"
    $input.trigger "keyup"

  $input.on "blur", (evt) ->
    if $input.val() is ""
      $input.val default_value
      $input.removeClass "focus"
      $input.addClass "default"

  $input.on "keyup", (evt) ->
    if $input.val() is "" or $input.hasClass("default")
      $button.attr "disabled", "disabled"
      $button.addClass "inactive"
    else
      $button.removeAttr "disabled"
      $button.removeClass "inactive"