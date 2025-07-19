import type { ClassAttributes, HTMLAttributes } from 'react';
import type { ExtraProps } from 'react-markdown';
import dedent from 'ts-dedent';

export function CleanMarkdown(origin: string): string {
  return dedent(origin);
}

export const HeaderShift2 = {
  h1: ({
    children,
  }: ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => <h3> {children} </h3>,
  h2: ({
    children,
  }: ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => <h4> {children} </h4>,
  h3: ({
    children,
  }: ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => <h5> {children} </h5>,
  h4: ({
    children,
  }: ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => <h6> {children} </h6>,

  h5: ({
    children,
  }: ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => <strong>{children}</strong>,
};
