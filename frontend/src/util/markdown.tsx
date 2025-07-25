import { RefObject } from 'react';
import { NavigateFunction } from 'react-router-dom';
import type { Components } from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { API } from '../api/api';
import { ArticleInfo } from '../api/article';
import ArticleCards from '../base-component/articlecards';

export function extractArticleIDs(text: string): string[] {
  const regex = /\/article\/(\d+)/g;
  return Array.from(text.matchAll(regex)).map((m) => m[1]);
}

export function CleanMarkdown(origin: string): string {
  return origin;
}

export const rehypePlugins = [rehypeRaw];
export const remarkPlugins = [gfm];

export const ComponentsDefault = (
  navigate: NavigateFunction,
  refReferencedArticles: RefObject<Map<string, ArticleInfo>>
): Components => {
  return {
    h1: ({ children, ...props }) => <h3 {...props}> {children} </h3>,
    h2: ({ children, ...props }) => <h4 {...props}> {children} </h4>,
    h3: ({ children, ...props }) => <h5 {...props}> {children} </h5>,
    h4: ({ children, ...props }) => <h6 {...props}> {children} </h6>,
    h5: ({ children, ...props }) => <strong {...props}>{children}</strong>,
    img: ({ src, alt, ...props }) => {
      const isFromAPI = src !== undefined && src.startsWith('/');
      if (!isFromAPI) {
        return <img src={src} alt={alt} {...props} />;
      } else {
        return <img src={API.EndpointURL(src)} alt={alt} {...props} />;
      }
    },
    a: ({ href, children, ...props }) => {
      const isArticle = href !== undefined && href.startsWith('/article');
      const isInternal = href !== undefined && href.startsWith('/');
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(href as string);
      };
      if (isArticle) {
        const id = href.substring(9);
        const refedArticle = refReferencedArticles.current.get(id);
        if (refedArticle !== undefined) {
          return <ArticleCards articles={[refedArticle]} />;
        }
      }

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
  };
};
