const app = {
  $: {
    userBirthday: document.querySelector('input[type="date"]'),
  },

  el: {
    userDays: document.querySelector('[data-name="days"]'),
    userMonths: document.querySelector('[data-name="months"]'),
    userYears: document.querySelector('[data-name="years"]'),
    daysEl: document.querySelector("#days span"),
    monthsEl: document.querySelector("#months span"),
    yearsEl: document.querySelector("#years span"),
  },

  errEl: {
    emptyErr: document.querySelectorAll('[data-err="err-empty"]'),
    futureErr: document.querySelector("[data-err='err-year']"),
  },

  getValueBirthday() {
    const birth = new Date(document.querySelector('input[type="date"]').value);
    const days = +birth.getUTCDate();
    const months = +birth.getUTCMonth() + 1;
    const years = +birth.getUTCFullYear();
    return {
      days,
      months,
      years,
    };
  },

  postValue(days, months, years) {
    this.el.daysEl.innerHTML = String(Math.abs(days));
    this.el.monthsEl.innerHTML = String(Math.abs(months));
    this.el.yearsEl.innerHTML = String(Math.abs(years));
  },
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const {
    days: currentDays,
    months: currentMonths,
    years: currentYears,
  } = app.getValueBirthday();

  const thisYear = new Date().toISOString().split("T")[0].split("-").reverse();
  const [days, months, years] = thisYear;

  if (!currentDays) {
    app.errEl.emptyErr.forEach((el) => {
      el.style.display = "block";
    });
    return;
  }

  app.errEl.emptyErr.forEach((el) => {
    el.style.display = "none";
  });

  if (
    currentYears > +years ||
    (currentYears == +years && currentMonths >= +months && currentDays > +days)
  ) {
    app.errEl.futureErr.style.display = "block";
    return;
  }

  app.errEl.futureErr.style.display = "none";

  const calculateAge = {
    days: +days - currentDays,
    months: +months - currentMonths,
    years: +years - currentYears,
  };

  app.postValue(calculateAge.days, calculateAge.months, calculateAge.years);
});

document.querySelector('input[type="date"]').addEventListener("change", (e) => {
  const { days, months, years } = app.getValueBirthday();
  app.el.userDays.value = days;
  app.el.userMonths.value = months;
  app.el.userYears.value = years;
});
