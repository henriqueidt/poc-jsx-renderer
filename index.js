function structureNode(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null;
  return { nodeName, attributes, children };
}

function render(node) {
  if (node.split) {
    return document.createTextNode(node);
  }

  let domEl = document.createElement(node.nodeName);

  let attributes = node.attributes || {};
  Object.keys(attributes).forEach((k) => {
    domEl.setAttribute(k, attributes[k]);
  });

  (node.children || []).forEach((children) =>
    domEl.appendChild(render(children))
  );

  return domEl;
}

const list = [
  {
    name: 'John',
    age: 22
  },
  {
    name: 'Arya',
    age: 18
  },
  {
    name: 'Sansa',
    age: 24
  },
]

let virtualDom = 
<div className="test-div">
  <ul>
    {list.map(item => (
      <li>
        <div>{item.name}</div>
        <div>{item.age}</div>
      </li>
    ))}
  </ul>
</div>;

let dom = render(virtualDom);

document.body.appendChild(dom);
