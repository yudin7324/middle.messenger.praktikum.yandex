const tpl = `
    <ul class="nav__links">
      {{#each links}}
        <li class="nav__item">
          <a class="nav__link" href="{{linkPath}}">{{linkName}}</a>
        </li>
      {{/each}}
    </ul>
`;

export default tpl;
