import { VehicleInputForm } from '@/components/forms/VehicleInputForm'
import {
  ArrowDownToLine,
  ArrowRight,
  BadgeCheck,
  Car,
  Check,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  Cpu,
  FileSearch,
  FileText,
  Fuel,
  Gauge,
  GitCompareArrows,
  Landmark,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

const capabilities = [
  {
    icon: Landmark,
    title: 'Історія аукціонів',
    description: 'Лоти, фото до ремонту, тип пошкоджень та аукціонна історія автомобіля.',
  },
  {
    icon: CircleAlert,
    title: 'Історія ДТП',
    description: 'Відомі страхові випадки, характер пошкоджень і важливі записи.',
  },
  {
    icon: Cpu,
    title: 'AI аналіз фотографій',
    description: 'Виявлення слідів ремонту, різниці відтінків та видимих дефектів.',
  },
  {
    icon: Wrench,
    title: 'Типові несправності',
    description: 'Слабкі місця конкретної моделі, двигуна та трансмісії.',
  },
  {
    icon: SearchCheck,
    title: 'Каталог запчастин',
    description: 'Орієнтовна вартість ключових вузлів і ремонтних робіт.',
  },
  {
    icon: FileText,
    title: 'PDF звіт',
    description: 'Структурований документ для вас, майстра або продавця.',
  },
]

const modelIssues = [
  {
    title: 'SBC',
    severity: 'Висока критичність',
    mileage: '180–250 тис. км',
    cost: 'від 18 000 грн',
    description:
      'Електрогідравлічна гальмівна система має обмежений ресурс циклів і потребує точної діагностики.',
    recommendation:
      'Перевірити лічильник SBC, помилки блоку та фактичну роботу гальмівної системи.',
  },
  {
    title: 'Вихрові заслінки',
    severity: 'Потребує уваги',
    mileage: '180–260 тис. км',
    cost: 'від 9 000 грн',
    description:
      'Механізм впускного колектора може зношуватися та впливати на тягу двигуна.',
    recommendation:
      'Оглянути тяги заслінок, перевірити помилки та стабільність роботи на холодному двигуні.',
  },
  {
    title: 'Подушки двигуна',
    severity: 'Середня критичність',
    mileage: '160–220 тис. км',
    cost: 'від 7 500 грн',
    description:
      'Зношені опори передають вібрації на кузов і можуть погіршувати комфорт автомобіля.',
    recommendation:
      'Перевірити вібрації у режимах D і R, а також стан опор на підйомнику.',
  },
  {
    title: 'Термостат',
    severity: 'Потребує уваги',
    mileage: '150–220 тис. км',
    cost: 'від 4 500 грн',
    description:
      'Несправний термостат не дає двигуну вийти на робочу температуру та збільшує витрату пального.',
    recommendation:
      'Перевірити фактичну температуру охолоджувальної рідини під час тестової поїздки.',
  },
  {
    title: 'Корозія задніх арок',
    severity: 'Середня критичність',
    mileage: 'Не залежить від пробігу',
    cost: 'від 12 000 грн',
    description:
      'Прихована корозія може розвиватися з внутрішньої сторони арок і порогів.',
    recommendation:
      'Оглянути кузов товщиноміром, підкрилки, пороги та внутрішні шви арок.',
  },
]

const checklist = [
  'Роботу коробки передач',
  'Турбіну та патрубки наддуву',
  'SBC і помилки електроніки',
  'Підвіску та рульове управління',
  'Ознаки повторного фарбування',
  'Роботу кондиціонера',
  'Температуру двигуна в русі',
  'Стан арок, порогів і днища',
]

const alternatives = [
  {
    name: 'BMW 5 Series E60',
    price: 'від 280 000 грн',
    reliability: '7.2 / 10',
    service: 'від 48 000 грн / рік',
    fuel: '8.4 л / 100 км',
    plus: 'Керованість і широкий вибір запчастин',
    caution: 'Уважно перевіряти електроніку та стан АКПП',
  },
  {
    name: 'Audi A6 C6',
    price: 'від 260 000 грн',
    reliability: '7.0 / 10',
    service: 'від 52 000 грн / рік',
    fuel: '8.7 л / 100 км',
    plus: 'Комфорт, шумоізоляція та повний привід',
    caution: 'Важливо перевірити двигун і трансмісію',
  },
  {
    name: 'Lexus GS',
    price: 'від 370 000 грн',
    reliability: '8.4 / 10',
    service: 'від 42 000 грн / рік',
    fuel: '10.2 л / 100 км',
    plus: 'Висока надійність і якість збірки',
    caution: 'Менший вибір на вторинному ринку',
  },
  {
    name: 'Volvo S80',
    price: 'від 250 000 грн',
    reliability: '7.6 / 10',
    service: 'від 45 000 грн / рік',
    fuel: '8.9 л / 100 км',
    plus: 'Безпека, комфорт та стриманий характер',
    caution: 'Потрібна діагностика електронних модулів',
  },
]

const faqs = [
  {
    question: 'Що можна перевірити за VIN-кодом?',
    answer:
      'VIN допомагає знайти базову інформацію про автомобіль, відомі аукціонні записи, історію пошкоджень, пробіг і характеристики комплектації — залежно від доступності даних для конкретного авто.',
  },
  {
    question: 'Чи можна перевірити автомобіль за посиланням на оголошення?',
    answer:
      'Так. Вставте посилання на оголошення або аукціонний лот — сервіс використає доступні дані зі сторінки разом із VIN-перевіркою.',
  },
  {
    question: 'Як працює AI аналіз фотографій?',
    answer:
      'AI аналізує завантажені зображення та допомагає звернути увагу на видимі ознаки ремонту, пошкодження кузова або невідповідності. Це допоміжний інструмент, а не заміна огляду на СТО.',
  },
  {
    question: 'Скільки часу займає перевірка?',
    answer:
      'Базовий звіт формується менш ніж за 30 секунд. Час може відрізнятися залежно від кількості фото та доступності зовнішніх джерел.',
  },
  {
    question: 'Чи замінює звіт огляд на СТО?',
    answer:
      'Ні. Звіт допомагає прийняти обґрунтоване рішення та скласти точний список перевірок перед зустріччю з продавцем або діагностикою на СТО.',
  },
]

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfcfd] text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-[#fbfcfd]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Car className="h-5 w-5" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">AI Vehicle Inspector</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#capabilities">
              Можливості
            </a>
            <a className="transition-colors hover:text-foreground" href="#report">
              Звіт
            </a>
            <a className="transition-colors hover:text-foreground" href="#model">
              Для моделі
            </a>
            <a className="transition-colors hover:text-foreground" href="#faq">
              FAQ
            </a>
          </nav>

          <a
            href="#check"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Перевірити авто
          </a>
        </div>
      </header>

      <section id="check" className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              Професійна перевірка автомобіля
            </div>

            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[58px] lg:leading-[1.04]">
              Знайте про автомобіль усе ще до покупки
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Введіть VIN-код, вставте посилання на оголошення чи аукціон або завантажте фотографії автомобіля.
              AI проаналізує доступні дані та сформує зрозумілий професійний звіт.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:p-6">
              <VehicleInputForm />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted-foreground sm:grid-cols-4 sm:gap-x-3">
              {[
                'Без реєстрації',
                'Звіт менш ніж за 30 секунд',
                'AI аналіз фотографій',
                'Перевірені джерела',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-white p-3 shadow-[0_25px_80px_rgba(15,23,42,0.11)] sm:p-4">
              <div className="overflow-hidden rounded-xl bg-slate-100">
                <div className="flex aspect-[16/8] items-end bg-[linear-gradient(135deg,#dbe4ee_0%,#f5f7f9_48%,#bfcbd8_100%)] p-5 sm:p-7">
                  <div className="w-full rounded-xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Перевірка завершена
                        </p>
                        <p className="mt-1 text-lg font-semibold text-foreground">
                          Mercedes-Benz E320 CDI
                        </p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        Помірний ризик
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 pt-5 sm:p-3 sm:pt-6">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      VIN
                    </p>
                    <p className="mt-1 font-mono text-sm font-medium text-foreground">
                      WDB2110261A123456
                    </p>
                  </div>
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </div>

                <div className="grid grid-cols-2 gap-3 py-5">
                  <div className="rounded-xl border border-border bg-slate-50/70 p-3">
                    <Gauge className="h-4 w-4 text-primary" />
                    <p className="mt-3 text-xs text-muted-foreground">Пробіг</p>
                    <p className="mt-1 text-sm font-semibold">214 800 км</p>
                  </div>
                  <div className="rounded-xl border border-border bg-slate-50/70 p-3">
                    <CircleAlert className="h-4 w-4 text-primary" />
                    <p className="mt-3 text-xs text-muted-foreground">Історія ДТП</p>
                    <p className="mt-1 text-sm font-semibold">2 записи</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4">
                  <p className="text-sm font-semibold">Що варто перевірити</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      Ознаки ремонту задньої частини
                    </li>
                    <li className="flex gap-2">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      Пробіг потребує додаткової перевірки
                    </li>
                    <li className="flex gap-2">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      Рекомендовано огляд SBC
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-border bg-white px-4 py-3 shadow-lg sm:block">
              <p className="text-xs text-muted-foreground">Орієнтовний резерв</p>
              <p className="mt-1 text-sm font-semibold">35 000–70 000 грн</p>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <SectionHeading
            eyebrow="Можливості"
            title="Що входить у перевірку"
            description="Не лише історія автомобіля — повний контекст, який допомагає прийняти обґрунтоване рішення перед покупкою."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-[#fbfcfd] p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(15,23,42,0.07)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="model" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Аналітика моделі"
          title="На що звернути увагу саме у цієї моделі"
          description="Після перевірки ви бачите не лише історію конкретного автомобіля, а й типові ризики моделі, двигуна та ключових вузлів."
        />

        <div className="mt-12 rounded-2xl border border-border bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-7 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium text-primary">Профіль моделі</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Mercedes-Benz W211 E320 CDI
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-muted-foreground">Поширений пробіг</p>
                <p className="mt-1 font-semibold">180–250 тис. км</p>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-muted-foreground">Резерв на роботи</p>
                <p className="mt-1 font-semibold">35–70 тис. грн</p>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-muted-foreground">Профіль надійності</p>
                <p className="mt-1 font-semibold">Вище середнього</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {modelIssues.map((issue, index) => (
              <article key={issue.title} className="grid gap-5 py-6 lg:grid-cols-[0.8fr_1.45fr_0.9fr] lg:items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      0{index + 1}
                    </span>
                    <h4 className="font-semibold">{issue.title}</h4>
                  </div>
                  <p className="mt-3 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    {issue.severity}
                  </p>
                </div>

                <div>
                  <p className="text-sm leading-6 text-muted-foreground">{issue.description}</p>
                  <p className="mt-3 text-sm font-medium text-foreground">
                    Перед покупкою: <span className="font-normal text-muted-foreground">{issue.recommendation}</span>
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-3 text-sm lg:grid-cols-1">
                  <div>
                    <dt className="text-muted-foreground">Типово з&apos;являється</dt>
                    <dd className="mt-1 font-semibold">{issue.mileage}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Орієнтовний ремонт</dt>
                    <dd className="mt-1 font-semibold">{issue.cost}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="report" className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <SectionHeading
            eyebrow="Звіт"
            title="Приклад готового звіту"
            description="Зрозумілий інтерфейс, що об’єднує історію автомобіля, технічні ризики, рекомендації та бюджет на перші роботи."
          />

          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-[#fbfcfd] shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-border bg-white px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FileSearch className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Звіт №AV-24018</p>
                  <p className="text-xs text-muted-foreground">Оновлено щойно</p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50"
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span className="hidden sm:inline">Завантажити PDF</span>
              </button>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-[1.25fr_0.75fr] sm:p-6">
              <div className="space-y-5">
                <div className="rounded-xl border border-border bg-white p-5">
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="flex h-28 w-full items-end rounded-lg bg-[linear-gradient(135deg,#cfd9e5_0%,#f7f8fa_55%,#bac6d3_100%)] p-3 sm:w-44">
                      <span className="rounded bg-white/90 px-2 py-1 text-xs font-medium">Фото авто</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                            Mercedes-Benz
                          </p>
                          <h3 className="mt-1 text-xl font-semibold">E320 CDI Avantgarde</h3>
                        </div>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          Помірний ризик
                        </span>
                      </div>
                      <p className="mt-4 font-mono text-sm text-muted-foreground">WDB2110261A123456</p>
                      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Пробіг</p>
                          <p className="mt-1 font-semibold">214 800 км</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">ДТП</p>
                          <p className="mt-1 font-semibold">2 записи</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Аукціони</p>
                          <p className="mt-1 font-semibold">1 лот</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm font-semibold">Рекомендації AI</p>
                    <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        Звірити пробіг з сервісною історією
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        Провести діагностику SBC перед купівлею
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        Перевірити задню частину кузова товщиноміром
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm font-semibold">Ймовірні витрати</p>
                    <p className="mt-4 text-3xl font-semibold tracking-tight">35 000–70 000 грн</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Рекомендований резерв на діагностику та першочергові роботи після купівлі.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="rounded-xl border border-border bg-white p-5">
                <p className="text-sm font-semibold">Стан ключових вузлів</p>
                <div className="mt-5 space-y-5">
                  {[
                    ['Гальмівна система SBC', 'Потрібна діагностика', '72%'],
                    ['Двигун та турбіна', 'Без критичних ознак', '84%'],
                    ['Кузов і лакофарбове покриття', 'Перевірити задню частину', '68%'],
                    ['Трансмісія', 'Рекомендований тест-драйв', '78%'],
                  ].map(([label, state, width]) => (
                    <div key={label}>
                      <div className="flex items-start justify-between gap-3 text-sm">
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{state}</p>
                        </div>
                        <span className="font-semibold text-primary">{width}</span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-primary" style={{ width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Володіння"
          title="Вартість володіння без несподіванок"
          description="Орієнтовні показники допомагають зрозуміти не тільки ціну покупки, а й реальний бюджет на експлуатацію."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Wrench, label: 'Середня вартість ТО', value: 'від 8 500 грн' },
            { icon: Landmark, label: 'Щорічні витрати', value: 'від 48 000 грн' },
            { icon: CircleAlert, label: 'Найдорожчий вузол', value: 'SBC / АКПП' },
            { icon: Fuel, label: 'Середня витрата', value: '8.1 л / 100 км' },
            { icon: ClipboardCheck, label: 'Резерв на сервіс', value: '35–70 тис. грн' },
          ].map(({ icon: Icon, label, value }) => (
            <article key={label} className="rounded-2xl border border-border bg-white p-5">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-6 text-sm text-muted-foreground">{label}</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <SectionHeading
            eyebrow="Перед оглядом"
            title="Що перевірити перед покупкою"
            description="Чек-лист формується з урахуванням моделі, двигуна та виявлених ризиків у звіті."
          />

          <div className="mt-12 grid gap-x-10 gap-y-4 rounded-2xl border border-border bg-[#fbfcfd] p-5 sm:grid-cols-2 sm:p-8">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-border/80 py-3 last:border-b-0 sm:nth-[7]:border-b-0 sm:nth-[8]:border-b-0">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-muted-foreground/40 bg-white">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Для іншої моделі перелік перевірок автоматично змінюється відповідно до її типових слабких місць.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Альтернативи"
          title="Можливо, вам також варто розглянути"
          description="Автомобілі того ж класу, які варто порівняти перед остаточним рішенням у вашому бюджеті."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {alternatives.map((car) => (
            <article
              key={car.name}
              className="group rounded-2xl border border-border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:p-6"
            >
              <div className="flex gap-5">
                <div className="hidden h-24 w-32 shrink-0 rounded-xl bg-[linear-gradient(135deg,#d7e0e8_0%,#f7f8fa_55%,#bdc8d3_100%)] sm:block" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">{car.name}</h3>
                    <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-primary">{car.price}</p>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                    <div>
                      <p>Надійність</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{car.reliability}</p>
                    </div>
                    <div>
                      <p>Сервіс</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{car.service}</p>
                    </div>
                    <div>
                      <p>Витрата</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{car.fuel}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-2 border-t border-border pt-4 text-sm">
                <p>
                  <span className="font-medium">Перевага:</span>{' '}
                  <span className="text-muted-foreground">{car.plus}</span>
                </p>
                <p>
                  <span className="font-medium">Врахувати:</span>{' '}
                  <span className="text-muted-foreground">{car.caution}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <SectionHeading
            eyebrow="Процес"
            title="Як працює сервіс"
            description="Три прості кроки від першого посилання до зрозумілого рішення перед купівлею."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ['01', 'Введіть VIN або вставте посилання', 'Додайте VIN, оголошення, аукціонний лот або фотографії автомобіля.'],
              ['02', 'AI аналізує автомобіль', 'Система поєднує доступні записи, фотоаналіз і профіль конкретної моделі.'],
              ['03', 'Отримайте готовий звіт', 'Перегляньте ризики, технічні рекомендації, витрати та чек-лист огляду.'],
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-2xl border border-border bg-[#fbfcfd] p-6">
                <p className="text-sm font-semibold text-primary">{number}</p>
                <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Поширені запитання
          </h2>
        </div>

        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-white px-5 sm:px-7">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-semibold">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="max-w-3xl pb-5 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              <span className="font-semibold">AI Vehicle Inspector</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Професійний помічник для обґрунтованого вибору автомобіля.
            </p>
          </div>

          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#capabilities" className="transition-colors hover:text-foreground">
              Можливості
            </a>
            <a href="#report" className="transition-colors hover:text-foreground">
              Звіт
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
