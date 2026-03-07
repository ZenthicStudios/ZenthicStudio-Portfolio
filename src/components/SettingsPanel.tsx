import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Palette, Lock } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

interface SettingsPanelProps {
  onClose: () => void;
}

function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = 'zen7897';

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('zenthic_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchProjects();
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('zenthic_admin_auth', 'true');
      fetchProjects();
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      if (data) {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = (id: string, field: keyof Project, value: string | number) => {
    const updated = projects.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setProjects(updated);
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== id));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const addProject = async () => {
    const maxOrder = Math.max(...projects.map(p => p.order_index), 0);
    const newProject = {
      title: 'New Project',
      description: 'Project description',
      image: '',
      project_link: '',
      youtube_link: '',
      order_index: maxOrder + 1
    };

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setProjects([...projects, data]);
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project');
    }
  };

  const saveProjects = async () => {
    setLoading(true);
    try {
      for (const project of projects) {
        const { error } = await supabase
          .from('projects')
          .update({
            title: project.title,
            description: project.description,
            image: project.image,
            project_link: project.project_link,
            youtube_link: project.youtube_link,
            order_index: project.order_index
          })
          .eq('id', project.id);

        if (error) throw error;
      }

      alert('Changes saved successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error saving projects:', error);
      alert('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500/50 rounded-2xl max-w-md w-full p-8 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600/20 rounded-full mb-4">
              <Lock className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Access Required</h2>
            <p className="text-gray-400">Enter password to access settings</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 bg-gray-900/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-400"
              placeholder="Enter password"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-lg transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)]"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.3)]">
        <div className="flex items-center justify-between p-6 border-b border-yellow-600/30">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Palette className="text-yellow-400" />
            Settings Panel
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-yellow-600/20 rounded-lg transition-colors"
          >
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Loading...</div>
          ) : (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Projects</h3>
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/50 text-yellow-400 rounded-lg transition-all duration-300"
                >
                  <Plus size={16} />
                  Add Project
                </button>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-800/50 border border-yellow-600/20 rounded-lg p-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded text-white focus:outline-none focus:border-yellow-400"
                          placeholder="Project Title"
                        />
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 text-red-400 rounded transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded text-white focus:outline-none focus:border-yellow-400"
                        placeholder="Description"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={project.image || ''}
                          onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                          className="px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded text-white focus:outline-none focus:border-yellow-400 text-sm"
                          placeholder="Image URL"
                        />
                        <input
                          type="text"
                          value={project.project_link || ''}
                          onChange={(e) => updateProject(project.id, 'project_link', e.target.value)}
                          className="px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded text-white focus:outline-none focus:border-yellow-400 text-sm"
                          placeholder="Project Link"
                        />
                        <input
                          type="text"
                          value={project.youtube_link || ''}
                          onChange={(e) => updateProject(project.id, 'youtube_link', e.target.value)}
                          className="px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded text-white focus:outline-none focus:border-yellow-400 text-sm"
                          placeholder="YouTube Link"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-yellow-600/20">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveProjects}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-lg transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50"
            >
              <Save size={16} />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
