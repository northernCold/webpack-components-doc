const MarkdownIt = require('markdown-it');
const {
  stripScript,
  stripTemplate,
  genInlineComponentText
} = require('./util');
const overWriteFenceRule = require('./fence');

module.exports = function (source)  {
  md = new MarkdownIt()
    .use(require('markdown-it-container'), 'demo' , {
      validate: function (params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },
      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^demo\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : '';
          const content = tokens[idx + 1].type === 'fence'
            ? tokens[idx + 1].content
            : '';
          return `<demo-block>
          ${description ? `<div>${md.render(description)}</div>` : ''}
          <!--element-demo: ${content}:element-demo-->
          `;
        } else {
          return `</demo-block>`
        }
      }
    });;
  overWriteFenceRule(md);
  let content = md.render(source);
  
  const startTag = '<!--element-demo:';
  const startTagLen = startTag.length;
  const endTag = ':element-demo-->';
  const endTagLen = endTag.length;
  
  let componentsString = '';
  let id = 0;
  let output = [];
  let start = 0;
  
  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));
  
    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    let demoComponentContent = genInlineComponentText(html, script);
    const demoComponentName = `element-demo${id}`;
    output.push(`<template slot="source"><${demoComponentName} /></template>`);
    componentsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;
  
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }
  
  let pageScript = '';
  if (componentsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componentsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) {
    start = content.indexOf('</script>') + '</script'.length;
    pageScript = content.slice(0, start);
  }
  
  output.push(content.slice(start));
  return `
  <template>
    <section class="content element-doc">
      ${output.join('')}
    </section>
  </template>
  ${pageScript}
  `;
}