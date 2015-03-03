@viewPdf = Backbone.View.extend
    # events:
    #     "click #distante .login" : "loginWithCortext"
    #     "click .inscription" : "subscribe"
    initialize: ()=>
      

    render: (hash)->
      $('#main').html Template.viewPdf()
      
      PDFJS.workerSrc = '/client/lib/pdfjs/pdf.worker.js'
      url = dashboardConfig.services.Storage.url+dashboardConfig.services.Storage.getDocument+"/"+hash
      console.log "I'm here ! Try to view ", url
      # Create PDF
      PDFJS.getDocument(url).then (pdf)=>
          # Fetch the first page
          pdf.getPage(1).then (page)=>
              desiredWidth = 1200
              viewport = page.getViewport(1);
              scale = desiredWidth / viewport.width;
              scaledViewport = page.getViewport(scale);

              # Prepare canvas using PDF page dimensions
              canvas = document.getElementById('pdfcanvas')
              context = canvas.getContext('2d')
              canvas.height = scaledViewport.height
              canvas.width = scaledViewport.width

              # Render PDF page into canvas context
              page.render({canvasContext: context, viewport: scaledViewport}).promise.then ()=>
                #unset loading
                $('p.loading').html ''
