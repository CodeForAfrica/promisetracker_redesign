import { defineDict } from "./util";

export const listDict = defineDict({
  en: {
    country: "Country",
    rating: "Rating",
    topic: "Topic",
    official: "Official",
    all: "All",
    sort: "Sort",
    soonest: "Soonest due",
    reviewed: "Recently reviewed",
    due: "Due {date}",
    overdue: "Overdue {date}",
    met: "Met {date}",
    none: "No promises match these filters.",
    clear: "Clear filters",
    showing: "{n} shown",
    more: "Show the next {n} →",
  },
  fr: {
    country: "Pays",
    rating: "Évaluation",
    topic: "Thème",
    official: "Élu",
    all: "Tous",
    sort: "Tri",
    soonest: "Échéance la plus proche",
    reviewed: "Examinées récemment",
    due: "Échéance {date}",
    overdue: "En retard depuis {date}",
    met: "Tenue {date}",
    none: "Aucune promesse ne correspond à ces filtres.",
    clear: "Effacer les filtres",
    showing: "{n} affichées",
    more: "Afficher les {n} suivantes →",
  },
});

export const countyDict = defineDict({
  en: {
    countySnapshot: "County snapshot",
    keptAcross: "of {n} promises kept, across all {k}",
    represents: "Who represents you here",
    promisesFor: "Promises for this county",
    allN: "All {n}",
    onePerson: "One person answers for this county so far.",
  },
  fr: {
    countySnapshot: "Aperçu du comté",
    keptAcross: "des {n} promesses tenues, tous élus confondus",
    represents: "Qui vous représente ici",
    promisesFor: "Promesses pour ce comté",
    allN: "{n} au total",
    onePerson: "Une seule personne répond pour ce comté à ce jour.",
  },
});
