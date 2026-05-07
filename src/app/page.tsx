'use client';

import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { HeroSection } from "@/components/hero-section-6";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { Particles } from "@/components/magicui/particles";
import { Confetti } from "@/components/magicui/confetti";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Instagram } from "lucide-react";
import { Highlighter } from "@/components/magicui/highlighter";
import TestimonialSection from "@/components/testimoni";
import RollingGallery from "@/components/RollingGallery";
import { RetroGrid } from "@/components/ui/retro-grid";

const BLUR_FADE_DELAY = 0.04;


export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <ScrollProgress />

      <SmoothCursor />

      <Confetti
        className="absolute inset-0 w-full h-full"
        options={{
          particleCount: 80,
          spread: 70,
          startVelocity: 30,
          colors: ["#facc15", "#ec4899", "#6366f1"], // kuning, pink, indigo
        }}
      />

      <Particles
        className="fixed inset-0 -z-10"
        quantity={150}
        color="#00bd19" // biru
        staticity={40}
        ease={60}
        size={1}
      />
      <HeroSection />

      <section id="about" className="px-6">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold mb-4">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="rounded-2xl border bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <p className="prose prose-neutral dark:prose-invert max-w-none text-lg text-black dark:text-white text-center">
              <Highlighter action="highlight" color="#60a5fa">
                As a vocational high school student in Information Technology
              </Highlighter>
              , I have developed skills in{" "}
              <Highlighter color="#ec4899" action="underline">
                web application development, database management, and system
                integration
              </Highlighter>
              . Through{" "}
              <Highlighter action="underline" color="#6366f1">
                school projects
              </Highlighter>{" "}
              and{" "}
              <Highlighter action="underline" color="#6366f1">
                independent practice
              </Highlighter>
              , I am experienced in creating{" "}
              <Highlighter action="underline" color="#60a5fa">
                efficient and user-friendly digital solutions
              </Highlighter>
              . I am committed to continuously improving my abilities to make
              the{" "}
              <Highlighter action="underline" color="#ec4899">
                best contribution to organizations and teams
              </Highlighter>
              .
            </p>
          </div>
        </BlurFade>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>

          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-6xl mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="hackathons">
        <div className="space-y-12 w-full ">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Achievement & Certification
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Proof of My Skills & Dedication
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  These certifications and achievements represent my dedication
                  to continuous learning, skill development, and real-world
                  problem solving.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      {/*       <section id="testimonials " className="px-6 ">
        <div style={{ height: "600px", position: "relative" }}>
          <TestimonialSection />
        </div>
      </section> */}

      



    </main>
  );
}
