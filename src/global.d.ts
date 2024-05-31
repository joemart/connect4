//To remove a typescript 'cannot find module' error
declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }