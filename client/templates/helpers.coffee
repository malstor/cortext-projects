Handlebars.registerHelper 'date_short', (timestamp)->
  return moment(timestamp).format("DD.MM.YYYY")

Handlebars.registerHelper 'participation', (composition)->
  return new Handlebars.SafeString Template.participation
    composition: _(composition).map (v,k)->
      element =
        key: k
        value: v