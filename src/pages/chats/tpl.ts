const tpl = `
    <div class="sidebar">
      <a href="/profile" class="sidebar__btn">профиль</a>
      <input class="sidebar__search" type="text" />
      <div class="sidebar__chats">
        {{{ chatCard }}}
        {{{ chatCardActive }}}
      </div>
    </div>

    <div class="chat">
      <div class="chat__header">
        <div class="chat__name">
          <div class="chat__name_avatar"></div>
          <h3 class="chat__name_title">Илья</h3>
        </div>
        <button><img src={{ menuImage }} alt="menu-image" /></button>
      </div>
      <ul class="messages">
        <li class="messages__message messages__message_own">сообщение</li>
        <li class="messages__message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
        <li class="messages__message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
        <li class="messages__message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
        <li class="messages__message messages__message_own">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
        <li class="messages__message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
        <li class="messages__message messages__message_own">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
        <li class="messages__message messages__message_own">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
        <li class="messages__message messages__message_own">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
        <li class="messages__message messages__message_own">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
        <li class="messages__message messages__message_own">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatem quibusdam quae illo laboriosam tempore temporibus ex nisi quos quisquam.</li>
      </ul>

      {{{ chatFooter }}}
    </div>
`;

export default tpl;
