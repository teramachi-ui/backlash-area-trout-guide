"use client";

import { useEffect, useMemo, useState } from "react";

type Region = "東海" | "甲信越" | "関西" | "関東" | "東北";

type Venue = {
  name: string;
  prefecture: string;
  region: Region;
  note: string;
  url: string;
  image: string;
  photo: boolean;
};

const venues: Venue[] = [
  { name: "フィッシング＆カフェ サンクチュアリ", prefecture: "三重", region: "東海", note: "カフェと複数ポンドを楽しめるフィールド", url: "https://go-sanctuary.com/", image: "/venues/sanctuary.webp", photo: true },
  { name: "フィッシングキャンプエリア瑞浪", prefecture: "岐阜", region: "東海", note: "釣りとキャンプを一緒に楽しめるエリア", url: "https://www.fishing-autocamp-mizunami.com/", image: "/venues/mizunami.webp", photo: true },
  { name: "平谷湖フィッシングスポット", prefecture: "長野", region: "甲信越", note: "南信州の高原に広がる開放的なフィールド", url: "https://hirayako.com/", image: "/venues/hirayako.webp", photo: true },
  { name: "醒ヶ井養鱒場", prefecture: "滋賀", region: "関西", note: "清らかな水に囲まれた歴史ある養鱒場", url: "https://samegai.siga.jp/", image: "/venues/samegai.webp", photo: true },
  { name: "アルクスポンド焼津", prefecture: "静岡", region: "東海", note: "港町で気軽に楽しめるポンドエリア", url: "https://www.arcus-pond.com/wp/shisetsu/%E3%82%A2%E3%83%AB%E3%82%AF%E3%82%B9%E3%83%9D%E3%83%B3%E3%83%89%E7%84%BC%E6%B4%A5/", image: "/venues/arcus-yaizu.webp", photo: true },
  { name: "北方 川釣り体験場", prefecture: "愛知", region: "東海", note: "川の流れを感じながら狙うルアー専用エリア", url: "https://kawaturitaikenjyou.on.omisenomikata.jp/", image: "/venues/venue-01.webp", photo: false },
  { name: "根尾川管理釣り場", prefecture: "岐阜", region: "東海", note: "根尾川の自然を身近に感じるシーズンフィールド", url: "https://neogawa.org/", image: "/venues/venue-02.webp", photo: false },
  { name: "フィッシングパーク 高島の泉", prefecture: "滋賀", region: "関西", note: "豊かな水と広い景色が心地よいポンド", url: "https://www.takashimanoizumi.com/", image: "/venues/venue-03.webp", photo: false },
  { name: "さかなのさとすぎしま", prefecture: "岐阜", region: "東海", note: "板取川沿いで釣りとBBQを楽しめる自然派エリア", url: "https://sakananosato.com/", image: "/venues/venue-04.webp", photo: false },
  { name: "美濃フィッシングエリア", prefecture: "岐阜", region: "東海", note: "清流の里で過ごす、緑に囲まれたフィールド", url: "https://www.mino-fa.com/", image: "/venues/venue-05.webp", photo: false },
  { name: "月見ヶ原FC", prefecture: "岐阜", region: "東海", note: "長良川水系で楽しむ冬季のルアーフィールド", url: "https://www.nagaragawachuoh.or.jp/ryouyuu_annai/ryouyuu_annai_04.htm", image: "/venues/venue-06.webp", photo: false },
  { name: "フィッシング母袋", prefecture: "岐阜", region: "東海", note: "標高700mの山あいで魚と向き合うポンド", url: "https://www.motai.info/", image: "/venues/motai.webp", photo: true },
  { name: "釣り＆キャンプ 鱒蔵", prefecture: "岐阜", region: "東海", note: "アウトドアの一日をゆったり楽しめる釣り場", url: "https://masukura-2.jimdosite.com/", image: "/venues/masukura.webp", photo: true },
  { name: "アルクスポンド宇都宮", prefecture: "栃木", region: "関東", note: "都市近郊から通いやすい本格ポンドエリア", url: "https://www.arcus-pond.com/", image: "/venues/arcus-utsunomiya.webp", photo: true },
  { name: "五頭フィッシングパーク", prefecture: "新潟", region: "甲信越", note: "山並みを望む、新潟の人気フィールド", url: "https://www.gozu-fp.jp/", image: "/venues/gozu.webp", photo: true },
  { name: "アングラーズパーク キングフィッシャー", prefecture: "栃木", region: "関東", note: "トラウトもバスも楽しめる複合フィールド", url: "https://kingfisher-tochigi.com/", image: "/venues/kingfisher.webp", photo: true },
  { name: "ジョイバレー ルアー・フライ", prefecture: "千葉", region: "関東", note: "里山の空気に包まれた静かなポンド", url: "https://www.joyvalley.co.jp/", image: "/venues/joyvalley.webp", photo: true },
  { name: "足柄キャスティングエリア", prefecture: "神奈川", region: "関東", note: "足柄の山々を近くに感じるフィールド", url: "https://www.ashigara-ca.com/", image: "/venues/venue-12.webp", photo: false },
  { name: "大芦川F&Cフィールドビレッジ", prefecture: "栃木", region: "関東", note: "清流の気配を感じる自然豊かなエリア", url: "http://park10.wakwak.com/~fishing/", image: "/venues/oashigawa.webp", photo: true },
  { name: "みどりフィッシングエリア", prefecture: "栃木", region: "関東", note: "山間の景色と水辺をゆっくり楽しむポンド", url: "https://ms3103.blog.fc2.com/", image: "/venues/midori.webp", photo: true },
  { name: "フィッシングフィールド中津川", prefecture: "神奈川", region: "関東", note: "中津川水系の自然に近い管理釣り場", url: "https://www.nakatugawa-gyokyou.jp/index.html", image: "/venues/nakatsugawa.webp", photo: true },
  { name: "レイクウッドリゾート", prefecture: "栃木", region: "関東", note: "自然と食事を一緒に楽しめる水辺のリゾート", url: "https://lakewoodresort.info/", image: "/venues/lakewood.webp", photo: true },
  { name: "加賀フィッシングエリア", prefecture: "栃木", region: "関東", note: "北関東最大級のスケールを誇るポンドエリア", url: "https://kaga-fishingarea.jp/", image: "/venues/venue-17.webp", photo: false },
  { name: "すそのフィッシングパーク", prefecture: "静岡", region: "東海", note: "富士山麓の変化ある池を楽しむ人気エリア", url: "https://www.susono-f-park.com/", image: "/venues/venue-18.webp", photo: false },
  { name: "東山湖フィッシングエリア", prefecture: "静岡", region: "東海", note: "富士を望む湖畔でロングキャストを楽しむ", url: "https://www.higashiyamako.com/", image: "/venues/higashiyamako.webp", photo: true },
  { name: "あいづフィッシングエリア", prefecture: "福島", region: "東北", note: "会津の山あいで季節の空気を楽しむポンド", url: "https://aizufishing.jp/", image: "/venues/aizu.webp", photo: true },
];

const regionOptions = ["すべて", "東海", "甲信越", "関西", "関東", "東北"] as const;

export default function Home() {
  const [region, setRegion] = useState<(typeof regionOptions)[number]>("すべて");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const isWordPressEmbed = new URLSearchParams(window.location.search).get("embed") === "1";
    if (!isWordPressEmbed || window.parent === window) return;

    const sendHeight = () => {
      const content = document.querySelector("main");
      const height = Math.ceil(content?.getBoundingClientRect().height ?? document.body.scrollHeight);
      window.parent.postMessage({ type: "backlash-area-trout-height", height }, "https://backlash-shop.com");
    };

    const content = document.querySelector("main");
    const observer = new ResizeObserver(sendHeight);
    observer.observe(content ?? document.body);
    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);

    const initialTimers = [100, 500, 1500].map((delay) => window.setTimeout(sendHeight, delay));
    sendHeight();

    return () => {
      observer.disconnect();
      window.removeEventListener("load", sendHeight);
      window.removeEventListener("resize", sendHeight);
      initialTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const filteredVenues = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return venues.filter((venue) => {
      const matchesRegion = region === "すべて" || venue.region === region;
      const matchesQuery = !normalized || `${venue.name}${venue.prefecture}${venue.note}`.toLowerCase().includes(normalized);
      return matchesRegion && matchesQuery;
    });
  }, [query, region]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ページ上部へ">
          <span className="brand-mark">B</span>
          <span>BACKLASH FIELD NOTES</span>
        </a>
        <nav className="header-nav" aria-label="メインナビゲーション">
          <a href="#spots">釣り場一覧</a>
          <a className="shop-link" href="https://backlash-shop.com/" target="_blank" rel="noreferrer">BACKLASH <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src="/venues/atmosphere-atlas.webp" alt="さまざまなエリアトラウト釣り場の雰囲気イメージ" />
        <div className="hero-shade" />
        <div className="hero-inner">
          <p className="eyebrow">AREA TROUT / FIELD GUIDE</p>
          <h1>いい水、<br />いい時間。</h1>
          <p className="hero-copy">東海から関東・東北まで。BACKLASHスタッフが足を運んだ管理釣り場をめぐるフィールドガイド。</p>
        </div>
        <a className="hero-jump" href="#spots">EXPLORE <span aria-hidden="true">↓</span></a>
      </section>

      <section className="intro-band">
        <div>
          <p className="section-kicker">WHERE TO CAST NEXT</p>
          <h2>次の休日を、景色から選ぶ。</h2>
        </div>
        <p>水の色、山の近さ、ポンドの広さ。釣り場ごとの空気を眺めながら、気になる場所を見つけてください。営業日や料金、レギュレーションは各公式サイトで最新情報をご確認いただけます。</p>
      </section>

      <section className="spots-section" id="spots">
        <div className="filter-bar">
          <div className="region-tabs" role="group" aria-label="地域">
            {regionOptions.map((option) => (
              <button key={option} type="button" className={region === option ? "active" : ""} onClick={() => setRegion(option)} aria-pressed={region === option}>
                {option}
              </button>
            ))}
          </div>
          <label className="search-field">
            <span className="sr-only">釣り場名または県名で検索</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="釣り場名・県名で検索" />
          </label>
        </div>

        <div className="results-line" aria-live="polite">
          <span>FIELD LIST</span>
          <strong>{String(filteredVenues.length).padStart(2, "0")}</strong>
        </div>

        {filteredVenues.length > 0 ? (
          <div className="venue-grid">
            {filteredVenues.map((venue, index) => (
              <article className="venue-card" key={venue.name}>
                <div className="venue-media">
                  <img src={venue.image} alt={venue.photo ? `${venue.name}の現地写真` : `${venue.name}の雰囲気イメージ`} loading={index < 6 ? "eager" : "lazy"} />
                  <span className={`photo-label ${venue.photo ? "is-photo" : ""}`}>{venue.photo ? "現地写真" : "雰囲気イメージ"}</span>
                  <span className="prefecture-label">{venue.prefecture}</span>
                </div>
                <div className="venue-content">
                  <div>
                    <p className="venue-region">{venue.region} / AREA TROUT</p>
                    <h3>{venue.name}</h3>
                    <p className="venue-note">{venue.note}</p>
                  </div>
                  <a href={venue.url} target="_blank" rel="noreferrer" aria-label={`${venue.name}の公式サイトを見る`}>
                    公式サイト <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>該当する釣り場が見つかりませんでした。</p>
            <button type="button" onClick={() => { setQuery(""); setRegion("すべて"); }}>条件をクリア</button>
          </div>
        )}
      </section>

      <section className="guide-band">
        <p className="section-kicker">BEFORE YOU GO</p>
        <h2>出かける前に、公式情報を。</h2>
        <p>季節休業、受付時間、使用できるルアーやフックのルールは釣り場ごとに異なります。現地へ向かう前に、必ず各施設の公式サイトでご確認ください。</p>
      </section>

      <footer>
        <div className="footer-brand">LURE & BOAT <strong>BACKLASH</strong></div>
        <p>岐阜県岐阜市のルアーフィッシングショップ</p>
        <div className="footer-links">
          <a href="https://backlash-shop.com/" target="_blank" rel="noreferrer">ONLINE STORE <span aria-hidden="true">↗</span></a>
          <a href="#top">PAGE TOP <span aria-hidden="true">↑</span></a>
        </div>
        <p className="image-note">写真：BACKLASH掲載の現地写真 / その他は各地域の釣り場の雰囲気を表現したAIイメージです。</p>
      </footer>
    </main>
  );
}
