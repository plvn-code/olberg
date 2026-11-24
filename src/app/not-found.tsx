import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page wrap done">
      <p className="eyebrow">404</p>
      <h1 className="h1">Сторінку не знайдено</h1>
      <p className="lead">Можливо, модель зняли з продажу або посилання застаріло.</p>
      <Link href="/catalog" className="btn btn-dark">
        До каталогу
      </Link>
    </div>
  );
}
