function structureNode(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null;
  return { nodeName, attributes, children };
}

function render(node) {
  if (node.split) {
    return document.createTextNode(node);
  }

  let domEl = document.createElement(node.name);

  let attributes = node.attributes || {};
  Object.keys(attributes).forEach((k) => {
    domEl.setAttribute(k, attributes[k]);
  });

  (node.children || []).forEach((children) =>
    domEl.appendChild(render(children))
  );

  return domEl;
}

let virtualDom = <div className="test-div">hello world!</div>;

let dom = render(virtualDom);

document.body.appendChild(dom);
