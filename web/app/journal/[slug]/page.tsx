import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { api } from '@/lib/api';
import type { JournalArticle } from '@/lib/types';

async function fetchArticle(slug: string): Promise<JournalArticle | null> {
  try {
    const { data } = await api.getJournalArticle(slug);
    return data;
  } catch {
    return null;
  }
}

async function fetchRelated(category: string, exclude: string) {
  try {
    const { data } = await api.getJournalArticles(category);
    return data.filter((a) => a.slug !== exclude).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await fetchArticle(params.slug);
  return { title: article?.title || 'Journal' };
}

export default async function JournalArticlePage({ params }: { params: { slug: string } }) {
  const article = await fetchArticle(params.slug);
  if (!article) notFound();

  const related = await fetchRelated(article.category, article.slug);

  return (
    <PageShell>
      <article className="flex flex-col">
        <div className="relative h-[45vh] min-h-[320px] max-h-[560px]">
          {article.cover_image && <Image src={article.cover_image} alt={article.title} fill priority sizes="100vw" className="object-cover" />}
        </div>
        <div className="container-px py-14 md:py-20 flex justify-center">
          <div className="w-full max-w-prose flex flex-col gap-6">
            <div className="text-[11px] uppercase tracking-label text-gold-700">
              {article.category} &middot; {new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <h1 className="font-display text-3xl md:text-[44px] leading-tight">{article.title}</h1>
            {article.dek && <p className="text-lg font-light text-ink-700">{article.dek}</p>}
            <div className="h-px bg-divider my-4" />
            <p className="text-base md:text-lg leading-[1.8] font-light text-ink-800 whitespace-pre-line">{article.body}</p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="bg-surface container-px py-16 md:py-20 flex flex-col gap-8">
            <h2 className="font-display text-2xl border-b border-divider pb-4">More from the Journal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((a) => (
                <Link key={a.id} href={`/journal/${a.slug}`} className="flex flex-col gap-3">
                  <div className="relative aspect-[4/3] border border-divider overflow-hidden">
                    {a.cover_image && <Image src={a.cover_image} alt={a.title} fill sizes="33vw" className="object-cover" />}
                  </div>
                  <div className="text-[11px] uppercase tracking-label text-gold-700">{a.category}</div>
                  <div className="font-display text-lg leading-tight">{a.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageShell>
  );
}
