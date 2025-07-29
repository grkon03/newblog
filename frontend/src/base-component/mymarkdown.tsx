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
  article?: ArticleInfo;
};

const MyMarkdown: React.FC<Props> = ({ children, article }) => {
  const navigate = useNavigate();
  const [referencedArticles, setReferencedArticles] = useState<
    Map<string, ArticleInfo>
  >(new Map<string, ArticleInfo>());

  const CD = ComponentsDefault(referencedArticles, navigate);

  useEffect(() => {
    if (article !== undefined) {
      setReferencedArticles(new Map<string, ArticleInfo>());
      extractArticleIDs(article.content).forEach((refedID) => {
        GetArticle(refedID).then((res) => {
          setReferencedArticles((prev) => {
            const newMap = new Map(prev);
            newMap.set(refedID, res);
            return newMap;
          });
        });
      });
    }
  }, [article]);

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
