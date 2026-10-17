"use client";

import React, { useState } from "react";
import { ProjectCaseStudy } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/motion/Reveal";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: ProjectCaseStudy[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Website Development",
    "Performance Marketing",
    "SEO",
    "Branding",
  ];

  const filtered =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#E5E4E0]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657FF]",
              selectedCategory === cat
                ? "bg-[#7657FF] text-white shadow-sm font-semibold"
                : "bg-white text-[#686B73] hover:text-[#17181C] hover:bg-[#E5E4E0]/50 border border-[#E5E4E0]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, idx) => (
          <Reveal key={project.slug} delay={idx * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-[#686B73] font-mono text-sm">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};
