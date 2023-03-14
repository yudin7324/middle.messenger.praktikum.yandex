const tpl = `
  {{#each messages}}
    {{#if this.own}}
      <li class="messages__message">
        <p class="messages__message_text">
          {{content}}
        </p>
        <p class="messages__message_time">
          {{time}}
        </p>
      </li>
    {{else}}
      <li class="messages__message messages__message_own">
        <p class="messages__message_text">
          {{content}}
        </p>
        <p class="messages__message_time">
          {{time}}
        </p>
      </li>
    {{/if}}
  {{/each}}
`;

export default tpl;
