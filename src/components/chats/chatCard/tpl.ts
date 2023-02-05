const tpl = `
    <div class="chat-card__avatar"></div>
    <div class="chat-card__top">
      <div class="chat-card__name">{{ name }}</div>
      <div class="chat-card__time">{{ time }}</div>
    </div>
    <div class="chat-card__bottom">
      <div class="chat-card__last-message">{{ lastMessage }}</div>
      <div class="chat-card__unread-count">{{ countMessage }}</div>
    </div>
`;

export default tpl;
