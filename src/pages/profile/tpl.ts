const tpl = `
  <a class="back-btn" href="/messenger">
    <img class="back-btn__image" src="{{ backIcon }}" alt="back-image" />
  </a>
  <div class="profile__header">
    {{{ avatar }}}
    <div>
      {{{ logOutButton }}}
    </div>
  </div>
  {{{ form }}}
`;

export default tpl;
