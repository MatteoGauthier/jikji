import { JSXElementConstructor, ReactNode } from 'react';

export interface ChildrenProps {
  children: ReactNode;
}

function getComponentSignature(component: unknown): string {
  if (typeof component === 'string') {
    return component
  }
  else if (typeof component === 'function' || typeof component === 'symbol') {
    return component.toString()
  }
  else if (component && typeof component === 'object' &&
    'render' in component) {
    //forward ref component
    return getComponentSignature(component.render);
  }

  return "";
}

export function isInstanceOfComponent(
  elementType: string | JSXElementConstructor<unknown>,
  component: unknown): boolean {
  if (process.env.NODE_ENV !== "development") {
    return elementType == component;
  }

  return getComponentSignature(elementType) === getComponentSignature(component)
}