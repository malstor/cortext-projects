Handlebars.registerHelper 'date_short', (timestamp)->
  return moment(timestamp).format("DD.MM.YYYY")

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