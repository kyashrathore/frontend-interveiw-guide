export function StarRator({
  dataId = null,
  initialValue = 0,
  noOfStars = 5,
  onRate,
}) {
  // grab wrapper with give dataId
  // apped stars to wrapper
  this.rating = initialValue;

  const handleMouseOut = () =>
    highlightStarsUptoCurrent(this.rating, dataId, noOfStars);

  const handleOnRate = ({ target }) => {
    const val = getStarVal(target);
    onRate(val);
    this.rating = val;
  };

  const handleMouseOver = ({ target }) =>
    highlightStarsUptoCurrent(getStarVal(target), dataId, noOfStars);

  const wrapper = document.querySelector(`[data-rator="${dataId}"]`);

  if (!wrapper) {
    throw new Error("a wrapper with given dataId not found");
  }

  wrapper.addEventListener("mouseout", handleMouseOut);

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
  // handle initial value
  highlightStarsUptoCurrent(initialValue, dataId, noOfStars);
}

// utils
function getStarVal(target) {
  const dataAttr = target.getAttribute("data-star");
  return Number(dataAttr.slice(dataAttr.length - 1));
}

function createStar({ val, wrapperId, onRate, onMouseOver }) {
  const star = document.createElement("span");
  star.setAttribute("data-star", `${wrapperId}_${val}`);
  star.textContent = "\u2606";
  star.addEventListener("click", onRate);
  star.addEventListener("mouseover", onMouseOver);
  return star;
}

function highlightStarsUptoCurrent(val, wrapperId, noOfStars) {
  // add active class on all star upto current
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

new StarRator({
  dataId: 1,
  noOfStars: 5,
  initialValue: 2,
  onRate: (rating, e) => console.log({ rating }),
});
