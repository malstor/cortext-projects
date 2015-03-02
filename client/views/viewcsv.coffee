@viewCsv = Backbone.View.extend
    # events:
    #     "click #distante .login" : "loginWithCortext"
    #     "click .inscription" : "subscribe"
    initialize: ()=>
      

    render: (hash)->
      $('#main').html Template.viewCsv()
      console.log "I'm there ! Try to view csv :", hash
      data = [
        ['', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi'],
        ['2009', 0, 2941, 4303, 354, 5814],
        ['2010', 3, 2905, 2867, 412, 5284],
        ['2011', 4, 2517, 4822, 552, 6127],
        ['2012', 2, 2422, 5399, 776, 4151]
      ]
      container = document.getElementById('csvContent')
      hot = new Handsontable(container, {
        data: data,
        minSpareRows: 1,
        colHeaders: true,
        contextMenu: true
      });
