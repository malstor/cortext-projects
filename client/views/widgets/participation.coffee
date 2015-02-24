@participation = Backbone.View.extend
  render: ()->
    UI.insert UI.renderWithData(Template.participation,
      composition: _(@options.composition).map (v,k)->
          element =
            key: k
            value: v
     ),  @$el

    @to_bar @el

  to_bar: (e)->
    w = $(e).width()
    h = 10

    # transform .data into an hash
    data = _($(e).children(".data").children()).map (elt)->
      elts =
        type: $(elt).attr("class")
        count: $(elt).find("span").html()

    data = _(data).sortBy (d)-> d.type

    sum = _(data).reduce (m, t)->
      m + parseInt(t.count)
    , 0
    
    canvas = document.createElement("canvas")
    $(canvas).attr("height",10)
    $(canvas).attr("width",w)

    ctx = canvas.getContext("2d")

    cursor_x = 0

    ctx.fillStyle = "#EEF2F6"
    ctx.fillRect(0, 0, w, h)

    _(data).each (d)->
      # ERK
      if d.type != "Others" 
        l = Math.round( (d.count/sum) *  w)

        ctx.fillStyle = colors[d.type]
        ctx.fillRect(cursor_x, 0, l, h)

        cursor_x = cursor_x+l

    $(e).children(".data").hide()

    $(e).prepend(canvas)