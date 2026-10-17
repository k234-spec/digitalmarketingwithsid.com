import React from "react";
import Link from "next/link";
import { ProjectCaseStudy } from "@/data/projects";
import { ArrowRight, Clock } from "lucide-react";

interface ProjectCardProps {
  project: ProjectCaseStudy;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="group h-full rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-8 flex flex-col justify-between hover:border-[#7657FF]/40 hover:shadow-lg transition-all duration-300">
      <div>
        {/* Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#7657FF]/10 text-[#7657FF]">
            {project.category}
          </span>
          <span className="font-mono text-xs text-[#686B73] flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {project.timeframe}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-[#17181C] mb-2 group-hover:text-[#7657FF] transition-colors leading-snug">
          <Link href={`/work/${project.slug}`}>
            {project.title}
          </Link>
        </h3>

        {/* Client & Industry */}
        <div className="text-xs font-mono text-[#686B73] mb-4">
          <span>{project.clientType}</span>
        </div>

        <p className="text-sm text-[#686B73] leading-relaxed mb-6">
          {project.challenge}
        </p>

        {/* Primary Outcome Stat */}
        {project.outcomes && project.outcomes[0] && (
          <div className="rounded-xl bg-[#F7F6F2] p-4 border border-[#E5E4E0] mb-6">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-[#686B73] font-mono">
                {project.outcomes[0].label}
              </span>
              <span className="font-display font-bold text-xl text-[#7657FF]">
                {project.outcomes[0].value}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-mono mt-1">
              {project.outcomes[0].context}
            </p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[#E5E4E0] flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400">
          {project.isDemonstrationProject ? "Demonstration Case" : "Verified Case"}
        </span>
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#7657FF] group-hover:text-[#6242EC]"
        >
          <span>View Study</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};
