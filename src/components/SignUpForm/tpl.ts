const tpl = `
  <h1 class="sign-up__title">{{title}}</h1>

  {{{ emailTextField }}}
  {{{ loginTextField }}}
  {{{ firstNameTextField }}}
  {{{ secondNameTextField }}}
  {{{ phoneTextField }}}
  {{{ passwordTextField }}}
  {{{ confirmPasswordTextField }}}

  <div class="sign-up__buttons">
    {{{ link }}}
    {{{ button }}}
  </div>
`;

export default tpl;
