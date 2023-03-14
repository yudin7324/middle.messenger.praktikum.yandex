const tpl = `
  {{#each usersList}}
    <div class="users-list__item" id={{ id }}>
      {{ login }}
    </div>
  {{/each}}
`;

export default tpl;
