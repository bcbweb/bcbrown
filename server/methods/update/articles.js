import MarkdownIt from 'markdown-it';
import highlightjs from 'highlight.js';
import Plugin from 'markdown-it-regexp';

import Articles from '../../../collections/articles';

Meteor.methods({
  saveArticle(article) {
    check(article, Object);

    const articleId = article._id;
    delete article._id; // eslint-disable-line no-param-reassign

    const markdown = new MarkdownIt({
      highlight: (str, lang) => {
        if (lang && highlightjs.getLanguage(lang)) {
          try {
            return highlightjs.highlight(lang, str).value;
          } catch (err) { console.err(err); } // eslint-disable-line no-console
        }

        try {
          return highlightjs.highlightAuto(str).value;
        } catch (err) { console.err(err); } // eslint-disable-line no-console

        return '';
      }
    });

    const codeHeaderPlugin = Plugin(
      /%\b(code-header)\b ([\w.]+)/,
      (match, utils) =>
        `<div class="code-header">${utils.escape(match[2])}</div>`
    );

    const parsedArticle = {
      ...article,
      parsedContent: markdown.use(codeHeaderPlugin).render(article.content)
    };

    Articles.upsert(articleId, { $set: parsedArticle });
  }
});
