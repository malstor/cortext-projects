@viewPdf = Backbone.View.extend
    # events:
    #     "click #distante .login" : "loginWithCortext"
    #     "click .inscription" : "subscribe"
    initialize: ()=>
      

    render: (hash)->
      $('#main').html Template.viewPdf()
      
      PDFJS.workerSrc = '/client/lib/pdfjs/pdf.worker.js'
      url = dashboardConfig.services.Storage.url+dashboardConfig.services.Storage.getDocument+"/"+hash

      currPage = 1
      numPages = 0
      thePDF = null

      console.log "I'm here ! Try to view ", url

      handlePages = (page) ->
        #This gives us the page's dimensions at full scale
        desiredWidth = 1200
        viewport = page.getViewport(1)
        scale = desiredWidth / viewport.width;
        viewport = page.getViewport(scale);
        #We'll create a canvas for each page to draw it on
        canvas = document.createElement('canvas')
        canvas.style.display = 'block'
        if currPage > 1
          canvas.style.borderTop = '1px Solid #d3d3d3'
        context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width
        #Draw it on the canvas
        page.render
          canvasContext: context
          viewport: viewport
        #Add it to the web page
        document.getElementById('pdfContainer').appendChild canvas
        #Move to next page
        currPage++
        if thePDF != null and currPage <= numPages
          thePDF.getPage(currPage).then handlePages
        return

      # Create PDF
      PDFJS.getDocument(url).then (pdf)=>
          #Set PDFJS global object (so we can easily access in our page functions
          thePDF = pdf
          #How many pages it has
          numPages = pdf.numPages
          # Fetch the first page
          pdf.getPage(1).then handlePages
          #unset loading
          $('p.loading').html ''
