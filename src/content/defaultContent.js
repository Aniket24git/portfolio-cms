import { v4 as uuidv4 } from 'uuid';

export const defaultProfile = {
  name: "Aniket Pattanaik",
  role: "Product Manager",
  location: "Kolkata, IN",
  status: "Open to new problems",
  hero: {
    statement: "I take messy, ambiguous problems and ship the version that actually moves a number — across growth, platform and 0→1.",
    facts: [
      { k: "Focus", v: "0→1 · Growth · Platform" },
      { k: "Based", v: "Kolkata , IN" },
      { k: "Shipping since", v: "2024" },
    ],
    education: [
      {
        name: "IIM Ranchi",
        short: "IIM-R",
        course: "MBA-BA",
        year: "2024",
        logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAAB4CAMAAABctTnuAAABgFBMVEUAAAAhJCogIykgIykgIyk9PT0lJSggIykgIykhIykAPj4AAFUeJCkdHS4eIikcHBwaKCgAAD4fIykAVVUfIygeHihVVVUAAH8fIio/AD8zGTMkJEhVAAB/f38AVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf40tOAAAAgHRSTlMA/NBwsgQPj1M0BAMtEEsIFARuA4QhAwKlBAoHAwIDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ4CTYAAAr2SURBVHja1VwJm6OqEsUCWRSjSXpm7rtv+f8/8xargGDM1q/jNz1tG4InxaHqVEEk5P9y8L/JJx2afxDYkUj9QXB7IiRi/hy4TOB/n3IMhLGP4i7rhk/yDKxTnwWXfhB5Ee4nkZdA102fBZeS4ZPgwkdNte6TfIOBKz6FDWcLt1s+R+IYuJ8y2XpyMXA7/ikSR3YPmpevRxoVp+R6o3nt5er7K+1U96B5u/WQyYdl6+U0unPoNoes2GjatstEwuSu3e8c7oM7bdFWon8Y7Oz4yjSN/zjqzdatwK0NKet2rTv4uYah7frtcLdsqDXLFaOKV4fvhssKE1W5kMMd4w30t1u3ZMNY40Kpx4N5Yfp2uKciC6+2yuFe4x3YXXR4Bdw8C69zYZPtBPN2l3vw3gd3qcIFfpsLJdzR6YaW434n3MJ91odgk0suydvP3wo3jU5jnQtpN1LZdjS+pg/b9yVwIaOu2IeLNRxwcxPux/t8EC69Z6NN7Ga0VYYBf6vubj48DheqIz2SU3eLDMx9vjEdh4P2fRgufFXZkHGBQcO66EzGYlIeK6E+7ndV3TekGlPW4LrUR1g6yMz8b4U7s+pQp5+C1+HSIG6umYtm8zvhJo5oFb0ZFwSpc1f70D0UPhqWmxPuCevymsw5Q6ol6nD/A352IVtl4WHO74K7kNw3DFsu8CrcIYwLeq8yYp9u4H0cLq+woeAC7/a7Mcbkpbob3mVd3WV/kjxSofEacKNvRrHLSz9Nd+37ONwpw+bNknwC6MncsG4MEBZvEbQve3ifgkuLFKhPrwjShIvejAXtOY5lNWDPvk/B3bIBMh3RhkuC12ZbOuwJ4KfgZmyQ2E7lcbkNdyT/YqH+wMnXjWzqNXCzscfBn9O/zdtacLmN2SLc9roR9L/eY11dpEA5F9pwse054l3ySbBNp14GN2ODLrnQhKs9HhFc9rKtXQyvhzsUbKBFlJsbklgaPGPEq7bmbZV3nrRuxob0XaptXacbxZo0s1o6qt5BhizkyzImt8igvF8e/ftVpQgIVe/wHNzcN0AamoYduC4pYYORDOCQy0q2NL4yE3bW/dXtlM0acIMqZ0tw1bxWnFjI6+HWSzZerc8tiSOjHne6Ttb6ERXzPp4JT5l2LWXKQHajGkT/ys25ILV+NHk13AYb+K51yZ+sXqrtaJxqxaHry+HW2MD8MM7tcrSM8ctK+ip5K8sI98GdN3D72iiGnnYEZFidMDzQZtxnqJVShhfDLVRk/tK8V4GU8bZuaw7s195eBXfLhrhY0YYrcVlQOYAw4yeWdRejXg634hti/aid/OC+t4ksEMwLlDQWNIbXBuFa+ZkTchMu/j35xU10C1TU4bLS9T6+yDq1Fv1W/9MmAzMpw+T7Q140rAs9eTXcDRvWWuKedU27fzv7YhLdN8IjJ6+3Lm9lAi24fv/FCUOajitH0B2Ya6+AmxsmWaiYoQWX+jva9I7ZTB3qC7jnFtx0GrbuU5tqq8v3Bhlr1s0X33hAw8OOvWPrRWI9UsPT+uXfyfXEurPCQ2v3fzKXedK7rK69aaPV4X94QR9b3nr6GK+PvIsHT4V7j20NQB6Cyyd3LDx3cT3pe/uTN+/7oXdH6r+niSe7rtJVK9vS/pR4T3EuSSNwbi1vldwFWeygAMBYc401QzAHevPf5IInyRYRKQzRgVGbJ0jXyndgz37bixf8ndFBBYXDrbCFBtyhPdXKFWbYLD9pb4coPjSkSsH5YIizla1+oNxtPjjNYNpS3pppm/JT3cld/djoEq7w2QpsF06MH3RwWfRuCdzNpDk7zcB3VunrfpfhxC085pR7n3VxD3u/rHCdH2aUUmYzwXvgmtQPokVYHe7kOsjgcq8+YbslYS7XIi9kte4Qlpws8vUKG8/jEbijE+YHF5sjXDUvdtUD8tSPrfE/WTrNyOD4eY0T/07rntEsup2gmglspjXlG+vSTK4ZSoqTZcPvAq5M4PIydvupJqU8KbgN14QLy84eut2DpnDFhYr0xm79Rg6rJHJwwfmEFa4uZ0Nppltw0TDavOvUdbfwjqVnWMUld0UUFj+Ch2v9gFpprkqNdz/cjUTpdj1aglZnE431fCWIJ4Pb1Sxz6z4Nd7xt3GjL9e9SEAKsAjnAtQ5jDRNLgwzo2KRkh6073TZuMG/nXUAq/NSmZuDh8qh3E8/gffM1gWvdHz0It+kWaru/rDFkWvErNtMwLBEFuEvsGZKWWEccxuzWSz8MgzhqXX4ErTeQm3YsXQ+wHkHyZZlk+BQe7hy7hujmfbazWOfo4U4hvzkA93rMuGjeCW/o4LpBtvJnSAIcD1cDGWKwBF+ac38KwRy5HoB70LjeF3gnrBJFw0LnfYxM3pHxWCqCJOonNYH74Y4ttVDP3Bzc2cHA8rAfYJ1IBxUrhjiFRsiD+S9Ik+wSLrQF5P4muUqFBJ2NIhgvpfVV5kQanmp0Q5fgYvCcWk+lzNnVnVzQTyXynPnwrn27y2UK7/DNVOhlC7fpxL5OhWN42TFppflMHvpKguiaO+nSfVKCuHQLtZ7zB+Mw+jNMrcY1NwvJWkzPbKY2puNZZHMhjUvyvDLlKzO2mpvlZBF3bdqK6eHbvvDBW1QAN1hcCsaE5D/lC7gt46rawB0iJs0rI6n4M7kyeeKLVbQtEOLQ4s/x3chnHC7GgFV3gP5iAuQTZRbVQns5vv940+VinVXDwNMT30hdoBkNmvZU/tDrj3bVLlf2kmDPKFubhP/twRxTllgjU8VhOlR8S8NmOIO9vbwmdzNf1Ay/zFnnzxl04TV7Glt2XfyxQrk3NI5tk4bgL4vjHlfM+0xQUsIX+oyTNNVUwBqxCaeCEUkpBlEzSRWVzKx/YUsbp8z/5gIWmuhaIOH2mnNAizCbFKScsMRpFkq0PiZy4bRPILOhy6xrUIyihqAoeyazWACC4m5hB5fha3YviPnFBDdwewtXrHC1g2uDtUuCpRkg2okRjELtb3/PpmPyFt9xSYv1f+HWVYG2MIKLoRjkmNUovInqDFzeOWOaIQUUi3gmMdTDl+iCdf8YNkymEZjPxKTCRxqYuh81AQnLeQvP0Z7WLCYaVqgjcQVHGIGYAA1mw62B+8tsvqcMxQsZO4XWmU7YhDEt0Md8MYR7xsCIfL54uL+NKZ21cTRwshgyCbZgwU9I86mWPKNTfsebpMwWPpig6ljoUmY6YH/IcRxPxTj526zQMjZJ7GkY0GUrl5JxgYaTymzLPaF5dE4G6vmspjNFIYpwe6yk4icE1uVkGDJ1neYVhw5teKg7/MdMn72ttw6IzJBhMEzAJn/9Rf5rJhlVCMlcQ1LOOBwCEtcEwpXKkE7C7KXxVWpDK7VBS7kc5XD2+uqeYGMsI5g6uTDNGfcXFU4r4YxAMRvA19wSA7IMdy4CxyZSRLB/CPU15xknAjUpqeswVceIVod9UTgDHg0xM5e22I23AXjjc1VigUmrblIPfxN7YUpLdsLfAufeeZVDYzVlufn0kKaskUHBQmfn5aPSE6enVUICXplpNLJ0JL3xNd3p8b6kX/vib3wUAQ2JNBr5NP7opx7gnt2wh5ub6TacnnuKQP/mxxxMIYzxBVztiP1g28Y1LT1bIcfv+97iNx+xGrjYhFLiZGM/9nkXU5C3jFsrG/0EP/YBDQpixcCVtHF3H+ifTgRU1P45HSio5x8K9gRRfTvTKjKffqzHnYXN9iiOPaeChprMz3/c2/gRQMdQj0EXkVUD7z7+AR2gaFBut4TWAAAAAElFTkSuQmCC",
      },
      {
        name: "Silicon Institute of Technology",
        short: "SIT",
        course: "B.Tech, ECE",
        year: "2021",
        logo: "data:image/png;base64,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",
      },
    ],
    certifications: [
      {
        issuer: "Product School",
        cert: "Product Discovery (PDC)",
        year: "Dec 2024",
        short: "PS",
        logo: "data:image/jpeg;base64,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",
      },
      {
        issuer: "McKinsey & Company",
        cert: "Forward Program",
        year: "Jul 2025",
        short: "McK",
        logo: "data:image/png;base64,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",
      },
      {
        issuer: "Anthropic",
        cert: "AI Fluency",
        year: "Mar 2026",
        short: "A",
        logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX///8YGBgAAAD39/cWFhYNDQ0RERHt7e1XV1ff399AQEAQEBAICAgGBgb6+vr29vY4ODjZ2dkqKiqZmZlsbGyHh4dHR0fn5+fa2trS0tK8vLx4eHipqanw8PAkJCQ1NTWysrLIyMhycnJPT0+dnZ1/f3+RkZFmZmYtLS1fX1+tra0dHR3JyclWVlZLS0uoc4RJAAAJWUlEQVR4nO2d6VbjPAyGSeqktFm6ULrRDQqUAsP9X95HgZlhaR4lseN+c46e3yTElfNalmTl7ExRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEX5RN5rITlejRf3+Fpf3IXMOT7mEK+98jUIotePA8IEHbr8IjTF18b9pa9hAI8pPOKB8JIu73ThBzLpwtcwiundpDzAIBm34fr8LoNr01HP20iKmA0FEwbGbOgG1zHcwKxmnsZRzGUoDPDVEDdkiHycwLXhnbeRFD3fkHXmzRDDAd3ign6jeHXqabqRTShqzZp+pHDjaSQF5DekE38MsaYlMb+ie2SjlrfRHEPWmQOGDXG9Iq0ZPnsay3HuszIjfNUaMsRyG8EIs3tvozn2bF3Swb/EDyj6t6g161P6NXNyuT4bIkRDTJ5omp5Ua0ZldObNEH10v1Gv0p2v4fyknM68Ec7pRtdoxNXptOYiKj/CG7pR+xdpTXTha0A/ngv9ra/YaE3Snfga0jfm5ZaKd0OkaIgJSdbptGYv7Zu+GGKMor+je6Xnvob0lakpb8KDIVBr5nQzE6Pr3hi3JRfDD7IR3axNfk0QnkRrJvhMRwyxQkPcki4n41NoDc6rYyOMbul2U3S/Y5ziDVFJZw5EW4rXsH+U7n0N6y+dCkvFhyES1hpeMDAk2QgYeygwBDqYyxfUGu97KNa+WoZgrXnxrTVz8pULDYFaM3ug2HDgWWvy0vumz0RbNMQVTfxs5zde06ljwsA8WWjNk1+tqaEzb4ZAv6aFMRG/WrOssG/6YgjDeShagZKuz3jNPKgzSYN/R2taGMMlohfMQ+F9Of3hFo7D00JpozXxw9TXAM/uQWeMGZFLnl1hgJ9TGJj+cElOee14PSVJjIeoNfTbCekPl1zTXEqvODXPm9kBJeuEMIE7UA8OijeguZZ0yTdpXdGeLMP0hzumNEkPqxam9o25pptvKOcdr/3Ea+RJOKddQnaFeSjyJYT0hysw7/4eFVvSNI37qDVYF8BT3BWsM6NcekzDWoM+vR+toT3O78KSGT1m0qfb5yPSGk5/uIF15iPq16MQtgkxl7Qhn9eH1mCs4Y8SbMivCdGvwfiIkP5wQQ/zYOHvBFMH3Z5ufb8m2jbtfqNvHG3//B1qTYZ7KIxTNq81N/jkfysJn/mXQNE/R78GwwT2dMhv/Dz7cnybQvRr5lzL1+weCnUmu/ukIAsqO+Xa38mWfIoUp7gtyz3q3GfLDFBr2K9hrTnH9IclmG9Kul/+9o7eWM5DDWhJNFGTWoN1L9/c4jkaYo+iT0vSq2fY3ACxniB++DbzyP02EWsNLxjNpTAWGHb/vj3Ft4kdzAnHhhvTGtaZH+HMAUY/V2iIe1Li5rQGa7N+VuTzVj/EcwZYTyaEJC3AcwNHQn2bhAyxpyB9jjn0rKGjNFwjGf9c4Za0JJqAtQbzUJz+qA3qTLo/siOiJVEwRJte4oa0poee5tFTIzMudEK9wPrqaNtEHgrrzZPxsXnTw7fp/6Y1+SU+7fGUwoJ2CezX9HaYh7pzH+Cf4OoWHq8e5YNpK44NYwqD0x+1WJC4FYbPuPgAc0k9rCpzrzV5F89EFL1SM/Rkh+jXeI4NP9MvGq+L9t05O5ioNc9cy4dTvDr5Zc33/hYdzC3pRQ9jw5ljrWHJgNpIzLSZJzTEI4VMhDBBZTDqknSLZV8oPrjE2DD+OhySrAzpDKd1ufjAJg+F6Y+qoCSaJ8oltDhv/Yj/lqZp0RpcD3ShU0xDCIGzLl3awjMKLtsRdEjzhaPaZzMUfTbEI+a8Of1RiQVtZaU6ehZ9rpHBeI2JnLUjaJ2jzkh1PFh8kLAhUGvc5aFmtFTIL/wEt/oJaw2Xt7s6tofucySfExAMgTrF08dRznti25sDM20mxLw1uhpx301sWNAZWdBaFGcV+kJMsLbFjdb0dvWf74MFnjPg85M8xTEkWRasHCnnWLDfbiy0xrjQGtQZs+6UAadBynkoPkrjQGuW2LzErMbdEjxQQMIYnAcYPjEr+xQG/oPD3rAMXPcuaA36NRwmKAP7XG6I+1jejuGFaGerNRgscYSJUGueUeo4TFCCEk2S7OF+VznmvG3bLLHOuELod4UpIVutefRhQlFr+IyCldbkuMl2R7zCUxgcYtjbxIYx3+QSjtc8Yx6K0x8CWDDgkgy1Zol7KE5/MG2h6aM7hH5XqDXxuv4e6rFaXwgb2BBtPLJqoTWVmwrUR+h3xWGG2q1P0JlwjaA1GJKs7dd405kDGbYjaHPZZ82jNFxc5hpRaxrIQ218mlAyBJcrZTjFC6nRF8KGpIsOJpXQB9FLnQEO/C0Vb0jtI7H6qFYeCnNGTcA9aNivqXNsDwOVjSDFazBsWyMPVbVJkj0m42N7WLIUb6oOkAs8m0HoQcN+za+qpRlTr0vFOyZBQ+DRzupawzpjorrgZoW1Bss/K7cjYJ0x6/O6UHz/1RB4pskm/fEDbF5i4sWyXY8ldmCX2hFgfY1QTvANPOVq1QGPyyuEOwvxmio5b2yAZxeixGVN6EFzjWHFpypag3Fgu1IdzLQF6Q5FnysdK/zweIwgiMYWA5SydQa1BtttxuvysWE+xGlZnovLmuBgTvm02KbsM3C+ybbsMceUJ++hhM997MpqDR7JEroElQA7hwhagz1FzLCsQLDOWJcfY1cGKQ/l5HMfOZrQvoScvxgRD1FrhM99lHs2PN7qovUdd+Pnf4B7qJKf++Cf2MVxeJ4k8ZoMwVrD6Y/foPfn5vNEgkPBWkNBN6Hz+wf3FlJXkgF+cYD7XWHrkVLvUA89Izct7tmxF3rQoNYkJT5jZiMDpcGiWuGfYGy4jNZgc1lX9fGcmU/6KPqWn/tgfybiL/2VB3d6Nloj+zX4UQ6hZLkCM9olBuENHqWh2LCYh8IPEzms/2dFjPsWWoMdUkWdcddeE8/PCrFhq8994OHbwFltvOR+C+cM9vVb8E+xP3CCR3gqYqU1mIcyNMV56+b0Oxq81Rc+91Hbr+Eri8/C1iHvk+8k7aH4ZGqx34XxGddn4LF5t9Bbr4NlYJD+YH+GP09RGWze/epboIPJWlPo10zx1UjGbs+H8/lZk3JsmNssFWnNJX+b2XWv6Q3/OxT9dh+vLYrX8Oe1he9r10D4f3htbnGtoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoijKv8t/sbCynesjQ+YAAAAASUVORK5CYII=",
      },
    ]
  },
};

export const defaultProjects = [
  {
    id: uuidv4(),
    order: 0,
    schemaVersion: 1,
    idx: "01",
    year: "2025",
    title: "Project Alpha",
    blurb: "A brief description of Project Alpha.",
    cover: "https://placehold.co/800x600?text=Project+Alpha",
    tags: ["0→1", "Growth"],
  },
  {
    id: uuidv4(),
    order: 1,
    schemaVersion: 1,
    idx: "02",
    year: "2024",
    title: "Platform Scaling",
    blurb: "A brief description of Platform Scaling.",
    cover: "https://placehold.co/800x600?text=Platform+Scaling",
    tags: ["Platform"],
  }
];

export const defaultCaseStudies = [
  {
    id: uuidv4(),
    order: 0,
    schemaVersion: 1,
    idx: "01",
    kicker: "Growth",
    title: "Unlocking User Retention",
    problem: "Users were dropping off after the first 7 days.",
    approach: "Implemented a habit-forming core loop.",
    outcome: "Increased D7 retention by 15%.",
    metrics: [{ v: "+15%", l: "D7 Retention" }],
  }
];

export const defaultTeardownDetail = {
  context: "I pulled {app} apart to understand one thing: how it earns the next tap. This is a working teardown — the notes below are the friction I felt as a first-time user, the moves I'd happily steal, and the places where the seams still show. Swap this copy for the real write-up.",
  broken: [
    "The first run asks for a decision before it has earned one — the opening screen is a wall, not a doorway.",
    "The thing I actually came to do sits one menu too deep; the primary action should never be a treasure hunt.",
    "Some state changes happen in silence — no confirmation, no motion — so I'm never quite sure the action landed.",
  ],
  works: [
    "The core loop is tight: the primary action stays within thumb reach and is rarely more than a tap away.",
    "Motion is used as explanation, not decoration — every transition tells me where I came from and where I'm headed.",
    "Defaults are opinionated. {app} makes the boring choices for me so I can spend attention on the interesting ones.",
  ],
  screens: [
    { tag: "first run", cap: "Onboarding — the first decision {app} asks of a new user." },
    { tag: "core loop", cap: "The main flow, annotated for the aha-moment." },
    { tag: "edge case", cap: "What happens when something goes wrong." },
  ],
  criteria: ["First-run", "Core flow", "Craft & polish", "Performance", "Trust signals"],
};

export const defaultTeardowns = [
  {
    id: uuidv4(),
    order: 0,
    schemaVersion: 1,
    idx: "01",
    app: "Linear",
    title: "Speed as a feature",
    verdict: "Keyboard-first, optimistic UI, zero spinner culture.",
    tags: ["Craft", "Perf"],
    rating: 9.1,
    scores: [8.0, 9.6, 9.8, 9.4, 8.2],
    details: defaultTeardownDetail,
  },
  {
    id: uuidv4(),
    order: 1,
    schemaVersion: 1,
    idx: "02",
    app: "Duolingo",
    title: "Streaks that respect you",
    verdict: "Loss-aversion done with warmth instead of dark patterns.",
    tags: ["Retention", "Behavior"],
    rating: 8.4,
    scores: [9.2, 8.4, 8.6, 8.0, 7.6],
    details: defaultTeardownDetail,
  }
];

export const defaultAnalytics = {
  intro: "A short field guide to how I reason about product metrics — what I instrument, what I ignore, and how I keep a team honest.",
  projects: [
    {
      id: uuidv4(),
      order: 0,
      schemaVersion: 1,
      idx: "01",
      year: "2025",
      title: "Metric Deep Dive",
      blurb: "Analysis of user behavior over time.",
      cover: "https://placehold.co/800x600?text=Metrics",
      stat: { v: "42%", l: "Activation Rate" },
      tags: ["Analytics"],
    }
  ]
};

export const defaultContent = {
  ...defaultProfile,
  projects: defaultProjects,
  caseStudies: defaultCaseStudies,
  teardowns: defaultTeardowns,
  analytics: defaultAnalytics,
};
