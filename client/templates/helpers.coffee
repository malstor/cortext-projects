Handlebars.registerHelper 'date_short', (timestamp)->
  return moment(timestamp).format("DD.MM.YYYY")