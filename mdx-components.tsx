import RevealCard from "@/components/mdx/RevealCard";
import Quiz from "@/components/mdx/Quiz";
import DragDrop from "@/components/mdx/DragDrop";
import FillBlank from "@/components/mdx/FillBlank";
import MatchTerms from "@/components/mdx/MatchTerms";
import { Tip, Warning, Example } from "@/components/mdx/Callout";
import StatHighlight from "@/components/mdx/StatHighlight";
import SectionDivider from "@/components/mdx/SectionDivider";
import SlideBreak from "@/components/lesson/SlideBreak";
import Visual from "@/components/mdx/Visual";
import MdxTable from "@/components/mdx/MdxTable";

// These are handled by the parent LessonContent component — no-ops to avoid duplicate UI.
function LessonComplete() { return null; }
function ModuleComplete() { return null; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, React.ComponentType<any>>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    RevealCard,
    Quiz,
    DragDrop,
    FillBlank,
    MatchTerms,
    Tip,
    Warning,
    Example,
    StatHighlight,
    SectionDivider,
    Visual,
    LessonComplete,
    ModuleComplete,
    table: MdxTable,
    hr: SlideBreak,
    ...components,
  };
}
