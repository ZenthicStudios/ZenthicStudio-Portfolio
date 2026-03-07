function UnofficialProjects() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="text-yellow-400">
            Other Projects
          </span>
        </h2>

        <div className="flex items-center justify-center w-full">
          <div className="bg-gray-800 border border-yellow-500/40 rounded-xl px-12 py-8">
            <span className="text-gray-400 text-base font-medium">No additional projects at this time</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UnofficialProjects;