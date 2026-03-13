import React from 'react';
import * as cheerio from 'cheerio';
import { ChevronDown } from 'lucide-react';

interface ProductDescriptionProps {
    html: string;
}

export default function ProductDescription({ html }: ProductDescriptionProps) {
    if (!html) return null;

    const $ = cheerio.load(html, null, false);

    // Convert old strong tags to h3 so we can split easily
    $('p > strong').each(function () {
        if ($(this).parent().text() === $(this).text()) {
            const h3 = $('<h3>').html($(this).html() || "");
            $(this).parent().replaceWith(h3);
        }
    });

    const sections: { title: string; type: string; content: string; cheerioNodes: any[] }[] = [];
    let currentSectionTitle = 'Overview';
    let currentNodes: any[] = [];

    // Top-level children
    $.root().children().each(function (i, elem) {
        if (elem.tagName === 'h3') {
            if (currentNodes.length > 0) {
                sections.push(processSection(currentSectionTitle, currentNodes));
            }
            currentSectionTitle = $(elem).text().trim();
            currentNodes = [];
        } else {
            currentNodes.push(elem);
        }
    });

    if (currentNodes.length > 0) {
        sections.push(processSection(currentSectionTitle, currentNodes));
    }

    function processSection(title: string, nodes: any[]) {
        const temp = cheerio.load('', null, false);
        nodes.forEach(n => temp.root().append(n));

        let type = 'default';
        const lowerTitle = title.toLowerCase();

        if (lowerTitle.includes('frequent') || lowerTitle.includes('faq')) type = 'faq';
        else if (lowerTitle.includes('patients say')) type = 'testimonials';
        else if (lowerTitle.includes('bangalee')) type = 'dr_bangalee';
        else if (lowerTitle.includes('complete') || lowerTitle.includes('routine')) type = 'routine';
        else if (lowerTitle.includes('ingredient')) type = 'ingredients';

        return {
            title,
            type,
            content: temp.html(),
            cheerioNodes: nodes
        };
    }

    return (
        <div className="w-full">
            {sections.map((section, idx) => {
                const isOdd = idx % 2 === 1;
                const bgClass = isOdd ? 'bg-[#F7F7F8]' : 'bg-white';

                return (
                    <section key={idx} className={`py-16 md:py-24 ${bgClass}`}>
                        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                            {section.title !== 'Overview' && (
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-12 text-center">
                                    {section.title}
                                </h2>
                            )}

                            {/* Standard text sections */}
                            {(section.type === 'default' || section.type === 'ingredients') && (
                                <div
                                    className="prose prose-lg max-w-none text-[#636374] max-w-[100vw] overflow-x-auto"
                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                            )}

                            {/* FAQ Section */}
                            {section.type === 'faq' && (
                                <div className="space-y-4 max-w-3xl mx-auto">
                                    {renderFaq(section.content)}
                                </div>
                            )}

                            {/* Testimonials Section */}
                            {section.type === 'testimonials' && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {renderTestimonials(section.content)}
                                </div>
                            )}

                            {/* Dr Bangalee Section */}
                            {section.type === 'dr_bangalee' && (
                                <div className="bg-[#939EBA] text-white p-8 md:p-12 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                            🌟
                                        </div>
                                        Dr. Bangalee Recommends
                                    </h3>
                                    <div className="text-white/90 leading-relaxed text-lg prose prose-invert">
                                        {renderDrBangaleeText(section.content)}
                                    </div>
                                </div>
                            )}

                            {/* Complete Routine Section */}
                            {section.type === 'routine' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {renderRoutineCards(section.content)}
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

// Extract table rows for FAQ
function renderFaq(html: string) {
    const $ = cheerio.load(html, null, false);
    const pairs: { q: string, a: string }[] = [];

    $('tr').each((i, el) => {
        // First cell is Q, second is A
        const tds = $(el).find('td, th');
        if (tds.length >= 2) {
            const q = $(tds[0]).text().trim();
            const a = $(tds[1]).html() || "";
            // Skip header row usually if both are headings
            if (q.toLowerCase() !== 'question' && q !== '') {
                pairs.push({ q, a });
            }
        }
    });

    return pairs.map((pair, idx) => (
        <details
            key={idx}
            className="group [&_summary::-webkit-details-marker]:hidden bg-white uk-card-default border border-[#E2E2E6] overflow-hidden"
        >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-[#1A1A1F]">
                <h3 className="font-semibold text-lg">{pair.q}</h3>
                <span className="shrink-0 bg-[#F7F7F8] p-1.5 text-[#1A1A1F] sm:p-3 group-open:-rotate-180 transition-transform">
                    <ChevronDown size={20} />
                </span>
            </summary>
            <div
                className="px-6 pb-6 text-[#636374] leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: pair.a }}
            />
        </details>
    ));
}

function renderTestimonials(html: string) {
    const $ = cheerio.load(html, null, false);
    const texts: string[] = [];

    $('td').each((i, el) => {
        const htmlContent = $(el).html();
        if (htmlContent) texts.push(htmlContent);
    });

    return texts.map((t, idx) => (
        <div key={idx} className="bg-white p-8 border border-[#E2E2E6] uk-card-default flex flex-col justify-between">
            <div className="text-4xl text-[#939EBA] mb-4 opacity-50">"</div>
            <div
                className="prose prose-sm text-[#636374] mb-4 flex-grow italic"
                dangerouslySetInnerHTML={{ __html: t }}
            />
            <div className="flex text-[#D4AF37] text-sm mt-4">
                ★ ★ ★ ★ ★
            </div>
        </div>
    ));
}

function renderDrBangaleeText(html: string) {
    const $ = cheerio.load(html, null, false);
    // Extract paragraph text or direct text
    const textHtml = $('td').last().html();
    if (textHtml) {
        return <div dangerouslySetInnerHTML={{ __html: textHtml.replace(/<p><strong>(.*?)<\/strong><\/p>/, "") }} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function renderRoutineCards(html: string) {
    const $ = cheerio.load(html, null, false);
    const cards: { title: string, desc: string }[] = [];

    $('tr').each((i, el) => {
        const tds = $(el).find('td');
        if (tds.length === 2) {
            cards.push({ title: $(tds[0]).text().trim(), desc: $(tds[1]).text().trim() });
        } else if (tds.length === 1) { // Maybe stacked like our custom mapper
            const p = $(tds[0]).find('p');
            if (p.length >= 2) {
                cards.push({ title: $(p[0]).text().trim(), desc: $(p[1]).text().trim() });
            } else {
                cards.push({ title: "Product", desc: $(tds[0]).text().trim() });
            }
        }
    });

    // If parsing failed to find rows, fallback
    if (cards.length === 0) {
        $('td').each((i, el) => {
            const txt = $(el).html() || "";
            // split by <p>
            const chunks = txt.split('</p>');
            if (chunks.length > 1) {
                cards.push({ title: "Product Linked", desc: "View details" });
            }
        });
    }

    if (cards.length === 0) return <div className="col-span-4 text-center text-sm text-[#636374]">View related products</div>;

    return cards.map((c, idx) => (
        <div key={idx} className="bg-white p-6 border border-[#E2E2E6] uk-card-default text-center">
            <div className="w-16 h-16 bg-[#EEF0F6] rounded-full mx-auto mb-4 flex items-center justify-center text-[#939EBA]">
                📦
            </div>
            <h4 className="font-bold text-[#1A1A1F] mb-2">{c.title || "Complementary Care"}</h4>
            <p className="text-sm text-[#636374]">{c.desc}</p>
        </div>
    ));
}
