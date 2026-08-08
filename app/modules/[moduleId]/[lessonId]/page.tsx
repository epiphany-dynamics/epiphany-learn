import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllLessonSlugs, getAllModules, getModule, getLesson, getLessonFilename } from "@/lib/content";
import LessonContent from "@/components/lesson/LessonContent";
import { getModuleColor, getModuleColorVars } from "@/lib/module-colors";
// Module illustrations available via content Visual components

interface Props {
  params: { moduleId: string; lessonId: string };
}

export async function generateStaticParams() {
  return getAllLessonSlugs().map(({ moduleId, slug }) => ({
    moduleId,
    lessonId: slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const lesson = getLesson(params.moduleId, params.lessonId);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — Epiphany Learn`,
    description: lesson.subtitle,
    alternates: {
      canonical: `/modules/${params.moduleId}/${params.lessonId}`,
    },
  };
}

export default async function LessonPage({ params }: Props) {
  const mod = getModule(params.moduleId);
  if (!mod) notFound();

  const lesson = getLesson(params.moduleId, params.lessonId);
  if (!lesson) notFound();

  const filename = getLessonFilename(params.moduleId, params.lessonId);
  if (!filename) notFound();

  const { default: LessonMDX } = await import(
    /* webpackInclude: /\.mdx$/ */
    `../../../../content/${params.moduleId}/${filename}`
  );

  const lessonIndex = mod.lessons.findIndex((l) => l.slug === params.lessonId);
  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null;

  const allModules = getAllModules();
  const modIndex = allModules.findIndex((m) => m.id === params.moduleId);
  const nextModule = modIndex >= 0 && modIndex < allModules.length - 1 ? allModules[modIndex + 1] : null;
  const color = getModuleColor(params.moduleId);
  const colorVars = getModuleColorVars(params.moduleId);
  const progressPercent = ((lessonIndex + 1) / mod.lessons.length) * 100;

  return (
    <main className="flex flex-col bg-[#050505] overflow-hidden" style={{ ...(colorVars as React.CSSProperties), height: 'calc(100dvh - 3rem)' }}>
      {/* Lesson header nav — non-sticky, sits at top of flex layout */}
      <header className="flex-shrink-0 backdrop-blur-xl shadow-lg z-10" style={{ background: "rgba(5,5,5,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Link href="/modules" className="text-[#F0EFEB]/30 hover:text-[#F0EFEB]/70 transition-colors">
              Modules
            </Link>
            <span className="text-[#F0EFEB]/10">/</span>
            <Link
              href={`/modules/${params.moduleId}`}
              className="text-[#F0EFEB]/40 hover:text-[#F0EFEB]/70 transition-colors truncate max-w-32"
            >
              {mod.title}
            </Link>
            <span className="text-[#F0EFEB]/10">/</span>
            <span className="text-[#F0EFEB]/70 font-medium truncate max-w-40">
              {lesson.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Lesson counter pill */}
            <div className="text-xs text-[#F0EFEB]/30 px-2.5 py-1 rounded-full" style={{ background: `${color.hex}15`, color: color.textDark }}>
              {lessonIndex + 1}/{mod.lessons.length}
            </div>
          </div>
        </div>
        {/* Progress bar — enhanced with glow and animation */}
        <div className="h-1.5 relative" style={{ background: "rgba(255,255,255,0.04)" }}>
          {/* Segment markers */}
          <div className="absolute inset-0 flex">
            {mod.lessons.map((_, i) => (
              <div key={i} className="flex-1 relative">
                {i > 0 && <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />}
              </div>
            ))}
          </div>
          {/* Filled progress */}
          <div
            className="h-full transition-all duration-700 ease-smooth relative overflow-hidden"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: color.hex,
              boxShadow: `0 0 16px ${color.glow}, 0 0 4px ${color.hex}`,
              borderRadius: "0 2px 2px 0",
            }}
          >
            {/* Shimmer animation on progress bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animation: "progressShimmer 2s linear infinite", backgroundSize: "200% 100%" }} />
          </div>
        </div>
      </header>

      {/* Lesson content — slide-based, fills viewport */}
      <LessonContent
        lesson={lesson}
        moduleId={params.moduleId}
        moduleTitle={mod.title}
        moduleBadgeId={mod.badgeId}
        totalLessons={mod.lessons.length}
        nextModuleId={nextModule?.id ?? null}
        nextModuleTitle={nextModule?.title ?? null}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
      >
        <LessonMDX />
      </LessonContent>
    </main>
  );
}
