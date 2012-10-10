(function(b4){
    
var D3_WIKI = "https://github.com/mbostock/d3/wiki/",
    D3_TYPES = {
        SELECTION: {
            id: "D3 Selection",
            field: b4.fields.text("SELECTOR")
                .init("CSS-style selector")
        },
        SVG_ELEMENT: {
            id: "D3 SVG entity",
            field: b4.fields.choices("ELEMENT")
                .title("SVG Element")
                .init([
                    ["rectangle", "rect"],
                    ["circle", "circle"],
                    ["ellipse", "ellipse"],
                    ["line", "line"],
                    ["polyline", "polyline"],
                    ["polygon", "polygon"],
                    ["text", "text"],
                    ["path", "path"]
                ])
        },
        PARENT: {
            id: "D3 Parent Selection",
            field: b4.input("PARENT")
                .title("of selection")
                .inputValue(true)
        },
        ATTR_PROP: {
            id: "D3 attribute",
            field: b4.input("ATTR_PROP")
                .inputValue(true)
                .title("DOM attribute")
        },
        STYLE_PROP: {
            id: "D3 CSS Style Property",
            field: b4.input("STYLE_PROP")
                .inputValue(true)
                .title("CSS property")
        },
        VALUE: {
            id: "D3 general calc value",
            field: b4.input("VALUE")
                .inputValue(true)
                .title("to value")
        },
        KLASS: {
            id: "D3 class",
            field: b4.input("KLASS")
                .inputValue(true)
                .title("CSS class")
        },
        PROP: {
            id: "D3 property",
            field: b4.input("PROP")
                .inputValue(true)
                .title("property named")
        },
        ENTITY: {
            id: "D3 entity",
            field: b4.input("ENTITY")
                .inputValue(true)
                .title("tag named")
        }
    };
    

// set up a base configuration
var d3_mold = b4.block()
    .generator("JavaScript")
    .helpUrlTemplate(D3_WIKI)
    .namespace("")
    .colour("steelblue"),
            
    // make a subconfiguration
    select_mold = d3_mold.clone()
        .namespace("d3_select")
        .category("d3 selection")
        .output(D3_TYPES.SELECTION)
        .helpUrlTemplate(D3_WIKI +"Selections#wiki-<%= block.id() %>"),
    
    select_arg_mold = select_mold.clone()
        .namespace("d3_d3_")
        .output(D3_TYPES.SELECTION);
            
select_mold.clone("")
    .tooltip("The first element that matches the selector")
    .appendTitle(["select the first element that matches",
        D3_TYPES.SELECTION.field])
    .code("d3.select('<%= $.title('SELECTOR') %>')")
    .done();
        
select_mold.clone("All")
    .tooltip("All elements that match the selection")
    .appendTitle(["select all elements that match",
        D3_TYPES.SELECTION.field])
    .code("d3.selectAll('<%= $.title('SELECTOR') %>')")
    .done();
    
        
select_arg_mold.clone("selectAll")
    .tooltip("All elements that match the selection")
    .appendTitle(["select all elements that match",
        D3_TYPES.SELECTION.field])
    .appendInput(D3_TYPES.PARENT.field)
    .code([
            "<%= $.code('PARENT', 'd3.select(document)') %>", 
            ".selectAll('<%= $.title('SELECTOR') %>')"
        ])
    .done();
    
select_mold.clone("enter")
    .tooltip("returns placeholders for missing elements")
    .appendTitle("enter")
    .appendInput(D3_TYPES.PARENT.field)
    .code(["<%= $.code('PARENT') %>", 
            ".enter()"])
    .done();



var manip_mold = d3_mold.clone()
        .category("d3 manipulation")
        .namespace("d3_"),
    get_mold = manip_mold.clone()
        .category("d3 getters")
        .output(D3_TYPES.VALUE);
    
manip_mold.clone("style") 
    .appendTitle("set d3.style")
    .appendInput([D3_TYPES.STYLE_PROP.field,
        D3_TYPES.PARENT.field,
        D3_TYPES.VALUE.field])
    .code(["<%= $.code('PARENT', 'd3.select(\"circle\")') %>", 
        ".style(<%= $.code('STYLE_PROP') %>, <%= $.code('VALUE') %>)"])
    .done();
    
get_mold.clone("style_get") 
    .appendTitle("get d3.style")
    .output(D3_TYPES.SELECTION)
    .appendInput([D3_TYPES.STYLE_PROP.field,
        D3_TYPES.PARENT.field])
    .code(["<%= $.code('PARENT', 'd3.select(\"circle\")') %>", 
        ".style(<%= $.code('STYLE_PROP') %>)"])
    .done();

manip_mold.clone("attr")
    .tooltip("Set the SVG attribute")
    .appendTitle("d3.attr")
    .appendInput([D3_TYPES.ATTR_PROP.field,
        D3_TYPES.PARENT.field,
        D3_TYPES.VALUE.field])
    .code(["<%= $.code('PARENT') %>", 
        ".attr(<%= $.code('ATTR_PROP') %>, <%= $.code('VALUE') %>)"])
    .done();
    
manip_mold.clone("data")
    .tooltip("Set the data for a selection")
    .appendTitle("d3.data")
    .appendInput([D3_TYPES.PARENT.field,
        D3_TYPES.VALUE.field])
    .code(["<%= $.code('PARENT') %>", 
        ".data(<%= $.code('VALUE') %>)"])
    .done();

manip_mold.clone("classed")
    .tooltip("Set the class of a selection")
    .appendTitle("d3.class")
    .appendInput([D3_TYPES.KLASS.field,
        D3_TYPES.PARENT.field,
        D3_TYPES.VALUE.field])
    .code(["<%= $.code('PARENT') %>", 
        ".classed(<%= $.code('KLASS') %>, <%= $.code('VALUE') %>)"])
    .done();
    
manip_mold.clone("property")
    .tooltip("get or set raw properties")
    .appendTitle("d3.property")
    .appendInput([D3_TYPES.PARENT.field,
        D3_TYPES.PROP.field,
        D3_TYPES.VALUE.field])
    .code(["<%= $.code('PARENT') %>", 
        ".property(<%= $.code('PROP') %>, <%= $.code('VALUE') %>)"])
    .done();

manip_mold.clone("text")
    .tooltip("get or set text")
    .appendTitle("d3.text")
    .appendInput([D3_TYPES.PARENT.field,
        D3_TYPES.VALUE.field])
    .code(["<%= $.code('PARENT') %>", 
        ".text(<%= $.code('VALUE') %>)"])
    .done();
    
manip_mold.clone("append")
    .tooltip("get or set html")
    .appendTitle("d3.append")
    .appendInput([D3_TYPES.PARENT.field,
        D3_TYPES.ENTITY.field])
    .code(["<%= $.code('PARENT') %>", 
        ".append(<%= $.code('ENTITY') %>)"])
    .done();

manip_mold.clone("insert")
    .tooltip("create and insert new elements before existing elements")
    .appendTitle("d3.insert")
    .appendInput([D3_TYPES.PARENT.field,
        D3_TYPES.ENTITY.field])
    .code(["<%= $.code('PARENT') %>", 
        ".insert(<%= $.code('ENTITY') %>)"])
    .done();
    
manip_mold.clone("remove")
    .tooltip("remove elements from the document")
    .appendTitle("d3.remove")
    .appendInput([D3_TYPES.PARENT.field,
        D3_TYPES.ENTITY.field])
    .code(["<%= $.code('PARENT') %>", 
        ".remove())"])
    .done();
    
    
var svg_mold = b4.block()
    .category("d3 SVG")
    .generator("JavaScript")
    .helpUrlTemplate(D3_WIKI+"SVG-Shapes#wiki-")
    .namespace("d3_svg_elements_")
    .colour("orange")
    .output(D3_TYPES.SVG_ELEMENT);

svg_mold.clone("element")
    .tooltip("an SVG element")
    .appendTitle(["SVG", D3_TYPES.SVG_ELEMENT.field])
    .code("<%= $.title('ELEMENT') %>")
    .done();

})(b4);