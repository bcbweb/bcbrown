import React, { Component } from 'react';

import { formatLastUpdate } from '../../helpers/react';

class ListItemProject extends Component {
  hasTags() {
    const tags = this.props.tags;

    if (! tags || tags.length === 0 || tags[0] === null) return false;

    return true;
  }

  render() {
    const { month, day } = formatLastUpdate(this.props.date);
    const href = `/articles/${this.props.slug}`;

    return (
      <article className="article-list-item">
        <a
          href={href}
          className="article-list-item__date"
        >
          <time>
            <span className="article-list-item__date-month">{month}</span>
            <span className="article-list-item__date-day">{day}</span>
          </time>
        </a>
        <section className="article-list-item__content">
          <h1 itemProp="name" className="article-list-item__title">
            <a href={href}>
              {this.props.title}
            </a>
          </h1>

          <p className="article-list-item__standfirst">
            {this.props.standfirst}
          </p>
        </section>
        {this.hasTags() &&
          <ul className="article-list-item__tags tag-list">
            <li>Tags:&nbsp;</li>
            {this.props.tags.map((tag, tagIndex) => {
              const tagHref = `/tag/${tag}`;
              return <li key={tagIndex}>
                <a href={tagHref}>{tag}</a>
              </li>;
            })}
          </ul>
        }
      </article>
    );
  }
}

export default ListItemProject;
