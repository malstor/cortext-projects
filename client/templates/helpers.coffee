Handlebars.registerHelper 'status', (st) ->
  switch st
    when 0, 1 then "queued"
    when 2, 3, 4 then "running"
    when 8 then "error"
    when 9 then "finished"
    else "unknown"
  

Handlebars.registerHelper 'date_short', (timestamp) ->
    if typeof timestamp is 'number'
      moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
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
  return if txt then new Handlebars.SafeString marked txt else ""

Handlebars.registerHelper 'ellipsis', (str, limit) ->
    return if str.length > limit then str.substring(0, limit)+"..." else str

Handlebars.registerHelper 'filename', (str) ->
    return if str.length > 0 then _(str.split('/')).last() else ''

Handlebars.registerHelper 'viz', (type, url) ->
  hash = _(url.split('/')).last()
  switch type
    when "pdf" then dashboardConfig.services.Viz.pdf+ hash
    when "html","htm"  then url+'/view'
    when "json" then dashboardConfig.services.Viz.json+encodeURIComponent(url)
    when "csv" then dashboardConfig.services.Viz.csv+hash
    else url

Handlebars.registerHelper 'isNotAComment', (e) ->
    return if parseInt(e.commentOn) > 0 then false else true
