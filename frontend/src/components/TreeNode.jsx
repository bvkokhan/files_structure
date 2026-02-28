import chevronRightIcon from '../assets/icons/chevron-right.svg';
import fileIcon from '../assets/icons/file.svg';
import folderClosedIcon from '../assets/icons/folder-closed.svg';
import folderOpenIcon from '../assets/icons/folder-open.svg';

function FolderNodeLabel({ id, name, isOpen, onToggle }) {
  return (
    <button type="button" className={`tree-toggle ${isOpen ? 'is-open' : ''}`} onClick={() => onToggle(id)}>
      <img src={chevronRightIcon} className={`tree-chevron ${isOpen ? 'is-open' : ''}`} alt="" aria-hidden="true" />
      <img
        src={isOpen ? folderOpenIcon : folderClosedIcon}
        className={`tree-icon ${isOpen ? 'folder-open' : 'folder-closed'}`}
        alt=""
        aria-hidden="true"
      />
      <span className="tree-name">{name}</span>
    </button>
  );
}

function FileNodeLabel({ name }) {
  return (
    <span className="tree-file">
      <span className="tree-spacer" />
      <img src={fileIcon} className="tree-icon file-icon" alt="" aria-hidden="true" />
      <span className="tree-name">{name}</span>
    </span>
  );
}

function TreeChildren({ nodes, expanded, onToggle }) {
  return (
    <ul className="tree-children">
      {nodes.map((child) => (
        <TreeNode key={child.id} node={child} expanded={expanded} onToggle={onToggle} />
      ))}
    </ul>
  );
}

export default function TreeNode({ node, expanded, onToggle }) {
  const isFolder = node.type === 'folder';
  const isOpen = isFolder ? expanded.has(node.id) : false;
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;

  return (
    <li className="tree-node">
      {isFolder ? (
        <FolderNodeLabel id={node.id} name={node.name} isOpen={isOpen} onToggle={onToggle} />
      ) : (
        <FileNodeLabel name={node.name} />
      )}

      {isFolder && isOpen && hasChildren ? (
        <TreeChildren nodes={node.children} expanded={expanded} onToggle={onToggle} />
      ) : null}
    </li>
  );
}
