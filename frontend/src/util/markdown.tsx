import { NavigateFunction } from 'react-router-dom';
import type { Components } from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { API } from '../api/api';

export function CleanMarkdown(origin: string): string {
  return origin;
}

export const rehypePlugins = [rehypeRaw];
export const remarkPlugins = [gfm];

export const ComponentsDefault = (navigate: NavigateFunction): Components => {
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
  };
};
