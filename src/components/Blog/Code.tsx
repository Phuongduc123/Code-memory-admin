import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-uri';
import 'prismjs/components/prism-solidity';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typoscript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-ignore';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-mongodb';
import 'prismjs/components/prism-mongodb';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-aspnet';
import 'prismjs/components/prism-dot';
import 'prismjs/components/prism-django';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-ejs';

import 'prismjs/themes/prism-tomorrow.css';

export const Code = ({ code, language }: { code: string; language: string }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);
  return (
    <div className="code">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
