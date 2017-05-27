var router = function(){
  this.routes = [];
};

router.prototype.add = function(method, url, handler){
  console.log("In router.add()");
  this.routes.push({
    method: method,
    url: url,
    handler: handler
  });
};

router.prototype.resolve = function(request, response){
  var path = require("url").parse(request.url).pathname;
  console.log("In router.resolve()");
  console.log("path: "+path);
  return this.routes.some(function(route){
    var match = route.url.exec(path);
    console.log("match: "+match);
    console.log("methods:"+request.method+","+route.method);
    if(!match || request.method != route.method){
      console.log("resolve failed");
      return false;
    }
    var urlParts = match.slice(1).map(decodeURIComponent);
    route.handler.apply(null, [request, response].concat(urlParts));
    console.log("resolved");
    return true;
  });
};

module.exports = router;
