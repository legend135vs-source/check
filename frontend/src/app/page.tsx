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
  FileSearch,
  FileText,
  Fuel,
  Gauge,
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
    description: 'Лоти, фото до ремонту та записи про пошкодження.',
  },
  {
    icon: CircleAlert,
    title: 'ДТП і страхові записи',
    description: 'Важливі події, характер удару та відомі ризики.',
  },
  {
    icon: Sparkles,
    title: 'AI аналіз фото',
    description: 'Видимі дефекти, сліди ремонту та невідповідності.',
  },
  {
    icon: Wrench,
    title: 'Ризики моделі',
    description: 'Слабкі місця, пробіг появи та бюджет на ремонт.',
  },
  {
    icon: SearchCheck,
    title: 'Чек-лист огляду',
    description: 'Що саме перевірити перед зустріччю з продавцем.',
  },
  {
    icon: FileText,
    title: 'PDF звіт',
    description: 'Структурований висновок для вас або майстра.',
  },
]

const issues = [
  {
    id: '01',
    name: 'SBC',
    level: 'Висока критичність',
    mileage: '180–250 тис. км',
    cost: 'від 18 000 грн',
    description: 'Електрогідравлічна гальмівна система має обмежений ресурс циклів.',
    action: 'Діагностика лічильника SBC, помилок та роботи гальмівної системи.',
  },
  {
    id: '02',
    name: 'Вихрові заслінки',
    level: 'Потребує уваги',
    mileage: '180–260 тис. км',
    cost: 'від 9 000 грн',
    description: 'Зношення механізму впуску може впливати на тягу та стабільність двигуна.',
    action: 'Перевірити тяги заслінок, помилки та роботу двигуна на холодну.',
  },
  {
    id: '03',
    name: 'Термостат',
    level: 'Потребує уваги',
    mileage: '150–220 тис. км',
    cost: 'від 4 500 грн',
    description: 'Несправність може збільшувати витрату пального та знижувати ресурс двигуна.',
    action: 'Перевірити температуру охолоджувальної рідини під час тест-драйву.',
  },
  {
    id: '04',
    name: 'Корозія арок',
    level: 'Середня критичність',
    mileage: 'Не залежить від пробігу',
    cost: 'від 12 000 грн',
    description: 'Осередки корозії часто приховані під підкрилками та внутрішніми швами.',
    action: 'Оглянути кузов товщиноміром, пороги, арки та днище на підйомнику.',
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
    service: '48 тис. грн / рік',
    fuel: '8.4 л / 100 км',
    benefit: 'Керованість і доступність запчастин',
    warning: 'Перевірити електроніку та АКПП',
  },
  {
    name: 'Audi A6 C6',
    price: 'від 260 000 грн',
    reliability: '7.0 / 10',
    service: '52 тис. грн / рік',
    fuel: '8.7 л / 100 км',
    benefit: 'Комфорт та повний привід',
    warning: 'Діагностика двигуна і трансмісії',
  },
  {
    name: 'Lexus GS',
    price: 'від 370 000 грн',
    reliability: '8.4 / 10',
    service: '42 тис. грн / рік',
    fuel: '10.2 л / 100 км',
    benefit: 'Надійність і якість складання',
    warning: 'Менший вибір на ринку',
  },
  {
    name: 'Volvo S80',
    price: 'від 250 000 грн',
    reliability: '7.6 / 10',
    service: '45 тис. грн / рік',
    fuel: '8.9 л / 100 км',
    benefit: 'Безпека і комфорт',
    warning: 'Перевірити електронні модулі',
  },
]

const faqs = [
  {
    question: 'Що можна перевірити за VIN-кодом?',
    answer:
      'VIN допомагає знайти доступні записи про автомобіль, його характеристики, аукціонні лоти, пошкодження та історію пробігу.',
  },
  {
    question: 'Чи можна додати посилання на оголошення?',
    answer:
      'Так. Вставте посилання на оголошення або аукціон — сервіс використає доступні дані зі сторінки разом із VIN-перевіркою.',
  },
  {
    question: 'Чи замінює звіт огляд на СТО?',
    answer:
      'Ні. Звіт допомагає скласти точний список перевірок і прийняти рішення до огляду автомобіля майстром.',
  },
  {
    question: 'Скільки триває перевірка?',
    answer:
      'Базовий звіт зазвичай формується менш ніж за 30 секунд. Час залежить від кількості фото та доступності зовнішніх джерел.',
  },
]

function SectionTitle({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">{label}</p>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  )
}

function CarPlaceholder({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(135deg,#d9e2ec_0%,#f7f9fb_45%,#aebdca_100%)] ${
        compact ? 'h-20 rounded-xl' : 'h-48 rounded-2xl sm:h-56'
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-slate-300/35" />
      <div className="absolute bottom-[19%] left-[18%] h-[21%] w-[64%] rounded-[48%_48%_22%_22%] border border-slate-500/20 bg-slate-700/85 shadow-[0_16px_18px_rgba(15,23,42,0.2)]">
        <div className="absolute -top-[34%] left-[23%] h-[45%] w-[54%] rounded-t-[50%] border border-slate-400/30 bg-slate-600/85" />
        <div className="absolute -bottom-[22%] left-[8%] h-[34%] w-[16%] rounded-full border-[3px] border-slate-800 bg-slate-300" />
        <div className="absolute -bottom-[22%] right-[8%] h-[34%] w-[16%] rounded-full border-[3px] border-slate-800 bg-slate-300" />
      </div>
      {!compact && (
        <div className="absolute left-4 top-4 rounded-lg border border-white/60 bg-white/85 px-2.5 py-1 text-xs font-medium text-slate-700">
          Приклад звіту
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fa] text-foreground">
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-[#f7f8fa]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Car className="h-5 w-5" />
            </span>
            <span className="text-[15px] font-bold tracking-tight">AI Vehicle Inspector</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            <a href="#capabilities" className="transition-colors hover:text-foreground">
              Можливості
            </a>
            <a href="#model" className="transition-colors hover:text-foreground">
              Ризики моделі
            </a>
            <a href="#report" className="transition-colors hover:text-foreground">
              Приклад звіту
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>

          <a
            href="#check"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Перевірити авто
          </a>
        </div>
      </header>

      <section id="check" className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="grid items-center gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:gap-12">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary">
              <ShieldCheck className="h-4 w-4" />
              Професійна перевірка автомобіля
            </div>

            <h1 className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[62px]">
              Дізнайтесь усе про авто до того, як його купите
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              VIN, посилання на оголошення або фотографії — сервіс збере доступні дані, знайде ризики та покаже,
              що перевірити перед покупкою.
            </p>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-5">
              <VehicleInputForm />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-xs font-medium text-muted-foreground sm:grid-cols-4">
              {['Без реєстрації', 'До 30 секунд', 'AI аналіз фото', 'Перевірені джерела'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-4">
              <CarPlaceholder />

              <div className="grid gap-4 p-2 pt-5 sm:grid-cols-[1fr_0.95fr] sm:p-3 sm:pt-5">
                <div>
                  <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Перевірка завершена</p>
                      <h2 className="mt-1 text-xl font-semibold tracking-tight">Mercedes-Benz E320 CDI</h2>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">WDB2110261A123456</p>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                      Помірний ризик
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <Gauge className="h-4 w-4 text-primary" />
                      <p className="mt-2 text-xs text-muted-foreground">Пробіг</p>
                      <p className="mt-1 text-sm font-bold">214 800 км</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <CircleAlert className="h-4 w-4 text-primary" />
                      <p className="mt-2 text-xs text-muted-foreground">Історія ДТП</p>
                      <p className="mt-1 text-sm font-bold">2 записи</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">Ключові висновки</p>
                    <BadgeCheck className="h-4 w-4 text-primary" />
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      Ремонт задньої частини
                    </li>
                    <li className="flex gap-2">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      Перевірити пробіг
                    </li>
                    <li className="flex gap-2">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      Діагностика SBC
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-xs text-muted-foreground">Резерв на перші роботи</p>
                    <p className="mt-1 text-lg font-bold tracking-tight">35 000–70 000 грн</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 left-6 hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg md:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Рішення AI</p>
                <p className="text-sm font-bold">Огляд на СТО обов&apos;язковий</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <SectionTitle
            label="Один звіт — повна картина"
            title="Все, що потрібно знати перед покупкою"
            description="Історія автомобіля, реальні ризики та технічні підказки для конкретної моделі в одному інтерфейсі."
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="group min-h-[190px] rounded-2xl border border-slate-200 bg-[#fbfcfd] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-primary">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="mt-5 text-sm font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="model" className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:gap-12">
          <div className="xl:sticky xl:top-24 xl:self-start">
            <SectionTitle
              label="Профіль моделі"
              title="Не лише VIN. Розуміння самого автомобіля."
              description="Після перевірки сервіс пояснює, які вузли найчастіше потребують уваги саме у цій моделі."
            />

            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Приклад аналізу</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Mercedes-Benz W211 E320 CDI</h3>

              <div className="mt-7 space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <p className="text-xs text-slate-400">Поширений пробіг на ринку</p>
                  <p className="mt-1 font-semibold">180–250 тис. км</p>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <p className="text-xs text-slate-400">Резерв на перші роботи</p>
                  <p className="mt-1 font-semibold">35 000–70 000 грн</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Профіль надійності</p>
                  <p className="mt-1 font-semibold">Вище середнього за умови догляду</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm font-bold">Типові несправності</p>
                <p className="mt-1 text-xs text-muted-foreground">Оцінка базується на профілі моделі</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">4 ризики</span>
            </div>

            <div className="divide-y divide-slate-100">
              {issues.map((issue) => (
                <article key={issue.name} className="grid gap-5 p-5 lg:grid-cols-[0.65fr_1.45fr_0.8fr] lg:items-start sm:p-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {issue.id}
                      </span>
                      <h3 className="font-bold">{issue.name}</h3>
                    </div>
                    <span className="mt-3 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                      {issue.level}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm leading-6 text-muted-foreground">{issue.description}</p>
                    <p className="mt-3 text-sm leading-6">
                      <span className="font-bold">Перед покупкою: </span>
                      <span className="text-muted-foreground">{issue.action}</span>
                    </p>
                  </div>

                  <dl className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-1">
                    <div>
                      <dt className="text-xs text-muted-foreground">Типово з&apos;являється</dt>
                      <dd className="mt-1 font-bold">{issue.mileage}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Орієнтовний ремонт</dt>
                      <dd className="mt-1 font-bold">{issue.cost}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
              <p className="text-sm text-muted-foreground">
                Це не заміна діагностики — це точний список того, що потрібно перевірити на СТО.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="report" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionTitle
              label="Готовий результат"
              title="Звіт, який допомагає прийняти рішення"
              description="Без таблиць, у яких легко загубитися. Лише важливі дані, ризики та конкретні рекомендації."
            />

            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold transition-colors hover:bg-slate-50"
            >
              <ArrowDownToLine className="h-4 w-4 text-primary" />
              Приклад PDF
            </button>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-[#f7f8fa] shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FileSearch className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-bold">Звіт AV-24018</p>
                  <p className="text-xs text-muted-foreground">Підсумок перевірки автомобіля</p>
                </div>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Помірний ризик</span>
            </div>

            <div className="grid gap-4 p-4 lg:grid-cols-[1.25fr_0.75fr] sm:p-6">
              <div className="space-y-4">
                <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[0.7fr_1.3fr]">
                  <CarPlaceholder compact />

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Mercedes-Benz</p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight">E320 CDI Avantgarde</h3>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">WDB2110261A123456</p>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Пробіг</p>
                        <p className="mt-1 text-sm font-bold">214 800</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ДТП</p>
                        <p className="mt-1 text-sm font-bold">2</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Аукціон</p>
                        <p className="mt-1 text-sm font-bold">1 лот</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-bold">Рекомендації AI</p>
                    <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                      {[
                        'Звірити пробіг із сервісною історією',
                        'Провести діагностику SBC',
                        'Оглянути кузов товщиноміром',
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-5 text-white">
                    <p className="text-sm font-bold">Бюджет після купівлі</p>
                    <p className="mt-4 text-3xl font-semibold tracking-tight">35–70 тис. грн</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Рекомендований резерв на діагностику та першочергові роботи.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold">Стан ключових вузлів</p>

                <div className="mt-5 space-y-5">
                  {[
                    ['Гальмівна система SBC', 'Потрібна діагностика', '68%'],
                    ['Двигун та турбіна', 'Без критичних ознак', '84%'],
                    ['Кузов', 'Перевірити задню частину', '72%'],
                    ['Трансмісія', 'Рекомендований тест-драйв', '78%'],
                  ].map(([title, state, width]) => (
                    <div key={title}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold">{title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{state}</p>
                        </div>
                        <span className="text-sm font-bold text-primary">{width}</span>
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

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-8 xl:grid-cols-[0.75fr_1.25fr] xl:gap-12">
          <div>
            <SectionTitle
              label="Перед купівлею"
              title="Що перевірити на огляді"
              description="Чек-лист адаптується під модель, двигун та ризики, знайдені у звіті."
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {[
                { icon: Wrench, title: 'Середня вартість ТО', value: 'від 8 500 грн' },
                { icon: Fuel, title: 'Середня витрата', value: '8.1 л / 100 км' },
                { icon: ClipboardCheck, title: 'Резерв на сервіс', value: '35–70 тис. грн' },
              ].map(({ icon: Icon, title, value }) => (
                <div key={title} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">{title}</p>
                    <p className="mt-1 text-sm font-bold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-7">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm font-bold">Чек-лист для Mercedes-Benz W211</p>
                <p className="mt-1 text-xs text-muted-foreground">8 пунктів для обов&apos;язкової перевірки</p>
              </div>
              <ClipboardCheck className="h-5 w-5 text-primary" />
            </div>

            <div className="mt-3 grid gap-x-8 md:grid-cols-2">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-3 border-b border-slate-100 py-4">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionTitle
              label="Альтернативи"
              title="Можливо, варто порівняти"
              description="Автомобілі того ж класу, які можуть краще відповідати вашому бюджету та очікуванням."
            />
            <a href="#check" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary">
              Почати перевірку <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {alternatives.map((car) => (
              <article
                key={car.name}
                className="group rounded-2xl border border-slate-200 bg-[#fbfcfd] p-4 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-[0_18px_38px_rgba(15,23,42,0.08)]"
              >
                <CarPlaceholder compact />

                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold tracking-tight">{car.name}</h3>
                    <p className="mt-1 text-sm font-bold text-primary">{car.price}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-y border-slate-200 py-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Надійність</p>
                    <p className="mt-1 text-sm font-bold">{car.reliability}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Витрата</p>
                    <p className="mt-1 text-sm font-bold">{car.fuel}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs leading-5">
                  <p>
                    <span className="font-bold">Плюс: </span>
                    <span className="text-muted-foreground">{car.benefit}</span>
                  </p>
                  <p>
                    <span className="font-bold">Увага: </span>
                    <span className="text-muted-foreground">{car.warning}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionTitle
            label="Як це працює"
            title="Три кроки до впевненого рішення"
            description="Швидко, зрозуміло та без зайвих дій."
          />

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['01', 'Додайте VIN або посилання', 'Вставте дані автомобіля чи завантажте фото.'],
              ['02', 'Отримайте аналіз', 'Система збирає історію та оцінює ризики.'],
              ['03', 'Перевірте авто точно', 'Використайте звіт і чек-лист на огляді.'],
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-primary">{number}</p>
                <h3 className="mt-7 text-sm font-bold">{title}</h3>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Поширені запитання</h2>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-[#fbfcfd]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-slate-200 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left text-sm font-bold sm:px-6">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="max-w-3xl px-5 pb-5 text-sm leading-6 text-muted-foreground sm:px-6">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-[#f7f8fa]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-9 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Car className="h-4 w-4" />
              </span>
              <span className="text-sm font-bold">AI Vehicle Inspector</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Професійний помічник для обґрунтованого вибору автомобіля.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
            <a href="#capabilities" className="hover:text-foreground">Можливості</a>
            <a href="#model" className="hover:text-foreground">Ризики моделі</a>
            <a href="#report" className="hover:text-foreground">Звіт</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
