import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArticleInfo, GetArticle } from '../api/article';
import {
  extractArticleIDs,
  rehypePlugins,
  remarkPlugins,
  ComponentsDefault,
} from '../util/markdown';

type Props = {
  children?: string;
  localImageURLs?: Map<string, string>;
};

const MyMarkdown: React.FC<Props> = ({ children, localImageURLs }) => {
  const navigate = useNavigate();
  const [referencedArticles, setReferencedArticles] = useState<
    Map<string, ArticleInfo>
  >(new Map<string, ArticleInfo>());

  const CD = ComponentsDefault(referencedArticles, navigate, localImageURLs);

  useEffect(() => {
    if (children !== undefined) {
      setReferencedArticles(new Map<string, ArticleInfo>());
      extractArticleIDs(children).forEach((refedID) => {
        GetArticle(refedID).then((res) => {
          setReferencedArticles((prev) => {
            const newMap = new Map(prev);
            newMap.set(refedID, res);
            return newMap;
          });
        });
      });
    }
  }, [children]);

  return (
    <ReactMarkdown
      components={CD}
      rehypePlugins={rehypePlugins}
      remarkPlugins={remarkPlugins}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MyMarkdown;
