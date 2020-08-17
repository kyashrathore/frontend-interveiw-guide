export function StarRator({ dataId = null, noOfStars = 5, onRate }) {
  // grab wrapper with give dataId
  // apped stars to wrapper
  this.rating = false;

  const handleMouseOut = () => {
    for (let i = 1; i <= noOfStars; i++) {
      if (this.rating > -1 && i <= this.rating) {
        document
          .querySelector(`[data-star="${dataId}_${i}"]`)
          .classList.add("active");
      } else {
        document
          .querySelector(`[data-star="${dataId}_${i}"]`)
          .classList.remove("active");
      }
    }
  };

  const handleOnRate = ({ target }) => {
    const val = getStarVal(target);
    onRate(val);
    this.rating = val;
  };
  const handleMouseOver = ({ target }) =>
    highlightStarsUptoCurrent(target, dataId, noOfStars);

  function highlightStarsUptoCurrent(target, wrapperId, noOfStars) {
    // add active class on all star upt current
    const val = getStarVal(target);
    for (let i = 1; i <= val; i++) {
      document
        .querySelector(`[data-star="${wrapperId}_${i}"]`)
        .classList.add("active");
    }
    // remove active class from all after current
    for (let i = val + 1; i < noOfStars + 1; i++) {
      document
        .querySelector(`[data-star="${wrapperId}_${i}"]`)
        .classList.remove("active");
    }
  }

  function getStarVal(target) {
    const dataAttr = target.getAttribute("data-star");
    return Number(dataAttr.slice(dataAttr.length - 1));
  }

  const wrapper = document.querySelector(`[data-rator="${dataId}"]`);

  if (!wrapper) {
    throw "a wrapper with given dataId not found";
  }

  wrapper.addEventListener("mouseout", handleMouseOut);

  const createStar = ({ veal, wrapperId, onRate, onMouseOver }) => {
    const star = document.createElement("span");
    star.setAttribute("data-star", `${wrapperId}_${val}`);
    star.textContent = "\u2606";
    star.addEventListener("click", onRate);
    star.addEventListener("mouseover", onMouseOver);
    return star;
  };

  for (let i = 1; i <= noOfStars; i++) {
    wrapper.appendChild(
      createStar({
        val: i,
        wrapperId: dataId,
        onRate: handleOnRate,
        onMouseOver: handleMouseOver,
      })
    );
  }
}
