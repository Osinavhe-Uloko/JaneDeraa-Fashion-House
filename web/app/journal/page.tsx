import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { api } from '@/lib/api';
import { safe } from '@/lib/safe';

export const metadata = { title: 'Journal' };

export default async function JournalPage() {
  const { data: articles } = await safe(api.getJournalArticles(), { data: [] });

  return (
    <PageShell>
      <div className="container-px py-16 md:py-24 flex flex-col gap-10 md:gap-14">
        <h1 className="font-display text-display-mobile md:text-[48px] border-b border-divider pb-5">Journal</h1>

        {articles.length === 0 ? (
          <p className="text-sm text-ink-600">No articles yet — run the seed script to populate the Journal.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10">
            {articles.map((article) => (
              <Link key={article.id} href={`/journal/${article.slug}`} className="group flex flex-col gap-4">
                <div className="relative aspect-[4/3] border border-divider overflow-hidden">
                  {article.cover_image && (
                    <Image
                      src={article.cover_image}
                      alt={article.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="text-[11px] uppercase tracking-label text-gold-700">
                  {article.category} &middot; {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <div className="font-display text-xl md:text-2xl leading-tight">{article.title}</div>
                <p className="text-sm md:text-[15px] leading-relaxed font-light text-ink-700">{article.dek}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
