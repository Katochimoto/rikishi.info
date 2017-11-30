var sha256 = require('sha256');

var REG_INLINE = /<((style|script)[^>]*)>(.+)<\/(?:style|script)>/g;
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
          hashList[type].push(sha256(content));
          finded = true;
        }
      }

      if (finded) {
        for (var type in hashList) {
          hashList[type] = hashList[type].map(cspInlineHash).join(' ');
        }

        pluginArgs.html = pluginArgs.html.replace(REG_META, function (meta) {
          return meta.replace(REG_CONTENT, function (text, content) {
            var addedScript = false;
            var addedStyle = false;

            content = content
              .split(';')
              .map(function (rule) {
                rule = rule.trim();
                if (rule.indexOf('script-src') === 0 && hashList.script) {
                  rule += ' ' + hashList.script;
                  addedScript = true;
                } else if (rule.indexOf('style-src') === 0 && hashList.style) {
                  rule += ' ' + hashList.style;
                  addedStyle = true;
                }
                return rule;
              })
              .join(';');

            // TODO сделать подстановку из default-src
            if (!addedScript && hashList.script) {
              content += ';script-src ' + hashList.script;
            }

            // TODO сделать подстановку из default-src
            if (!addedStyle && hashList.style) {
              content += ';style-src ' + hashList.style;
            }

            return ' content="' + content + '"';
          });
        });
      }
    });
  });
};

// <meta http-equiv="Content-Security-Policy" content="default-src 'self';script-src 'self' https://www.googletagmanager.com;img-src 'self' https://s.gravatar.com data:;font-src 'self' data:;object-src 'none';child-src 'none';frame-src 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content;base-uri https://rikishi.info">

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
