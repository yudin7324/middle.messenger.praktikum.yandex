const tpl = `
    <button type="button" class="chats__attach-btn">
      <img src={{ attachImage }} />
    </button>
    <input class="chat__message-text" type="text" name="message" />
    <button type="submit" class="chats__send">
      <img src={{ enterImage }} />
    </button>
`;

export default tpl;
