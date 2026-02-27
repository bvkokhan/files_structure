function buildNode(name, node, parentPath = '') {
  if (!node || typeof node !== 'object') {
    return null;
  }

  const id = parentPath ? `${parentPath}/${name}` : name;

  if (node.type === 'file') {
    return {
      id,
      name,
      type: 'file',
    };
  }

  if (node.type === 'folder') {
    const entries = Object.entries(node.children || {});
    const children = entries
      .map(([childName, childNode]) => buildNode(childName, childNode, id))
      .filter(Boolean);

    return {
      id,
      name,
      type: 'folder',
      children,
    };
  }

  return null;
}

export function normalizeTree(rawTree) {
  if (!rawTree || typeof rawTree !== 'object') {
    return [];
  }

  return Object.entries(rawTree)
    .map(([name, node]) => buildNode(name, node))
    .filter(Boolean);
}
