import TreeNode from './TreeNode';

export default function FileTree({ nodes, expanded, onToggle }) {
  if (!nodes || nodes.length === 0) {
    return <p className="tree-empty">No nodes yet. Implement normalizeTree to map API data.</p>;
  }

  return (
    <ul className="tree-root">
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} expanded={expanded} onToggle={onToggle} />
      ))}
    </ul>
  );
}
