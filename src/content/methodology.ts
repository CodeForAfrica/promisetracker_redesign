import type { L10n } from "@/lib/i18n";
import type { Rating, Tier } from "@/lib/types";

export const methodology = {
  kicker: { en: "Methodology", fr: "Méthodologie" },
  title: { en: "How a rating is decided", fr: "Comment une évaluation est décidée" },
  lede: {
    en: "A promise on this site is a political commitment made by somebody who is now in office. We source each one from a cited document, assess progress against public evidence, and publish the rating with the date it was reviewed.",
    fr: "Une promesse, sur ce site, est un engagement politique pris par une personne aujourd'hui en fonction. Nous sourçons chacune à partir d'un document cité, évaluons les progrès à partir de preuves publiques, et publions l'évaluation avec sa date d'examen.",
  },
  pullQuote: {
    en: "Nothing is rated by the person who made the promise, and nothing is rated by a public vote.",
    fr: "Rien n'est évalué par la personne qui a fait la promesse, et rien n'est évalué par un vote du public.",
  },
  inShort: { en: "In short", fr: "En bref" },
  steps: [
    { en: "A commitment is found in a cited document and recorded with its deadline.", fr: "Un engagement est repéré dans un document cité et consigné avec son échéance." },
    { en: "It is published at Unstarted with at least one source.", fr: "Il est publié à Non commencé avec au moins une source." },
    {
      en: "An editor reviews it against public evidence and moves the rating when the evidence moves.",
      fr: "Un rédacteur l'examine à partir de preuves publiques et modifie l'évaluation quand les preuves évoluent.",
    },
    {
      en: "Every change is logged with its date, its cause and the source that prompted it.",
      fr: "Chaque changement est consigné avec sa date, sa cause et la source qui l'a motivé.",
    },
  ] as L10n[],
  sixTitle: { en: "The six ratings, and what each one requires", fr: "Les six évaluations, et ce que chacune exige" },
  tierNote: {
    kept: { en: "two ratings", fr: "deux évaluations" },
    uncertain: { en: "two ratings", fr: "deux évaluations" },
    "not-kept": { en: "two ratings, both of which need a deadline", fr: "deux évaluations, qui exigent toutes deux une échéance" },
  } as Record<Tier, L10n>,
  requires: {
    completed: { en: "Evidence of delivery", fr: "Preuve de livraison" },
    "in-progress": { en: "Evidence of activity", fr: "Preuve d'activité" },
    unstarted: { en: "The default. No deadline needed", fr: "Par défaut. Aucune échéance requise" },
    inconclusive: { en: "Partial delivery", fr: "Livraison partielle" },
    "behind-schedule": { en: "Deadline required", fr: "Échéance requise" },
    stalled: { en: "Deadline required", fr: "Échéance requise" },
  } as Record<Rating, L10n>,
  willTitle: { en: "What we will and will not do", fr: "Ce que nous faisons et ne faisons pas" },
  will: [
    {
      title: { en: "Labels can change, definitions cannot", fr: "Les libellés peuvent changer, pas les définitions" },
      body: {
        en: "Renaming Completed to Delivered changes no claim about anybody. Editing a definition changes what the site asserts about every promise already carrying that rating, so moving where the line falls is a re-rating and shows in the log.",
        fr: "Renommer Réalisée en Livrée ne change rien à ce qui est affirmé. Modifier une définition change ce que le site affirme de chaque promesse qui porte déjà cette évaluation : déplacer la limite est une réévaluation, et elle figure au journal.",
      },
    },
    {
      title: { en: "We do not rate candidates", fr: "Nous n'évaluons pas les candidats" },
      body: {
        en: "An entity appears once it has won and taken office, with its campaign promises alongside it. Before that there is nothing to hold anyone to.",
        fr: "Une entité apparaît une fois élue et en fonction, avec ses promesses de campagne. Avant cela, il n'y a rien à quoi tenir quiconque.",
      },
    },
    {
      title: { en: "We do not rate ministries or agencies", fr: "Nous n'évaluons ni ministères ni agences" },
      body: {
        en: "They are often the body doing the work, but nobody elected them. The question this site answers is the one put to voters: you asked for our votes on these terms, what happened.",
        fr: "Ce sont souvent eux qui font le travail, mais personne ne les a élus. La question à laquelle répond ce site est celle posée aux électeurs : vous avez demandé nos voix à ces conditions, qu'en est-il advenu.",
      },
    },
    {
      title: { en: "A promise needs one source to publish", fr: "Une promesse exige une source pour être publiée" },
      body: {
        en: "Cited, and openable by the reader. A promise we cannot source is one we do not carry, however widely it was reported.",
        fr: "Citée, et consultable par le lecteur. Une promesse que nous ne pouvons pas sourcer n'est pas publiée, aussi largement rapportée soit-elle.",
      },
    },
    {
      title: { en: "Small numbers get no percentage", fr: "Pas de pourcentage pour les petits nombres" },
      body: {
        en: "One kept out of three is not thirty three per cent of anything. Below the threshold we publish counts, because a misleading figure about a named politician is the kind of mistake that costs a fact-checking organisation its credibility.",
        fr: "Une sur trois n'est pas trente-trois pour cent de quoi que ce soit. Sous le seuil, nous publions des nombres, car un chiffre trompeur sur un élu nommé est le genre d'erreur qui coûte sa crédibilité à un organisme de vérification.",
      },
    },
    {
      title: { en: "You send it in, an editor decides", fr: "Vous envoyez, un rédacteur décide" },
      body: {
        en: "Anyone can submit evidence, a correction or a note that something has changed. Nothing a visitor sends changes a rating on its own, and every change that results is logged like any other.",
        fr: "Chacun peut envoyer une preuve, une correction ou signaler un changement. Rien de ce qu'envoie un visiteur ne change une évaluation à lui seul, et chaque changement qui en résulte est consigné comme les autres.",
      },
    },
  ],
  links: [
    {
      title: { en: "Also worth reading", fr: "À lire aussi" },
      items: [
        { label: { en: "Corrections policy", fr: "Politique de correction" } },
        { label: { en: "Who funds this", fr: "Qui finance ce projet" } },
        { label: { en: "Republish our work", fr: "Republier notre travail" } },
      ],
    },
    {
      title: { en: "Send us something", fr: "Nous envoyer quelque chose" },
      items: [
        { label: { en: "Submit an update", fr: "Proposer une mise à jour" }, href: "/ke/p/kibra-housing/update" },
        { label: { en: "Send a correction", fr: "Envoyer une correction" }, href: "/ke/p/kibra-housing/update?kind=correction" },
        { label: { en: "Suggest a promise", fr: "Suggérer une promesse" } },
      ],
    },
    {
      title: { en: "The data", fr: "Les données" },
      items: [
        { label: { en: "Download the data", fr: "Télécharger les données" }, external: "https://open.africa" },
        { label: { en: "open.AFRICA", fr: "open.AFRICA" }, external: "https://open.africa" },
        { label: { en: "sourceAFRICA", fr: "sourceAFRICA" }, external: "https://sourceafrica.net" },
      ],
    },
  ] as Array<{ title: L10n; items: Array<{ label: L10n; href?: string; external?: string }> }>,
  hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&h=900&fit=crop&auto=format&q=70",
};
