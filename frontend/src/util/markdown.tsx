import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import type { Components } from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { API } from '../api/api';
import { ArticleInfo } from '../api/article';
import ArticleCards from '../base-component/articlecards';
import styles from './markdown.module.css';

export function extractArticleIDs(text: string): string[] {
  const regex = /\/article\/(\d+)/g;
  return Array.from(text.matchAll(regex)).map((m) => m[1]);
}

export function CleanMarkdown(origin: string): string {
  return origin;
}

export const remarkPlugins = [gfm, remarkMath];
export const rehypePlugins = [rehypeRaw, rehypeKatex];

export const ComponentsDefault = (
  navigate: NavigateFunction,
  referencedArticles: Map<string, ArticleInfo>
): Components => {
  return {
    p: ({ children, ...props }) => {
      const newNodes: React.JSX.Element[] = [];
      const childarray = React.Children.toArray(children);
      var refedArticles: ArticleInfo[] = [];

      // search /aritcle links
      childarray.forEach((node) => {
        if (!React.isValidElement(node)) return;
        const href = (
          node.props as {
            href?: string;
          }
        ).href;
        if (href === undefined) return;

        if (href.startsWith('/article/')) {
          const id = href.substring(9);
          const refedArticle = referencedArticles.get(id);
          if (refedArticle !== undefined) {
            refedArticles.push(refedArticle);
          }
        }
      });

      // if there is a only child of <a></a>, the <p></p> element will not be pushed
      if (childarray.length !== 1 || refedArticles.length !== 1) {
        newNodes.push(
          <p {...props} key="paragraph">
            {children}
          </p>
        );
      }

      newNodes.push(
        <ArticleCards key="articlecards" articles={refedArticles} />
      );

      return <React.Fragment>{newNodes}</React.Fragment>;
    },
    h1: ({ children, ...props }) => (
      <h3 className={styles.markdownHeading} {...props}>
        {' '}
        {children}{' '}
      </h3>
    ),
    h2: ({ children, ...props }) => (
      <h4 className={styles.markdownHeading} {...props}>
        {' '}
        {children}{' '}
      </h4>
    ),
    h3: ({ children, ...props }) => (
      <h5 className={styles.markdownHeading} {...props}>
        {' '}
        {children}{' '}
      </h5>
    ),
    h4: ({ children, ...props }) => (
      <h6 className={styles.markdownHeading} {...props}>
        {' '}
        {children}{' '}
      </h6>
    ),
    h5: ({ children, ...props }) => (
      <strong className={styles.markdownHeading} {...props}>
        {children}
      </strong>
    ),
    img: ({ src, alt, ...props }) => {
      const isFromAPI = src !== undefined && src.startsWith('/');
      if (!isFromAPI) {
        return <img src={src} alt={alt} {...props} />;
      } else {
        return <img src={API.EndpointURL(src)} alt={alt} {...props} />;
      }
    },
    a: ({ href, children, ...props }) => {
      const isInternal = href !== undefined && href.startsWith('/');
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(href as string);
      };

      return (
        <a
          href={href}
          {...props}
          onClick={isInternal ? handleClick : undefined}
        >
          {children}
        </a>
      );
    },
    code: ({ node, style, className, children, ref, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={`${styles.exceptedCode} ${className}`} {...props}>
          {children}
        </code>
      );
    },
  };
};
