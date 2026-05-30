import { ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  project_link: string;
  youtube_link?: string;
  order_index: number;
}

interface ProjectCardProps {
  project: Project;
  rank?: number;
}

function getRankingStyle(rank?: number) {
  switch (rank) {
    case 1:
      return {
        badge: 'bg-yellow-500/20 border-yellow-500/60 text-yellow-300',
        border: 'border-yellow-500/60 hover:border-yellow-400',
        shadow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]',
        button: 'bg-yellow-500 hover:bg-yellow-400 text-gray-900',
        badgeText: '🏆 #1',
        rankLabel: 'Gold - Featured'
      };
    case 2:
      return {
        badge: 'bg-gray-300/10 border-gray-300/40 text-gray-300',
        border: 'border-gray-300/40 hover:border-gray-300/70',
        shadow: 'hover:shadow-[0_0_30px_rgba(209,213,219,0.25)]',
        button: 'bg-gray-300 hover:bg-gray-200 text-gray-900',
        badgeText: '🥈 #2',
        rankLabel: 'Silver'
      };
    case 3:
      return {
        badge: 'bg-amber-700/20 border-amber-700/60 text-amber-400',
        border: 'border-amber-700/60 hover:border-amber-600',
        shadow: 'hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]',
        button: 'bg-amber-700 hover:bg-amber-600 text-white',
        badgeText: '🥉 #3',
        rankLabel: 'Bronze'
      };
    default:
      return {
        badge: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
        border: 'border-yellow-500/40 hover:border-yellow-500',
        shadow: 'hover:shadow-[0_0_25px_rgba(234,179,8,0.25)]',
        button: 'bg-yellow-500 hover:bg-yellow-400 text-gray-900',
        badgeText: '',
        rankLabel: ''
      };
  }
}

function ProjectCard({ project, rank }: ProjectCardProps) {
  const style = getRankingStyle(rank);
  return (
    <div className={`relative bg-gray-800 border ${style.border} backdrop-blur-sm rounded-xl transition-all duration-300 ${style.shadow} hover:scale-105 overflow-hidden group flex flex-col`}>
      {rank && (
        <div className={`absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border ${style.badge} backdrop-blur-sm font-semibold text-sm`}>
          <span>{style.badgeText}</span>
        </div>
      )}
      <div className="aspect-video bg-gray-900 relative overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">Image placeholder</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-gray-400 leading-relaxed">{project.description}</p>
        </div>
        <a
          href={project.project_link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title}`}
          className={`w-full h-12 px-4 ${style.button} rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform-gpu hover:scale-105 mt-6`}
        >
          <ExternalLink size={16} />
          View
        </a>
      </div>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const defaultProjects: Project[] = [
  {
    id: '8',
    title: 'Build And Seek',
    description: '100% Solo Development - Placement system, round system, guns system, guns VFX, and more',
    image: 'https://tr.rbxcdn.com/180DAY-aa9e1f81d46fab026d26cc28bbababa4/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/112192910084846/Build-And-Seek',
    youtube_link: '',
    order_index: 1
  },
  {
    id: '2',
    title: 'Bliss City RP',
    description: '100% Solo Development - Full-stack architecture, advanced scripting systems, and performance optimization from foundation to deployment',
    image: 'https://tr.rbxcdn.com/180DAY-2b931a486fc53e41e42ab921e5267b11/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/112476889534187/Bliss-City-RP',
    youtube_link: '',
    order_index: 2
  },
  {
    id: '1',
    title: 'Grow a Lab',
    description: '80%+ Contribution - UI/UX design, robust database architecture, and comprehensive systems implementation',
    image: 'https://tr.rbxcdn.com/180DAY-06287739cbd0f1932ba09f8e25fc3100/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/96863560044075/LB-Grow-a-Lab',
    youtube_link: '',
    order_index: 3
  },
  {
    id: '3',
    title: 'Skylands Tycoon',
    description: '100% Solo Development - Complete framework architecture, refined mechanics, and polished gameplay systems',
    image: 'https://tr.rbxcdn.com/180DAY-e8cce3f4e30e62860bd573e555f8abb5/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/92054108165942/Skylands-Tycoon',
    youtube_link: '',
    order_index: 4
  },
  {
    id: '10',
    title: 'Imposter Mystery',
    description: '100% Solo Development - Gameplay loop, gun system, knife throw system, UI functionality, custom cutscenes, and more',
    image: 'https://tr.rbxcdn.com/180DAY-fd4239ad90547f394e6e6a93e2292d78/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/76769173141548/IMPOSTER-MYSTERY',
    youtube_link: '',
    order_index: 5
  },
  {
    id: '7',
    title: 'Brainrot Case Battles',
    description: '100% Solo Development - Built complete battle system, advanced RNG system, pets system, egg hatch system, and additional polished gameplay features',
    image: 'https://tr.rbxcdn.com/180DAY-3711182c57981d16d1886efae9350098/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/121757448540678/Brainrot-Case-Battles',
    youtube_link: '',
    order_index: 6
  },
  {
    id: '5',
    title: 'Plants Vs Anime Baddies',
    description: '100% Solo Development - Complete game design, all systems from concept through launch, polished visuals and mechanics',
    image: 'https://tr.rbxcdn.com/180DAY-28f65669caeee8a1aa97c9bb97f745e1/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/134696938350562/Plants-Vs-Anime-Baddies',
    youtube_link: '',
    order_index: 7
  },
  {
    id: '6',
    title: 'Raft for Brainrots',
    description: '100% Solo Development - Everything from brainrot spawning, custom water mechanics, raft system, raft mechanics, water physics, and more',
    image: 'https://tr.rbxcdn.com/180DAY-3f1134e675119c1fa9433c9e0a06ac3f/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/105368692401484/Raft-for-Brainrots',
    youtube_link: '',
    order_index: 8
  },
  {
    id: '4',
    title: 'Shoot Christmas Brainrots!',
    description: '80%+ Contribution - Complete system overhaul, enhanced combat mechanics, and expanded feature implementation',
    image: 'https://tr.rbxcdn.com/180DAY-8c2d2fab7e8cee24c72ed2d103c83280/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/124847429445425/Shoot-Christmas-Brainrots',
    youtube_link: '',
    order_index: 9
  },
  {
    id: '9',
    title: "Don't Let Brainrots Break The Wall!",
    description: '100% Solo Development - Brainrot spawning, gun system, wave system, and more',
    image: 'https://tr.rbxcdn.com/180DAY-6857d2c6572c7a908be6ef2b7aa9ad33/768/432/Image/Webp/noFilter',
    project_link: 'https://www.roblox.com/games/101926178513156/Dont-Let-Brainrots-Break-The-Wall',
    youtube_link: '',
    order_index: 10
  }
];

    setProjects(defaultProjects);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
              Featured Projects
            </span>
          </h2>
          <div className="text-center text-gray-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-yellow-400">
            Featured Projects
          </span>
        </h2>
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-sm md:text-base text-yellow-300 bg-gray-800 border border-yellow-500/40 rounded-lg px-5 py-4 backdrop-blur-sm text-center font-medium">
            Only projects where I contributed more than 80% of the work are listed here.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} rank={index + 1 <= 3 ? index + 1 : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
