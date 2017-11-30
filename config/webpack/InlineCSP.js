var crypto = require('crypto');

var REG_INLINE = /<((style|script)[^>]*)>([\s\S]+?)<\/(?:style|script)>/mg;
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

  compiler.plugin('compilation', function (compilation) {
    wirePluginEvent('html-webpack-plugin-after-html-processing', compilation, function (pluginArgs) {
      var hashList = {
        style: [],
        script: []
      };

      var finded = false;
      var item;

      while ((item = REG_INLINE.exec(pluginArgs.html)) !== null) {
        var params = item[1];
        var type = item[2];
        var content = item[3];

        if (
          hashList.hasOwnProperty(type) &&
          params.indexOf(' src=') === -1 &&
          content && content.trim().length > 0
        ) {
          var shasum = crypto.createHash('sha256');
          shasum.update(content, 'utf-8');

          hashList[type].push("'sha256-" + shasum.digest('base64') + "'");
          finded = true;
        }
      }

      if (finded) {
        pluginArgs.html = pluginArgs.html.replace(REG_META, function (meta) {
          return meta.replace(REG_CONTENT, function (text, content) {
            var rules = cspToRules(content);

            if (hashList.script.length) {
              rules['script-src'] = (rules['script-src'] || rules['default-src'] || [])
                .concat(hashList.script);
            }

            if (hashList.style.length) {
              rules['style-src'] = (rules['style-src'] || rules['default-src'] || [])
                .concat(hashList.style);
            }

            return ' content="' + rulesToCsp(rules) + '"';
          });
        });
      }
    });
  });
};

module.exports = InlineCSP;

function wirePluginEvent (event, compilation, fn) {
  compilation.plugin(event, function (pluginArgs, callback) {
    try {
      fn(pluginArgs);
      callback(null, pluginArgs);
    } catch (err) {
      callback(err);
    }
  });
}

function cspInlineHash (hash) {
  return "'sha256-" + hash + "'"
}

function cspToRules (content) {
  return content.split(';').reduce(function (data, rule) {
    rule = rule.trim().split(/\s+/);
    data[ rule.shift().toLowerCase() ] = rule;
    return data;
  }, {});
}

function rulesToCsp (rules) {
  return Object.keys(rules).map(function (name) {
    return name + ' ' + rules[name].join(' ');
  }).join('; ');
}
