// const XMLToJSON = (XML) => {
//   let obj = {}
//   console.log(XML)

//   if (XML.attributes.length > 0) {
//     obj['@attributes'] = {}
//     for (let j = 0; j < XML.attributes.length; j += 1) {
//       const attribute = XML.attributes.item(j)
//       obj['@attributes'][attribute.nodeName] = attribute.nodeValue
//     }
//   } else if (XML.nodeType === 3) {
//     obj = XML.nodeValue
//   }

//   if (XML.hasChildNodes()) {
//     for (let i = 0; i < XML.childNodes.length; i += 1) {
//       const item = XML.childNodes.item(i)
//       const nodeName = item.nodeName
//       if (typeof (obj[nodeName]) === 'undefined') {
//         obj[nodeName] = XMLToJSON(item)
//       } else {
//         if (typeof (obj[nodeName].push) === 'undefined') {
//           const old = obj[nodeName]
//           obj[nodeName] = []
//           obj[nodeName].push(old)
//         }
//         obj[nodeName].push(XMLToJSON(item))
//       }
//     }
//   }

//   return 'qwe'
// }

function xmlToJson(xml) {

  // Create the return object
  var obj = {};

  // console.log(xml.nodeType, xml.nodeName );

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  }
  else if (xml.nodeType == 4) { // cdata section
    obj = xml.nodeValue
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof (obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].length) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        if (typeof (obj[nodeName]) === 'object') {
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
  }

  console.log(obj)
  return obj;
}

module.exports = xmlToJson
