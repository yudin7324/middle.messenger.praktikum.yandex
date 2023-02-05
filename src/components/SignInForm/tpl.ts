const tpl = `
  <h1 class="sign-in__title">{{title}}</h1>

  {{{ emailTextField }}}
  {{{ loginTextField }}}
  {{{ firstNameTextField }}}
  {{{ secondNameTextField }}}
  {{{ phoneTextField }}}
  {{{ passwordTextField }}}
  {{{ confirmPasswordTextField }}}

  <div class="sign-in__buttons">
    {{{ link }}}
    {{{ button }}}
  </div>
`;

export default tpl;
