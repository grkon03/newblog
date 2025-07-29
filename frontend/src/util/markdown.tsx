import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Components } from 'react-markdown';
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

export const remarkPlugins = [gfm, remarkMath];
export const rehypePlugins = [rehypeRaw, rehypeKatex];
export const ComponentsDefault = (
  referencedArticles: Map<string, ArticleInfo>,
  navigate: NavigateFunction,
  localImageURLs?: Map<string, string>
): Components => {
  return {
    p: _p(referencedArticles),
    h1: _h1,
    h2: _h2,
    h3: _h3,
    h4: _h4,
    h5: _h5,
    img: _img(localImageURLs),
    a: _a(navigate),
    code: _code,
  };
};

const _p: (referencedArticles: Map<string, ArticleInfo>) => Components['p'] =
  (referencedArticles) =>
  ({ children, ...props }) => {
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

    newNodes.push(<ArticleCards key="articlecards" articles={refedArticles} />);

    return <React.Fragment>{newNodes}</React.Fragment>;
  };

const _h1: Components['h1'] = ({ children, ...props }) => (
  <h3 className={styles.markdownHeading} {...props}>
    {' '}
    {children}{' '}
  </h3>
);

const _h2: Components['h2'] = ({ children, ...props }) => (
  <h4 className={styles.markdownHeading} {...props}>
    {' '}
    {children}{' '}
  </h4>
);

const _h3: Components['h3'] = ({ children, ...props }) => (
  <h5 className={styles.markdownHeading} {...props}>
    {' '}
    {children}{' '}
  </h5>
);

const _h4: Components['h4'] = ({ children, ...props }) => (
  <h6 className={styles.markdownHeading} {...props}>
    {' '}
    {children}{' '}
  </h6>
);

const _h5: Components['h5'] = ({ children, ...props }) => (
  <strong className={styles.markdownHeading} {...props}>
    {' '}
    {children}{' '}
  </strong>
);

const _img: (localImageURLs?: Map<string, string>) => Components['img'] =
  (localImageURLs) =>
  ({ src, alt, ...props }) => {
    if (src === undefined) return <img alt={alt} {...props} />;

    // for local images
    if (localImageURLs !== undefined) {
      const localURL = localImageURLs.get(src);
      if (localURL !== undefined) {
        return <img src={localURL} alt={alt} {...props} />;
      }
    }

    // for public images
    const isFromAPI = src.startsWith('/');
    if (!isFromAPI) {
      return <img src={src} alt={alt} {...props} />;
    } else {
      return <img src={API.EndpointURL(src)} alt={alt} {...props} />;
    }
  };

const _a: (navigate: NavigateFunction) => Components['a'] =
  (navigate) =>
  ({ href, children, ...props }) => {
    const isInternal = href !== undefined && href.startsWith('/');
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigate(href as string);
    };

    return (
      <a href={href} {...props} onClick={isInternal ? handleClick : undefined}>
        {children}
      </a>
    );
  };

const _code: Components['code'] = ({
  node,
  style,
  className,
  children,
  ref,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '');
  const codes = String(children ?? '').replace(/\n$/, '');
  return match ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {codes}
    </SyntaxHighlighter>
  ) : (
    <code className={`${styles.exceptedCode} ${className}`} {...props}>
      {children}
    </code>
  );
};
