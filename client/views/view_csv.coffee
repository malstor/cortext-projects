#viewCsv backbone view : display a csv file with handsontable

@viewCsv = Backbone.View.extend
    # events:
    
    initialize: ()=>

    render: (hash)->
      $('#main').html Template.viewCsv
        file : null

      console.log "I'm there ! Try to view csv :", hash
      #constructing the file url given the hash
      url = dashboardConfig.services.Storage.url+dashboardConfig.services.Storage.getDocument+"/"+hash
      parameters = ''

      #meta data url
      urlMeta = dashboardConfig.services.Storage.url+dashboardConfig.services.Storage.getDocument+"/"+hash+"/meta"

      #get the meta data
      HTTP.get urlMeta, (error,data)=>
        console.log 'try to get metadatas from ', url
        if(error)
          console.log "error getting ", urlMeta, " : ", error
        else
          file = JSON.parse(data.content)
          console.log "reveived metadatas : ", file
          
          #render the template (to get the csvContent div)
          $('#main').html Template.viewCsv
            file : file
          
          #get the file from storage
          HTTP.get url + $.param(parameters), (error,data)=>
            if(error)
              console.log "error getting ", url, " : ", error
            else        
              #if data is returned, transform it into an array (see /client/lib/handsontable/underscore.csvtoarray.js for the function)
              if(data.content)
                @data = _(data.content).CSVtoArray()
                console.log "... received datas : ", data, " transformed to array :", @data
              else
                console.error "No content in data from ", url
                return

              #get the csv container (just a div for now)
              container = document.getElementById('csvContent')

              #create the Handsontable object with the container and some options, see http://handsontable.com/ for detailed docs
              csvHandle = new Handsontable(container, {
                data: @data, #the array of datas we juste created
                minSpareRows: 1, # wtf ?
                rowHeaders: true, #display row numbers for headers
                colHeaders: false, #idem for columns
                columnSorting: true, #click on the col header to sort
                contextMenu: true # right-click menu : insert/remove row and cols, ...
              });

              #unset loading
              $('p.loading').html ''

              #resize the content to window size
              #$('.csvContainer').css("height", $(window).height()-150)
              $('.csvContainer').css("max-height", $(window).height()-150)
