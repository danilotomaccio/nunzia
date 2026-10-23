(() => {
  "use strict";

  document.documentElement.classList.add("js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Anno nel footer ---------- */
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Animazioni di ingresso ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Testi in base alla lingua della pagina ---------- */
  const en = document.documentElement.lang === "en";
  const t = en
    ? { copied: "Copied to clipboard", linkCopied: "Link copied" }
    : { copied: "Copiato negli appunti", linkCopied: "Link copiato" };

  /* ---------- Lingua: ricorda la scelta fatta col selettore ---------- */
  document.querySelectorAll("[data-lang]").forEach((link) => {
    link.addEventListener("click", () => {
      try { localStorage.setItem("lang", link.dataset.lang); } catch { /* storage non disponibile */ }
    });
  });

  /* ---------- Toast ---------- */
  const toastEl = document.querySelector(".toast");
  let toastTimer;
  const toast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-shown"), 2200);
  };

  /* ---------- Copia negli appunti ---------- */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        toast(t.copied);
      } catch {
        toast(btn.dataset.copy);
      }
    });
  });

  /* ---------- Condividi ---------- */
  const shareBtn = document.querySelector("[data-share]");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const data = { title: document.title, url: location.href };
      if (navigator.share) {
        try { await navigator.share(data); } catch { /* annullato */ }
        return;
      }
      try {
        await navigator.clipboard.writeText(location.href);
        toast(t.linkCopied);
      } catch {
        toast(location.href);
      }
    });
  }

  /* ---------- Elica del DNA (hero) ---------- */
  const canvas = document.querySelector(".hero__helix");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = 1, raf = 0, visible = true;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);

    // elica diagonale che attraversa la hero sul lato destro
    const wide = w > 720;
    const cx = wide ? w * 0.74 : w * 0.78;
    const amp = Math.min(wide ? 90 : 60, w * 0.16);
    const steps = 34;
    const spacing = (h + 160) / steps;
    const tilt = wide ? -0.18 : -0.05;
    const phase = t * 0.00045;

    for (let i = 0; i < steps; i++) {
      const y = -80 + i * spacing;
      const a = i * 0.42 + phase;
      const s = Math.sin(a);
      const c = Math.cos(a);
      const x0 = cx + (y - h / 2) * tilt;
      const x1 = x0 + s * amp;
      const x2 = x0 - s * amp;

      // coppia di basi
      ctx.strokeStyle = `rgba(169, 194, 191, ${0.1 + 0.12 * Math.abs(c)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();

      // i due filamenti: la profondità (cos) regola dimensione e opacità
      const front = c > 0;
      const r1 = 2.2 + 2 * (c + 1) / 2;
      const r2 = 2.2 + 2 * (1 - c) / 2;
      ctx.fillStyle = `rgba(94, 234, 212, ${front ? 0.85 : 0.35})`;
      ctx.beginPath(); ctx.arc(x1, y, r1, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(224, 165, 124, ${front ? 0.35 : 0.8})`;
      ctx.beginPath(); ctx.arc(x2, y, r2, 0, Math.PI * 2); ctx.fill();
    }
  };

  const loop = (t) => {
    draw(t);
    raf = visible ? requestAnimationFrame(loop) : 0;
  };

  resize();
  if (reduceMotion) {
    draw(0);
  } else {
    raf = requestAnimationFrame(loop);
    // ferma l'animazione quando la hero non è visibile
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      }).observe(canvas);
    }
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); if (reduceMotion) draw(0); }, 120);
  });
})();
