import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  ChevronRight,
  CheckCircle2,
  Clock3,
  Mail,
  Megaphone,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users2,
  Wallet,
} from "lucide-react";

const platformFeatures = [
  {
    title: "Event Setup",
    description:
      "Build branded event pages with registration and custom forms in minutes.",
    icon: CalendarCheck2,
    accent: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    title: "Smart Promotion",
    description:
      "Schedule reminders and promote campaigns to increase attendance.",
    icon: Megaphone,
    accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    title: "Secure Ticketing",
    description:
      "Accept payments, validate tickets, and check in guests seamlessly.",
    icon: Shield,
    accent: "bg-sky-50 text-sky-700 border-sky-100",
  },
  {
    title: "Growth Insights",
    description:
      "Track sales and fundraising outcomes with real-time event analytics.",
    icon: BarChart3,
    accent: "bg-amber-50 text-amber-700 border-amber-100",
  },
];

const forWho = [
  "Faith communities",
  "Campus organizations",
  "NGOs and nonprofits",
];

const stats = [
  { label: "Fundraising growth", value: "30%" },
  { label: "Organizer success rate", value: "80.0%" },
  { label: "Setup time", value: "10 mins" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f6f3ff] text-slate-900">
      <main className="mx-auto max-w-md px-4 pb-16 pt-5 sm:max-w-2xl">
        <section className="rounded-[28px] border border-violet-100 bg-white px-4 pb-5 pt-4 shadow-[0_8px_24px_rgba(72,57,142,0.08)] sm:px-8">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white">
                G
              </span>
              <span className="text-sm font-semibold tracking-wide text-slate-900">
                GATHRIO
              </span>
            </div>
            <Link
              href="/signin"
              className="rounded-full border border-violet-200 px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-500">
            Event + Fundraising Platform
          </p>
          <h1 className="mt-2 text-center text-[34px] font-extrabold leading-[1.05] tracking-[-0.02em] text-slate-900 sm:text-[42px]">
            Connect Events
            <br />
            Raise Funds
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-[13px] leading-5 text-slate-600">
            Run registrations, collect payments, and track performance from one
            modern event workspace.
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Start Free Trial
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Browse Events
            </Link>
          </div>

          <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#1b2046] to-[#2a2f63] p-4 text-white">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-violet-200">Live Event Analytics</p>
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium">
                Updating
              </span>
            </div>
            <div className="mt-3 h-24 rounded-xl bg-gradient-to-br from-violet-500/30 via-indigo-400/20 to-cyan-300/20 p-2">
              <div className="flex h-full items-end gap-1.5">
                {[36, 44, 52, 40, 62, 74, 60].map((value, idx) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    className="w-full rounded-t-md bg-white/70"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-[12px] text-violet-100">
              1,240 tickets sold this month
            </p>
          </div>
        </section>

        <section className="mt-3 rounded-3xl border border-violet-100 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(72,57,142,0.07)] sm:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            For who?
          </p>
          <h2 className="mt-2 text-center text-[22px] font-bold tracking-[-0.01em]">
            A solution for every
            <br />
            growing community
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-2.5">
            {forWho.map((group) => (
              <div
                key={group}
                className="rounded-xl border border-violet-100 bg-violet-50/40 px-3 py-2.5 text-center text-sm font-medium text-slate-700"
              >
                {group}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-3xl border border-violet-100 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(72,57,142,0.07)] sm:px-8">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="text-violet-600" size={16} />
            <h2 className="text-base font-semibold">Platform features</h2>
          </div>
          <div className="space-y-2.5">
            {platformFeatures.map(({ title, description, icon: Icon, accent }) => (
              <div
                key={title}
                className={`rounded-2xl border p-3.5 ${accent}`}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <Icon size={15} />
                  <h3 className="text-[13px] font-semibold">{title}</h3>
                </div>
                <p className="text-[12px] leading-5 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-3xl border border-violet-100 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(72,57,142,0.07)] sm:px-8">
          <h2 className="text-base font-semibold">Strategic insights</h2>
          <div className="mt-3 h-36 rounded-2xl bg-gradient-to-b from-violet-50 to-white p-3">
            <div className="flex h-full items-end gap-1.5">
              {[20, 26, 34, 32, 40, 52, 64, 58, 72, 78].map((height, idx) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="w-full rounded-t bg-violet-400/85"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-violet-100 bg-violet-50 px-2 py-2.5 text-center"
              >
                <p className="text-[16px] font-bold leading-none text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] leading-tight text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-3xl border border-violet-100 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(72,57,142,0.07)] sm:px-8">
          <h2 className="text-base font-semibold">What organizers say</h2>
          <div className="mt-3 rounded-2xl bg-slate-50 p-4">
            <p className="text-[13px] leading-5 text-slate-700">
              &quot;Gathrio helped us launch our annual conference in a week and still
              exceed our fundraising target.&quot;
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <Users2 size={14} />
              <span>Operations Lead, City Youth Network</span>
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-3xl border border-violet-100 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(72,57,142,0.07)] sm:px-8">
          <h2 className="text-base font-semibold">Simple pricing</h2>
          <div className="mt-3 rounded-2xl border border-violet-200 bg-violet-50 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-violet-600">
              Launch plan
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              $20<span className="text-sm font-medium text-slate-500">/month</span>
            </p>
            <p className="mt-2 text-xs text-slate-600">
              Includes event pages, payment processing, and attendee management.
            </p>
            <Link
              href="/signup"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-700"
            >
              Get started <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        <section className="mt-3 rounded-3xl border border-violet-100 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(72,57,142,0.07)] sm:px-8">
          <h2 className="text-base font-semibold">FAQ</h2>
          <div className="mt-3 space-y-2">
            {[
              "Can I run free and paid events together?",
              "Do you support multiple organizers per event?",
              "Can attendees receive confirmation by email?",
            ].map((question) => (
              <div
                key={question}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"
              >
                {question}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-700 px-4 py-7 text-white shadow-lg sm:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-100">
            Ready to scale your next event?
          </p>
          <h2 className="mt-2 text-[24px] font-bold leading-tight">
            Build your launch funnel
            <br />
            with Gathrio.
          </h2>
          <p className="mt-3 text-[13px] leading-5 text-violet-100">
            Get early access to a full event and fundraising workflow your team can
            trust.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Create account
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center justify-center rounded-xl border border-violet-300/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Talk to sales
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#12152b] px-4 py-10 text-violet-100">
        <div className="mx-auto max-w-md sm:max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 text-xs font-bold text-white">
              G
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              GATHRIO
            </span>
          </div>
          <p className="mt-3 max-w-sm text-[13px] leading-5 text-violet-200">
            The event operations and fundraising platform helping communities launch
            faster.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-violet-200">
            <Link href="/events" className="transition hover:text-white">
              Events
            </Link>
            <Link href="/signup" className="transition hover:text-white">
              Create account
            </Link>
            <Link href="/signin" className="transition hover:text-white">
              Sign in
            </Link>
            <Link href="/dashboard" className="transition hover:text-white">
              Dashboard
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-violet-300">
            <div className="flex items-center gap-1.5">
              <Mail size={13} />
              <span>hello@gathrio.com</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone size={13} />
              <span>+1 800 123 4567</span>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-violet-300">
            <CheckCircle2 size={13} />
            <span>Trusted by churches, schools, and nonprofits.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}