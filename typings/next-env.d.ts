/// <reference types="next" />
/// <reference types="next/types/global" />

// Typescript didn't give errors before, now it does, this fixes it
declare module "*.module.css" {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module "*.svg" {
  export = () => ReactNode
}
