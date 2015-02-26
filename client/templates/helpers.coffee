UI.registerHelper 'status', (st) ->
  switch st
    when 0 then "queued"
    when 1 then "running"
    when 8 then "error"
    when 9 then "finished"
    else "unknown"
  

UI.registerHelper 'date_short', (timestamp) ->
    if typeof timestamp is 'number'
      moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
    else
      timestamp

UI.registerHelper 'from_now', (timestamp) ->
    if typeof timestamp is 'number'
      moment(timestamp).fromNow()
    else
      timestamp

UI.registerHelper 'participation', (composition)->
  return new Handlebars.SafeString Template.participation
    composition: _(composition).map (v,k)->
      element =
        key: k
        value: v

UI.registerHelper 'size', (a)->
  return _(a).size()

UI.registerHelper 'md', (txt)->
  return if txt then new Handlebars.SafeString marked txt else ""

UI.registerHelper 'ellipsis', (str, limit) ->
    return if str.length > limit then str.substring(0, limit)+"..." else str

UI.registerHelper 'filename', (str) ->
    return if str.length > 0 then _(str.split('/')).last() else ''

UI.registerHelper 'viz', (type, url) ->
  hash = _(url.split('/')).last()
  switch type
    when "pdf" then dashboardConfig.services.Viz.pdf+ hash
    when "html","htm"  then url+'/view'
    when "json" then dashboardConfig.services.Viz.json+encodeURIComponent(url)
    when "csv" then dashboardConfig.services.Viz.csv+hash
    else url

UI.registerHelper 'isNotAComment', (e) ->
    return if parseInt(e.commentOn) > 0 then false else true
