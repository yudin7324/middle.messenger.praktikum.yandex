const tpl = `
    {{#if currentChat}}
        <div class="chat__header">
          <div class="chat__name">
            <div class="chat__name_avatar">
              {{#if avatar}}
                <img src="{{avatar}}" alt="avatar" />
              {{/if}}
            </div>
            <h3 class="chat__name_title">{{ title }}</h3>
          </div>
          {{{ menuButton }}}
          {{{ chatMenu }}}
          {{{ addUserModal }}}
          {{{ deleteUserModal }}}
        </div>
        {{{ messages }}}
        {{{ chatFooter }}}
    {{else}}
      <div class="chat__empty">
        Выберите чат из списка или создайте новый
      </div>
    {{/if}}    
`;

export default tpl;
