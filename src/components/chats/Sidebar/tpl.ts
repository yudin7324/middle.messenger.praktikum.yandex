const tpl = `
    <div class="sidebar__top">
      {{{ addChat }}}
      {{{ profile}}}
      {{{ addChatModal }}}
    </div>
    {{{ search }}}

    <div class="sidebar__chats">
      {{#each chats}}
        <div class="chat-card" id={{ id }}>
            <div class="chat-card__avatar">
              {{#if avatar}}
                <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="avatar" />
              {{/if}}
            </div>
            <div class="chat-card__top">
              <div class="chat-card__name">{{ title }}</div>
              <div class="chat-card__time">{{ time }}</div>
            </div>
            <div class="chat-card__bottom">
              <div class="chat-card__last-message">{{ last_message }}</div>

              {{#if unread_count}}
                 <div class="chat-card__unread-count">{{ unread_count }}</div>
              {{/if}}
             
          </div>
        </div>
      {{/each}}
    </div>
`;

export default tpl;
