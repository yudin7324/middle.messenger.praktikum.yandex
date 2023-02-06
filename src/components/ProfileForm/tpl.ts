const tpl = `
    <div class="profile__header">
      <div class="upload">
        <img class="upload__image" id="upload-preview" alt="upload-image" />
        <label class="upload__label">
          <input
            name="avatar"
            class="upload__input"
            type="file"
            accept="image/*"
          />
        </label>
      </div>
      <div>
        {{{ logOutButton }}}
      </div>
    </div>
    {{{ emailTextField }}}
    {{{ loginTextField }}}
    {{{ firstNameTextField }}}
    {{{ secondNameTextField }}}
    {{{ displayNameField }}}
    {{{ phoneTextField }}}
    <div class="profile__footer">
      {{{ saveButton }}}
      {{{ changePasswordLink }}}
    </div>
`;

export default tpl;
