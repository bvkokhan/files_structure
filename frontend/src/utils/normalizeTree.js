const NODE_TYPE_FILE = 'file';
const NODE_TYPE_FOLDER = 'folder';

function isObject(value) {
  return Boolean(value) && typeof value === 'object';
}

function createNodeId(name, parentPath) {
  return parentPath ? `${parentPath}/${name}` : name;
}

function createFileNode(name, id) {
  return {
    id,
    name,
    type: NODE_TYPE_FILE,
  };
}

function buildChildren(childrenMap, parentId) {
  return Object.entries(childrenMap || {})
    .map(([childName, childNode]) => buildNode(childName, childNode, parentId))
    .filter(Boolean);
}

function createFolderNode(name, node, id) {
  return {
    id,
    name,
    type: NODE_TYPE_FOLDER,
    children: buildChildren(node.children, id),
  };
}

function buildNodeByType(name, node, id) {
  if (node.type === NODE_TYPE_FILE) {
    return createFileNode(name, id);
  }

  if (node.type === NODE_TYPE_FOLDER) {
    return createFolderNode(name, node, id);
  }

  return null;
}

function buildNode(name, node, parentPath = '') {
  if (!isObject(node)) {
    return null;
  }

  const id = createNodeId(name, parentPath);
  return buildNodeByType(name, node, id);
}

export function normalizeTree(rawTree) {
  if (!isObject(rawTree)) {
    return [];
  }

  return Object.entries(rawTree)
    .map(([name, node]) => buildNode(name, node))
    .filter(Boolean);
}
