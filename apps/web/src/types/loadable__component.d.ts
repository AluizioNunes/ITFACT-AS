declare module '@loadable/component' {
  import * as React from 'react'
  export interface LoadableOptions { fallback?: React.ReactNode }
  export type LoadableComponent = React.ComponentType<any> & { preload?: () => Promise<void> }
  export default function loadable(
    loader: () => Promise<{ default: React.ComponentType<any> }>,
    options?: LoadableOptions,
  ): LoadableComponent
}
