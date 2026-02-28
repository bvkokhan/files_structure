import './App.css';
import './styles/tree.css';
import FileTree from './components/FileTree';
import { useFileTree } from './hooks/useFileTree';

function App() {
  const {
    tree,
    loading,
    error,
    expanded,
    toggleFolder
  } = useFileTree();

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>File Structure Viewer</h1>
      </header>
      {loading ? <p>Loading tree...</p> : null}
      {error ? <p className="app-error">{error}</p> : null}

      {!loading && !error ? (
        <FileTree nodes={tree} expanded={expanded} onToggle={toggleFolder} />
      ) : null}
    </main>
  );
}

export default App;
