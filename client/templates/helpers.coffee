Handlebars.registerHelper 'status', (st) ->
  switch st
    when 0 then "queued"
    when 1 then "running"
    when 8 then "error"
    when 9 then "finished"
    else "unknown"
  

Handlebars.registerHelper 'date_short', (timestamp) ->
    if typeof timestamp is 'number'
      moment(timestamp).format("YYYY-MM-DD H:mm:s")
    else
      timestamp

Handlebars.registerHelper 'from_now', (timestamp) ->
    if typeof timestamp is 'number'
      moment(timestamp).fromNow()
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

Handlebars.registerHelper 'ellipsis', (str, limit) ->
    return if str.length > limit then str.substring(0, limit)+"..." else str

Handlebars.registerHelper 'filename', (str) ->
    return if str.length > 0 then _(str.split('/')).last() else ''
