interface NetworkLink {
  title: string;
  url: string;
  site: string;
}

const siteLabels: Record<string, string> = {
  ed: 'Epiphany Dynamics',
  fss: 'Field Service Stack',
  calc: 'AI for Biz Calculator',
  help: 'Epiphany Learn',
  hype: 'HypeBench',
};

export default function NetworkLinks({ links }: { links?: NetworkLink[] }) {
  if (!links || links.length === 0) return null;

  return (
    <section className="border-t border-white/10 mt-12 pt-8">
      <h2 className="text-lg font-semibold mb-4">From our network</h2>
      <ul className="space-y-2">
        {links.slice(0, 4).map((link) => (
          <li key={link.url}>
            <a 
              href={link.url}
              className="text-blue-400 hover:underline"
              rel="noopener"
            >
              {link.title}
            </a>
            <span className="text-white/40 text-sm ml-2">
              ({siteLabels[link.site] || link.site})
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
