((function(){var a,b,c,d,e;e="http://a.tiles.mapbox.com/v3/lebreeze.map-yq4ttdwa.jsonp",b=new L.LatLng(51.512109,-0.082581),d=(new L.Map("map",{scrollWheelZoom:!1,dragging:!1,zoomControl:!1,doubleClickZoom:!1,closePopupOnClick:!1})).setView(b,17),wax.tilejson(e,function(a){return d.addLayer(new wax.leaf.connector(a))}),c={type:"Feature",properties:{name:"Curators Coffee Studio",amenity:"Specialty coffee shop"},geometry:{type:"Point",coordinates:[-0.082581,51.512109]}},a=new L.GeoJSON(c,{pointToLayer:function(a){return new L.Marker(a,{icon:new L.DivIcon})}}),d.addLayer(a),$(function(){return $("#slides").slides({preload:!0,preloadImage:"/assets/loading-8abb564031ce58f9f1b1f60908df0409.gif",play:5e3,pause:2500,hoverPause:!0,generatePagination:!1,effect:"slide, fade",crossfade:!0,slideSpeed:350,fadeSpeed:500,randomize:!0})})})).call(this);