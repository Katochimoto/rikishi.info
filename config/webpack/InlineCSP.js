var crypto = require('crypto');

var REG_INLINE = /<((style|script)[^>]*)>([\s\S]*?)<\/(?:style|script)>/mg;
var REG_META = /<meta [^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/i;
var REG_CONTENT = / content=["'](.*)["']/;

function InlineCSP (options) {
  this.options = options || {};
}

InlineCSP.prototype.apply = function (compiler) {
  var options = this.options;
  if (options.disable) {
    return;
  }

  compiler.hooks.compilation.tap('InlineCSP', function (compilation) {
    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(
      'InlineCSP',
      function (data) {
        var hashList = {
          style: [],
          script: []
        };

        var finded = false;
        var item;

        while ((item = REG_INLINE.exec(data.html)) !== null) {
          var params = item[1];
          var type = item[2];
          var content = item[3];

          if (
            hashList.hasOwnProperty(type) &&
            params.indexOf(' src=') === -1 &&
            content && content.trim().length > 0
          ) {
            var hash = cspInlineHash(content);
            hashList[type][hash] = true;
            finded = true;
          }
        }

        if (finded) {
          if (REG_META.test(data.html)) {
            data.html = data.html.replace(REG_META, function (meta) {
              return meta.replace(REG_CONTENT, function (text, content) {
                return replaceCspContent(hashList, text, content);
              });
            });
          } else {
            data.html = data.html.replace('<head>', function (meta) {
              return '<head><meta http-equiv="Content-Security-Policy" ' + replaceCspContent(hashList) + '>';
            });
          }
        }
      }
    );
  });
};

module.exports = InlineCSP;

function replaceCspContent (hashList, text, content) {
  var rules = cspToRules(String(content || ''));
  var script = Object.keys(hashList.script);
  var style = Object.keys(hashList.style);

  if (script.length) {
    rules['script-src'] = (rules['script-src'] || rules['default-src'] || [])
      .concat(script);
  }

  if (style.length) {
    rules['style-src'] = (rules['style-src'] || rules['default-src'] || [])
      .concat(style);
  }

  return ' content="' + rulesToCsp(rules) + '"';
}

function cspInlineHash (content) {
  var shasum = crypto.createHash('sha256');
  shasum.update(content, 'utf-8');
  return "'sha256-" + shasum.digest('base64') + "'";
}

function cspToRules (content) {
  return content.split(';').reduce(function (data, rule) {
    rule = rule.trim();
    if (rule) {
      rule = rule.split(/\s+/);
      data[ rule.shift().toLowerCase() ] = rule;
    }
    return data;
  }, {});
}

function rulesToCsp (rules) {
  return Object.keys(rules).map(function (name) {
    return name + ' ' + rules[name].join(' ');
  }).join('; ');
}
