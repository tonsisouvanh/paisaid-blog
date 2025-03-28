import React from 'react';
import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import Image from 'next/image';

type Props = {
  html?: string;
};

const HtmlParser = ({ html = '<p>Empty</p>' }: Props) => {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      // Check if domNode is an instance of Element and has attribs
      if (domNode instanceof Element && domNode.attribs) {
        const { name, children } = domNode;

        if (name === 'ul') {
          return <ul className="list-disc ml-5">{domToReact(children as DOMNode[], options)}</ul>;
        }

        if (name === 'ol') {
          return <ol className="list-decimal ml-5">{domToReact(children as DOMNode[], options)}</ol>;
        }

        if (name === 'p') {
          return <p className="mb-4">{domToReact(children as DOMNode[], options)}</p>;
        }

        if (name === 'h1') {
          return <h1 className="text-2xl font-bold mb-4">{domToReact(children as DOMNode[], options)}</h1>;
        }

        if (name === 'h2') {
          return <h2 className="text-xl font-semibold mb-3">{domToReact(children as DOMNode[], options)}</h2>;
        }

        if (name === 'h3') {
          return <h3 className="text-lg font-medium mb-2">{domToReact(children as DOMNode[], options)}</h3>;
        }

        if (name === 'h4') {
          return <h4 className="text-md font-medium mb-2">{domToReact(children as DOMNode[], options)}</h4>;
        }

        if (name === 'h5') {
          return <h5 className="text-sm font-medium mb-2">{domToReact(children as DOMNode[], options)}</h5>;
        }

        if (name === 'h6') {
          return <h6 className="text-xs font-medium mb-2">{domToReact(children as DOMNode[], options)}</h6>;
        }

        if (name === 'a') {
          return (
            <a href={domNode.attribs.href} className="text-primary hover:underline">
              {domToReact(children as DOMNode[], options)}
            </a>
          );
        }

        if (name === 'img') {
          return (
            // <img
            //   src={domNode.attribs.src}
            //   alt={domNode.attribs.alt || ''}
            //   className="my-4 mx-auto"
            //   style={{ maxWidth: '100%' }}
            // />
            <Image
              src={domNode.attribs.src}
              alt={domNode.attribs.alt || ''}
              width={500}
              height={500}
              className="my-4 mx-auto"
            />
          );
        }

        if (name === 'blockquote') {
          return (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              {domToReact(children as DOMNode[], options)}
            </blockquote>
          );
        }

        if (name === 'code') {
          return <code className="bg-gray-100 p-1 rounded">{domToReact(children as DOMNode[], options)}</code>;
        }

        if (name === 'pre') {
          return (
            <pre className="bg-gray-100 p-4 rounded overflow-auto">{domToReact(children as DOMNode[], options)}</pre>
          );
        }
      }
    },
  };

  return <div className="space-y-5">{parse(html, options)}</div>;
};

export default HtmlParser;
