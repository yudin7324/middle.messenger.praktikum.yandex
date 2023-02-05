const tpl = `
  <div class="error__content">
    <h1 class="error__title">{{title}}</h1>
    <p class="error__subtitle">{{subtitle}}</p>

    {{{ link }}}
  </div>
`;
export default tpl;

// <div class="error">
//   <div class="error__content">
//     <h1 class="error__title">{{title}}</h1>
//     <p class="error__subtitle">{{subtitle}}</p>
//     <a class="error__link" href="/chat">{{btnLabel}}</a>
//   </div>
// </div>
