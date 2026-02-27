import chevronRightIcon from '../assets/icons/chevron-right.svg';
import fileIcon from '../assets/icons/file.svg';
import folderClosedIcon from '../assets/icons/folder-closed.svg';
import folderOpenIcon from '../assets/icons/folder-open.svg';

export default function TreeNode({ node, expanded, onToggle }) {
  const isFolder = node.type === 'folder';
  const isOpen = isFolder ? expanded.has(node.id) : false;

  return (
    <li className="tree-node">
      {isFolder ? (
        <button type="button" className={`tree-toggle ${isOpen ? 'is-open' : ''}`} onClick={() => onToggle(node.id)}>
          <img src={chevronRightIcon} className={`tree-chevron ${isOpen ? 'is-open' : ''}`} alt="" aria-hidden="true" />
          <img
            src={isOpen ? folderOpenIcon : folderClosedIcon}
            className={`tree-icon ${isOpen ? 'folder-open' : 'folder-closed'}`}
            alt=""
            aria-hidden="true"
          />
          <span className="tree-name">{node.name}</span>
        </button>
      ) : (
        <span className="tree-file">
          <span className="tree-spacer" />
          <img src={fileIcon} className="tree-icon file-icon" alt="" aria-hidden="true" />
          <span className="tree-name">{node.name}</span>
        </span>
      )}

      {isFolder && isOpen && Array.isArray(node.children) && node.children.length > 0 ? (
        <ul className="tree-children">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} expanded={expanded} onToggle={onToggle} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
