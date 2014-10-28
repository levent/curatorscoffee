var keenClient = new Keen({
  projectId: "544f5a3080a7bd659d080381",
  writeKey: "f5f17a8c553816256db33054d1bbc42d799960808e22eed313b9d3ab0584663cacf849949ffef7195daf4bb05139b3a391d60e5640bdd4a8d5a1adf19c980cd89af0664a808e25315d8d67f12eb8c253aa83a4135d8893cd3e9558e515a300b476824e949833ec45769f901d44a79d37",
  protocol: "https",
  host: "api.keen.io/3.0",
  requestType: "jsonp"
});

$("a.mailto-classes").click(function(event){
  return keenClient.trackExternalLink(event, "link_mailto_classes", {'class_type' : $(this).attr('data-classtype')});
});
