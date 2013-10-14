Handlebars.registerHelper 'date_short', (timestamp) ->
    if typeof timestamp is 'number'
      moment(timestamp).format("DD.MM.YYYY")
    else
      timestamp

Handlebars.registerHelper 'participation', (composition)->
  return new Handlebars.SafeString Template.participation
    composition: _(composition).map (v,k)->
      element =
        key: k
        value: v

Handlebars.registerHelper 'size', (a)->
  return _(a).size()

Handlebars.registerHelper 'md', (txt)->
  return new Handlebars.SafeString marked txt