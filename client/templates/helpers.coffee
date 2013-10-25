Handlebars.registerHelper 'status', (st) ->
  switch st
    when 0 then "queued"
    when 8 then "error"
    when 9 then "finished"
    else "unknown"
  

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